from django.db import transaction
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class TipoInsumoCRUD(CustomModelViewSet):
    serializer_class = serializer.TipoInsumoSerializer
    queryset = models.TipoInsumo.objects.all()

class InsumoCRUD(viewsets.ViewSet):
    def list(self, request):
        # join
        insumo = models.Insumo.objects.filter(estado='OK').prefetch_related('tipoInsumo').all()
        # serializer
        serializer_class = serializer.InsumoTipoInsumoWithoutEstado(insumo, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer_class = serializer.InsumoSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            insumo = models.Insumo.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.InsumoTipoInsumoSerializer(insumo)
        return Response(serializer_class.data)

    def update(self, request, pk):
        insumo = models.Insumo.objects.get(id=pk)
        serializer_class = serializer.InsumoSerializer(insumo, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        insumo = models.Insumo.objects.get(id=pk)
        insumo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrdenRetiroCRUD(CustomModelViewSet):
    serializer_class = serializer.OrdenRetiroSerializer
    queryset = models.OrdenRetiro.objects.all()

class AjusteStockCRUD(viewsets.ViewSet):
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
            if serializer_class.is_valid():
                serializer_class.save()
                # update cantidad from Insumo
                insumo = models.Insumo.objects.get(id=request.data.get('insumo'))
                
                ## sum quantities
                if request.data.get('accionCantidad') == '+':
                    quant = insumo.cantidad + int(request.data.get('cantidad'))
                else:
                    quant = insumo.cantidad - int(request.data.get('cantidad'))

                ## check quant
                #if quant < 0:
                #    raise Exception("Negative Quantity")

                insumo.cantidad = quant
                insumo.save()
                return Response(serializer_class.data, status=status.HTTP_201_CREATED)

            else:
                return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

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
        ajuste_stock = models.AjusteStock.objects.get(id=pk)
        serializer_class = serializer.AjusteStockSerializer(ajuste_stock, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        ajuste_stock = models.AjusteStock.objects.get(id=pk)
        ajuste_stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
