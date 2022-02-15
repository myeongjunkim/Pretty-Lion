from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', view_plg_intro, name="plg-intro"),
    path('info/', view_plg_info, name="plg-info"),

    
]