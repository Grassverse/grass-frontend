import "./CustomCard.css";
import React from "react";

const CustomCard = ({ url, vid }) => {
  return (
    <div className="custom-card-2">
      <div className="card-content-2">
        {url ? (
          <img
            className="card-image-2"
            src={url}
            alt="card-main"
            draggable="false"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="card-vid-2"
            src={vid}
            alt="card-main"
            draggable="false"
          ></video>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
