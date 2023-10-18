from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class ActionScale(models.TextChoices):
    SUMAR = 'Sumar'
    RESTAR = 'Restar'

class TipoInsumo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=32, unique=True)
    descripcion = models.CharField(max_length=256, null=True)

    def __str__(self):
        texto = "{0}"
        return texto.format(self.nombre)

class Insumo(models.Model):

    class MeasuresScale(models.TextChoices):
        METRO = 'Metro'
        LITRO = 'Litro'
        GRAMO = 'Gramo'
        CONTABLE = 'Contable'

    class StatusScale(models.TextChoices):
        OK = 'Ok'
        ELIMINADO = 'Eliminado'
        SUSPENDIDO = 'Suspendido'
        
    id = models.AutoField(primary_key=True)
    tipoInsumo = models.ForeignKey(TipoInsumo, on_delete=models.DO_NOTHING)
    nombre = models.CharField(max_length=32)
    unidadMedida = models.CharField(max_length=16, choices=MeasuresScale.choices, default=MeasuresScale.CONTABLE)
    cantidad = models.IntegerField(validators=[MinValueValidator(0, message='El valor no puede ser menor a cero')])
    codigo = models.CharField(max_length=16, null=True)
    observaciones = models.CharField(max_length=256, null=True)
    puntoReposicion = models.IntegerField(validators=[MinValueValidator(0, message='El valor no puede ser menor a cero')],
                                          null=True)
    estado = models.CharField(max_length=15, choices=StatusScale.choices, default=StatusScale.OK)

    def __str__(self):
        texto = "{0} ({1})"
        return texto.format(self.tipoInsumo, self.cantidad)

    def update_quantity(self, cantidad, accion=ActionScale.SUMAR):
        if accion == ActionScale.SUMAR:
            self.cantidad += abs(cantidad)
        elif accion == ActionScale.RESTAR:
            self.cantidad -= abs(cantidad)
        else:
            raise Exception("Acción desconocida sobre cantidad")

class OrdenRetiro(models.Model):
    id = models.AutoField(primary_key=True)
    insumo = models.ForeignKey(Insumo, on_delete=models.DO_NOTHING)
    tarea = models.ForeignKey('tarea.Tarea', on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField(validators=[MinValueValidator(1, message='El valor no puede ser menor a uno')])
    fechaHora = models.DateTimeField(auto_now=True)

    def __str__(self):
        texto = "{0} ({1})"
        return texto.format(self.id, self.cantidad)

class AjusteStock(models.Model):

    id = models.AutoField(primary_key=True)
    insumo = models.ForeignKey(Insumo, on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField()
    observaciones = models.CharField(max_length=256)
    fecha = models.DateTimeField(auto_now=True)
    accionCantidad = models.CharField(max_length=6, choices=ActionScale.choices)
    userAuth = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
