from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User, Group
from django.db import transaction
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from settings.common_class import LoginRequiredNoRedirect
from . import serializer
from . import models

import json
import random
import string

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class UsuarioCRUD(LoginRequiredNoRedirect, CustomModelViewSet):
    serializer_class = serializer.UsuarioSerializer
    queryset = models.Usuario.objects.all()

    @transaction.atomic
    def create(self, request):
        try:
            #invalid_data = request.data.copy()
            #invalid_data["username"] = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            #invalid_data["password"] = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
            usuario_serializer = serializer.UsuarioSerializer(data=request.data)
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

@csrf_exempt
def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    #response.set_cookie('csrftoken', get_token(request),samesite='None')
    return response

@require_POST
@csrf_exempt
def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})

class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'username': request.user.username})
