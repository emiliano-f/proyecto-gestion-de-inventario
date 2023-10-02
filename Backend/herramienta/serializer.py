
from rest_framework import serializers
from . import models

class TipoHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TipoHerramienta
        fields = '__all__'

class HerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Herramienta
        fields = '__all__'

class HerramientaJoinedSerializer(HerramientaSerializer):
    #tipoHerramienta = TipoHerramientaSerializer(read_only=True)
    tipoHerramienta = serializers.CharField(source='tipoHerramienta.nombre')

class EstadoHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EstadoHerramienta
        fields = '__all__'

class EstadoHerramientaJoinedSerializer(EstadoHerramientaSerializer):
    herramienta = serializers.CharField(source='herramienta.descripcion')
