import React, { useState, useRef } from "react";
import "../css/photo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PhotoSol() {
  const locate = useLocation();
  const navigate = useNavigate();
  
  const [images, setImages] = useState([
    { selectedImage: null, previewImage: null },
    { selectedImage: null, previewImage: null },
  ]);

  const [textFirstInput, setTextFirstInput] = useState("");

  const fileInputRefs = [useRef(null), useRef(null)];

  const handleImageChange = (e, index) => {
    const imageFile = e.target.files[0];

    // 이미지 파일이 있는 경우
    if (imageFile) {
      // 파일을 상태에 저장
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = {
          selectedImage: imageFile,
          previewImage: URL.createObjectURL(imageFile),
        };
        return newImages;
      });
    }
  };

  const handleButtonClick = (index) => {
    // 파일 선택 창 열기
    fileInputRefs[index].current.click();
  };

  const handleTextFirstChange = (e) => {
    setTextFirstInput(e.target.value);
  };

  const handleUpload = async () => {
    // FormData 객체 생성
    const formData = new FormData();

    // 이미지 파일 추가
    images.forEach((image, index) => {
      if (image.selectedImage) {
        formData.append(`image${index + 1}`, image.selectedImage);
      }
    });

    try {
      // 서버에 POST 요청 보내기
      const response = await axios.post(
        "http://your-server-endpoint",
        formData
      );

      // 서버 응답 처리
      console.log(response.data);
    } catch (error) {
      // 오류 처리
      console.error("Error uploading images:", error);
    }
    navigate("/symResult");
  };

  return (
    <div className="SimRes">
      <div className="couple-container">
        <div className="photo-image-container">
          <div className="text-input-container">
            <input
              className="form-control"
              type="text"
              placeholder="이름 1"
              aria-label="default input example"
              value={textFirstInput}
              onChange={handleTextFirstChange}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e, 0)}
            ref={fileInputRefs[0]}
          />
          {images[0].previewImage ? (
            <img src={images[0].previewImage} alt="Preview 1" className="img" />
          ) : (
            <img
              src={`https://via.placeholder.com/300`}
              alt="Example 1"
              className="img"
            />
          )}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleButtonClick(0)}
          >
            이미지 업로드
          </button>
        </div>
      </div>
      <button type="button" className="btn btn-success" onClick={handleUpload}>
        등록하기
      </button>
    </div>
  );
}

export default PhotoSol;
