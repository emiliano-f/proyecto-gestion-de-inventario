from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from . import serializer
from . import models
from inventario.models import Insumo

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class CompraCommonLogic:
    def detalle_pedido_logic(quantity):
        ## check positive value
        if quantity <= 0: raise Exception('Negative or zero: invalid quantity')

class PedidoInsumoCRUD(viewsets.ViewSet):

    def __table__():
        return 'pedidoinsumo'

    def __update_insumo__(serializers):
        for curr_ser in serializer:
            insumo = Insumo.objects.get(id=curr_ser['insumo'].id)
            ## update quantities
            insumo.cantidad += curr_ser['cantidad']
            insumo.save()

    def __get_detalles__(serializer_, pedido_insumo, many=True):
        new_data = {}
        if many:
            for pedido_instance in pedido_insumo:
                detalles = pedido_instance.detalles_pedido.all()
                pedido_data = next(pedido_data
                                   for pedido_data in serializer_.data
                                   if pedido_data['id'] == pedido_instance.id)
                pedido_data['detalles'] = [{'insumo': Insumo.objects.get(pk=detalle.insumo.id).nombre,
                                            'cantidad': detalle.cantidad,
                                            'observacion': detalle.observacion}
                                           for detalle in detalles]
        else:
            detalles = pedido_insumo.detalles_pedido.all()
            new_data = serializer_.data.copy()
            new_data['detalles'] = [{'insumo': Insumo.objects.get(pk=detalle.insumo.id).nombre,
                                        'cantidad': detalle.cantidad,
                                        'observacion': detalle.observacion}
                                       for detalle in detalles]
        return new_data

    def list(self, request):
        try:
            # join
            pedido_insumo = models.PedidoInsumo.objects.all()
            # serializer
            serializer_class = serializer.PedidoInsumoSerializer(pedido_insumo, many=True, read_only=True)

            return Response(serializer_class.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @transaction.atomic
    def create(self, request):
        try:

            serializer_pedido = serializer.PedidoInsumoSerializer(data=request.data)

            ## check data types
            serializer_pedido.is_valid(raise_exception=True)
            pedido_insumo = serializer_pedido.save()

            ### check validity, logic and save
            CompraCommonLogic.detalle_pedido_logic(serializer_pedido.validated_data.get('cantidad'))
            
            ## check if PedidoInsumo was received
            if pedido_insumo.recibido == 'Si':
                PedidoInsumoCRUD.__update_insumo__(pedido_insumo.data)

            return Response(serializer_pedido.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            transaction.set_rollback(True)
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            pedido_insumo = models.PedidoInsumo.objects.get(id=pk)
            serializer_class = serializer.PedidoInsumoSerializer(pedido_insumo)
            # reverse relation (get DetallePedido)
            return Response(serializer_class.data)
        except ObjectDoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def update(self, request, pk):
        try:
            pedido_insumo = models.PedidoInsumo.objects.get(id=pk)
            serializer_pedido = serializer.PedidoInsumoSerializer(pedido_insumo, data=request.data)
            serializer_pedido.is_valid(raise_exception=True)
            serializer_pedido.save()

            if serializer_pedido.validated_data.get('recibido') == 'Si':
                PedidoInsumoCRUD.__update_insumo__(serializer_pedido.data)

            return Response(serializer_pedido.data)

        except ObjectDoesNotExist: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            pedido_insumo = models.PedidoInsumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        pedido_insumo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PresupuestoCRUD(CustomModelViewSet):
    serializer_class = serializer.PresupuestoSerializer
    queryset = models.Presupuesto.objects.all()

    def __table__():
        return 'presupuesto'
