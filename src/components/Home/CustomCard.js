import React, { useState, useEffect } from "react";
import "./CustomCard.css";

const CustomCard = ({ url, left, onClick }) => {
  const [image, setImage] = useState(true);

  const checkUrl = () => {
    var img = new Image();
    img.onerror = () => {
      setImage(false);
    };
    img.src = url;
  };

  useEffect(() => {
    checkUrl();
  }, []);

  return (
    <div className="custom-card" onClick={onClick}>
      <div className="card-content">
        {image ? (
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
            src={url}
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
