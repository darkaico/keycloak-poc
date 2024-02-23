from flask import Flask, jsonify
from flask_cors import CORS

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


@app.route("/users/<string:user_id>/items", methods=["GET"])
def get_user_items(user_id):
    if user_id in user_items:
        items = user_items[user_id]
        return jsonify({"items": items})
    else:
        return jsonify({"error": "User not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
