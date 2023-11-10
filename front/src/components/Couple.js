import React from "react";
import "bootstrap";

function Couple({props}) {
  console.log(props);
  return (
    <div className="SR-couple-container">
      <div className="SR-image-container">
        <img src={"./example.png"} alt="img1" className="SR-img"></img>
        <h6 className="SR-name">{props.name1}</h6>
      </div>
      <div className="SR-similarity">
        <h6>{props.similarity}%</h6>
      </div>
      <div className="SR-image-container">
        <img src={"./example.png"} alt="img1" className="SR-img"></img>
        <h6 className="SR-name">{props.name2}</h6>
      </div>
    </div>
  );
}

export default Couple;