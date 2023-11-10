import React from "react";
import "bootstrap";

function Couple() {
  return (
    <div className="couple-container">
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <h6 className="name">이름1</h6>
      </div>
      <div className="similarity">
        <h6>100%</h6>
      </div>
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <h6 className="name">이름2</h6>
      </div>
    </div>
  );
}

export default Couple;