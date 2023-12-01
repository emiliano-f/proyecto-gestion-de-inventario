from django.db import models
from usuario.models import Usuario

class StatusScale(models.TextChoices):
    DISPONIBLE = 'Disponible'
    EN_USO = 'En uso'
    EN_REPARACION = 'En reparación'
    MAL_ESTADO = 'En mal estado'
    ELIMINADA = 'Eliminada'

class TipoHerramienta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32, unique=True)
    descripcion = models.CharField(max_length=256, null=True)
    userAuth = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING, null=True)

    def __str__(self):
        texto = "{0}"
        return texto.format(self.Nombre)

class Herramienta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32)
    tipoHerramienta = models.ForeignKey(TipoHerramienta, on_delete=models.DO_NOTHING)
    codigo = models.CharField(max_length=16, null=True)

    fechaAlta = models.DateField(auto_now_add=True)
    observaciones = models.CharField(max_length=255, null=True)
    estado = models.CharField(max_length=15, choices=StatusScale.choices, default=StatusScale.DISPONIBLE)
    userAuth = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('nombre', 'codigo')

    def __str__(self):
        texto = "{0} [{1}]"
        return texto.format(self.descripcion, self.estado)    
    
    def is_available(self):
        return self.estado == StatusScale.DISPONIBLE

class EstadoHerramienta(models.Model):
    herramienta = models.ForeignKey(Herramienta, on_delete=models.DO_NOTHING)
    fecha = models.DateField(auto_now_add=True)
    estado = models.CharField(max_length=16, choices=StatusScale.choices, default=StatusScale.DISPONIBLE)
    observaciones = models.CharField(max_length=255, null=True)
    userAuth = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING, null=True)
