from rest_framework import serializers
from . import models

class TipoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in TipoInsumo
    """

    class Meta:
        model = models.TipoInsumo
        fields = '__all__'

class TipoInsumoNombreSerializer(serializers.ModelSerializer):
    """
    No recuerdo el uso
    """

    class Meta:
        model = models.TipoInsumo

# Insumo con estado
class InsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Insumo
    """

    class Meta:
        model = models.Insumo
        fields = '__all__'

class InsumoTipoInsumoSerializer(InsumoSerializer):
    """
    Adds attribute to InsumoSerializer for replacing foreign key by TipoInsumo.nombre
    """

    #tipoInsumo = TipoInsumoNombreSerializer(read_only=True)
    tipoInsumo = serializers.CharField(source='tipoInsumo.nombre') 

# Insumo sin estado
class InsumoSerializerWithoutEstado(serializers.ModelSerializer):
    """
    Retrieves all fields in Insumo except estado
    """

    class Meta:
        model = models.Insumo
        exclude = ['estado']

class InsumoTipoInsumoWithoutEstado(InsumoSerializerWithoutEstado):
    """
    Adds attribute to InsumoSerializerWithoutEstado for replacing 
    foreign key by TipoInsumo.nombre
    """

    tipoInsumo = serializers.CharField(source='tipoInsumo.nombre')

class OrdenRetiroSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in OrdenRetiro
    """

    class Meta:
        model = models.OrdenRetiro
        fields = '__all__'

class OrdenRetiroFkReplacedSerializer(OrdenRetiroSerializer):
    """
    Adds attribute to OrdenRetiro for replacing 
    foreign key by Insumo.nombre
    """

    insumo = serializers.CharField(source='insumo.nombre')

class AjusteStockSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in AjusteStock
    """

    class Meta:
        model = models.AjusteStock
        fields = '__all__'

class AjusteStockJoinedSerializer(AjusteStockSerializer):
    """
    Adds attribute to AjusteStockSerializer for replacing 
    foreign key by Insumo.nombre
    """

    insumo = serializers.CharField(source='insumo.nombre')
