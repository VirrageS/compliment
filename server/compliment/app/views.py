from app.models import Location
from app.serializers import LocationSerializer
from rest_framework import generics


class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
