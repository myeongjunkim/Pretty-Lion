from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=64)
    limit = models.PositiveSmallIntegerField(blank=True)
    chat_url = models.URLField()
#    mento = models.OneToOneField(AUTH_USER_MODEL)
