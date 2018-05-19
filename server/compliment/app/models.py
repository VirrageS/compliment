from django.db import models


class Location(models.Model):
    auto_id = models.AutoField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Pin(models.Model):
    auto_id = models.AutoField(primary_key=True)
    text_message = models.TextField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    time_create = models.DateTimeField(auto_now_add=True)
    duration = models.DurationField()