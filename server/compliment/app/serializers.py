from rest_framework import serializers
from .models import User, Message


class MessageSerializer(serializers.Serializer):
    sender_id = serializers.PrimaryKeyRelatedField(read_only=True)
    receiver_id = serializers.PrimaryKeyRelatedField(read_only=True)
    send_time = serializers.DateTimeField()
    longitude = serializers.FloatField()
    latitude = serializers.FloatField()
    seen = serializers.BooleanField()

    def create(self, validated_data):
        sender = User.objects.get(pk=validated_data.get('sender_id'))
        receiver = User.objects.get(pk=validated_data.get('receiver_id'))
        return Message.objects.create(sender_id=sender, receiver_id=receiver,
                               send_time=validated_data.get('send_time'),
                               longitude=validated_data.get('longitude'),
                               latitude=validated_data.get('latitued'),
                               seen=False)

    def update(self, instance):
        instance.seen = True
        instance.save()
        return instance



class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True, max_length=100)
    default_message = serializers.CharField(style={'base_template': 'textarea.html'}, required=False)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.username = validated_data.get('username', instance.username)
        instance.default_message = validated_data.get('default_message', instance.default_message)
        instance.save()
        return instance


