import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

function DrawStartBox() {
  return (
    <div>
      <div className="serviceLogo">
        <h1>서비스 명</h1>
        <h5>커플 매칭의 완벽한 대칭, 두 마음이 만나는 특별한 순간</h5>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button class="btn btn-primary" type="button">
          유사도
        </button>
        <button class="btn btn-primary" type="button">
          매칭
        </button>
      </div>
    </div>
  );
}

export default DrawStartBox;
