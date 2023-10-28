from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, Group
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from . import serializer
from . import models


class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class UsuarioCRUD(CustomModelViewSet):
    serializer_class = serializer.UsuarioSerializer
    queryset = models.Usuario.objects.all()

    @transaction.atomic
    def create(self, request):
        try:
            invalid_data = request.data.copy()
            invalid_data["username"] = "newuser"
            invalid_data["password"] = "newuser"
            usuario_serializer = serializer.UsuarioSerializer(data=invalid_data)
            usuario_serializer.is_valid(raise_exception=True)
            usuario_serializer.validated_data['password'] = make_password(usuario_serializer.validated_data['password'])
            user = usuario_serializer.save()
            
            #if user.is_staff:
            #    grupo = Group.objects.get(name='staff_users')
            #else:
            #    grupo = Group.objects.get(name='regular_users')

            #grupo.user_set.add(user)
            #grupo.save()
            return Response(usuario_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def __table__():
        return 'usuario'
