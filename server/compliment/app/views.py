from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from .models import User, Message
from .serializers import UserSerializer, MessageSerializer

@csrf_exempt
@api_view(['GET', 'POST'])
def user_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    """
    Retrieve, update or delete user.
    """
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        user.delete()
        return HttpResponse(status=204)

@csrf_exempt
@api_view(['GET'])
def get_messages(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)

    messages = Message.objects.all().filter(receiver_id=user.id, seen=False)
    serializer = MessageSerializer(messages, many=True)
    for m in messages:
        m.update()
        m.save()

    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@api_view(['POST'])
def send_message(request):
    data = JSONParser().parse(request)
    try:
        sender = User.objects.get(pk=data["sender_id"])
        receiver = User.objects.get(pk=data["receiver_id"])
    except User.DoesNotExist:
        return HttpResponse(status=404)

    serializer = MessageSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return HttpResponse(status=201)

    return JsonResponse(serializer.errors, status=400)









