from rest_framework import serializers
from app.models import Location, Pin


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('auto_id', 'latitude', 'longitude', 'timestamp')


class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pin
        fields = ('text_message', 'latitude', 'longitude', 'time_create', 'duration')