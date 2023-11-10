# -*- coding: utf-8 -*-
import face_recognition
import pandas as pd
import numpy as np
import csv
import os

def find_doppleganger(img_dir:str ="resource/Images/biden.jpg",path_dir:str = "resource/neutral/", DEBUG=False):
    in_image = face_recognition.load_image_file(img_dir)
    img_encoding = face_recognition.face_encodings(in_image)[0]

    encoding_path = os.path.join(path_dir, "encoding.csv")
    with open(encoding_path, "r") as f:
        df = list(csv.reader(f))
        column = df[0]
        df = df[1:]
        df = pd.DataFrame(data = df, columns=column)

    encode_df = df["encode"].apply(lambda encode:[elem for elem in encode.replace("\n", " ").lstrip("[").rstrip("]").split(" ") if elem!=''])
    encode_df = encode_df.apply(lambda encode: np.fromiter(map(float, encode), dtype='float'))

    face_distances = face_recognition.face_distance(list(encode_df), img_encoding)
    match_face_distance = min(face_distances)

    idx = np.where(face_distances == match_face_distance)[0][0]
    max_df = df.loc[idx]

    return 1-match_face_distance, max_df["img"]