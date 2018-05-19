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
    content = models.CharField(max_length=250, blank=True)
    send_time = models.DateTimeField() # Default representation: YYYY-MM-DD[T]HH:MM
    longitude = models.FloatField()
    latitude = models.FloatField()
    seen = models.BooleanField(blank=True, default=False)