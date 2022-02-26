from django.shortcuts import render, redirect, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView
from django.views.generic.edit import ModelFormMixin, ProcessFormView

from .models import MentorRoom, Question, Answer


def view_plg_intro(request):
    return render(request, 'plg_intro.html')


def view_plg_info(request):
    if request.method == "POST":
        return redirect('plg-qna')
    return render(request, 'plg_info.html')


def view_plg_qna(request):
    return render(request, 'plg_qna.html')

def view_plg_qna_last(request):
    return render(request, 'plg_qna_last.html')

def view_plg_choice(request):
    return render(request, 'plg_choice.html')

def view_plg_room(request):
    return render(request, 'plg_room.html')


class MentorRoomDetailView(LoginRequiredMixin, DetailView):
    """
    template file: playground/mentorroom_detail.html
    """
    model = MentorRoom


class MentorRoomMatchView(LoginRequiredMixin, ListView):
    """
    context variable: object_list
    template file: playground/mentorroom_match.html
    """
    model = MentorRoom
    template_name = 'playground/mentorroom_match.html'
    paginate_by = 3
    WEIGHT = 4

    def get_context_data(self, *, object_list=None, **kwargs):
        # join mentor room, mentor
        mentor_room_list = MentorRoom.objects.all().prefetch_related('mentor', 'mentor__answer_set')
        context = super(MentorRoomMatchView, self).get_context_data(object_list=mentor_room_list, ** kwargs)
        context['matching_temperature'] = self.calculate_matching_score(mentor_room_list)
        return context

    def calculate_matching_score(self, mentor_room_list):
        user_answers = set(self.request.user.answer_set.values_list('choice', flat=True))
        matching_score = {}
        for mentor_room in mentor_room_list:
            score = len(set(user_answers).intersection(mentor_room.mentor.answer_set.values_list('choice', flat=True)))
            matching_score[mentor_room.id] = self.convert_temperature(score)
        return matching_score

    def convert_temperature(self, score):
        return 36 + (score * self.WEIGHT)


class QuestionDetailView(LoginRequiredMixin, DetailView):
    """
      context variable: object_list
      template file: playground/question_detail.html
    """
    model = Question

    def get_object(self, queryset=None):
        return Question.objects.get(order=self.kwargs.get("order"))


class AnswerCreateUpdateView(LoginRequiredMixin, ModelFormMixin, ProcessFormView):
    model = Answer
    fields = ['choice']

    def get_object(self, queryset=None):
        try:
            return super().get_object(queryset)
        except AttributeError:
            return None

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        """Returns the url to access next question."""
        return reverse('question-detail', kwargs={"order": self.object.choice.question.order + 1})
