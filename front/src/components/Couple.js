import React from "react";
import "bootstrap";

function Couple({props}) {
  console.log(props);
  return (
    <div className="couple-container">
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <h6 className="name">{props.name1}</h6>
      </div>
      <div className="similarity">
        <h6>{props.similarity}%</h6>
      </div>
      <div className="image-container">
        <img src={"./example.png"} alt="img1" className="img"></img>
        <h6 className="name">{props.name2}</h6>
      </div>
    </div>
  );
}

export default Couple;