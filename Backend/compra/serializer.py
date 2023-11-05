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

class DetallePedidoFkReplacedSerializer(DetallePedidoSerializer):
    """
    Adds attributes to DetallePedidoSerializer for get 
    PedidoInsumo.*
    """
<<<<<<< HEAD
    class Meta:
        model = models.DetallePedido
        fields = '__all__'

    #fechaHora = serializers.CharField(source='pedidoInsumo.fechaHora') 
    #observaciones = serializers.CharField(source='pedidoInsumo.observaciones') 
    #recibido = serializers.CharField(source='pedidoInsumo.recibido') 
=======
 
    fechaHora = serializers.CharField(source='pedidoInsumo.fechaHora') 
    observaciones = serializers.CharField(source='pedidoInsumo.observaciones') 
    recibido = serializers.CharField(source='pedidoInsumo.recibido') 
>>>>>>> backend

class PedidoInsumoSerializer(serializers.ModelSerializer):
    """
    Retrieves all fields in PedidoInsumo
    """
<<<<<<< HEAD
    #detalles = DetallePedidoSerializer(many=True, required=False)
=======

    detalles = DetallePedidoSerializer(many=True, required=False)
>>>>>>> backend

    class Meta:
        model = models.PedidoInsumo
        fields = '__all__'
