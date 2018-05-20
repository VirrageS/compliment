from django.db import models

class User(models.Model):
    auto_id = models.AutoField(primary_key=True)
    name = models.TextField()
    photo = models.TextField()

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

class BroadcastMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='senderBroadcast')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiverBroadcast')
    content = models.CharField(max_length=250)
    send_time = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(blank=True, default=False)

    def update(self):
        self.seen = True


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='senderSingle')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiverSingle')
    tag_id = models.IntegerField()
    send_time = models.DateTimeField(auto_now_add=True)  # Default representation: YYYY-MM-DD[T]HH:MM
    seen = models.BooleanField(blank=True, default=False)

    def update(self):
        self.seen = True
