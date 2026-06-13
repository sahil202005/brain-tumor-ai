from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os
import urllib.request
class_names = [
    "glioma",
    "meningioma",
    "no tumor",
    "pituitary"
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
MODEL_PATH = "brain_tumor_model_final.keras"

if not os.path.exists(MODEL_PATH):
    urllib.request.urlretrieve(
        "https://huggingface.co/sahil202005/brain-tumor-model/resolve/main/brain_tumor_model_final.keras",
        MODEL_PATH
    )

model = load_model(MODEL_PATH)
@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    img = Image.open(file.file).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = int(np.argmax(prediction))

    confidence = float(np.max(prediction) * 100)

    if confidence < 70:
        return {
        "tumor_type": "Invalid MRI or uncertain prediction",
        "confidence": round(confidence, 2)
    }

    return {
    "predicted_class": predicted_class,
    "tumor_type": class_names[predicted_class],
    "confidence": round(confidence, 2)
}