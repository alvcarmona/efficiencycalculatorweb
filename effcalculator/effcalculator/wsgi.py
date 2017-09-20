"""
WSGI config for effcalculator project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

settings = "effcalculator.settings.production"
if os.getenv('SERVER_ENV') == 'prod':
    settings = "effcalculator.settings_production"
elif os.getenv('SERVER_ENV') == 'dev':
    settings = "effcalculator.settings_dev"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings)
application = get_wsgi_application()
