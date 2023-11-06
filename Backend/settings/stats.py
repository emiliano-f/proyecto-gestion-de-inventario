from django.db import connection
from settings.common_class import LoginRequiredNoRedirect
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
import inventario.models as inv_models

class InsumosMasConsumidos(LoginRequiredNoRedirect, ViewSet):
    def list(self, request):
        #insumos = inv_models.Insumo.objects.aggregate(total_consumido=Sum('precio')
        query = """
            SELECT insumo_id, SUM(cantidad) AS total_consumido, strftime('%W', fechaHora) as semana
            FROM inventario_ordenretiro
            WHERE strftime('%Y', fechaHora)=strftime('%Y', date('now'))
            GROUP BY semana, insumo_id
            ORDER BY semana DESC, total_consumido DESC
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()
        
        print(resultados)
        return Response(resultados)

class TiposInsumoMasUtilizados(LoginRequiredNoRedirect, ViewSet):
    def list(self, request):
        query = """
            SELECT tipoInsumo_id, COUNT(tipoInsumo_id) AS total_tipos
            FROM inventario_insumo
            GROUP BY tipoInsumo_id
            LIMIT 10
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()
        return Response(resultados)

class EmpleadosHorasTotales(LoginRequiredNoRedirect, ViewSet):
    def list(self, request):
        query = """
            SELECT empleado_id, SUM(horasEstimadas) total_estimadas, SUM(horasTotales) total_reales
            FROM tarea_tiempo
            GROUP BY empleado_id
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()
        return Response(resultados)

class TareasCompletadas(LoginRequiredNoRedirect, ViewSet):
    def list(self, request):
        ## filtrar por nulos fechaFin
        query = """
            SELECT strftime('%W', fechaFin) AS semana, COUNT(*) AS total
            FROM tarea_tarea
            WHERE strftime('%Y', fechaFin)=strftime('%Y', date('now'))
            GROUP BY semana
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            resultados = cursor.fetchall()
        return Response(resultados)
