from django.urls import path
from .views import JobListCreate, run_scraper

urlpatterns = [
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
     path('run-scraper/', run_scraper, name='run_scraper'),
     
]
