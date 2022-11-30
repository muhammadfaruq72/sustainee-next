import strawberry
from strawberry import auto
from typing import List
from . import models

@strawberry.django.type(models.Background)
class Background:
  name: auto
  imageFile: auto