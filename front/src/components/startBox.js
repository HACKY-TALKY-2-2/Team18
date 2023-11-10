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

  function navigateToSingleSimilar() {
    navigate("/symmetry");
  }

  function navigateToMatch() {
    navigate("/match");
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
            자기야, 나 사랑해? 얼만큼?
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={navigateToSingleSimilar}
          >
            나는 나를 사랑할까?
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={navigateToMatch}
          >
            내 도플갱어를 찾아서
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawStartBox;
