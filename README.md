# Workflow for Skin Condition Detection and Prompting

We start by downloading the following Roboflow dataset:
https://universe.roboflow.com/nguyen-huyen-cvq6e/skin-problems-detection-jp4jv/dataset/5
![image](https://github.com/user-attachments/assets/f1224235-b46d-4be1-af47-83e0ac687bbd)

The dataset distribution (train):
![image](https://github.com/user-attachments/assets/d658be38-665b-481e-91bf-27e564011bda)


We use a LandmarkDetector from Mediapipe to get facial landmarks to get points locating the left eye, right eye, nose, and chin using Mediapipe.
![image](https://github.com/user-attachments/assets/16f723d9-4eb6-457a-92e6-e185ebf43933)

We then train a Yolov9 model on the following dataset. We use the trained checkpoint to detect skin conditions from an input image.

![image](https://github.com/user-attachments/assets/e3f98042-4d71-43ef-8aed-ddb8391fc8cf)

We then combine our landmark prediction and skin-condition prediction to distill all that information into a prompt:

''**Detected Blackhead in a rectangular box with coordinates (Top-Left: 276,461, Bottom-Right: 300,482)
Detected Blackhead in a rectangular box with coordinates (Top-Left: 174,494, Bottom-Right: 198,513)
Detected Unknown Condition in a rectangular box with coordinates (Top-Left: 496,588, Bottom-Right: 640,635)
Facial landmarks detected: Left eye at [263 284], Right eye at [414 254], Nose at [405 379], and Mouth at [408 474].**"
