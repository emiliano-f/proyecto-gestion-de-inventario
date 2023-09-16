from django.urls import path, include
from rest_framework import routers
from inventario import views
from herramienta import views as views_herramienta

router = routers.DefaultRouter()
router.register(r'tipos-insumo', views.TipoInsumoCRUD, 'tipos-insumo')
#router.register(r'insumos', views.InsumoCRUD, 'insumos')
router.register(r'ordenes-retiro', views.OrdenRetiroCRUD, 'ordenes-retiro')
router.register(r'ajustes-stock', views.AjusteStockCRUD, 'ajustes-stock')

# Herramienta app
router.register(r'tipos-herramienta', views_herramienta.TipoHerramientaCRUD, 'tipos-herramienta')
#router.register(r'herramientas', views_herramienta.HerramientaCRUD, 'herramientas')
router.register(r'estado-herramientas', views_herramienta.EstadoHerramientaCRUD, 'estado-herramientas')

urlpatterns = [
        path('insumos/', views.InsumoCRUD.as_view({'get':'list', 'post':'create'}), name='insumos'),
        path('insumos/<int:pk>/', views.InsumoCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='insumos-id'),
        path('herramientas/', views_herramienta.HerramientaCRUD.as_view({'get':'list', 'post':'create'}), name='herramientas'),
        path('herramientas/<int:pk>/', views_herramienta.HerramientaCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='herramientas-id'),
    path('', include(router.urls)),
]
