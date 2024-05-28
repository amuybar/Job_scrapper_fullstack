from django.urls import path
from .views import JobListCreate, run_scraper,login, signup,user_details,UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
     path('run-scraper/', run_scraper, name='run_scraper'),
    path('login/', login),
    path('signup/', signup),
    path('user/', user_details),
     path('profile/', UserProfileView.as_view(), name='user-profile'),
      path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     
]
