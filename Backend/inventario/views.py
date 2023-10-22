from django.db import transaction
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class InventarioCommonLogic:
    def create_orden_retiro(data):
            ## check data types
            serializer_class = serializer.OrdenRetiroSerializer(data=data)
            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()

            ## update cantidad from Insumo
            insumo = models.Insumo.objects.get(id=request.data.get('insumo'))
            insumo.update_quantity(data['cantidad'], models.ActionScale.RESTAR)
            insumo.save()


class TipoInsumoCRUD(CustomModelViewSet):
    serializer_class = serializer.TipoInsumoSerializer
    queryset = models.TipoInsumo.objects.all()

    def __table__():
        return 'tipoinsumo'

class InsumoCRUD(viewsets.ViewSet):

    def __table__():
        return 'insumo'

    def list(self, request):
        # join
        #insumo = models.Insumo.objects.filter(estado='Ok').prefetch_related('tipoInsumo').all()
        insumo = models.Insumo.objects.prefetch_related('tipoInsumo').all()
        # serializer
        serializer_class = serializer.InsumoTipoInsumoWithoutEstado(insumo, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer_class = serializer.InsumoSerializer(data=request.data)
        serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(serializer_class.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk):
        try:
            insumo = models.Insumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.InsumoTipoInsumoSerializer(insumo)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            insumo = models.Insumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.InsumoSerializer(insumo, data=request.data)
        serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(serializer_class.data)

    def destroy(self, request, pk):
        try:
            insumo = models.Insumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        insumo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrdenRetiroCRUD(viewsets.ViewSet):

    def __table__():
        return 'ordenretiro'

    def list(self, request):
        # join
        orden_retiro = models.OrdenRetiro.objects.all()
        # serializer
        serializer_class = serializer.OrdenRetiroFkReplacedSerializer(orden_retiro, many=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            InventarioCommonLogic.create_orden_retiro(request.data)
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

class AjusteStockCRUD(viewsets.ViewSet):

    def __table__():
        return 'ajustestock'
    
    def list(self, request):
        # join
        ajuste_stock = models.AjusteStock.objects.all()
        # serializer
        serializer_class = serializer.AjusteStockJoinedSerializer(ajuste_stock, many=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            serializer_class = serializer.AjusteStockSerializer(data=request.data)

            serializer_class.is_valid(raise_exception=True)
            serializer_class.save()
            # update cantidad from Insumo
            insumo = models.Insumo.objects.get(id=request.data.get('insumo'))
            
            ## check positive value
            if int(request.data.get('cantidad')) <= 0:
                raise Exception("Negative or zero quantity")

            ## sum quantities
            if request.data.get('accionCantidad') == 'SUMAR':
                quant = insumo.cantidad + int(request.data.get('cantidad'))
            else:
                quant = insumo.cantidad - int(request.data.get('cantidad'))

            # check quant
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
            ajuste_stock = models.AjusteStock.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.AjusteStockJoinedSerializer(ajuste_stock)
        return Response(serializer_class.data)

    def update(self, request, pk):
        try:
            ajuste_stock = models.AjusteStock.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = serializer.AjusteStockSerializer(ajuste_stock, data=request.data)
        serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(serializer_class.data)

    def destroy(self, request, pk):
        try:
            ajuste_stock = models.AjusteStock.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        ajuste_stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
