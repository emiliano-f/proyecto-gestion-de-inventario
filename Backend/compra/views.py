from django.db import transaction
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
    
    def __update_insumo__(detalles):
        for detalle_pedido in detalles:
            insumo = Insumo.objects.get(id=detalle_pedido['insumo'])
            ## update quantities
            insumo.cantidad += detalle_pedido['cantidad']
            insumo.save()


    def list(self, request):
        # join
        pedido_insumo = models.PedidoInsumo.objects.all()
        # serializer
        serializer_class = serializer.PedidoInsumoSerializer(pedido_insumo, many=True, read_only=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:

            ## check if detalles is empty
            detalles_data = request.data.pop('detalles', [])
            if detalles_data is None:
                raise Exception("Details empty")

            serializer_pedido = serializer.PedidoInsumoSerializer(data=request.data)

            ## check data types
            serializer_pedido.is_valid(raise_exception=True)
            pedido_insumo = serializer_pedido.save()

            ## check for detalles
            serializers_detalles = []
            for detalle in detalles_data:
                detalle['pedidoInsumo'] = pedido_insumo.id
                serializers_detalles.append(serializer.DetallePedidoSerializer(data=detalle))

            ### check validity, logic and save
            detalle_pedido_models = []
            for serializer_detalle in serializers_detalles:
                serializer_detalle.is_valid(raise_exception=True)
                CompraCommonLogic.detalle_pedido_logic(serializer_detalle.validated_data.get('cantidad'))
                detalle_pedido_models.append(serializer_detalle.save())

            ## check if PedidoInsumo was received
            if pedido_insumo.recibido == 'Si':
                PedidoInsumoCRUD.__update_insumo__(detalle_pedido_models)

            return Response(serializer_pedido.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            pedido_insumo = models.PedidoInsumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.PedidoInsumoSerializer(pedido_insumo)
        return Response(serializer_class.data)

    @transaction.atomic
    def update(self, request, pk):
        try:
            pedido_insumo = models.PedidoInsumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_pedido = serializer.PedidoInsumoSerializer(pedido_insumo, data=request.data)
        serializer_pedido.is_valid(raise_exception=True)
        serializer_pedido.save()

        if serializer_pedido.validated_data.get('recibido') == 'Si':
            serializer_detalles = serializer.DetallePedidoSerializer(
                                                models.DetallePedido.objects.filter(pedidoInsumo=pk).all(),
                                                many=True)
            PedidoInsumoCRUD.__update_insumo__(serializer_detalles.data)

        return Response(serializer_pedido.data)

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

class DetallePedidoCRUD(viewsets.ViewSet):

    def __table__():
        return 'detallepedido'

    def list(self, request):
        # join
        detalle_pedido = models.DetallePedido.objects.all()
        # serializer
        serializer_class = serializer.DetallePedidoFkReplacedSerializer(detalle_pedido, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        try:
            serializer_class = serializer.DetallePedidoSerializer(data=request.data)

            ## check data types
            serializer_class.is_valid(raise_exception=True)

            ## check logic
            CompraCommonLogic.detalle_pedido_logic(serializer_class.data.get('cantidad'))

            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            detalle_pedido = models.DetallePedido.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.DetallePedidoFkReplacedSerializer(detalle_pedido)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            detalle_pedido = models.DetallePedido.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.DetallePedidoSerializer(detalle_pedido, data=request.data)
        serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(serializer_class.data)

    def destroy(self, request, pk):
        try:
            detalle_pedido = models.DetallePedido.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        detalle_pedido.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
