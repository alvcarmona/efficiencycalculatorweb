from rest_framework import serializers
from .models import Detector, Blade, Wavelength, Metadata, Plot
from rest_framework_mongoengine import serializers as mongoserializers
from Models.Detector import Detector as oldDetectorModel

class DetectorSerializer(mongoserializers.DocumentSerializer):
    #    id = serializers.CharField(read_only=False)
    class Meta:
        model = Detector
        fields = '__all__'

    def set_metadata(self):
        self.data.update({"metadata": {
            "eff_vs_layer_thickness": {
                "x": [],
                "y": []
            },
            "eff_vs_layer_thickness": {
                "x": [],
                "y": []
            },
            "total_efficiency": 0
        }})
        return self

    def calculate_efficiency(self, id):
        d = oldDetectorModel.build_detector(len(self.validated_data['blades']),self.validated_data['blades'][0]['backscatter'],0,[[self.validated_data['wavelength'][0]['angstrom'],100]], self.validated_data['angle'], self.validated_data['threshold'],False, '10B4C 2.24g/cm3')
        r = d.calculate_eff()
       # d.plot_blade_meta(r)
        d.plot_eff_vs_wave_meta()
        d.plot_thick_vs_eff_meta()
        detector = Detector.objects(id=id).first()
        detector.metadata.total_efficiency = r[1]*100
        detector.metadata.eff_vs_wavelength.x = d.metadata.get('effVsWave')[0].tolist()
        detector.metadata.eff_vs_wavelength.y = d.metadata.get('effVsWave')[1]
        detector.metadata.eff_vs_layer_thickness.x = d.metadata.get('thickVsEff')[0].tolist()
        detector.metadata.eff_vs_layer_thickness.y = d.metadata.get('thickVsEff')[1]
        detector.save()
        return detector
