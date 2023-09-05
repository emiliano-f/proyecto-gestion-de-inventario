from django.db import models
from django.contrib.auth.models import User

ESTADO_CHOICES = (
    ('OK', 'OK'),
    ('En reparación', 'En reparación'),
    ('Mal estado', 'Mal estado'),
)

class TipoHerramienta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32, unique=True)
    descripcion = models.CharField(max_length=256, null=True)

    def __str__(self):
        texto = "{0}"
        return texto.format(self.Nombre)

class Herramienta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32, unique=True)
    tipoHerramienta = models.ForeignKey(TipoHerramienta, on_delete=models.DO_NOTHING)
    codigo = models.CharField(max_length=16, null=True)
    estado = models.CharField(max_length=16, choices=ESTADO_CHOICES, default='OK')

    fechaAlta = models.DateTimeField(auto_now=True)
    observaciones = models.CharField(max_length=255, null=True)
    userAuth = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)

    def __str__(self):
        texto = "{0} [{1}]"
        return texto.format(self.nombre, self.estado)    

class EstadoHerramienta(models.Model):
    herramienta = models.ForeignKey(Herramienta, on_delete=models.DO_NOTHING)
    fecha = models.DateTimeField(auto_now=True)
    estado = models.CharField(max_length=16, choices=ESTADO_CHOICES, default="OK")
    observaciones = models.CharField(max_length=255, null=True)
    userAuth = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
