
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class JobScraperConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            "scrape_jobs_group",
            self.channel_name
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "scrape_jobs_group",
            self.channel_name
        )

    def log_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))