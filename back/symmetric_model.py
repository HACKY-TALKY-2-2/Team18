import face_recognition
import cv2
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

# Load a sample picture and learn how to recognize it.
obama_image = face_recognition.load_image_file("/content/drive/MyDrive/얼굴인식/obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

# Load a second sample picture and learn how to recognize it.
biden_image = face_recognition.load_image_file("/content/drive/MyDrive/얼굴인식/biden.jpg")
biden_face_encoding = face_recognition.face_encodings(biden_image)[0]

# Load a second sample picture and learn how to recognize it.
jaemin_image = face_recognition.load_image_file("/content/drive/MyDrive/얼굴인식/jaemin.jpg")
jaemin_face_encoding = face_recognition.face_encodings(jaemin_image)[0]

# Create arrays of known face encodings and their names
known_face_encodings = [
    obama_face_encoding,
    biden_face_encoding,
    jaemin_face_encoding
]
known_face_names = [
    "Barack Obama",
    "Joe Biden",
    "Jaemin"
]

# cap = cv2.VideoCapture(0)               # 0번 카메라 장치 연결 ---①
# if cap.isOpened():                      # 캡쳐 객체 연결 확인
#     while True:
#         ret, img = cap.read()           # 다음 프레임 읽기
#         if ret:
#             cv2.imshow('video',img)             # 다음 프레임 이미지 표시
#             if cv2.waitKey(1) != -1:    # 1ms 동안 키 입력 대기 ---②
#                 break                   # 아무 키라도 입력이 있으면 중지
#         else:
#             print('no frame')
#             break
# else:
#     print("can't open camera.")
# cap.release()                           # 자원 반납
# cv2.destroyAllWindows()


from IPython.display import display, Javascript
from google.colab.output import eval_js
from base64 import b64decode

def take_photo(filename, quality=0.8):
  js = Javascript('''
    async function takePhoto(quality) {
      const div = document.createElement('div');
      const capture = document.createElement('button');
      capture.textContent = 'Capture';
      div.appendChild(capture);

      const video = document.createElement('video');
      video.style.display = 'block';
      const stream = await navigator.mediaDevices.getUserMedia({video: true});

      document.body.appendChild(div);
      div.appendChild(video);
      video.srcObject = stream;
      await video.play();

      // Resize the output to fit the video element.
      google.colab.output.setIframeHeight(document.documentElement.scrollHeight, true);

      // Wait for Capture to be clicked.
      await new Promise((resolve) => capture.onclick = resolve);

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      stream.getVideoTracks()[0].stop();
      div.remove();
      return canvas.toDataURL('image/jpeg', quality);
    }
    ''')
  display(js)
  data = eval_js('takePhoto({})'.format(quality))
  binary = b64decode(data.split(',')[1])
  with open(filename, 'wb') as f:
    f.write(binary)
  return filename

from IPython.display import Image
# 첫번째 시도
try:
  filename = take_photo(filename='me.jpg')
  print('Saved to {}'.format(filename))
  
  # Show the image which was just taken.
  display(Image(filename))
except Exception as err:
  # Errors will be thrown if the user does not have a webcam or if they do not
  # grant the page permission to access it.
  print(str(err))

import time
time.sleep(2)

# 두번째 시도
# try:
#   filename = take_photo(filename='unknown.jpg')
#   print('Saved to {}'.format(filename))
  
#   # Show the image which was just taken.
#   display(Image(filename))
# except Exception as err:
#   # Errors will be thrown if the user does not have a webcam or if they do not
#   # grant the page permission to access it.
#   print(str(err))

# time.sleep(5)

image = face_recognition.load_image_file("/content/me.jpg")
face_landmarks_list = face_recognition.face_landmarks(image)
print(face_landmarks_list)
fig, ax = plt.subplots()

# 얼굴 윤곽 그리기
for feature, points in face_landmarks_list[0].items():
    # 특징별로 선 그리기
    if feature in ['chin', 'left_eyebrow', 'right_eyebrow', 'top_lip', 'bottom_lip']:
        x, y = zip(*points)
        plt.plot(x, y, marker='o')

    # 특징별로 점 그리기
    elif feature in ['nose_bridge', 'nose_tip', 'left_eye', 'right_eye']:
        x, y = zip(*points)
        plt.scatter(x, y, marker='o')

# 이미지 출력
plt.axis('equal')
plt.gca().invert_yaxis()  # y축을 뒤집어서 이미지를 정상적으로 출력
plt.show()

#############################################################################

# 코의 중심 좌표 계산
nose_bridge = np.array(face_landmarks_list[0]['nose_bridge'])
nose_center = np.mean(nose_bridge, axis=0)

# 코를 y축과 평행하게끔 회전 각도 계산 (x축과 평행하도록 수정)
angle = np.arctan2(nose_bridge[1, 0] - nose_bridge[0, 0], nose_bridge[1, 1] - nose_bridge[0, 1]) * (180 / np.pi)

# 전체 특징점을 회전 및 좌우 대칭
rotated_landmarks = []
for feature, points in face_landmarks_list[0].items():
    rotated_points = np.array(points) - nose_center
    rotated_points = np.dot(rotated_points, np.array([[np.cos(np.radians(-angle)), -np.sin(np.radians(-angle))], [np.sin(np.radians(-angle)), np.cos(np.radians(-angle))]]))
    rotated_points = rotated_points + nose_center
    rotated_landmarks.append(rotated_points)

# 좌우 대칭 비교
symmetry_scores = []
for feature, points in face_landmarks_list[0].items():
    if 'left' in feature or 'right' in feature:
        opposite_feature = feature.replace('left', 'right').replace('right', 'left')
        opposite_points = np.array(face_landmarks_list[0][opposite_feature])
        symmetry_score = np.mean(np.abs(points - opposite_points))
        symmetry_scores.append(symmetry_score)

# 결과 출력
print("전체적인 회전 각도:", angle)
print(symmetry_scores)
print("좌우 대칭성 점수:", np.mean(symmetry_scores))

# 시각화
fig, ax = plt.subplots()

# 원본 얼굴 윤곽 그리기
# for feature, points in face_landmarks_list[0].items():
#     x, y = zip(*points)
#     plt.plot(x, y, marker='o')

# 회전 및 대칭된 얼굴 윤곽 그리기
for feature, points in zip(face_landmarks_list[0].keys(), rotated_landmarks):
    x, y = zip(*points)
    plt.plot(x, y, marker='x')

plt.axis('equal')
plt.gca().invert_yaxis()
plt.show()


##############################################################################

picture_of_me = face_recognition.load_image_file("/content/me.jpg")
my_face_encoding = face_recognition.face_encodings(picture_of_me)[0]

# my_face_encoding은 이제 어느 얼굴과도 비교할 수 있는 내가 가진 얼굴 특징의 보편적인 인코딩을 포함하게 되었습니다. 

unknown_picture = face_recognition.load_image_file("/content/unknown.jpg")
unknown_face_encoding = face_recognition.face_encodings(unknown_picture)[0]

# 이제 `compare_faces`를 통해 두 얼굴이 같은 얼굴인지 비교할 수 있습니다!

results = face_recognition.compare_faces([my_face_encoding], unknown_face_encoding)

if results[0] == True:
    print("It's a picture of me!")
else:
    print("It's not a picture of me!")

# See how far apart the test image is from the known faces
face_distances = face_recognition.face_distance([my_face_encoding], unknown_face_encoding)

for i, face_distance in enumerate(face_distances):
    print("The test image has a distance of {:.2} from known image #{}".format(face_distance, i))
    print("- With a normal cutoff of 0.6, would the test image match the known image? {}".format(face_distance < 0.6))
    print("- With a very strict cutoff of 0.5, would the test image match the known image? {}".format(face_distance < 0.5))
    print()