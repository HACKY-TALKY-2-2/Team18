import React from "react";
import "bootstrap";

function Couple({props}) {
  console.log(props);
  return (
    <div className="couple-container">
      <div className="image-container">
        <h6 className="SR-name">{props.name1}</h6>
        <img src={"./example.png"} alt="img1" className="image"></img>
      </div>
      <div className="similarity">
        <h6>{props.similarity}%</h6>
      </div>
      <div className="image-container">
        <h6 className="SR-name">{props.name2}</h6>
        <img src={"./example_w.png"} alt="img2" className="image"></img>
      </div>
    </div>
  );
}

export default Couple;