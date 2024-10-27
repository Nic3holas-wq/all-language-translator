from googletrans import Translator

# Initialize the translator
translator = Translator()

# Define the text and target language
text = "Umeshinda Vipi"
target_language = "en"  # Spanish

# Translate the text
translated = translator.translate(text, dest=target_language)
print(f"Translated Text: {translated.text}")

detected_language = translator.detect(text)
print(f"Detected Language: {detected_language.lang}")
