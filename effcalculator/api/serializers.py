from rest_framework import serializers
from .models import Bucketlist, Detector

class BucketlistSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Bucketlist
        fields = ('id', 'name', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')

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
        return instance
