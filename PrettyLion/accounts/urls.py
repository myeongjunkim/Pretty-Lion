from django.urls import path
from . import views
from django.conf import settings
from  django.conf.urls.static import static

urlpatterns = [
    path('login/', views.login, name="login"),
    path("signup/", views.signup, name="signup"),
    path("logout", views.logout, name="logout"),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
