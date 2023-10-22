from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from . import serializer
from . import models

class CustomModelViewSet(viewsets.ModelViewSet):
    http_method_names = ['post', 'get', 'put', 'delete']

class EmpleadoCRUD(CustomModelViewSet):
    serializer_class = serializer.EmpleadoSerializer
    queryset = models.Empleado.objects.all()

    def __table__():
        return 'empleado'

class EncuestaSatisfaccionCRUD(CustomModelViewSet):
    serializer_class = serializer.EncuestaSatisfaccionSerializer
    queryset = models.EncuestaSatisfaccion.objects.all()

    def __table__():
        return 'encuestasatisfaccion'

class TareaCRUD(CustomModelViewSet):
    serializer_class = serializer.TareaSerializer
    queryset = models.Tarea.objects.all()

    def __table__():
        return 'tarea'

"""
class OrdenServicioCRUD(CustomModelViewSet):
    serializer_class = serializer.OrdenServicioSerializer
    queryset = models.OrdenServicio.objects.all()
"""

class OrdenServicioCRUD(viewsets.ViewSet):

    def __table__():
        return 'ordenservicio'

    def list(self, request):
        # join
        orden_servicio = models.OrdenServicio.objects.prefetch_related('usuario').all()
        # serializer
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio, many=True)
        return Response(serializer_class.data)

    def create(self, request):
        serializer_class = serializer.OrdenServicioSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk):
        try:
            orden_servicio = models.OrdenServicio.objects.get(id=pk)
        except: 
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer_class = serializer.OrdenServicioUsuarioSerializer(orden_servicio)
        return Response(serializer_class.data)

    def update(self, request, pk):
        orden_servicio = models.OrdenServicio.objects.get(id=pk)
        serializer_class = serializer.OrdenServicioSerializer(orden_servicio, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        orden_servicio = models.OrdenServicio.objects.get(id=pk)
        orden_servicio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SectorCRUD(viewsets.ViewSet):
    def __table__():
        return 'sector'

    def retrieve(self, request, edificio_id):
        sectors = [
                [
                    {
                        "id" : 1,
                        "edificio_id": 1,
                        "name":"Aula 1",
                    },
                    {
                        "id" : 2,
                        "edificio_id": 1,
                        "name":"Aula 4",
                    },
                    {
                        "id" : 3,
                        "edificio_id": 1,
                        "name":"Aula 4A",
                    },
                ],
                [
                    {
                        "id" : 1,
                        "edificio_id": 2,
                        "name":"Biblioteca",
                    },
                    {
                        "id" : 2,
                        "edificio_id": 2,
                        "name":"Anfiteatro Este",
                    },
                    {
                        "id" : 3,
                        "edificio_id": 2,
                        "name":"Anfiteatro Oeste",
                    },
                ],
                [
                    {
                        "id" : 1,
                        "edificio_id": 3,
                        "name":"Lab Química",
                    },
                ],
                [
                    {
                        "id" : 2,
                        "edificio_id": 4,
                        "name":"Lab civil",
                    },
                ],
            ]
        return Response(sectors[edificio_id])
    
class EdificioCRUD(viewsets.ViewSet):
    
    def __table__():
        return 'edificio'

    def list(self, request):
        return Response(data=
            [
                {
                    "id":"0",
                    "name":"Edificio de Aulas",
                },
                {
                    "id":"1",
                    "name":"Edificio de Gobierno",
                },
                {
                    "id":"2",
                    "name":"DETI I",
                },
                {
                    "id":"3",
                    "name":"DETI II",
                },
            ],
        )