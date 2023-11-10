import face_recognition
import os
import pandas as pd
import re

path_dir = "resource/neutral/"
file_list = os.listdir(path_dir)
encoding_df = pd.DataFrame({"img": [], "encode": [], "name": []})

print("iter = ", end=" ")
for i, file in enumerate(file_list):
    img = face_recognition.load_image_file(path_dir+file)
    try:
        face_encoding = face_recognition.face_encodings(img)[0]
        df = pd.DataFrame({"img": [file], "encode": [face_encoding], "name":[re.sub("_\d\d\d\d[.]jpg", "", file)]})
        encoding_df = pd.concat([encoding_df,df])
    except:
        continue

    print(i, end=", ")
    if i%100 == 0:
        print("\niter : ", i, end=" ")

print("encode end")
encoding_df.to_csv(path_dir+"encoding.csv")