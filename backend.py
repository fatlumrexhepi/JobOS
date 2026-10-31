from flask import Flask, jsonify, request 
#informatioinen über die gesamte eingehende HTTP-Anfrage
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()


app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5502"])


@app.route("/", methods=["POST"])
def test():
    data = request.get_json()
    url = data["url"]
    
    response = requests.get(url, timeout=10)

    print(response.status_code)
    print(url)


    return jsonify({
        "company": "okkkk",
        "summary": "ok",
        "pensum": "ok",
        "location": "ok",
        "status": "ok",
        "url": url,
        "notes": "ok",
        "id": "ok"
    })







if __name__ == "__main__":
    app.run(debug=True, port=5050)