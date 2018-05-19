from django.db import models


# class Message(models.Model):
#     content = models.TextField()
#     user = models.ForeignKey(User)
#
# class User(models.Model):
#     username = models.TextField()
#     default_message = models.TextField()
#     messages = models.ManyToManyField(Message)
    #profile_image = ImageField(upload_to=get_image_path, blank=True, null=True)

    #class Meta:
        #ordering = ('created',)


class Location(models.Model):
    auto_id = models.AutoField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
