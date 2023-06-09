import os
from datetime import timedelta
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
SQLALCHEMY_TRACK_MODIFICATIONS = True
MSEARCH_INDEX_NAME = 'msearch'
MSEARCH_BACKEND = 'simple'
MSEARCH_PRIMARY_KEY = 'id'
MSEARCH_ENABLE = True
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)