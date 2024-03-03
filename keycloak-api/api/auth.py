import json
import logging
import os
from urllib.request import urlopen

from authlib.integrations.flask_oauth2 import ResourceProtector, current_token
from authlib.jose.rfc7517.jwk import JsonWebKey
from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound

KEYCLOAK_SERVER_URL = os.getenv("KEYCLOAK_SERVER_URL")
KEYCLOAK_REALM_NAME = os.getenv("KEYCLOAK_REALM_NAME")

KEYCLOAK_ISSUER = f"{KEYCLOAK_SERVER_URL}/realms/{KEYCLOAK_REALM_NAME}"


class ClientCredsTokenValidator(JWTBearerTokenValidator):
    def __init__(self, issuer):
        jsonurl = urlopen(f"{issuer}/protocol/openid-connect/certs")
        public_key = JsonWebKey.import_key_set(json.loads(jsonurl.read()))
        super(ClientCredsTokenValidator, self).__init__(public_key)
        self.claims_options = {
            "exp": {"essential": True},
            "iss": {"essential": True, "value": issuer},
        }

    def validate_token(self, token, scopes, request):
        super(ClientCredsTokenValidator, self).validate_token(token, scopes, request)

        verify_user()


require_auth = ResourceProtector()
validator = ClientCredsTokenValidator(KEYCLOAK_ISSUER)
require_auth.register_token_validator(validator)


def verify_user():
    from api.app import User, db

    try:
        user = db.session.query(User).filter(User.email == current_token.email).one()
    except NoResultFound:
        user = User(email=current_token.email)
        db.session.add(user)
        db.session.commit()
    except MultipleResultsFound:
        logging.error(f"Multiple users found for email: {current_token.email}")
        # Handle multiple users with the same email (if this is not expected)
    except Exception as e:
        logging.error(f"Error while verifying user: {e}")
        # Handle other exceptions (log, raise, or handle as appropriate)
    finally:
        db.session.close()
