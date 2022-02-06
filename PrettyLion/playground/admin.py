from django.contrib import admin, messages

from .models import Room, Mentee

import logging
logger = logging.getLogger('django.server')


class MenteeReadOnlyInline(admin.TabularInline):
    model = Mentee
    readonly_fields = ('mentee', 'room')

    def has_change_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class RoomAdmin(admin.ModelAdmin):
    model = Room
    readonly_fields = ('mentor', 'limit')
    inlines = (MenteeReadOnlyInline,)

    def save_model(self, request, obj, form, change):
        # update
        if obj.id:
            super().save_model(request, obj, form, change)
        # create
        else:
            room = Room.objects.filter(mentor=request.user).exists()
            if room:
                messages.add_message(request, messages.ERROR, "이미 만든 방이 있어요. >_^")
            else:
                logger.info(f'[New Room Info] name: {obj.name} limit: {obj.limit}')
                obj.mentor = request.user
                super().save_model(request, obj, form, change)


admin.site.register(Room, RoomAdmin)
