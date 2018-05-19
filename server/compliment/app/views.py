from app.models import Location, Pin, User
from app.serializers import LocationSerializer, PinSerializer, UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class LocationList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class PinList(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer


class NearbyUsersList(APIView):

    def get(self, request, format=None):

        dist = float(request.GET['dist'])
        user_id = request.GET['user_id']
        user_loc = Location.objects.filter(user_id=user_id).latest('timestamp')

        users = User.objects.all().exclude(auto_id=user_id)
        locations = [Location.objects.filter(user=user).latest('timestamp') for user in users]

        nearby_users = []

        for user, location in zip(users, locations):
            if (abs(location.latitude - user_loc.latitude) < dist) and (abs(location.longitude - user_loc.longitude) < dist):
                nearby_users.append(user)

        serializer = UserSerializer(nearby_users, many=True)
        return Response(serializer.data)
