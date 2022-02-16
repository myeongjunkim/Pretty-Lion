from django.shortcuts import render, redirect

# Create your views here.
def view_plg_intro(request):
    return render(request, 'plg_intro.html')

def view_plg_info(request):
    if request.method == "POST":
        return redirect('plg-qna')
    return render(request, 'plg_info.html')


def view_plg_qna(request):
    return render(request, 'plg_qna.html')