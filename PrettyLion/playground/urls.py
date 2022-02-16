from django.urls import path

from .views import MentorRoomDetailView, MentorRoomMatchView

urlpatterns = [
    path('mentor-rooms/<int:pk>/', MentorRoomDetailView.as_view(), name='mentor-room-detail'),
    path('mentor-rooms/match/', MentorRoomMatchView.as_view(), name='mentor-room-match'),
]