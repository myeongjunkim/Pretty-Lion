from django.shortcuts import render

# Create your views here.
def view_plg_intro(request):
    return render(request, 'plg_intro.html')

def view_plg_info(request):
    return render(request, 'plg_info.html')