import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from django.urls import path
from scraper.consumers import JobScraperConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'job_scrapper.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/scrape-jobs/', JobScraperConsumer.as_asgi()),
        ])
    ),
})
