from rest_framework import serializers
from .models import Detector, Blade, Wavelength, Metadata, Plot
from rest_framework_mongoengine import serializers as mongoserializers

'''
class DetectorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    single = serializers.BooleanField(required=False)
    threshold = serializers.IntegerField(required=False)
    angle = serializers.IntegerField(required=False)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Detector.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.single = validated_data.get('single', instance.single)
        instance.threshold = validated_data.get('threshold', instance.threshold)
        instance.angle = validated_data.get('angle', instance.angle)
        instance.save()
        return instance '''


class MetadataSerializer(mongoserializers.EmbeddedDocumentSerializer):
    #    id = serializers.CharField(read_only=False)
    class Meta:
        model = Metadata
        fields = '__all__'


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


'''
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Detector.objects.create(**validated_data)

    def delete(self,data):
        Detector.objects(id=data._data['id']).delete()
        return self

        def save(self, data, commit=True):
        detector = self.instance if self.instance else Detector()
        if self.data['id'] != None:
            detector = data
        else:
            detector = Detector()
        if self.data['name'] != None:
            detector.name = self.data['name']
        if self.data['threshold'] != None:
            detector.threshold = self.data['threshold']
        if self.data['angle']:
            detector.angle = self.data['angle']
        if commit:
            detector.save()
        return detector.to_json()

'''
