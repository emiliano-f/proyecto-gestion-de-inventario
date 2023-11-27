"""
URL configuration for settings project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from . import auxs_fn

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inventario/', include('inventario.urls')),
    path('compra/', include('compra.urls')),
    path('tarea/', include('tarea.urls')),
    path('usuario/', include('usuario.urls')),
    path('models-info/', auxs_fn.get_models, name='models-info'),
    path('enabled-methods/', auxs_fn.enabled_methods, name='enabled-methods'),
    path('table-enums/', auxs_fn.enums_models, name='table-enums'),
    path('docs/', include_docs_urls(title='API docs')),
]
