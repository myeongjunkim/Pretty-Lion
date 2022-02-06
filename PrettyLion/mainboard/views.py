from django.shortcuts import render

# Create your views here.
def view_index(request):
    return render(request, 'index.html')

def view_aboutus(request):
    return render(request, 'aboutus.html')

def create_aboutus(request):
    pass
