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


class Plot(EmbeddedDocument):
    x = fields.ListField(fields.FloatField(null=True), default=[])
    y = fields.ListField(fields.FloatField(null=True), default=[])


class Metadata(EmbeddedDocument):
    eff_vs_layer_thickness = fields.EmbeddedDocumentField(Plot)
    eff_vs_wavelength = fields.EmbeddedDocumentField(Plot)
    total_efficiency = fields.DecimalField(null=True, default=0)
    # blade_efficiency = fields.ListField(fields.FloatField)


class Detector(Document):
    name = fields.StringField(null=True)
    angle = fields.IntField(null=True)
    threshold = fields.IntField(null=True)
    converter = fields.StringField(null=True, default="10B4C 2.24g/cm3")
    blades = fields.ListField(fields.EmbeddedDocumentField(Blade))
    wavelength = fields.ListField(fields.EmbeddedDocumentField(Wavelength))
    metadata = fields.EmbeddedDocumentField(Metadata)
