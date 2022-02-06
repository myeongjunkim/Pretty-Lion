from django.db import models
from django.contrib.auth import get_user_model

from .constants import NUMBER_OF_MENTEE, NUMBER_OF_MENTO


def set_limit():
    if Room.is_extra_room_left():
        return Room.CAPACITY + 1
    else:
        return Room.CAPACITY


class Room(models.Model):
    CAPACITY = NUMBER_OF_MENTEE // NUMBER_OF_MENTO
    EXTRA_ROOM = NUMBER_OF_MENTEE % NUMBER_OF_MENTO

    name = models.CharField(max_length=64)
    limit = models.PositiveSmallIntegerField(default=set_limit, blank=True)
    chat_url = models.URLField()
    mentor = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, blank=True)

    def delete(self, using=None, keep_parents=False):
        super().delete(using, keep_parents)

    @staticmethod
    def is_extra_room_left():
        count = Room.objects.filter(limit=Room.CAPACITY + 1).count()
        return True if Room.EXTRA_ROOM > count else False

    def __str__(self):
        return f"{self.name} ({self.mentor if hasattr(self, 'mentor') else 'None'})"


class Mentee(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    mentee = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
