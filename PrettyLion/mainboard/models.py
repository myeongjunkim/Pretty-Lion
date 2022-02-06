from django.db import models

# Create your models here.
class AboutUs(models.Model):
    image = models.ImageField(null=True, upload_to="aboutus/", blank=True)
    name = models.CharField(max_length=20)
    aboutu = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name