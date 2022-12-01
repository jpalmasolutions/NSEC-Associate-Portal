import os
import yaml

cwd = os.getcwd()

config = {}
YAML_CONFIG_PATH = f'{cwd}/src/resources/yaml/config-local.yaml'

with open(YAML_CONFIG_PATH, 'r') as config_file:
    config = yaml.load(stream=config_file, Loader=yaml.SafeLoader)

# os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

TEMPLATE_FOLDER = f'{cwd}/src/templates'
RESOURCE_FOLDER = f'{cwd}/src/resources'
STATIC_FOLDER = '/static'

GOOGLE_CLIENT_ID = config['google_oauth_client']

CLIENT_SECRETS_FILE_PATH = f'{cwd}/json/client_secret.json'

NSEC_API_URI = 'https://api.nsec-associate.com/api'

NSEC_API_HEADERS = {'x-api-key': 'Riut9pZNjf8mtqSnfKkPr4yaRN901f6BaorYFydB'}
