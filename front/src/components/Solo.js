import React from "react";
import "bootstrap";

function Solo({props}) {
  console.log(props);
  return (
    <div className="couple-container">
      <div className="image-container">
        <h6 className="SR-name">{props.name1}</h6>
        <img src={"./example.png"} alt="img1" className="image"></img>
      </div>
    </div>
  );
}

export default Solo;