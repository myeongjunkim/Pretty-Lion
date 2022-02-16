from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.


class AboutUs(models.Model):
    image = models.ImageField(null=True, upload_to="aboutus/", blank=True)
    name = models.CharField(max_length=20)
    aboutu = models.TextField()
    # have to add user foreignkey
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, blank=True)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
