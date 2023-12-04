from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        exclude = ['user_permissions','is_superuser','last_login']

class UsuarioSerializerNoPassword(serializers.ModelSerializer):
    class Meta:
        model = models.Usuario
        exclude = ['user_permissions','groups','default_password','is_active','is_superuser', 'password','last_login']
