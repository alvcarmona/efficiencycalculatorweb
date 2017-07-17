
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *
from rest_framework_mongoengine import routers

router = routers.DefaultRouter()

router.register(r'detectors', DetectorViewSet, r"detectors")

urlpatterns = {
    url(r'', include(router.urls)),
  #  url(r'^detectors/$', DetectorList.as_view()),
   # url(r'^detectors/(?P<pk>[0-9]+)/$', DetectorDetail.as_view()),
}
