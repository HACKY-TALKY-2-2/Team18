# -*- coding: utf-8 -*-
import face_recognition

threshold = 0.6
def face_compare(fst_img:str = 'obama', snd_img:str = 'obama2'):
    fst_np_img = face_recognition.load_image_file(f"resource/Images/{fst_img}.jpg")
    snd_np_img = face_recognition.load_image_file(f"resource/Images/{snd_img}.jpg")

    # Get the face encodings for the known images
    fst_face_encoding = face_recognition.face_encodings(fst_np_img)[0]
    snd_face_encoding = face_recognition.face_encodings(snd_np_img)[0]

    # See how far apart the test image is from the known faces
    face_distance = face_recognition.face_distance([fst_face_encoding], snd_face_encoding)[0]

    print(f"유사도는 {round((1-face_distance)*100, 2)}% 입니다.")
    if face_distance < threshold: print("닮으셨네요")
    else: print("안 닮았네요")