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
          <h1>너는 내 운명</h1>
          <h5>Your My Destiny...</h5>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-success"
            type="button"
            onClick={navigateToSimilar}
          >
            유사도
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawStartBox;
