# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-18 13:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_detector_angle'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Detector',
        ),
    ]