# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db import models
# Create your models here.

class Detector(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.name
