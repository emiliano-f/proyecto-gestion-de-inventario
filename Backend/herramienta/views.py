from rest_framework import viewsets
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put']

class TipoHerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.TipoHerramientaSerializer
    queryset = models.TipoHerramienta.objects.all()

class HerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.HerramientaSerializer
    queryset = models.Herramienta.objects.all()

class EstadoHerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.EstadoHerramientaSerializer
    queryset = models.EstadoHerramienta.objects.all()
