from django.shortcuts import render, redirect
from .models import AboutUs

# Create your views here.
def view_index(request):
    return render(request, 'index.html')

def view_aboutus(request):
    aboutus_data = AboutUs.objects.all()
    return render(request, 'aboutus.html', {"aboutus_data":aboutus_data})

def create_aboutus(request):
    if request.method == "POST":
        new_aboutus = AboutUs()
        new_aboutus.image = request.FILES['aboutus_image']
        new_aboutus.name = request.POST['aboutus_name']
        new_aboutus.aboutu = request.POST['aboutus_aboutu']
        new_aboutus.user = request.user
        new_aboutus.save()
        return redirect('aboutus')

def delete_aboutus(request, id):
    delete_aboutus = AboutUs().objects.get(id= id)
    delete_aboutus.delete()
    return redirect('aboutus')

    