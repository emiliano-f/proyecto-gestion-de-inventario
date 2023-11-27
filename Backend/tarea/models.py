from datetime import date
from django.core.validators import MinValueValidator
from django.db import models
from usuario.models import Usuario

class Empleado(models.Model):
    dni = models.IntegerField(unique=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    telefono = models.CharField(max_length=255)
    mail = models.EmailField()

    class CategoriaScale(models.TextChoices):
        CAT1 = "1"
        CAT2 = "2"
        CAT3 = "3"
        CAT4 = "4"
        CAT5 = "5"
        CAT6 = "6"
        CAT7 = "7"
        CONTRATADO = "CONTRATADO"
    
    categoria = models.CharField(max_length=15,
                                 choices=CategoriaScale.choices,
                                 default=CategoriaScale.CAT1)

class Sector(models.Model):
    class EdificioScale(models.TextChoices):
        AULAS = 'AULAS'
        DETI_I = 'DETI I'
        DETI_II = 'DETI II'
        GOBIERNO = 'GOBIERNO'
        ARQUITECTURA = 'ARQUITECTURA'

    id = models.AutoField(primary_key=True)
    edificio = models.CharField(
        max_length = 12,
        choices= EdificioScale.choices
    )
    nombre = models.CharField(max_length=30)

class OrdenServicio(models.Model):

    class CaracterScale(models.TextChoices):
        CRITICO = "CRITICO"
        URGENTE = "URGENTE"
        NORMAL = "NORMAL"
    class CategoriaScale(models.TextChoices):
        MODIFICACION = "MODIF/ADEC"
        FABRICACION = "FABRICACION"
        TRASLADOS = "TRASLADOS"
    class StatusScale(models.TextChoices):
        EN_ESPERA = "EN_ESPERA"
        FINALIZADA = "FINALIZADA"
        EN_PROGRESO = "EN_PROGRESO"
        RECHAZADA = "RECHAZADA"
        APROBADA = "APROBADA"


    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey("usuario.Usuario", verbose_name=("Id del usuario"), on_delete=models.DO_NOTHING)
    tarea = models.ForeignKey("tarea.Tarea", verbose_name=(""), on_delete=models.DO_NOTHING, null=True)
    fechaGeneracion = models.DateField(auto_now=True)
    descripcion = models.CharField(max_length=255, null=True)
    fechaNecesidad = models.DateField(
            validators=[MinValueValidator(limit_value=date.today())],
            help_text='Fecha debe ser igual o posterior a la actual'
    )
    comentario = models.CharField(max_length=255, null=True)

    prioridad = models.CharField(
        max_length=15,
        choices=CaracterScale.choices,
        default=CaracterScale.NORMAL
    )
    categoria = models.CharField(
        max_length=15,
        choices=CategoriaScale.choices,
        default=CategoriaScale.MODIFICACION
    )
    estado = models.CharField(
        max_length = 15,
        choices= StatusScale.choices,
        default= StatusScale.EN_ESPERA
    )
    sector = models.ForeignKey(Sector, on_delete=models.DO_NOTHING)
    
class EncuestaSatisfaccion(models.Model):
    class SatisfactionScale(models.TextChoices):
        EXCELENTE = "Excelente"
        BUENO = "Bueno"
        DEFICIENTE = "Deficiente"
        MALO = "Malo"
        INDEFINIDO = "Indefinido"
    class ResponseTimeScale(models.TextChoices):
        EXCELENTE = "Excelente"
        BUENO = "Bueno"
        DEFICIENTE = "Deficiente"
        MALO = "Malo"
        INDEFINIDO = "Indefinido"

    ordenServicio = models.ForeignKey(OrdenServicio, on_delete=models.DO_NOTHING)
    satisfaccion = models.CharField(
        max_length=15,
        choices=SatisfactionScale.choices,
        default=SatisfactionScale.INDEFINIDO
    )
    tiempoRespuesta = models.CharField(
        max_length=15,
        choices=ResponseTimeScale.choices,
        default=ResponseTimeScale.INDEFINIDO
    )
    observaciones = models.CharField(max_length=255, null=True)

class Tarea(models.Model):

    class TypeScale(models.TextChoices):
        PREVENTIVO = "Preventivo"
        CORRECTIVO = "Correctivo"
        MEJORA = "Mejora"
        PRODUCCION = "Produccion"

    class ClassificationScale(models.TextChoices):
        SANITARIOS = "Sanitarios"
        ELECTRICIDAD = "Electricidad"
        ALBAÑILERIA = "Albañileria"
        CARPINTERIA = "Carpinteria"
        REFRIGERACION = "Refrig/Calefacc"
        GAS = "Gas"
        MECANICA = "Mecanica"
        SYM = "S&M"
        PINTURA = "Pintura"
        JARDINERIA = "Jardineria"
        METALURGIA = "Metalurgia"
        AGUA = "Agua/Cloacas"
        OTROS = "Otros"


    id = models.AutoField(primary_key=True)
    empleados = models.ManyToManyField(Empleado, through='Tiempo', blank=True)
    #legajo = models.IntegerField(unique=True)
    tipo = models.CharField(
        max_length=15,
        choices=TypeScale.choices,
    )
    descripcion = models.CharField(max_length=255, null=True)
    
    fechaTentativa = models.DateField(
            validators=[MinValueValidator(limit_value=date.today())],
            help_text='Fecha debe ser igual o posterior a la actual'
    )
    
    fechaInicio = models.DateField(
            validators=[MinValueValidator(limit_value=date.today(),
                                          message='Fecha debe ser igual o posterior a la actual')],
            null=True
    )
    fechaFin = models.DateField(
            validators=[MinValueValidator(limit_value=date.today(),
                                          message='Fecha debe ser igual o posterior a la actual')],
            null=True
    )
    herramientas = models.ManyToManyField("herramienta.Herramienta", blank=True)
    clasificacion = models.CharField(
            max_length=15,
            choices=ClassificationScale.choices
    )
    userAuth = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING, null=True)

class Tiempo(models.Model):

    class CategoryScale(models.TextChoices):
        SI = "Si"
        NO = "No"

    tarea = models.ForeignKey(Tarea, on_delete=models.DO_NOTHING)
    empleado = models.ForeignKey(Empleado, on_delete=models.DO_NOTHING)
    horasEstimadas = models.IntegerField(
            validators=[MinValueValidator(0,
                        message='El valor no puede ser menor a cero')],
            null=True
    )
    horasTotales = models.IntegerField(
            validators=[MinValueValidator(0,
                        message='El valor no puede ser menor a cero')],
            null=True
    )
    responsable = models.CharField(
            max_length=2,
            choices=CategoryScale.choices,
            default=CategoryScale.NO
    )
