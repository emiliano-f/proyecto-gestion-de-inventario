from django.urls import path, include
from rest_framework import routers
from inventario import views

router = routers.DefaultRouter()
router.register(r'tipos-insumo', views.TipoInsumoCRUD, 'tipos-insumo')
router.register(r'insumos', views.InsumoCRUD, 'insumos')
router.register(r'tipos-herramienta', views.TipoHerramientaCRUD, 'tipos-herramienta')
router.register(r'herramientas', views.HerramientaCRUD, 'herramientas')
router.register(r'ordenes-retiro', views.OrdenRetiroCRUD, 'ordenes-retiro')
router.register(r'ajustes-stock', views.AjusteStockCRUD, 'ajustes-stock')
router.register(r'estado-herramientas', views.EstadoHerramientaCRUD, 'estado-herramientas')

urlpatterns = [
    path('', include(router.urls)),
]
