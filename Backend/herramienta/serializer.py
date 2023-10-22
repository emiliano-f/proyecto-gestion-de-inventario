
from rest_framework import serializers
from . import models

class TipoHerramientaSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in TipoHerramienta
    """

    class Meta:
        model = models.TipoHerramienta
        fields = '__all__'

class HerramientaSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Herramienta
    """

    class Meta:
        model = models.Herramienta
        fields = '__all__'

class HerramientaJoinedSerializer(HerramientaSerializer):
    """
    Adds attributes to HerramientaJoinedSerializer for get 
    TipoHerramienta.nombre
    """

    #tipoHerramienta = TipoHerramientaSerializer(read_only=True)
    tipoHerramienta = serializers.CharField(source='tipoHerramienta.nombre')

class EstadoHerramientaSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in EstadoHerramienta
    """

    class Meta:
        model = models.EstadoHerramienta
        fields = '__all__'

class EstadoHerramientaJoinedSerializer(EstadoHerramientaSerializer):
    """
    Adds attributes to EstadoHerramientaSerializer for get 
    Herramienta.nombre 
    Herramienta.codigo 
    """

    herramienta = serializers.CharField(source='herramienta.nombre')
    codigo = serializers.CharField(source='herramienta.codigo')
