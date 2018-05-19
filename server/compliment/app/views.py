from app.models import Location, Pin
from app.serializers import LocationSerializer, PinSerializer
from rest_framework import generics


class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class PinList(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
