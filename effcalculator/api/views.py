# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import Detector
from .serializers import DetectorSerializer
from rest_framework_mongoengine import viewsets
from rest_framework import mixins
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework_mongoengine.generics import GenericAPIView

class DetectorViewSet(viewsets.ModelViewSet, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    lookup_field = 'id'
    serializer_class = DetectorSerializer

    def get_queryset(self):
        return Detector.objects.all()

    @detail_route(methods=['put'])
    def set_metadata(self, request, id):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.set_metadata()
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['put'])
    def calculate_efficiency(self, request, id):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.calculate_efficiency()
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
   def create(self, request):
       serializer = self.get_serializer(data=request.data)
       if serializer.is_valid():
           detector = serializer.save(request)
           return Response(status=status.HTTP_201_CREATED, data=detector)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       # self.perform_create(s)

   def delete(self, request):
       serializer = self.get_serializer(data=request.data)
       if serializer.is_valid():
           serializer.delete(request)
           return Response(status=status.HTTP_200_OK)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''''
