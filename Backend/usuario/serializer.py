from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        exclude = ['is_active','is_superuser']

class UsuarioSerializerNoPassword(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        exclude = ['is_superuser', 'password']
