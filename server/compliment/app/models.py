from django.db import models

class User(models.Model):
    username = models.TextField()
    message = models.TextField()
    #profile_image = ImageField(upload_to=get_image_path, blank=True, null=True)

    #class Meta:
        #ordering = ('created',)
