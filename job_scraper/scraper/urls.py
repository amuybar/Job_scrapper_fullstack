from django.urls import path
from .views import JobListCreate, run_scraper, login, signup, user_details, UserProfileView, forgot_password, reset_password
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('jobs/', JobListCreate.as_view(), name='job-list-create'),
    path('run-scraper/', run_scraper, name='run_scraper'),
    path('login/', login),
    path('signup/', signup),
    path('user/', user_details),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('forgot-password/', forgot_password, name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', reset_password, name='reset_password'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]