from django.urls import path

from .views import RoomDetailView

urlpatterns = [
    path('room/<int:pk>/', RoomDetailView.as_view(), name='room-detail'),
]