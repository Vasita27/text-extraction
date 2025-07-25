from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract

app = Flask(__name__)
CORS(app)
@app.route('/extract', methods=['POST'])
def extract_text():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    img = Image.open(image)
    text = pytesseract.image_to_string(img)

    return jsonify({'extracted_text': text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
