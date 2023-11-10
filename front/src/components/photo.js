import React, { useState } from "react";
import "../css/photo.css";

function Photo() {
  const [imageSrc, setImageSrc] = useState(null);

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <div className="couple-container">
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <button type="button" className="btn btn-success">
          사진 업로드
        </button>
      </div>
      <div className="similarity">
        <h6>100%</h6>
      </div>
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <button type="button" className="btn btn-success">
          사진 업로드
        </button>
      </div>
    </div>
  );
}

export default Photo;
