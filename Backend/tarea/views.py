from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models
import herramienta.models as herramienta_models
import inventario.models as inventario_models
from herramienta.views import HerramientaCommonLogic

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class TareaCommonLogic:
    def update_herramienta(herramientas_data, status=None):
        # update herramientas and estado
        for herramienta_data in herramientas_data:
            ## update herramienta
            herramienta = herramienta_models.Herramienta.objects.get(id=herramienta_data['id'])
            if not herramienta.is_available():
                raise Exception('La herramienta no está disponible')

            if status is None:
                herramienta.estado = herramienta_data['estado']
            else:
                herramienta.estado = status

            herramienta.save()

            ## create estado entry
            HerramientaCommonLogic.create_estado_entry(herramienta)

class EmpleadoCRUD(CustomModelViewSet):
    serializer_class = serializer.EmpleadoSerializer
    queryset = models.Empleado.objects.all()

    def __table__():
        return 'empleado'

class EncuestaSatisfaccionCRUD(CustomModelViewSet):
    serializer_class = serializer.EncuestaSatisfaccionSerializer
    queryset = models.EncuestaSatisfaccion.objects.all()

    def __table__():
        return 'encuestasatisfaccion'

class TareaCRUD(viewsets.ViewSet):

    def __table__():
        return 'tarea'

    def list(self, request):
        # join
        #tarea = models.Tarea.objects.prefetch_related('empleados', 'herramientas', 'retiros_insumos').all()
        tarea = models.Tarea.objects.prefetch_related('empleados', 'herramientas').all()
        # serializer
        serializer_class = serializer.TareaJoinedSerializer(tarea, many=True, read_only=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            # get empleados, herramientas, insumos
            empleados_data = request.data.pop('empleados', [])
            herramientas_data = request.data.pop('herramientas', [])
            insumos_data = request.data.pop('empleados', [])

            # check and create tarea
            serializer_tarea = serializer.TareaJoinedSerializer(data=request.data)
            serializer_tarea.is_valid(raise_exception=True)
            tarea = serializer_tarea.save()

            # update empleados (Tiempo)
            for empleado in empleados_data:
                ## dict
                tiempo_entry = []
                tiempo_entry['empleado'] = empleado['id']
                tiempo_entry['tarea'] = tarea.id
                tiempo_entry['horasEstimadas'] = empleado.get('horasEstimadas')
                ## serializer
                tiempo_serializer = serializer.TiempoSerializer(data=tiempo_entry)
                tiempo_serializer.is_valid(raise_exception=True)
                ## saving
                tiempo_serializer.save()

            # update herramientas and estado
            TareaCommonLogic.update_herramienta(herramientas_data, herramienta_models.StatusScale.EN_USO)

            # update insumos
            for insumo_data in insumos_data:
                insumo = inventario_models.Insumo.objects.get(id=insumo_data['id'])
                insumo.update_quantity(insumo_data['cantidad'], 
                                       accion=inventario_models.ActionScale.RESTAR)
                insumo.save()

            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            tarea = models.Tarea.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.TareaJoinedSerializer(tarea)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            tarea = models.Tarea.objects.get(id=pk)
            tarea_serializer = serializer.TareaSerializer(tarea, data=request.data)
            tarea_serializer.is_valid(raise_exception=True)
            tarea_serializer.save()
            return Response(tarea_serializer.data)
        except ObjectDoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            tarea = models.Tarea.objects.get(id=pk)
            tarea.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
    
class TareaHerramientaCRUD(viewsets.ViewSet):
    def update(self, request, pk):
        try:
            herramientas_data = request.data.pop('herramientas', [])

            tarea = models.Tarea.objects.get(id=pk)
            tarea_serializer = serializer.TareaSerializer(tarea, data=request.data)
            tarea_serializer.is_valid(raise_exception=True)
            tarea_serializer.save()

            # update herramientas and estado
            TareaCommonLogic.update_herramienta(herramientas_data)

            return Response(tarea_serializer.data)
        except ObjectDoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class OrdenServicioCRUD(viewsets.ViewSet):

    def __table__():
        return 'ordenservicio'

    def list(self, request):
        # join
        orden_servicio = models.OrdenServicio.objects.prefetch_related('usuario').all()
        # serializer
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        try:
            serializer_class = serializer.OrdenServicioSerializer(data=request.data)
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            orden_servicio = models.OrdenServicio.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            orden_servicio = models.OrdenServicio.objects.get(id=pk)
            serializer_class = serializer.OrdenServicioSerializer(orden_servicio, data=request.data)
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()
            return Response(serializer_class.data)
        except ObjectDoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            orden_servicio = models.OrdenServicio.objects.get(id=pk)
            orden_servicio.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
