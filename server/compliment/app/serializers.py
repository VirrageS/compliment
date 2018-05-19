from rest_framework import serializers
from app.models import Location, Pin, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('auto_id', 'name')


class LocationSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Location
        fields = ('auto_id', 'latitude', 'longitude', 'timestamp', 'user_id')


class PinSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()

    class Meta:
        model = Pin
        fields = ('text_message', 'latitude', 'longitude', 'time_create', 'duration', 'user_id')
