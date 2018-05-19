from rest_framework import serializers
from .models import User, Message


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


