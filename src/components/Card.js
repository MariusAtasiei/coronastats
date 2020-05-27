import React from "react";
import "./Card.css";

const cardStyle = {
  width: "400px",
    margin: "10px"
};

function Card({type, number}) {
  return (
    <div id="btn" style={cardStyle}>
      <span className="noselect">{type}: {number}</span>
      <div id="circle"></div>
    </div>
  );
}

export default Card;
