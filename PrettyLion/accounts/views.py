from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth.models import User

# Create your views here.
def signup(request):
    return render(request, 'signup.html')

def login(request):
    if request.method == "POST":
        userid = request.POST['username']
        pw = request.POST['password']
        user = auth.authenticate(request, username=userid, password=pw)
        if user is not None:
            auth.login(request, user)
            return redirect('index')
        else:
            return render(request, 'login.html')
    else:
        return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect(request, 'index')

