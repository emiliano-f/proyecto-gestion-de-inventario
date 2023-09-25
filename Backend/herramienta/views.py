from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class TipoHerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.TipoHerramientaSerializer
    queryset = models.TipoHerramienta.objects.all()

class HerramientaCRUD(viewsets.ViewSet):
    def list(self, request):
        # join
        herramienta = models.Herramienta.objects \
                        .filter(estado='OK') \
                        .prefetch_related('tipoHerramienta').all()
        # serializer
        serializer_class = serializer.HerramientaJoinedSerializer(herramienta, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer_class = serializer.HerramientaSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            herramienta = models.Herramienta.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.HerramientaJoinedSerializer(herramienta)
        return Response(serializer_class.data)

    def update(self, request, pk):
        herramienta = models.Herramienta.objects.get(id=pk)
        serializer_class = serializer.HerramientaSerializer(herramienta, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        herramienta = models.Herramienta.objects.get(id=pk)
        herramienta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EstadoHerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.EstadoHerramientaSerializer
    queryset = models.EstadoHerramienta.objects.all()
