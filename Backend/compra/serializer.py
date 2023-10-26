from rest_framework import serializers
from . import models

class PresupuestoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Presupuesto
    """

    class Meta:
        model = models.Presupuesto
        fields = '__all__'

class PedidoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in PedidoInsumo
    """
    
    class Meta:
        model = models.PedidoInsumo
        fields = '__all__'
