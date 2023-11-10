import React from "react";
import "bootstrap";

function Discription({props}) {
  const result = (res,sim)=>{
    if(res==1){
      const h = 70;
      const m = 40;
      if(sim>h){
        return (
          <p>당신은 최고의 커플이네요!</p>
        );
      }
      else if(sim>m){
        return (
          <p>조금만 더 노력하면 좋은 커플이 될 수 있어요!</p>
        );
      }
      else{
        return (
          <p>아쉽지만 잘 맞지 않는 커플이네요...</p>
        );
      }
    }
    else if(res==2){
      const h = 70;
      const m = 40;
      if(sim>h){
        return (
          <p>당신은 대칭왕!</p>
        );
      }
      else if(sim>m){
        return (
          <p>조금만 더 노력하면 대칭적</p>
        );
      }
      else{
        return (
          <p>삐뚤어지셨네요</p>
        );
      }
    }
    else{
      return(
        <p>당신의 반쪽을 찾으셨군요?</p>
      );
    }
  }
  return (
    <div className="SR-Discription">
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            {result(props.res,props.similarity)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Discription;
