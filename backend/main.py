from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes
translator = Translator()

@app.route('/translate', methods=['POST'])
def translate_text():
    # Get data from the JSON request body
    data = request.get_json()
    text = data.get('text')
    target_language = data.get('target_language')

    # Check if both text and target language are provided
    if not text or not target_language:
        return jsonify({"error": "Invalid input. 'text' and 'target_language' are required."}), 400

    try:
        # Perform the translation
        translated = translator.translate(text, dest=target_language)
        return jsonify({"translated_text": translated.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

