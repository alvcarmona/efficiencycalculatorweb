
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = {
    url(r'^detectors/$', DetectorList.as_view()),
    url(r'^detectors/(?P<pk>[0-9]+)/$', DetectorDetail.as_view()),
}

urlpatterns = format_suffix_patterns(urlpatterns)
