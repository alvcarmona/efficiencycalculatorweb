
Detector Efficiency Calculator
============


## Synopsis

DECal is a web application designed to analytically calculate, visualize and optimize the detection effciency of
thermal neutron detectors, which are based on thin-film converters. The implementation presented in app
 10B-based detectors in particular.


## Technologies
DECal Has been developed using the following frameworks:
    - Backend: Django, Django rest framework, Mongoengine
    - Frontend: React + Redux

## Requirements

- Python 2.7
- Nodejs
- MongoDB


## Instructions

1. Download python dependencies placed in requirements.txt.
'''
pip install -r requirements.txt
'''

2. Install frontend dependencies via npm.

'''
npm i
'''

3. Run webpack to gather frontend dependencies


'''
npm run-scrip webpack-watch
'''


4. Run the server

'''
python manage.py runserver
'''


## License

GNU GPLv3

