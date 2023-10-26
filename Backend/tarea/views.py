from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models
import herramienta.models as herramienta_models
import inventario.models as inventario_models
from herramienta.views import HerramientaCommonLogic
from inventario.views import InventarioCommonLogic

class CustomModelViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class TareaCommonLogic:
    def update_herramientas(herramientas_data, status=None):
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

    def update_insumos(insumos_data):
        for insumo_data in insumos_data:
            
            serializer_insumo = inventario_serializer.OrdenRetiroSerializer(data=insumo_data)
            serializer_insumo.is_valid(raise_exception=True)
            serializer_insumo.save()
            InventarioCommonLogic.create_orden_retiro(insumo_data)

    def create_empleados_relation(empleados_data, tarea_pk):
        print(empleados_data)
        for empleado in empleados_data:
            ## dict
            tiempo_entry = []
            tiempo_entry['empleado'] = empleado['id']
            tiempo_entry['tarea'] = tarea_pk
            tiempo_entry['horasEstimadas'] = empleado.get('horasEstimadas')
            tiempo_entry['responsable'] = empleado.get('responsable')
            ## serializer
            tiempo_serializer = serializer.TiempoSerializer(data=tiempo_entry)
            tiempo_serializer.is_valid(raise_exception=True)
            ## saving
            tiempo_serializer.save()

    def update_empleados_relation(empleados_data, tarea_pk):
        tarea_empleados = model.Tiempo.objects.filter(tarea=tarea_pk).all()
        new_empleados = []

        # update empleados
        for empleado in empleados_data:
            tiempo_model = next((model for model in tarea_empleados if model.empleado == empleado['id']), None)
            if tiempo_model is None:
                new_empleados.append(empleado)
            else:
                if 'horasEstimadas' in empleado:
                    tiempo_model.horasEstimadas = empleado['horasEstimadas']
                if 'horasTotales' in empleado:
                    tiempo_model.horasTotales = empleado['horasTotales']
                if 'responsable' in empleado:
                    tiempo_model.responsable = empleado['responsable']
                tiempo_model.save()

        # add empleados
        if not new_empleados:
            create_empleados_relation(new_empleados, tarea_pk)

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

class TareaCRUD(LoginRequiredMixin, viewsets.ViewSet):

    def __table__():
        return 'tarea'

    def list(self, request):
        try:
            # join
            tarea = models.Tarea.objects.prefetch_related('empleados', 'herramientas').all()
            # serializer
            serializer_class = serializer.TareaJoinedSerializer(tarea, many=True, read_only=True)

            # inverse relation (get OrdenRetiro)
            for tarea_instance in tarea:
                insumos = tarea_instance.insumos_retirados.all()
                tarea_data = next(tarea_data 
                                  for tarea_data in serializer_class.data 
                                  if tarea_data['id'] == tarea_instance.id)
                tarea_data['retiros_insumos'] = [
                        {'insumo': inventario_models.Insumo.objects.get(pk=insumo.id).nombre,
                         'fechaHora': insumo.fechaHora,
                         'cantidad': insumo.cantidad} for insumo in insumos
                ]
            return Response(serializer_class.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def create(self, request):
        try:
            # get empleados, herramientas, insumos
            empleados_data = request.data.pop('empleados', [])
            herramientas_data = request.data.pop('herramientas', [])
            insumos_data = request.data.pop('retiros_insumos', [])

            # check and create tarea
            print(request.data)
            serializer_tarea = serializer.TareaSerializer(data=request.data)
            serializer_tarea.is_valid(raise_exception=True)
            print(empleados_data)
            tarea = serializer_tarea.save()

            # create empleados relation (Tiempo)
            TareaCommonLogic.create_empleados_relation(empleados_data, tarea.id)

            # update herramientas and estado
            TareaCommonLogic.update_herramientas(herramientas_data, herramienta_models.StatusScale.EN_USO)

            # update insumos
            TareaCommonLogic.update_insumos(insumos_data)

            return Response(serializer_tarea.data, status=status.HTTP_201_CREATED)
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

    @transaction.atomic
    def update(self, request, pk):
        try:
            herramientas_data = request.data.pop('herramientas', [])

            tarea = models.Tarea.objects.get(id=pk)
            tarea_serializer = serializer.TareaSerializer(tarea, data=request.data)
            tarea_serializer.is_valid(raise_exception=True)
            tarea_serializer.save()

            # update herramientas and estado
            TareaCommonLogic.update_herramientas(herramientas_data)

            # update empleados relation (Tiempo)
            TareaCommonLogic.update_empleados_relation(empleados_data, tarea.id)

            # update insumos
            TareaCommonLogic.update_insumos(insumos_data)

            return Response(tarea_serializer.data)
        except ObjectDoesNotExist: 
            transaction.set_rollback(True)
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            tarea = models.Tarea.objects.get(id=pk)
            tarea.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
    
class OrdenServicioCRUD(LoginRequiredMixin, viewsets.ViewSet):

    def __table__():
        return 'ordenservicio'

    def list(self, request):
        # join
        orden_servicio = models.OrdenServicio.objects.prefetch_related('usuario', 'sector').all()
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

class SectorListCRUD(LoginRequiredMixin, viewsets.ViewSet):
    def __table__():
        return 'sector'

    def list(self, request):
        # join
        edificio = models.Sector.objects.all()
        # serializer
        serializer_class = serializer.SectorEdificioSerializer(edificio, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        try:
            serializer_class = serializer.SectorSerializer(data=request.data)
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            edificio_model = models.Sector.objects.get(id=pk)
            sectores = models.Sector.objects.filter(nombre=edificio_model.nombre).all()
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.SectorSubsectorSerializer(sectores, many=True)
        return Response(serializer_class.data)
    
class SectorCRUD(CustomModelViewSet):
    serializer_class = serializer.SectorSerializer
    queryset = models.Sector.objects.all()

    def __table__():
        return 'sector'

class TiempoCRUD(CustomModelViewSet):
    serializer_class = serializer.TiempoSerializer
    queryset = models.Tiempo.objects.all()

    def __table__():
        return 'tiempo'
