import tensorflow as tf
import numpy as np
from PIL import Image
import io

model = None

def get_model():
    global model
    if model is None:
        model = tf.keras.models.load_model("model/model.h5")
    return model

async def preprocess_image(file):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((64, 64))  # ukuran sesuai model
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array
