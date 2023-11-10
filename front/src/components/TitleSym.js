import React from "react";
import "bootstrap";

function TitleSym({props}) {
  const result = (sim)=>{
    const h = 70;
    const m = 30;
    if(sim>h){
      return (
        <>
          <h1>대칭</h1>
        </>
      );
    }
    else if(sim>m){
      return (
        <>
          <h1>평타치</h1>
        </>
      );
    }
    else{
      return (
        <>
          <h1>삐뚤빼뚤</h1>
        </>
      );
    }
  }
  return (
    <div className="title">
      {result(props.similarity)}
      <h5>{props.name1}님의 대칭성은 {props.similarity}%입니다.</h5>
    </div>
  );
}

export default TitleSym;
