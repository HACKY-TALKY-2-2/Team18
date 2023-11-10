# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify, send_from_directory
import doppleganger
import face_comparison
import face_for_single
import os


app = Flask(__name__)


app.config['UPLOAD_FOLDER'] = 'resource/uploads'
app.config['RESOURCE_FOLDER'] = 'resource/neutral'

DOPPLE = "dopple.jpg"
SINGLE = "single.jpg"
FIRST = "first.jpg"
SECOND = "second.jpg"
URL = "http://localhost:5000/upload/"

@app.route('/upload/<filename>/<state>', methods=['GET'])
def uploaded_file(filename, state=0):
    if state == '0':
        return send_from_directory(app.config['RESOURCE_FOLDER'], filename)
    else:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/single', methods=['POST'])
def upload_single():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        upload_path = os.path.join(app.config['UPLOAD_FOLDER'],SINGLE)
        file.save(upload_path)

        return jsonify({'image_path': upload_path})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/single/symmetric', methods=['GET'])
def get_symmetric():
    path = os.path.join(app.config['UPLOAD_FOLDER'],SINGLE)
    score = face_for_single.symmetric(path)

    return jsonify({"score":score,'image_url': URL + SINGLE +'/1'})

@app.route('/compare', methods=['POST'])
def upload_images():
    try:
        if 'file1' not in request.files or 'file2' not in request.files:
            return jsonify({'error': 'No file part'})

        file1 = request.files['file1']
        file2 = request.files['file2']
        if file1.filename == '' or file2.filename == '':
            return jsonify({'error': 'No selected file'})

        upload_path1 = os.path.join(app.config['UPLOAD_FOLDER'], FIRST)
        file1.save(upload_path1)
        upload_path2 = os.path.join(app.config['UPLOAD_FOLDER'], SECOND)
        file2.save(upload_path2)
        return jsonify({"image_path1":upload_path1, "image_path2":upload_path2})
    except:
        return jsonify({"error": "Error saving"})

@app.route('/compare/similarity', methods=['GET'])
def compare_similarity():
    try:
        fst_path = os.path.join(app.config['UPLOAD_FOLDER'],FIRST)
        snd_path = os.path.join(app.config['UPLOAD_FOLDER'],SECOND)
        sim = face_comparison.face_compare(fst_path, snd_path)

        return jsonify({'sim': sim, 'fst_url': URL+FIRST+'/1', 'snd_url': URL+SECOND+'/1'})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/dopple', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], DOPPLE)
        file.save(upload_path)

        return jsonify({'image_path': upload_path})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/dopple/find', methods=['GET'])
def get_dopple():
    try:
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], DOPPLE)
        sim, name, dopple_path = doppleganger.find_doppleganger(img_path, app.config['RESOURCE_FOLDER'])

        return jsonify({'sim': sim, 'name': name, 'image_url': URL + dopple_path+'/0'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run('0.0.0.0',port=5000, debug=True)

