from rest_framework import serializers
from . import models

class TipoInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TipoInsumo
        fields = '__all__'

class InsumoSerializer(serializers.ModelSerializer):
    tipoInsumo = TipoInsumoSerializer()

    class Meta:
        model = models.Insumo
        fields = '__all__'

class OrdenRetiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrdenRetiro
        fields = '__all__'

class AjusteStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AjusteStock
        fields = '__all__'
