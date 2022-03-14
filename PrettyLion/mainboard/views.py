import json
from django.shortcuts import render, redirect, get_object_or_404
from .models import AboutUs
from django.http.response import JsonResponse
import json

# Create your views here.
def view_index(request):
    return render(request, 'index.html')

def view_aboutus(request):
    
    aboutus_data = AboutUs.objects.all()
    return render(request, 'aboutus.html', {"aboutus_data":aboutus_data})

def get_aboutus(request):
    aboutus_data = AboutUs.objects.values()
    return JsonResponse(list(aboutus_data), safe=False)

def create_aboutus(request):
    if not request.user.is_authenticated:
        return redirect('login')
    if AboutUs.objects.filter(user=request.user).exists():
        print("중복 생성 금지")
        return redirect('aboutus')
    
    if request.method == "POST":
        new_aboutus = AboutUs()
        if request.FILES['aboutus_image']:
            new_aboutus.image = request.FILES['aboutus_image']
        if request.FILES['aboutus_pdf']:
            new_aboutus.pdf = request.FILES['aboutus_pdf']
        new_aboutus.name = request.POST['aboutus_name']
        # new_aboutus.aboutu = request.POST['aboutus_aboutu']
        new_aboutus.user = request.user
        new_aboutus.save()
        return redirect('story')

def delete_aboutus(request, id):
    delete_aboutus = get_object_or_404(AboutUs, pk = id)
    delete_aboutus.delete()
    return redirect('aboutus')

def update_aboutus(request, id):
    update_aboutus = get_object_or_404(AboutUs, pk = id)
    if request.method == "POST":
        if request.FILES:
            update_aboutus.image = request.FILES['aboutus_image']
        update_aboutus.name = request.POST['aboutus_name']
        update_aboutus.aboutu = request.POST['aboutus_aboutu']
        update_aboutus.save()
        return redirect('aboutus')

def detail_aboutus(request, id):
    aboutus = get_object_or_404(AboutUs, pk = id)
    return render(request, 'aboutus_detail.html', {"aboutus":aboutus})
    
def view_story(request):
    return render(request, 'story.html')
