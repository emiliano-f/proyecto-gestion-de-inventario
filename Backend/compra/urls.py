from django.urls import path, include
from rest_framework import routers
from compra import views

router = routers.DefaultRouter()
#router.register(r'pedidos-insumo', views.PedidoInsumoCRUD, 'pedidos-insumo')
router.register(r'presupuestos', views.PresupuestoCRUD, 'presupuestos')
#router.register(r'detalle-pedidos', views.DetallePedidoCRUD, 'detalle-pedidos')

urlpatterns = [
    path('', include(router.urls)),
    path('pedidos-insumo/', views.PedidoInsumoCRUD.as_view({'get':'list', 'post':'create'}), name='pedidos-insumo'),
    path('pedidos-insumo/<int:pk>/', views.PedidoInsumoCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='pedidos-insumo-id'),
]
