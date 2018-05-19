from rest_framework import serializers
from app.models import Location, Pin, User, Message


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


class MessageSerializer(serializers.Serializer):
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()
    content = serializers.CharField()
    send_time = serializers.DateTimeField()
    longitude = serializers.FloatField()
    latitude = serializers.FloatField()

    def create(self, validated_data):
        print(validated_data)

        return Message.objects.create(sender_id=validated_data.get('sender_id'),
                                      receiver_id=validated_data.get('receiver_id'),
                                      content=validated_data.get('content'),
                                      send_time=validated_data.get('send_time'),
                                      longitude=validated_data.get('longitude'),
                                      latitude=validated_data.get('latitude'),
                                      seen=False)

    def update(self, instance):
        instance.seen = True
        instance.save()
        return instance