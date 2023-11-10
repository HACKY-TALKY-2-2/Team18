import React from "react";
import "bootstrap";

function TitleMatch({props}) {
  return (
    <div className="title">
      <h1>당신의 도플갱어는...</h1>
      <h5>{props.name1}님과 도플갱어는 {props.name2}입니다.</h5>
      <h5>도플갱어와 {props.similarity}%만큼 닮았어요~</h5>
    </div>
  );
}

export default TitleMatch;
