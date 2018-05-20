from rest_framework import serializers
from app.models import Location, Pin, User, Message, BroadcastMessage


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('auto_id', 'name', 'photo')


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

class MessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()

    class Meta:
        model = Message
        fields = ('sender_id', 'receiver_id', 'tag_id', 'send_time', 'seen')

    def update(self, instance):
        instance.seen = True
        instance.save()
        return instance


class BroadcastMessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.IntegerField()
    receiver_id = serializers.IntegerField()

    class Meta:
        model = BroadcastMessage
        fields = ('sender_id', 'receiver_id', 'content', 'send_time', 'seen')

    def update(self, instance):
        instance.seen = True
        instance.save()
        return instance

# class MessageSerializer(serializers.Serializer):
#     sender_id = serializers.IntegerField()
#     receiver_id = serializers.IntegerField()
#     tag_id = serializers.IntegerField()
#     # send_time = serializers.DateTimeField()
#     # longitude = serializers.FloatField()
#     # latitude = serializers.FloatField()

#     def create(self, validated_data):
#         return Message.objects.create(sender=validated_data.get('sender_id'),
#                                       receiver=validated_data.get('receiver_id'),
#                                       tag_id=validated_data.get('tag_id'),
#                                       # send_time=validated_data.get('send_time'),
#                                       # longitude=validated_data.get('longitude'),
#                                       # latitude=validated_data.get('latitude'),
#                                       seen=False)

    # def update(self, instance):
    #     instance.seen = True
    #     instance.save()
    #     return instance