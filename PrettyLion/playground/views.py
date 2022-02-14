from django.shortcuts import render

# Create your views here.
def view_playground_intro(request):
    return render(request, 'playground_intro.html')

def view_playground_info(request):
    return render(request, 'playground_info.html')