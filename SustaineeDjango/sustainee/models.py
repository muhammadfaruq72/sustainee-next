from django.db import models

class Background(models.Model):
    name = models.CharField(max_length=500)
    imageFile = models.CharField(max_length=500)
