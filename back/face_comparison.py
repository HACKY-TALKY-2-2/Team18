# -*- coding: utf-8 -*-
import face_recognition


def face_compare(fst_path:str, snd_path:str):
    fst_np_img = face_recognition.load_image_file(fst_path)
    snd_np_img = face_recognition.load_image_file(snd_path)

    fst_face_encoding = face_recognition.face_encodings(fst_np_img)[0]
    snd_face_encoding = face_recognition.face_encodings(snd_np_img)[0]

    face_distance = face_recognition.face_distance([fst_face_encoding], snd_face_encoding)[0]

    return 1-face_distance