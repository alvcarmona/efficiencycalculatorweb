# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from mongoengine import Document, EmbeddedDocument, fields
import thread
#from Models.Detector_meta import Detector as oldDetectorModel
from neutron_detector_eff_functions import Detector as oldDetectorModel

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
    eff_vs_bslayer_thickness = fields.EmbeddedDocumentField(Plot)
    eff_vs_tslayer_thickness = fields.EmbeddedDocumentField(Plot)
    eff_vs_wavelength = fields.EmbeddedDocumentField(Plot)
    eff_vs_wavelength_bs = fields.EmbeddedDocumentField(Plot)
    eff_vs_wavelength_ts = fields.EmbeddedDocumentField(Plot)
    total_efficiency = fields.DecimalField(null=True, default=0)
    phs_alpha_06 = fields.EmbeddedDocumentField(Plot)
    phs_alpha_94 = fields.EmbeddedDocumentField(Plot)
    phs_li_06 = fields.EmbeddedDocumentField(Plot)
    phs_li_94 = fields.EmbeddedDocumentField(Plot)


class Detector(Document):
    name = fields.StringField(null=True)
    angle = fields.IntField(null=True)
    threshold = fields.IntField(null=True)
    converter = fields.StringField(null=True, default="10B4C 2.24g/cm3")
    blades = fields.ListField(fields.EmbeddedDocumentField(Blade))
    wavelength = fields.ListField(fields.EmbeddedDocumentField(Wavelength))
    metadata = fields.EmbeddedDocumentField(Metadata)
    single = fields.BooleanField()

    def clean(self, **kwargs):
        if not self._created:
            if 'wavelength' in self._changed_fields or 'angle'in self._changed_fields or 'threshold' in self._changed_fields or 'blades'in self._changed_fields  or 'converter' in self._changed_fields:
                if self.converter:
                    if len(self.blades) > 0:
                        if len(self.wavelength) > 0:
                            thread.start_new_thread(self.calculate_efficiency, ())

    def calculate_efficiency(self):
        try:
            d = oldDetectorModel.Detector.build_detector(len(self.blades),self.blades[0]['backscatter'],0,[[self.wavelength[0]['angstrom'],100]], self.angle, self.threshold,False, self.converter)
            r = d.calculate_eff()
            d.calculate_phs()
            phs = d.metadata.get('phs')
            self.metadata.phs_alpha_06.x = phs[2].tolist()
            self.metadata.phs_alpha_06.y = phs[4].tolist()
            self.metadata.phs_alpha_94.x = phs[0].tolist()
            self.metadata.phs_alpha_94.y = phs[4].tolist()
            self.metadata.phs_li_06.x = phs[3].tolist()
            self.metadata.phs_li_06.y = phs[4].tolist()
            self.metadata.phs_li_94.x = phs[1].tolist()
            self.metadata.phs_li_94.y = phs[4].tolist()

            self.metadata.total_efficiency = r[1]*100
            self.save()
            print 'efficiency calculated and saved'
            self.calculate_metadata_eff_vs_wavelength(detector=d)
            thread.exit()
        except Exception:
            import traceback
            print traceback.format_exc()

    def calculate_metadata_eff_vs_wavelength(self,detector):
        try:
            detector.plot_eff_vs_wave_meta()
            self.metadata.eff_vs_wavelength.x = detector.metadata.get('effVsWave')[0].tolist()
            self.metadata.eff_vs_wavelength.y = detector.metadata.get('effVsWave')[1]
            self.save()
            print 'metadata wave calculated and saved'
            self.calculate_metadata_eff_vs_layer_thickness(detector=detector)
            thread.exit()
        except Exception:
            import traceback
            print traceback.format_exc()

    def calculate_metadata_eff_vs_layer_thickness(self,detector):
        try:
            detector.plot_thick_vs_eff_meta()
            self.metadata.eff_vs_layer_thickness.x = detector.metadata.get('thickVsEff')[0].tolist()
            self.metadata.eff_vs_layer_thickness.y = detector.metadata.get('thickVsEff')[1]
            self.save()
            print 'metadata thick calculated and saved'
            thread.exit()
        except Exception:
            import traceback
            print traceback.format_exc()
