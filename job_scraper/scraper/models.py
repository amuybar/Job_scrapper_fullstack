from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField()
    specifications = models.TextField()

    def __str__(self):
        return self.title
      

