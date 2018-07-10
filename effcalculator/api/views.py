# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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
        detector = self.get_serializer(data=request.data)
        if detector.is_valid():
            detector = detector.calculate_efficiency(id)
            return Response(detector.to_json(), status=status.HTTP_200_OK)
        else:
            return Response(detector.errors, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['put'])
    def calculate_efficiency(self, request, id):
        detector = self.get_serializer(data=request.data)
        if detector.is_valid():
            detector = detector.calculate_efficiency(id)
            return Response(detector.to_json(), status=status.HTTP_200_OK)
        else:
            return Response(detector.errors, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['put'])
    def optimizeDiffThickness(self,request, *args, **kwargs):
        self.get_serializer(data=request.data)
        detector = self.get_object()
        detector.optimizeWave()
        return Response(detector.to_json(), status=status.HTTP_200_OK)

    @detail_route(methods=['put'])
    def optimizeWave(self,request, *args, **kwargs):
        return Response(request, status=status.HTTP_200_OK)

class converterView(APIView):
    def get(self, request, *args, **kw):
        response = Response(['10B4C 2.24g/cm3', '10B4C 2.20g/cm3'], status=status.HTTP_200_OK)
        return response


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
