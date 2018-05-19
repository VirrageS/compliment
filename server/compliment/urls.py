from django.conf.urls import url
from compliment.app import views


urlpatterns = [
    url(r'^locations/', views.LocationList.as_view()),
    url(r'^pins/', views.PinList.as_view()),
    url(r'^users/', views.UserListCreate.as_view())
]
