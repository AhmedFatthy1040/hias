from flask import Flask, request, jsonify
import torch
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Load the YOLOv5 medium model (this will automatically download the weights)
model = torch.hub.load('ultralytics/yolov5', 'yolov5m')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the image from the request
    file = request.files['image']
    
    # Open the image using PIL
    img = Image.open(BytesIO(file.read()))
    
    # Run inference with the model on the uploaded image
    results = model(img)
    
    # Get the results as a pandas DataFrame
    predictions = results.pandas().xywh[0].to_dict(orient="records")  # Get predictions as a list of dictionaries
    
    # Return the predictions as a JSON response
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
