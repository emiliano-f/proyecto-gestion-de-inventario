from django.urls import path, include
from rest_framework import routers
from inventario import views
from herramienta import views as views_herramienta

router = routers.DefaultRouter()
router.register(r'tipos-insumo', views.TipoInsumoCRUD, 'tipos-insumo')

# Herramienta app
router.register(r'tipos-herramienta', views_herramienta.TipoHerramientaCRUD, 'tipos-herramienta')

urlpatterns = [
        # Herramienta app urls
        path('herramientas/', views_herramienta.HerramientaCRUD.as_view({'get':'list', 'post':'create'}), name='herramientas'),
        path('herramientas/<int:pk>/', views_herramienta.HerramientaCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='herramientas-id'),
        path('estados-herramienta/', views_herramienta.EstadoHerramientaCRUD.as_view({'get':'list', 'post':'create'}), name='estados-herramienta'),
        path('estados-herramienta/<int:pk>/', views_herramienta.EstadoHerramientaCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='estados-herramienta'),
    path('', include(router.urls)),

        # Inventario app urls
        path('insumos/', views.InsumoCRUD.as_view({'get':'list', 'post':'create'}), name='insumos'),
        path('insumos/<int:pk>/', views.InsumoCRUD.as_view({'get':'retrieve','put':'update','delete':'destroy'}), name='insumos-id'),
        path('ajustes-stock/', views.AjusteStockCRUD.as_view({'get':'list', 'post':'create'}), name='ajustes-stock'),
        path('ajustes-stock/<int:pk>/', views.AjusteStockCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='ajustes-stock-id'),
        path('ordenes-retiro/', views.OrdenRetiroCRUD.as_view({'get':'list', 'post':'create'}), name='ordenes-retiro'),
        path('ordenes-retiro/<int:pk>', views.OrdenRetiroCRUD.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'}), name='ordenes-retiro-id'),
]
