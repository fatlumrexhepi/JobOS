from flask import Flask, jsonify, request 
#informatioinen über die gesamte eingehende HTTP-Anfrage
import json
from flask_cors import CORS
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types, errors

load_dotenv()
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5502"])


@app.route("/", methods=["POST"])
def test():
    
    try:
        data = request.get_json()
        url = data["url"]

        ai_response = client.models.generate_content(
            model=os.getenv("GEMINI_MODEL"),
            contents=f"""
            Analyze the job posting at this URL:
            {url}

            Extract:
            - company
            - summary
            - pensum
            - location

            Return only valid JSON.
            Use empty strings for missing information.
            NEVER invent information.
            """,
            config=types.GenerateContentConfig(
                tools=[
                    types.Tool(google_search=types.GoogleSearch()),
                    types.Tool(url_context=types.UrlContext())
                ],
            )
        )

        print(ai_response.text)

        clean_text = ai_response.text.strip()
        clean_text = clean_text.removeprefix("```json")
        clean_text = clean_text.removesuffix("```")
        clean_text = clean_text.strip()

        job_data = json.loads(clean_text)
    


        return jsonify({
            "company": job_data.get("company", ""),
            "summary": job_data.get("summary", ""),
            "pensum": job_data.get("pensum", ""),
            "location": job_data.get("location", ""),
            "status": "Pending",
            "url": url,
            "notes": ""
    })
    except errors.ClientError as e:
        if e.code == 429:
            return jsonify({
                "error": "Gemini API limit reached. Please try again later."
            }), 429

        app.logger.exception("Gemini API error")
        return jsonify({"error": "Gemini API error"}), 502

    except Exception:
        app.logger.exception("Analysis failed")
        return jsonify({"error": "Analysis failed"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5050)