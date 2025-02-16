# Workflow for Skin Condition Detection and Prompting

We start by downloading the following Roboflow dataset:
https://universe.roboflow.com/nguyen-huyen-cvq6e/skin-problems-detection-jp4jv/dataset/5
![image](https://github.com/user-attachments/assets/f1224235-b46d-4be1-af47-83e0ac687bbd)

The dataset distribution (train):
![image](https://github.com/user-attachments/assets/d658be38-665b-481e-91bf-27e564011bda)


We use a LandmarkDetector from Mediapipe to get facial landmarks to get points locating the left eye, right eye, nose, and chin using Mediapipe.
![image](https://github.com/user-attachments/assets/16f723d9-4eb6-457a-92e6-e185ebf43933)

We then train a Yolov9 model on the following dataset. We use the trained checkpoint to detect skin conditions from an input image.

