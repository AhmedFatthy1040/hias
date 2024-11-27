from flask import Flask, request, jsonify, send_from_directory, url_for
import os
import torch
from PIL import Image
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Ensure you have a directory to save uploaded images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set the folder to serve static files (images)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['STATIC_FOLDER'] = 'static'

# Load the YOLOv5 medium model (this will automatically download the weights)
model = torch.hub.load('ultralytics/yolov5', 'yolov5m')

image_predictions = {}

@app.route('/api/images/upload', methods=['POST'])
def upload_image():
    # Get the image from the request
    file = request.files['image']
    if not file:
        return jsonify({"message": "No file uploaded"}), 400
    
    # Save the image
    image_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(image_path)

    # Run inference with the model on the uploaded image
    img = Image.open(image_path)
    results = model(img)

    # Get the results as a pandas DataFrame (if you want predictions)
    predictions = results.pandas().xywh[0].to_dict(orient="records")  # Get predictions as a list of dictionaries

    # Store predictions in the global dictionary
    image_predictions[file.filename] = predictions

    # Return the predictions and image path as a JSON response
    return jsonify({
        "message": "Image uploaded successfully",
        "image": {
            "url": url_for('uploaded_file', filename=file.filename),  # Adjust URL using Flask's url_for
            "predictions": predictions  # Return predictions in response
        }
    }), 200

@app.route('/api/images', methods=['GET'])
def get_images():
    # List all uploaded images
    images = []
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            predictions = image_predictions.get(filename, [])
            images.append({
                "url": url_for('uploaded_file', filename=filename),  # Ensure proper URL for image
                "filename": filename,
                "predictions": predictions
            })
    return jsonify(images), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
