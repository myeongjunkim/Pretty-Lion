from django.urls import path
from .views import *

urlpatterns = [
    path('', view_plg_intro, name="plg-intro"),
    path('info/', view_plg_info, name="plg-info"),
    path('qna/', view_plg_qna, name="plg-qna"),
    path('mentor-rooms/<int:pk>/', MentorRoomDetailView.as_view(), name='mentor-room-detail'),
    path('mentor-rooms/match/', MentorRoomMatchView.as_view(), name='mentor-room-match'),
]
  