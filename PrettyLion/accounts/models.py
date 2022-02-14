from django.contrib.auth.models import AbstractUser
from django.db import models




class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    grade = models.SmallIntegerField(default=0)
    age: models.SmallIntegerField(default=0)
    profile_photo = models.ImageField(blank=True, null=True, upload_to="accounts_photo/")
    bio = models.CharField(max_length=30, blank=True)
    realname = models.CharField(max_length=15, blank=True)
    major = models.CharField(max_length=15, blank=True)



# Create your models here.
