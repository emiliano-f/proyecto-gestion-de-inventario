from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class EmpleadoCRUD(CustomModelViewSet):
    serializer_class = serializer.EmpleadoSerializer
    queryset = models.Empleado.objects.all()

class EncuestaSatisfaccionCRUD(CustomModelViewSet):
    serializer_class = serializer.EncuestaSatisfaccionSerializer
    queryset = models.EncuestaSatisfaccion.objects.all()

class TareaCRUD(CustomModelViewSet):
    serializer_class = serializer.TareaSerializer
    queryset = models.Tarea.objects.all()

"""
class OrdenServicioCRUD(CustomModelViewSet):
    serializer_class = serializer.OrdenServicioSerializer
    queryset = models.OrdenServicio.objects.all()
"""

class OrdenServicioCRUD(viewsets.ViewSet):
    def list(self, request):
        # join
        orden_servicio = models.OrdenServicio.objects.prefetch_related('usuario').all()
        # serializer
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer_class = serializer.OrdenServicioSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            orden_servicio = models.OrdenServicio.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio)
        return Response(serializer_class.data)

    def update(self, request, pk):
        orden_servicio = models.OrdenServicio.objects.get(id=pk)
        serializer_class = serializer.OrdenServicioSerializer(orden_servicio, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        orden_servicio = models.OrdenServicio.objects.get(id=pk)
        orden_servicio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
