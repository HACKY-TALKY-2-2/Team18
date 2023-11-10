import React from "react";

import "@popperjs/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/startBox.css";
import { useNavigate } from "react-router-dom";

function DrawStartBox() {
  const navigate = useNavigate();

  function navigateToSimilar() {
    navigate("/similar");
  }
  return (
    <div className="container">
      <div className="center">
        <div className="serviceLogo">
          <h1>서비스 명</h1>
          <h5>사랑하면 닮는다던데......</h5>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-success"
            type="button"
            onClick={navigateToSimilar}
          >
            유사도
          </button>
          <button className="btn btn-success" type="button">
            매칭
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawStartBox;
