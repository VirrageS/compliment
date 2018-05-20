from django.conf.urls import url
from app import views


urlpatterns = [
    url(r'^locations/', views.LocationList.as_view()),
    url(r'^pins/', views.PinList.as_view()),
    url(r'^users/', views.UserListCreate.as_view()),
    url(r'^nearby_users/', views.NearbyUsersList.as_view()),
    url(r'^send_message/$', views.send_message),
    url(r'^send_broadcast_message/$', views.send_broadcast_message),
    url(r'^messages/$', views.get_messages),
    url(r'^broadcast_messages/$', views.get_broadcast_messages),
]
