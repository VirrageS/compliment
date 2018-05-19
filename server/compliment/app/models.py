from django.db import models
from django.contrib.gis.db.models import PointField

class User(models.Model):
    username = models.TextField()
    default_message = models.TextField()
    #profile_image = ImageField(upload_to=get_image_path, blank=True, null=True)

    #class Meta:
        #ordering = ('created',)

class Message(models.Model):
    sender_id = models.ForeignKey(User, related_name="sender_id")
    receiver_id = models.ForeignKey(User, related_name="receiver_id")
    send_time = models.DateTimeField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    seen = models.BooleanField(default=False)