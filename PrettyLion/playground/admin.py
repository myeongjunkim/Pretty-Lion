from django.contrib import admin, messages

from .models import MentorRoom, Mentee, Question, Choice, Answer

import logging
logger = logging.getLogger('django.server')


class MenteeReadOnlyInline(admin.TabularInline):
    model = Mentee
    readonly_fields = ('user', 'mentor_room')

    def has_change_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False


class MentorRoomAdmin(admin.ModelAdmin):
    model = MentorRoom
    readonly_fields = ('mentor', 'limit')
    inlines = (MenteeReadOnlyInline,)

    def save_model(self, request, obj, form, change):
        # update
        if obj.id:
            super().save_model(request, obj, form, change)
        # create
        else:
            mentor_room = MentorRoom.objects.filter(mentor=request.user).exists()
            if mentor_room:
                messages.add_message(request, messages.ERROR, "이미 만든 방이 있어요. >_^")
            else:
                logger.info(f'[New MentorRoom Info] name: {obj.name} limit: {obj.limit}')
                obj.mentor = request.user
                super().save_model(request, obj, form, change)


class ChoiceInline(admin.TabularInline):
    model = Choice


class QuestionAdmin(admin.ModelAdmin):
    inlines = (ChoiceInline,)


admin.site.register(MentorRoom, MentorRoomAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
