import React from "react";
import DrawHeader from "../components/Header";
import DrawSimilarLogo from "../components/similarLogo";
import Photo from "../components/photo";

function SimilarPage() {
  return (
    <div>
      <DrawHeader></DrawHeader>
      <DrawSimilarLogo></DrawSimilarLogo>
      <Photo></Photo>
    </div>
  );
}

export default SimilarPage;
