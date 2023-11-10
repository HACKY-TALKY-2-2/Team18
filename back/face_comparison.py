# -*- coding: utf-8 -*-
import face_recognition


def face_compare(img_dir:str ="resource/Images"):
    fst_np_img = face_recognition.load_image_file(img_dir+"/fst.jpg")
    snd_np_img = face_recognition.load_image_file(img_dir+"/snd.jpg")

    # Get the face encodings for the known images
    fst_face_encoding = face_recognition.face_encodings(fst_np_img)[0]
    snd_face_encoding = face_recognition.face_encodings(snd_np_img)[0]

    # See how far apart the test image is from the known faces
    face_distance = face_recognition.face_distance([fst_face_encoding], snd_face_encoding)[0]

    return 1-face_distance