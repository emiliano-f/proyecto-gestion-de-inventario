from rest_framework import viewsets
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class PedidoInsumoCRUD(viewsets.ViewSet):
    serializer_class = serializer.PedidoInsumoSerializer
    queryset = models.PedidoInsumo.objects.all()

    def __table__():
        return 'pedidoinsumo'

    def list(self, request):
        # join
        orden_retiro = models.OrdenRetiro.objects.all()
        # serializer
        serializer_class = serializer.OrdenRetiroFkReplacedSerializer(orden_retiro, many=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            serializer_class = serializer.OrdenRetiroSerializer(data=request.data)

            ## check data types
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()

            ## update cantidad from Insumo
            insumo = models.Insumo.objects.get(id=request.data.get('insumo'))

            ## check positive value
            if int(request.data.get('cantidad')) <= 0:
                raise Exception("Negative or zero quantity")
            
            ## update quantities
            quant = insumo.cantidad - int(request.data.get('cantidad'))

            ## check quant
            if quant < 0:
                raise Exception("Excedeed Quantity")

            insumo.cantidad = quant
            insumo.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            orden_retiro = models.OrdenRetiro.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.OrdenRetiroFkReplacedSerializer(orden_retiro)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            orden_retiro = models.OrdenRetiro.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.OrdenRetiroSerializer(orden_retiro, data=request.data)
        serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(serializer_class.data)

    def destroy(self, request, pk):
        try:
            orden_retiro = models.OrdenRetiro.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        orden_retiro.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PresupuestoCRUD(CustomModelViewSet):
    serializer_class = serializer.PresupuestoSerializer
    queryset = models.Presupuesto.objects.all()

    def __table__():
        return 'presupuesto'

"""
class DetallePedidoCRUD(CustomModelViewSet):
    serializer_class = serializer.DetallePedidoSerializer
    queryset = models.DetallePedido.objects.all()

    def __table__():
        return 'detallepedido
"""
