import "./CustomCard.css";
import React from "react";

const CustomCard = ({ url, vid, left, onClick }) => {
  return (
    <div className="custom-card" onClick={onClick}>
      <div className="card-content">
        {url ? (
          <img
            className="card-image"
            src={url}
            alt="card-main"
            draggable="false"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="card-vid"
            src={vid}
            alt="card-main"
            draggable="false"
          ></video>
        )}
        <span className="left-one">{left}</span>
        <span className="right-one">S</span>
      </div>
    </div>
  );
};

export default CustomCard;
