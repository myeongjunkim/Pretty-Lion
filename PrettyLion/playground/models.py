from django.db import models
from django.contrib.auth import get_user_model
from django.shortcuts import reverse

from .constants import NUMBER_OF_MENTEE, NUMBER_OF_MENTO


def set_limit():
    if MentorRoom.is_extra_mentor_room_left():
        return MentorRoom.CAPACITY + 1
    else:
        return MentorRoom.CAPACITY


class MentorRoom(models.Model):
    CAPACITY = NUMBER_OF_MENTEE // NUMBER_OF_MENTO
    EXTRA_ROOM = NUMBER_OF_MENTEE % NUMBER_OF_MENTO

    name = models.CharField(max_length=64)
    limit = models.PositiveSmallIntegerField(default=set_limit, blank=True)
    chat_url = models.URLField()
    mentor = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, blank=True)

    def delete(self, using=None, keep_parents=False):
        super().delete(using, keep_parents)

    @staticmethod
    def is_extra_mentor_room_left():
        count = MentorRoom.objects.filter(limit=MentorRoom.CAPACITY + 1).count()
        return True if MentorRoom.EXTRA_ROOM > count else False

    def __str__(self):
        return f"{self.name} ({self.mentor if hasattr(self, 'mentor') else 'None'})"

    def get_absolute_url(self):
        return reverse("mentor-room-detail", kwargs={"pk": self.pk})


class Mentee(models.Model):
    mentor_room = models.ForeignKey(MentorRoom, on_delete=models.CASCADE)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f"mentor: {self.mentor_room.mentor} mentee: {self.user}"


class Question(models.Model):
    text = models.CharField(max_length=128)
    order = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.order}. {self.text}"

    def get_absolute_url(self):
        return reverse("question-detail", kwargs={"order": self.order})


class Choice(models.Model):
    text = models.CharField(max_length=128)
    emoji = models.CharField(max_length=32)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.text}"


class Answer(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}: {self.choice.question.order}-{self.choice.text}"
