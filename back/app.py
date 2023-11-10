# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, send_from_directory
import doppleganger
import os


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = 'resource/uploads'
app.config['RESOURCE_FOLDER'] = 'resource/neutral'

@app.route('/upload/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(app.config['RESOURCE_FOLDER'], filename)

@app.route('/compare', methods=['POST'])
def upload_images():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        
        # 이미지를 업로드 경로에 저장
        file.save(upload_path)

        # 업로드된 이미지의 경로를 반환
        return jsonify({'image_path': upload_path, 'filename': file.filename})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/dopple', methods=['POST'])
def upload_image():
    try:
        # 이미지 파일을 받음
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']

        # 파일이 없을 경우 예외 처리
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        # 이미지를 업로드할 경로 설정
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        
        # 이미지를 업로드 경로에 저장
        file.save(upload_path)

        # 업로드된 이미지의 경로를 반환
        return jsonify({'image_path': upload_path, 'filename': file.filename})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/dopple/<filename>', methods=['GET'])
def get_dopple(filename):
    try:
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        sim, dopple_path = doppleganger.find_doppleganger(img_path, app.config['RESOURCE_FOLDER'])

        return jsonify({'sim': sim, 'image_url': 'http://localhost:5000/upload/' + dopple_path})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run('0.0.0.0',port=5000, debug=True)

