# Generated by Django 4.2.2 on 2023-09-30 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tarea', '0004_alter_ordenservicio_comentario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordenservicio',
            name='comentario',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
