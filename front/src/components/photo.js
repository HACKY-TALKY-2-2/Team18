import React, { useState, useRef } from "react";
import "../css/photo.css";

function Photo() {
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

  return (
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
  );
}

export default Photo;
