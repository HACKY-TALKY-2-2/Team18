import React, { useState, useRef } from "react";
import "../css/photo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Photo() {
  const locate = useLocation();
  const navigate = useNavigate();
  

  const [images, setImages] = useState([
    { selectedImage: null, previewImage: null },
    { selectedImage: null, previewImage: null },
  ]);

  const [textFirstInput, setTextFirstInput] = useState("");
  const [textSecondInput, setTextSecondInput] = useState("");

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

  const handleTextSecondChange = (e) => {
    setTextSecondInput(e.target.value);
  };

  //이미지 서버로 업로드하는 코드
  const handleUpload = async () => {
    // FormData 객체 생성
    const formData = new FormData();

    // 이미지 파일 추가
    images.forEach((image, index) => {
      if (image.selectedImage) {
        formData.append(`file${index + 1}`, image.selectedImage);
      }
    });

    try {
      // 서버에 POST 요청 보내기
      const response = await axios.post(
        "http://101.101.211.232:5000/compare",
        formData
      );
      // 서버 응답 처리
      console.log(response.data);
    } catch (error) {
      // 오류 처리
      console.error("Error uploading images:", error);
    }

  };

  const handleRegister = () => {
    navigate("/simResult", {state:{name1:textFirstInput, name2:textSecondInput}});
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
        <div className="similarity">
          <h6>얼마나 닮았을까?</h6>
        </div>
        <div className="photo-image-container">
          <div className="text-input-container">
            <input
              className="form-control"
              type="text"
              placeholder="이름 2"
              aria-label="default input example"
              value={textSecondInput}
              onChange={handleTextSecondChange}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e, 1)}
            ref={fileInputRefs[1]}
          />
          {images[1].previewImage ? (
            <img src={images[1].previewImage} alt="Preview 2" className="img" />
          ) : (
            <img
              src={`https://via.placeholder.com/300`}
              alt="Example 2"
              className="img"
            />
          )}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleButtonClick(1)}
          >
            이미지 업로드
          </button>
        </div>
      </div>
      <button
        style={{ marginBottom: "10px" }}
        type="button"
        className="btn btn-success"
        onClick={handleRegister}
      >
        등록하기
      </button>
    </div>
  );
}

export default Photo;
