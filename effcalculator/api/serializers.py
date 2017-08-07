from rest_framework import serializers
from .models import Detector
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

class DetectorSerializer(mongoserializers.DocumentSerializer):
#    id = serializers.CharField(read_only=False)
    class Meta:
        model = Detector
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Detector.objects.create(**validated_data)

    def save(self, commit=True):
        detector = self.instance if self.instance else Detector()
        detector.name = self.cleaned_data['name']
        detector.threshold = self.cleaned_data['threshold']
        detector.angle = self.cleaned_data['angle']
        if commit:
            detector.save()

        return detector

