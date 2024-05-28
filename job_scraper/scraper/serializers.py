
from rest_framework import serializers
from .models import Job,UserProfile


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['full_name', 'phone_number', 'resume', 'cover_letter', 'linkedin_profile', 'portfolio_website']

