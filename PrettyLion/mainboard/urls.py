from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', view_index, name="index"),
    path('aboutus/', view_aboutus, name="aboutus"),
    path('create-aboutus/', create_aboutus, name="create_aboutus"),
    
]