import Title from "../components/Title";
import Couple from "../components/Couple";
import SNS from "../components/SNS";
import Discription from "../components/Discription";
import DrawHeader from "../components/Header";
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import "../css/SimResPage.css";

const SimResPage = ({img1,img2,name1,name2}) => {
  const captureRef = useRef(null);

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = '당신과_그의_유사도.png';
        link.click();
      });
    }
  };

  return (
    <div className="SimRes">
      <DrawHeader></DrawHeader>
      <div className="SR-save" ref={captureRef}>
        <Title></Title>
        <Couple props={{similarity:10, name1:"이1", name2:"이2", img1:"",img2:""}}></Couple>
        <Discription props={{similarity:10, name1:"이1", name2:"이2"}}></Discription>
      </div>
      <button type="button" className="btn btn-success" onClick={handleCaptureClick}>결과 저장하기</button>
    </div>
  );
}

export default SimResPage;