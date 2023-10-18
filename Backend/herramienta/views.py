from django.db import transaction
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class TipoHerramientaCRUD(CustomModelViewSet):
    serializer_class = serializer.TipoHerramientaSerializer
    queryset = models.TipoHerramienta.objects.all()

    def __table__():
        return 'tipoherramienta'

class HerramientaCRUD(viewsets.ViewSet):

    def __table__():
        return 'herramienta'

    def list(self, request):
        # join
                        #.filter(estado='OK') \
        herramienta = models.Herramienta.objects \
                        .prefetch_related('tipoHerramienta').all()
        # serializer
        serializer_class = serializer.HerramientaJoinedSerializer(herramienta, many=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            serializer_class = serializer.HerramientaSerializer(data=request.data)
            serializer_class.is_valid(raise_exception=True)
            herramienta = serializer_class.save()

            # estado creation
            estado_data = {"herramienta": herramienta.id,
                           "fecha": herramienta.fechaAlta,
                           "estado": herramienta.estado,
                           "observaciones": "Alta de herramienta"}
            estado_serializer = serializer.EstadoHerramientaSerializer(data=estado_data)
            estado_serializer.is_valid(raise_exception=True)
            estado_serializer.save()

            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            herramienta = models.Herramienta.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.HerramientaJoinedSerializer(herramienta)
        return Response(serializer_class.data)

    def update(self, request, pk):
        herramienta = models.Herramienta.objects.get(id=pk)
        serializer_class = serializer.HerramientaSerializer(herramienta, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        herramienta = models.Herramienta.objects.get(id=pk)
        herramienta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EstadoHerramientaCRUD(viewsets.ViewSet):

    def __table__():
        return 'estadoherramienta'

    def list(self, request):
        # join
        estado_herramienta = models.EstadoHerramienta.objects.all()
        # serializer
        serializer_class = serializer.EstadoHerramientaJoinedSerializer(estado_herramienta, many=True)
        return Response(serializer_class.data)

    @transaction.atomic
    def create(self, request):
        try:
            serializer_class = serializer.EstadoHerramientaSerializer(data=request.data)
            if serializer_class.is_valid():
                serializer_class.save()
                # update estado from Herramienta
                herramienta = models.Herramienta.objects.get(id=request.data.get('herramienta'))
                herramienta.estado = request.data.get('estado')
                herramienta.save()

                return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            estado_herramienta = models.EstadoHerramienta.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.EstadoHerramientaJoinedSerializer(estado_herramienta)
        return Response(serializer_class.data)

    def update(self, request, pk):
        estado_herramienta = models.EstadoHerramienta.objects.get(id=pk)
        serializer_class = serializer.EstadoHerramientaSerializer(estado_herramienta, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        estado_herramienta = models.EstadoHerramienta.objects.get(id=pk)
        estado_herramienta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
