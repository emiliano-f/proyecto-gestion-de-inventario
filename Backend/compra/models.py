from django.db import models
from django.contrib.auth.models import User

class PedidoInsumo(models.Model):
    id = models.AutoField(primary_key=True);
    fechaHora = models.DateTimeField(auto_now=True)
    observaciones = models.CharField(max_length=255, null=True)

class Presupuesto(models.Model):

    class StatusScale(models.TextChoices):
        SI = 'Si'
        NO = 'No'

    id = models.AutoField(primary_key = True)
    #imagen = models.ImageField(upload_to="images/")
    fecha = models.DateField()
    proveedor = models.CharField(max_length = 255)
    total = models.FloatField()
    aprobado = models.CharField(max_length=2, choices=StatusScale.choices)
    pedidoInsumo = models.ForeignKey(PedidoInsumo, on_delete=models.DO_NOTHING)
    userAuth = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)

class DetallePedido(models.Model):
    id = models.AutoField(primary_key = True)
    pedidoInsumo = models.ForeignKey(PedidoInsumo, on_delete=models.DO_NOTHING)
    insumo = models.ForeignKey("inventario.Insumo", on_delete=models.DO_NOTHING)
    cantidad = models.IntegerField()
    observacion = models.CharField(max_length=255, null=True)
