from django.db import models


class User(models.Model):
    auto_id = models.AutoField(primary_key=True)
    name = models.TextField()


class Location(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auto_id = models.AutoField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Pin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auto_id = models.AutoField(primary_key=True)
    text_message = models.TextField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    time_create = models.DateTimeField(auto_now_add=True)
    duration = models.DurationField()


class Message(models.Model):
    sender_id = models.IntegerField()
    receiver_id = models.IntegerField()
    content = models.CharField(max_length=250, blank=True)
    send_time = models.DateTimeField()  # Default representation: YYYY-MM-DD[T]HH:MM
    longitude = models.FloatField()
    latitude = models.FloatField()
    seen = models.BooleanField(blank=True, default=False)

    def update(self):
        self.seen = True
