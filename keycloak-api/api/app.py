import os

from authlib.integrations.flask_oauth2 import current_token
from flask import Flask, jsonify, render_template
from flask_cors import CORS

from api.auth import require_auth
from api.dtos import ItemDTO
from api.logger_utils import setup_logger
from api.models import db

setup_logger()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
# initialize the app with the extension
db.init_app(app)


with app.app_context():
    db.create_all()

# Dummy data for demonstration
user_items = {
    "56b916bd-b670-4527-a34c-66523687b128": [
        ItemDTO("123", "car"),
        ItemDTO("4312", "cellphone"),
        ItemDTO("151", "coffee"),
    ],
    "53535353-b670-4527-a34c-66523687b128": [
        ItemDTO("512", "car"),
        ItemDTO("21255", "cellphone"),
        ItemDTO("142", "coffee"),
        ItemDTO("22112", "tea"),
    ],
}


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/api/users/<string:user_id>/items", methods=["GET"])
@require_auth(None)
def get_user_items(user_id):
    # items = []

    # TODO: get proper data from the user
    # if user_id in user_items:
    #     items = user_items[user_id]

    return jsonify({"items": user_items["56b916bd-b670-4527-a34c-66523687b128"]})


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
