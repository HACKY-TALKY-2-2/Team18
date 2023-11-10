import React from "react";
import "bootstrap";

function SNS() {
  return (
    <div className="SR-SNS">
      <button type="button" id="shareTw" class="SR-btn_comm">트위터로 공유하기</button>
      <button type="button" id="shareFb" class="SR-btn_comm">페이스북으로 공유하기</button>
      <button type="button" id="shareKt" class="SR-btn_comm">카카오톡으로 공유하기</button>
      <button type="button" id="shareKs" class="SR-btn_comm">카카오스토리로 공유하기</button>
    </div>
  );
}

export default SNS;
