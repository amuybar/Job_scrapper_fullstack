from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    specifications = models.TextField()
    

    def __str__(self):
        return self.title
      

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    resume = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField(blank=True, null=True)
    linkedin_profile = models.URLField(blank=True, null=True)
    portfolio_website = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return self.full_name