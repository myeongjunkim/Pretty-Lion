from django.shortcuts import render
from django.views.generic import DetailView

from .models import Room


class RoomDetailView(DetailView):
    '''
    context variable: object_list
    template file: room_detail.html
    '''
    model = Room



