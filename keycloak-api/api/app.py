import json
import os
from urllib.request import urlopen

from authlib.integrations.flask_oauth2 import ResourceProtector, current_token
from authlib.jose.rfc7517.jwk import JsonWebKey
from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template
from flask_cors import CORS

# Load environment variables from .env
load_dotenv()


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


require_auth = ResourceProtector()
validator = ClientCredsTokenValidator(KEYCLOAK_ISSUER)
require_auth.register_token_validator(validator)

app = Flask(__name__)
CORS(app)

# Dummy data for demonstration
user_items = {
    "56b916bd-b670-4527-a34c-66523687b128": [
        {"id": "123", "name": "car"},
        {"id": "4312", "name": "cellphone"},
        {"id": "151", "name": "coffee"},
    ],
    "53535353-b670-4527-a34c-66523687b128": [
        {"id": "512", "name": "car"},
        {"id": "21255", "name": "cellphone"},
        {"id": "142", "name": "coffee"},
        {"id": "22112", "name": "tea"},
    ],
}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/api/users/<string:user_id>/items", methods=["GET"])
def get_user_items(user_id):
    items = []

    if user_id in user_items:
        items = user_items[user_id]

    return jsonify({"items": items})


@app.route("/api/public", methods=["GET"])
def public():
    response = "No Authorization need it"
    return jsonify(response)


@app.route("/api/private", methods=["GET"])
@require_auth(None)
def private():
    return jsonify(current_token)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=4000)
