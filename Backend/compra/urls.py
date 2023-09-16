from django.urls import path, include
from rest_framework import routers
from compra import views

router = routers.DefaultRouter()
router.register(r'pedidos-insumo', views.PedidoInsumoCRUD, 'pedidos-insumo')
router.register(r'presupuestos', views.PresupuestoCRUD, 'presupuestos')
router.register(r'detalle-pedidos', views.DetallePedidoCRUD, 'detalle-pedidos')

urlpatterns = [
    path('', include(router.urls)),
]
