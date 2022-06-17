# Generated by Django 4.0.5 on 2022-06-15 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('author', models.CharField(max_length=120)),
                ('publisher', models.CharField(max_length=120)),
                ('price', models.DecimalField(decimal_places=2, max_digits=20)),
            ],
        ),
    ]
