# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from mongoengine import Document, EmbeddedDocument, fields


class Bucketlist(models.Model):
    """This class represents the bucketlist model."""
    name = models.CharField(max_length=255, blank=False, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.name)


class Detectorold(models.Model):
    name = models.CharField(max_length=255, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    single = models.BooleanField(default=False)
    threshold = models.IntegerField(default=0)
    angle = models.IntegerField(default=0)


class Blade(models.Model):
    name = models.CharField(max_length=255, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    single = models.BooleanField(default=False)
    threshold = models.IntegerField(default=0)
    angle = models.IntegerField(default=0)


class wavelength(Document):
    weight = fields.ListField()
    wavelength = fields.ListField()


class Detector(Document):
    name = fields.StringField( null=True)
    angle = fields.IntField( null=True)
    threshold = fields.IntField(null=True)
    single = fields.BooleanField( null=True)
   # wavelength = fields.ListField(fields.EmbeddedDocumentField(wavelength))
    #self.metadata = {}
    #blades = []
    #converterConfiguration = ''

class ToolInput(EmbeddedDocument):
    name = fields.StringField(required=True)
    value = fields.DynamicField(required=True)