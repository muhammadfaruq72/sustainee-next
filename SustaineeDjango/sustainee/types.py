import strawberry
from strawberry import auto
from typing import List
from . import models
from django.contrib.auth import get_user_model

@strawberry.django.type(models.Background)
class Background:
  name: auto
  imageFile: auto

@strawberry.django.type(models.Upscaler)
class Upscaler:
  name: auto
  imageFile: auto

@strawberry.django.filters.filter(models.SignUp, lookups=True)
class SignUpFilter:
    id: auto

@strawberry.django.type(models.SignUp, filters=SignUpFilter)
class SignUp:
  id: auto
  email: auto
  password: auto

@strawberry.django.input(models.SignUp)
class SignUpInput:
  id: auto
  email: auto
  password: auto

@strawberry.django.input(models.SignUp, partial=True)
class SignUpPartialInput():
    id: auto
    email: auto
    password: auto