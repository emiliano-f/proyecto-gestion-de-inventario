from rest_framework import serializers
from . import models

class TipoInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TipoInsumo
        fields = '__all__'

class TipoInsumoNombreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TipoInsumo
        fields = ['nombre']

class InsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Insumo
        fields = '__all__'

class InsumoTipoInsumoSerializer(InsumoSerializer):
    #tipoInsumo = TipoInsumoNombreSerializer(read_only=True)
    tipoInsumo = serializers.CharField(source='tipoInsumo.nombre') 

class OrdenRetiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrdenRetiro
        fields = '__all__'

class AjusteStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AjusteStock
        fields = '__all__'
