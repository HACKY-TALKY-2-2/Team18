import face_recognition
import numpy as np
import matplotlib.pyplot as plt

#TODO: 이미지 이름 변경
image_file_name = "/content/me.jpg"
image = face_recognition.load_image_file(image_file_name)
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

import matplotlib.pyplot as plt
import numpy as np

# 좌표를 담을 리스트 초기화
scaled_landmarks = [{}]
scaled_points = []
maxx = minx = face_landmarks_list[0]['chin'][0][0]
maxy = miny = face_landmarks_list[0]['chin'][1][1]

# x와 y를 각각 따로 추출하여 min-max scaling
for feature, points in face_landmarks_list[0].items():
    for x, y in points:
        minx = min(minx, x)
        miny = min(miny, y)
        maxx = max(maxx, x)
        maxy = max(maxy, y)

for feature, points in face_landmarks_list[0].items():
    scaled_points = np.array(points)
    scaled_points_x = (scaled_points[:, 0] - minx) / (maxx - minx)
    scaled_points_y = (scaled_points[:, 1] - miny) / (maxy - miny)
    # 튜플로 묶어주기
    scaled_points_combined = list(zip(scaled_points_x, scaled_points_y))

    scaled_landmarks[0][feature] = scaled_points_combined

print(face_landmarks_list[0])
face_landmarks_list = scaled_landmarks

print(face_landmarks_list[0])
# 코의 중심 좌표 계산

nose_bridge = np.array(face_landmarks_list[0]['nose_bridge'])
nose_center = np.mean(nose_bridge, axis=0)
print(nose_bridge[1,0])
print(nose_bridge[3,0] - nose_bridge[0,0], nose_bridge[3, 1] - nose_bridge[0, 1])

print("nose_center: ", nose_center)

# 코를 y축과 평행하게끔 회전 각도 계산 (x축과 평행하도록 수정)
angle = np.arctan2(nose_bridge[3, 0] - nose_bridge[0, 0], nose_bridge[3, 1] - nose_bridge[0, 1]) * (180 / np.pi)
print(angle)

# 전체 특징점을 회전 및 좌우 대칭
rotated_landmarks = []
for feature, points in face_landmarks_list[0].items():
    rotated_points = np.array(points) - nose_center
    rotated_points = np.dot(rotated_points, np.array([[np.cos(np.radians(-angle)), -np.sin(np.radians(-angle))], [np.sin(np.radians(-angle)), np.cos(np.radians(-angle))]]))
    rotated_points = rotated_points + nose_center
    rotated_landmarks.append(rotated_points)

print(nose_center[0])
# nose_bridge를 기준으로 좌우 대칭 비교
symmetry_scores = []
fea = {}
fea_reversed = {}
nose_bridge = np.array(face_landmarks_list[0]['nose_bridge'])

for feature, points in face_landmarks_list[0].items():
    fea[feature] = np.array(face_landmarks_list[0][feature])

print("chin : ")
fea_reversed['chin'] = fea['chin'][::-1]
for i in range(0,8):
    x1, y1 = fea['chin'][i]
    x2, y2 = fea_reversed['chin'][i]
    print(x1, y1, x2, y2, x1+x2-2*nose_center[0], (y2-y1))
    symmetry_scores.append(np.sqrt((x1+x2-2*nose_center[0])**2/5 + (y2-y1)**2))

print("eyebrow : ")
fea_reversed['right_eyebrow'] = fea['right_eyebrow'][::-1]
for i in range(0, 5):
    x1, y1 = fea['left_eyebrow'][i]
    x2, y2 = fea_reversed['right_eyebrow'][i]
    print(x1, y1, x2, y2, x1 + x2 - 2 * nose_center[0], (y2 - y1))
    symmetry_scores.append(np.sqrt((x1 + x2 - 2 * nose_center[0]) ** 2 + (y2 - y1) ** 2))

print("eye : ")
fea_reversed['right_eye'] = fea['right_eye'][::-1]
for i in range(0,6):
    if i < 4:
        x1, y1 = fea['left_eye'][i]
        x2, y2 = fea_reversed['right_eye'][i+2]
    else:
        x1, y1 = fea['left_eye'][i]
        x2, y2 = fea_reversed['right_eye'][i - 4]
    print(x1, y1, x2, y2, x1+x2-2*nose_center[0], (y2-y1))
    symmetry_scores.append(np.sqrt((x1+x2-2*nose_center[0])**2 + (y2-y1)**2))

print("nose tip : ")
fea_reversed['nose_tip'] = fea['nose_tip'][::-1]
for i in range(0,2):
    x1, y1 = fea['nose_tip'][i]
    x2, y2 = fea_reversed['nose_tip'][i]
    print(x1, y1, x2, y2, x1+x2-2*nose_center[0], (y2-y1))
    symmetry_scores.append(np.sqrt((x1+x2-2*nose_center[0])**2 + (y2-y1)**2))

print("top lip : ")
fea_reversed['top_lip'] = fea['top_lip'][::-1]
for i in range(0,5):
    if i < 3:
        x1, y1 = fea['top_lip'][i]
        x2, y2 = fea_reversed['top_lip'][i+5]
    else:
        x1, y1 = fea['top_lip'][i+7]
        x2, y2 = fea_reversed['top_lip'][i]
    print(x1, y1, x2, y2, x1+x2-2*nose_center[0], (y2-y1))
    symmetry_scores.append(np.sqrt((x1+x2-2*nose_center[0])**2 + (y2-y1)**2))

print("bottom lip : ")
fea_reversed['bottom_lip'] = fea['bottom_lip'][::-1]
for i in range(0,5):
    if i < 3:
        x1, y1 = fea['bottom_lip'][i]
        x2, y2 = fea_reversed['bottom_lip'][i+5]
    else:
        x1, y1 = fea['bottom_lip'][i+7]
        x2, y2 = fea_reversed['bottom_lip'][i]
    print(x1, y1, x2, y2, x1+x2-2*nose_center[0], (y2-y1))
    symmetry_scores.append(np.sqrt((x1+x2-2*nose_center[0])**2 + (y2-y1)**2))

print(symmetry_scores, sum(symmetry_scores))

# 결과 출력
print("전체적인 회전 각도:", angle)
print(symmetry_scores)
print("좌우 비대칭 정도:", sum(symmetry_scores))

# 시각화
fig, ax = plt.subplots()

# 회전 및 대칭된 얼굴 윤곽 그리기
for feature, points in zip(face_landmarks_list[0].keys(), rotated_landmarks):
    x, y = zip(*points)
    plt.plot(x, y, marker='x')

plt.axis('equal')
plt.gca().invert_yaxis()
plt.show()