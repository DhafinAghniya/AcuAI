from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from app.model_loader import get_model, preprocess_image
import numpy as np

app = FastAPI()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        model = get_model()
        image_array = await preprocess_image(file)
        prediction = model.predict(image_array)
        class_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
        classes = ["Whitehead", "Blackhead", "Papule", "Pustule", "Nodule"]

        return {"class": classes[class_index], "confidence": confidence}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
