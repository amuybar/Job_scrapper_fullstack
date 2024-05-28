from django.urls import path
from .views import JobListCreate, run_scraper,login, signup,user_details

urlpatterns = [
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
     path('run-scraper/', run_scraper, name='run_scraper'),
    path('login/', login),
    path('signup/', signup),
    path('user/', user_details),
     
]
