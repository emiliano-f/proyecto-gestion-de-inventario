from django.urls import path, include
from rest_framework import routers
from tarea import views

router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoCRUD, 'empleados')
#router.register(r'ordenes-servicio', views.OrdenServicioCRUD, 'ordenes-servicio')
router.register(r'encuestas-satisfaccion', views.EncuestaSatisfaccionCRUD, 'encuestas-satisfaccion')
#router.register(r'tareas', views.TareaCRUD, 'tareas')
router.register(r'tiempos', views.TiempoCRUD, 'tiempos')
#router.register(r'sectores', views.SectorCRUD, 'sector')

urlpatterns = [
    path('', include(router.urls)),
    path('ordenes-servicio/', views.OrdenServicioCRUD.as_view({'get':'list', 'post':'create'}), name='ordenes-servicio'),
    path('ordenes-servicio/<int:pk>/', views.OrdenServicioCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='ordenes-servicio-id'),
    path('tareas/', views.TareaCRUD.as_view({'get':'list', 'post':'create'}), name='tareas'),
    path('tareas/<int:pk>/', views.TareaCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='tareas-id'),
    path('sectores/edificios/', views.SectorListCRUD.as_view({'get':'list', 'post':'create'}), name='sectores-list'),
    path('sectores/subsectores/<int:pk>/', views.SectorListCRUD.as_view({'get':'retrieve'}), name='sectores-list-id'),
]
