# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Bucketlist(models.Model):
    """This class represents the bucketlist model."""
    name = models.CharField(max_length=255, blank=False, unique=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.name)

class Detector(models.Model):
    name = models.CharField(max_length=255, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    single = models.BooleanField(default=False)
    threshold = models.IntegerField(default=0)
    angle = models.IntegerField(default=0)

