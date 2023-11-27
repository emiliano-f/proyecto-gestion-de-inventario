from django.urls import path, include
from rest_framework import routers
from usuario import views

router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioCRUD, 'usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('csrf/', views.get_csrf, name='crsf'),
    path('session/', views.SessionView.as_view(), name='session'),
    path('whoami/', views.WhoAmIView.as_view(), name='whoami'),
]
