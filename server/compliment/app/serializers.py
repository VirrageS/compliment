from rest_framework import serializers
from .models import User


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(required=True, max_length=100)
    message = serializers.CharField(style={'base_template': 'textarea.html'}, required=False)

    def create(self, validated_data):

        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.username = validated_data.get('title', instance.title)
        instance.message = validated_data.get('code', instance.code)
        instance.save()
        return instance