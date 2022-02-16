from django.shortcuts import render,redirect
from django.contrib import auth
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
def signup(request):
    if request.method == 'POST' or request.method == "FILES":
            if request.POST['password'] == request.POST['password_check']:
                if request.POST.get("mento_selection") == "mento":
                    is_mento = True
                else:
                    is_mento = False

                user = User.objects.create_user(
                username =request.POST["username"],
                password =request.POST['password'],
                nickname =request.POST['nickname'],
                bio=request.POST['bio'],
                profile_photo =request.FILES['profile_photo'],
                is_staff  =is_mento)

                auth.login(request, user)
                return redirect('index')
            else:
                return render(request, "signup.html", {'password_error'
                                                       : "비밀번호를 잘 못 입력하셨습니다!"})
    else:
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
            return render(request, 'login.html', {"login_error" : "error"})
    else:
        return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect(request, 'index')

