from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import numpy as np
from keras.models import load_model
from keras.preprocessing import image

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your model
model = load_model(r'D:\Digit_Recognition_Env\digit_recognition_model.h5')

# Set the absolute path for the upload folder
UPLOAD_FOLDER = r'D:\Digit_Recognition_Env\backend\uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file to the uploads directory
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Process the image and make a prediction
    prediction = predict_image(file_path)

    return jsonify({'prediction': prediction})

def predict_image(file_path):
    # Load the image
    img = image.load_img(file_path, target_size=(28, 28), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array.astype('float32') / 255.0  # Normalize the image
    
    # Make a prediction
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions, axis=1)[0]  # Get the predicted class index

    return int(predicted_class)  # Return the predicted class index

if __name__ == '__main__':
    app.run(debug=True)
