from django.urls import path, include
from rest_framework import routers
from tarea import views


router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoCRUD, 'empleados')
#router.register(r'ordenes-servicio', views.OrdenServicioCRUD, 'ordenes-servicio')
router.register(r'encuestas-satisfaccion', views.EncuestaSatisfaccionCRUD, 'encuestas-satisfaccion')
router.register(r'tareas', views.TareaCRUD, 'tareas')


urlpatterns = [
    path('', include(router.urls)),
    path('ordenes-servicio/', views.OrdenServicioCRUD.as_view({'get':'list', 'post':'create'}), name='ordenes-servicio'),
    path('ordenes-servicio/<int:pk>/', views.OrdenServicioCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='ordenes-servicio-id'),
    #MAQUETA#
    path('edificio/',views.EdificioCRUD.as_view({'get':'list'}),name="edificio"),
    #path('sector/')
    path('sector/<int:edificio_id>',views.SectorCRUD.as_view({'get':'retrieve'}),name="sector")
    #FIN MAQUETA#
]

