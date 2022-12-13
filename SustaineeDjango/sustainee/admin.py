from django.contrib import admin
from .models import SignUp, CustomUser
# Register your models here.

admin.site.register(SignUp)
admin.site.register(CustomUser)