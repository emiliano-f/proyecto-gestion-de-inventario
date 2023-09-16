# Generated by Django 4.2.2 on 2023-09-04 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('legajo', models.IntegerField(unique=True)),
                ('nombre', models.CharField(max_length=255)),
                ('apellido', models.CharField(max_length=255)),
                ('cargo', models.CharField(max_length=255, null=True)),
                ('mail', models.EmailField(max_length=254)),
                ('telefono', models.CharField(max_length=255)),
            ],
        ),
    ]
