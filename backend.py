from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5502"])


@app.route("/", methods=["POST"])
def test():
    data = request.get_json()
    url = data["url"]

    print(url)
    return jsonify({"message": "URL received!"})









if __name__ == "__main__":
    app.run(debug=True, port=5050)