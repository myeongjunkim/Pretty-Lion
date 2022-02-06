from django.contrib import admin, messages

from .models import Room

import logging
logger = logging.getLogger('django.server')


class RoomAdmin(admin.ModelAdmin):
    readonly_fields = ('mentor', 'limit')

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
