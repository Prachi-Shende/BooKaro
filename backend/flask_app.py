from flask import Flask, request, jsonify
import subprocess
import os
import uuid
import base64
import time
from pathlib import Path
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = os.path.abspath('runs/detect')  # Use absolute path
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

import re

def summarize_from_console(console_output, source_type="image"):
    wornout_count = 0
    ripped_count = 0

    lines = console_output.splitlines()

    for line in lines:
        if "Wornout" in line:
            match = re.search(r'(\d+) Wornout', line)
            if match:
                wornout_count += int(match.group(1))
        if "Ripped" in line:
            match = re.search(r'(\d+) Ripped', line)
            if match:
                ripped_count += int(match.group(1))

    # Adjust counts for webcam (to avoid overcounting same detections across frames)
    if source_type == "webcam":
        # Normalize counts (assume repeated frames, apply scaling or cap)
        wornout_count = min(round(wornout_count / 5), 10)  # You can tweak divisor or max
        ripped_count = min(round(ripped_count / 10), 10)

    print(f"Wornout count: {wornout_count}, Ripped count: {ripped_count}")
    total_detections = wornout_count + ripped_count

    if source_type == "webcam":
        if total_detections == 0:
            return "excellent"
        elif ripped_count == 0 and wornout_count <= 2:
            return "good to go"
        elif ripped_count <= 2 and wornout_count <= 3:
            return "average okay"
        elif ripped_count > 2 and wornout_count > 3:
            return "not good"
        elif wornout_count >= 3:
            return "poor"
        else:
            return "average okay"
    else:
        if total_detections == 0:
            return "excellent"
        elif wornout_count <= 2 and ripped_count == 0:
            return "good to go"
        elif wornout_count <= 2 and ripped_count == 0:
            return "average okay"
        elif wornout_count >= 3 or ripped_count >= 1:
            return "poor"
        else:
            return "average okay"


def encode_image(img_path):
    with open(img_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode()

@app.route('/detect/image', methods=['POST'])
def detect_image():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No image file uploaded'}), 400

    filename = f"{uuid.uuid4()}.jpg"
    input_path = os.path.abspath(os.path.join(UPLOAD_FOLDER, filename))  # Full absolute path
    file.save(input_path)

    yolov5_path = os.path.abspath("yolov5")

    process = subprocess.Popen(
        ['python', 'detect.py',
         '--weights', 'D:/NEWtamper/yolov5/best.pt',
         '--source', input_path,  # now absolute path
         '--project', 'runs/detect',
         '--name', 'result',
         '--exist-ok',
         '--img-size', '640',
         '--conf-thres', '0.1'],
        cwd=yolov5_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True
    )
    output, _ = process.communicate()
    print("YOLO output:\n", output)

    summary = summarize_from_console(output, source_type="image")
    time.sleep(1)

    result_dir = os.path.join(yolov5_path, 'runs', 'detect', 'result')

    result_img_path = None
    for file_name in os.listdir(result_dir):
        if filename.split('.')[0] in file_name:
            result_img_path = os.path.join(result_dir, file_name)
            break

    print("Result image found:", result_img_path)

    if result_img_path and os.path.exists(result_img_path):
        encoded_img = encode_image(result_img_path)
    else:
        encoded_img = None

    return jsonify({
        'summary': summary,
        'result_image': encoded_img
    })

@app.route('/detect/video', methods=['POST'])
def detect_video():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No video file uploaded'}), 400

    filename = f"{uuid.uuid4()}.mp4"
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(input_path)

    yolov5_path = os.path.abspath("yolov5")

    process = subprocess.Popen(
        ['python', 'detect.py',
         '--weights', 'D:/NEWtamper/yolov5/best.pt',
         '--source', input_path,
         '--project', 'runs/detect',
         '--name', 'result',
         '--exist-ok',
         '--conf-thres', '0.05'],
        cwd=yolov5_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True
    )
    output, _ = process.communicate()
    summary = summarize_from_console(output)

    return jsonify({'summary': summary})

@app.route('/detect/webcam', methods=['GET'])
def detect_webcam():
    yolov5_path = os.path.abspath("yolov5")

    process = subprocess.Popen(
        ['python', 'detect.py',
         '--weights', 'D:/NEWtamper/yolov5/best.pt',
         '--source', '0',
         '--view-img',
         '--project', 'runs/detect',
         '--name', 'result',
         '--exist-ok',
         '--conf-thres', '0.2'],
        cwd=yolov5_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        universal_newlines=True
    )
    output, _ = process.communicate()
    summary = summarize_from_console(output, source_type="webcam")

    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
