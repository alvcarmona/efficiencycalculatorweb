from rest_framework import serializers
from .models import Detector, Blade, Wavelength, Metadata, Plot
from rest_framework_mongoengine import serializers as mongoserializers


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

    def calculate_efficiency(self, instance, validated_data):

        return instance
