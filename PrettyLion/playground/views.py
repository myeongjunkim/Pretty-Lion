from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from .models import MentorRoom, Mentee


class MentorRoomDetailView(DetailView, LoginRequiredMixin):
    '''
    context variable: object_list
    template file: mentorroom_detail.html
    '''
    model = MentorRoom


class MentorRoomMatchView(ListView, LoginRequiredMixin):
    model = MentorRoom
    template_name = 'playground/mentorroom_match.html'
    paginate_by = 3

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data()
        return context
