# Generated by Django 4.0.1 on 2022-02-26 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playground', '0006_question_choice_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='mentorroom',
            name='greeting',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
