from rest_framework import serializers
from . import models

class PresupuestoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Presupuesto
    """

    class Meta:
        model = models.Presupuesto
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in DetallePedido
    """

    class Meta:
        model = models.DetallePedido
        fields = '__all__'

class DetallePedidoFkReplacedSerializer(serializers.ModelSerializer):
    """
    Adds attributes to DetallePedidoSerializer for get 
    PedidoInsumo.*
    """
 
    fechaHora = serializers.CharField(source='pedidoInsumo.fechaHora') 
    observaciones = serializers.CharField(source='pedidoInsumo.observaciones') 
    recibido = serializers.CharField(source='pedidoInsumo.recibido') 

class PedidoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in PedidoInsumo

    Adds attribute to PedidoInsumoSerializer for get 
    DetallePedido.*
    """
    detalles = DetallePedidoSerializer(read_only=True)

    class Meta:
        model = models.PedidoInsumo
        fields = '__all__'
