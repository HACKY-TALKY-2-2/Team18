import Title from "../components/Title";
import Couple from "../components/Couple";
import SNS from "../components/SNS";
import Discription from "../components/Discription";
import DrawHeader from "../components/Header";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import "../css/SimResPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SimResPage = () => {
  const [similarity, setSimilarity] = useState(null);

  useEffect(() => {
    axios.get("http://101.101.211.232:5000/compare/similarity")
    .then((response) => {
    setSimilarity(response.data.sim);
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });  }, []);
  const locate = useLocation();
  const navigate = useNavigate();
  const captureRef = useRef(null);

  const props = locate.state;
  const name1 = props.name1;

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "당신과_그의_유사도.png";
        link.click();
      });
    }
  };

  return (
    <div className="SimRes">
      <DrawHeader></DrawHeader>
      <div className="SR-save" ref={captureRef}>
        <Title props={{similarity:similarity, name1:name1, name2:props.name2}}></Title>
        <Couple props={{similarity:similarity, name1:name1, name2:props.name2, img1:props.img1,img2:props.img2}}></Couple>
        <Discription props={{res:1, similarity:similarity}}></Discription>
      </div>
      <button type="button" className="btn btn-success" onClick={handleCaptureClick}>결과 저장하기</button>
    </div>
  );
}

export default SimResPage;
