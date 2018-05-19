from rest_framework import serializers
from .models import User, Message


class MessageSerializer(serializers.Serializer):
    class Meta:
        fields = ['user', 'content', ]


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True, max_length=100)
    default_message = serializers.CharField(style={'base_template': 'textarea.html'}, required=False)
    messages = MessageSerializer(many=True)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.username = validated_data.get('username', instance.username)
        instance.default_message = validated_data.get('default_message', instance.default_message)
        instance.save()
        return instance


