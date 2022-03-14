from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('', view_index, name="index"),
    path('aboutus/', view_aboutus, name="aboutus"),
    path('get-aboutus/', get_aboutus, name="get_aboutus"),
    path('create-aboutus/', create_aboutus, name="create_aboutus"),
    path('delete-aboutus/<str:id>', delete_aboutus, name="delete_aboutus"),
    path('detail-aboutus/<str:id>', detail_aboutus, name="detail_aboutus"),
    path('update-aboutus/<str:id>', update_aboutus, name="update_aboutus"),
    path('story/', view_story, name="story"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)