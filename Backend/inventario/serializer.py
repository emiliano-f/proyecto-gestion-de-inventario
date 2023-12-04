from rest_framework import serializers
from . import models

class TipoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in TipoInsumo
    """

    class Meta:
        model = models.TipoInsumo
        exclude = ['created_by']

class TipoInsumoNombreSerializer(serializers.ModelSerializer):
    """
    No recuerdo el uso
    """

    class Meta:
        model = models.TipoInsumo
        exclude = ['created_by']

# Insumo con estado
class InsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Insumo
    """

    class Meta:
        model = models.Insumo
        exclude = ['is_active','created_by']

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
        exclude = ['is_active','created_by']

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
        exclude = ['is_active','created_by']

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
        exclude = ['created_by']

class AjusteStockJoinedSerializer(AjusteStockSerializer):
    """
    Adds attribute to AjusteStockSerializer for replacing 
    foreign key by Insumo.nombre
    """

    insumo = serializers.CharField(source='insumo.nombre')
