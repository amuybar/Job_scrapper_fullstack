from rest_framework import generics

from scraper.utils import scrape_jobs
from .models import Job
from .serializers import JobSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


class JobListCreate(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    

    
@api_view(['POST'])
def run_scraper(request):
    scrape_jobs()
    return Response({"status": "Scraping initiated"})