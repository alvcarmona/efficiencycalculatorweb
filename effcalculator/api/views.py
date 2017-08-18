# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from .models import Detector
from .serializers import  DetectorSerializer
from rest_framework import status, generics, mixins, response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from django.shortcuts import render
from rest_framework_mongoengine import viewsets

'''
class DetectorList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    """
    List all detectors, or create a new detector.
    """
    queryset = Detector.objects.all()
    serializer_class = DetectorSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class DetectorDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    """
    Retrieve, update or delete a detector.
    """
    queryset = Detector.objects.all()
    serializer_class = DetectorSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
'''

class DetectorViewSet(viewsets.ModelViewSet):
    '''
    Contains information about inputs/outputs of a single program
    that may be used in Universe workflows.
    '''
    lookup_field = 'id'
    serializer_class = DetectorSerializer

    def get_queryset(self):
        return Detector.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
          detector =  serializer.save(request)
          return Response(status=status.HTTP_201_CREATED, data=detector)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       # self.perform_create(s)

    def delete(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.delete(request)
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       # self.perform_create(s)
