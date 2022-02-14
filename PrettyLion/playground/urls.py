from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', view_playground_intro, name="playground-intro"),
    path('info/', view_playground_info, name="playground-info"),

    
]