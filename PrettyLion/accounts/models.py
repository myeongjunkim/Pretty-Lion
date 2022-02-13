from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    nickname = models.CharField(max_length=20)
    grade = models.PositiveSmallIntegerField
    age: models.PositiveSmallIntegerField
    profile_photo = models.ImageField(blank=False, null=True, upload_to="accounts_photo/")
    bio = models.CharField(max_length=30)
    realname = models.CharField(max_length=15)
    major = models.CharField(max_length=15)


# Create your models here.
