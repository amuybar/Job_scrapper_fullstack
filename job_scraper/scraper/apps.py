# apps.py in the 'scraper' app

from django.apps import AppConfig

class ScraperConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'scraper'

    def ready(self):
        import scraper.signals
