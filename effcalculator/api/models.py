# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from mongoengine import Document, EmbeddedDocument, fields



class Blade(EmbeddedDocument):
    backscatter = fields.FloatField(null=True)
    transmission = fields.FloatField(null=True)
    substrate = fields.FloatField(null=True)

class Wavelength(EmbeddedDocument):
    weight = fields.FloatField(null=True)
    angstrom = fields.FloatField(null=True)

class Detector(Document):
    name = fields.StringField(null=True)
    angle = fields.IntField(null=True)
    threshold = fields.IntField(null=True)
    single = fields.BooleanField(null=True, default=False)
    converter = fields.StringField(null=True, default="10B4C 2.24g/cm3")
    blades = fields.ListField(fields.EmbeddedDocumentField(Blade))
    wavelength = fields.ListField(fields.EmbeddedDocumentField(Wavelength))
    #self.metadata = {}
    #converterConfiguration = ''


