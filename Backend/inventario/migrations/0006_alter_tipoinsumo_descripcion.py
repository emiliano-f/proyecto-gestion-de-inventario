# Generated by Django 4.2.2 on 2023-09-30 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventario', '0005_merge_20230930_0226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tipoinsumo',
            name='descripcion',
            field=models.CharField(editable=False, max_length=256, null=True),
        ),
    ]
