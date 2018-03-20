from django.shortcuts import render
from .models import Job

# Create your views here.
def home(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/maykjony.html')


def teklif(request):
    return render(request, 'jobs/kahve.html')


def story(request):
    return render(request, 'jobs/simalyes.html')