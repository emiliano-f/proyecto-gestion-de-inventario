from rest_framework import serializers
from . import models

class PresupuestoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in Presupuesto
    """

    class Meta:
        model = models.Presupuesto
        exclude = ['created_by']

class DetallePedidoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in DetallePedido
    """

    class Meta:
        model = models.DetallePedido
        fields = "__all__"

class DetallePedidoFkReplacedSerializer(DetallePedidoSerializer):
    """
    Adds attributes to DetallePedidoSerializer for get 
    PedidoInsumo.*
    """
    class Meta:
        model = models.DetallePedido
        fields = "__all__"

    #fechaHora = serializers.CharField(source='pedidoInsumo.fechaHora') 
    #observaciones = serializers.CharField(source='pedidoInsumo.observaciones') 
    #recibido = serializers.CharField(source='pedidoInsumo.recibido') 

class PedidoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in PedidoInsumo
    """
    #detalles = DetallePedidoSerializer(many=True, required=False)

    class Meta:
        model = models.PedidoInsumo
        exclude = ['created_by']
        
