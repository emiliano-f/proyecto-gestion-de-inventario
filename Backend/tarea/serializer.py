from rest_framework import serializers
from . import models

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Empleado
        fields = '__all__'

class EncuestaSatisfaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EncuestaSatisfaccion
        fields = '__all__'

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tarea
        fields = '__all__'

class OrdenServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrdenServicio
        fields = '__all__'

class OrdenServicioUsuarioSerializer(serializers.ModelSerializer):
    usuarioApellido = serializers.CharField(source='usuario.apellido')
    usuarioNombre = serializers.CharField(source='usuario.nombre')
    usuarioID = serializers.IntegerField(source='usuario.id')
    class Meta:
        model = models.OrdenServicio
        fields = ['id', 'tarea', 'fechaGeneracion', 'sector', 
                  'descripcion', 'fechaNecesidad', 'comentario',
                  'prioridad', 'categoria', 'estado',
                  'usuarioNombre', 'usuarioApellido', 'usuarioID']
