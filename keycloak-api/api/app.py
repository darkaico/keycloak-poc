import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from keycloak import KeycloakOpenID

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

keycloak_openid = KeycloakOpenID(
    server_url=os.getenv("KEYCLOAK_SERVER_URL"),
    client_id=os.getenv("KEYCLOAK_CLIENT_ID"),
    realm_name=os.getenv("KEYCLOAK_REALM_NAME"),
)

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


@app.route("/users/<string:user_id>/items", methods=["GET"])
def get_user_items(user_id):
    if user_id in user_items:
        items = user_items[user_id]
        return jsonify({"items": items})
    else:
        return jsonify({"error": "User not found"}), 404


@app.route("/secure-endpoint", methods=["GET"])
def secure_endpoint():
    token = ""
    bearer_data = request.headers.get("Authorization", "").split()
    if len(bearer_data) < 1:
        return jsonify({"error": "Missing token"}), 401

    token = bearer_data[1]
    print(f"Token: {token}")

    # Validate the token
    try:
        token_info = keycloak_openid.decode_token(token)
        # You can access token_info to get information about the user, roles, etc.
        user_id = token_info["sub"]
        return jsonify({"message": f"Secure endpoint accessed by user {user_id}"})
    except Exception as e:
        return jsonify({"error": f"Token validation failed: {str(e)}"}), 401


if __name__ == "__main__":
    app.run(debug=True)
