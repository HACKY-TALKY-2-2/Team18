import React from "react";
import "bootstrap";

function Discription({props}) {
  const result = (sim)=>{
    if(sim===100){
      return (
        <p>천생연분이네요~<br/>사랑하면 닮는다더니...</p>
      );
    }
    return (
      <p>좀 더 노력해보세요!</p>
    )
  }

  return (
    <div className="SR-Discription">
      <p>
        {props.name1}님과 {props.name2}님은 {props.similarity}% 닮았습니다.
        {result(props.similarity)}
      </p>
    </div>
  );
}

export default Discription;
