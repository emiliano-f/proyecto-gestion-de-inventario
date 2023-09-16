from django.urls import path, include
from rest_framework import routers
from tarea import views

router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoCRUD, 'empleados')
router.register(r'ordenes-servicio', views.OrdenServicioCRUD, 'ordenes-servicio')
router.register(r'encuestas-satisfaccion', views.EncuestaSatisfaccionCRUD, 'encuestas-satisfaccion')
router.register(r'tareas', views.TareaCRUD, 'tareas')

urlpatterns = [
    path('', include(router.urls)),
]
