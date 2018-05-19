from app.models import Location, Pin, User
from app.serializers import LocationSerializer, PinSerializer, UserSerializer
from rest_framework import generics
from rest_framework.views import APIView


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class PinList(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer


# class NearbyUsersList(APIView):
#
#     def get(self, request, format=None):
#         request
