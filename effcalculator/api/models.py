# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from mongoengine import Document, EmbeddedDocument, fields
import thread
from Models.Detector_meta import Detector as oldDetectorModel

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

    def clean(self, **kwargs):
        if not self._created:
            if 'wavelength' in self._changed_fields or 'angle'in self._changed_fields or 'threshold' in self._changed_fields or 'blades'in self._changed_fields  or 'converter' in self._changed_fields:
                if self.converter:
                    if len(self.blades) > 0:
                        if len(self.wavelength) > 0:
                            print 'Auto Calculate efficiency'
                            thread.start_new_thread(self.calculate_efficiency, ())

    def calculate_efficiency(self):
        print 'Thread'
        d = oldDetectorModel.build_detector(len(self.blades),self.blades[0]['backscatter'],0,[[self.wavelength[0]['angstrom'],100]], self.angle, self.threshold,False, '10B4C 2.24g/cm3')
        r = d.calculate_eff()
        d.plot_eff_vs_wave_meta()
        d.plot_thick_vs_eff_meta()
        self.metadata.total_efficiency = r[1]*100
        self.metadata.eff_vs_wavelength.x = d.metadata.get('effVsWave')[0].tolist()
        self.metadata.eff_vs_wavelength.y = d.metadata.get('effVsWave')[1]
        self.metadata.eff_vs_layer_thickness.x = d.metadata.get('thickVsEff')[0].tolist()
        self.metadata.eff_vs_layer_thickness.y = d.metadata.get('thickVsEff')[1]
        self.save()
