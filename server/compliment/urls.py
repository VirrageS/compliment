from django.conf.urls import url
from compliment.app import views


urlpatterns = [
    url(r'^locations/', views.LocationList.as_view()),
    url(r'^pins/', views.PinList.as_view()),
    url(r'^users/', views.UserListCreate.as_view()),
    url(r'^nearby_users/', views.NearbyUsersList.as_view()),
    url(r'^send_message/$', views.send_message),
    url(r'^get_messages/(?P<pk>[0-9]+)/$', views.get_messages),
]
