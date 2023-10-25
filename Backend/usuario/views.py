from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import viewsets
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
            usuario_serializer = serializer.UsuarioSerializer(data=request.data)
            usuario_serializer.is_valid(raise_exception=True)
            user = usuario_serializer.save()

            if user.is_staff:
                grupo = grupo.objects.get(name='staff_users')
            else:
                grupo = grupo.objects.get(name='regular_users')

            grupo.user_set.add(user)
            grupo.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def __table__():
        return 'usuario'
