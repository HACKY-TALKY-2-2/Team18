import React from "react";
import DrawHeader from "../components/Header";
import DrawMatchLogo from "../components/matchLogo";
import PhotoMatch from "../components/photoMatch";

function matchPage() {
  return (
    <div>
      <DrawHeader></DrawHeader>
      <DrawMatchLogo></DrawMatchLogo>
      <PhotoMatch></PhotoMatch>
    </div>
  );
}

export default matchPage;
