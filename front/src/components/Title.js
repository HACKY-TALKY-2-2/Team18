import React from "react";
import "bootstrap";

function Title({props}) {
  const result = (sim)=>{
    console.log(sim);
    const h = 80;
    const m = 60;
    if(sim>h){
      return (
        <>
          <h1>우리는 찰떡 궁합!</h1>
        </>
      );
    }
    else if(sim>m){
      return (
        <>
          <h1>자기 나 안 사랑해?</h1>
        </>
      );
    }
    else{
      return (
        <>
          <h1>우리 헤어져...</h1>
        </>
      );
    }
  }
  return (
    <div className="title">
      {result(Math.min(props.similarity*200,100))}
      <h5>{props.name1}님과 {props.name2}님의 닮은 정도는 {Math.min(props.similarity*200,100)}%입니다.</h5>
    </div>
  );
}

export default Title;
