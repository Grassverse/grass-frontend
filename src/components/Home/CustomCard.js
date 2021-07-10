import React, { useState, useEffect } from "react";
import "./CustomCard.css";

import axios from "axios";

const CustomCard = ({ url, left, onClick }) => {
  const [image, setImage] = useState(true);
  const [source, setSource] = useState("");

  const loadMedia = (src) => {
    setSource(src);
    var img = new Image();
    img.onerror = () => {
      setImage(false);
    };
    img.src = src;
  };

  const checkUrl = () => {
    if (
      url === undefined ||
      url.startsWith("https://") ||
      url.startsWith("/static/media")
    ) {
      loadMedia(url);
    } else {
      axios
        .get(`https://gateway.pinata.cloud/ipfs/${url}`)
        .then((res) => {
          loadMedia(
            `https://gateway.pinata.cloud/ipfs/${
              res.data.image.split("ipfs://")[1]
            }`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            src={source}
            alt="card-main"
            draggable="false"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="card-vid"
            src={source}
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
