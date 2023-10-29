from django.urls import path, include
from rest_framework import routers
from compra import views

router = routers.DefaultRouter()
router.register(r'presupuestos', views.PresupuestoCRUD, 'presupuestos')

urlpatterns = [
    path('', include(router.urls)),
    path('pedidos-insumo/', views.PedidoInsumoCRUD.as_view({'get':'list', 'post':'create'}), name='pedidos-insumo'),
    path('pedidos-insumo/<int:pk>/', views.PedidoInsumoCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='pedidos-insumo-id'),
    path('detalle-pedidos/', views.DetallePedidoCRUD.as_view({'get':'list', 'post':'create'}), name='detalle-pedidos'),
    path('detalle-pedidos/<int:pk>/', views.DetallePedidoCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='detalle-pedidos'),
]
