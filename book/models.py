from django.db import models

# Create your models here.

class Book(models.Model):
    
    title = models.CharField(max_length=120)
    author = models.CharField(max_length=120)
    publisher = models.CharField(max_length=120)
    price = models.DecimalField(decimal_places=2,max_digits=20)


