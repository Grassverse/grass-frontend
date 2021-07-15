import "./CustomCard.css";
import React, { useState, useEffect } from "react";

import axios from "axios";

const CustomCard = ({ url, onClick }) => {
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
    if (url === "") return;
    if (
      url === undefined ||
      url.startsWith("https://") ||
      url.startsWith("/static/media")
    ) {
      loadMedia(url);
    } else {
      axios
        .get(`https://ipfs.io/ipfs/${url}`)
        .then((res) => {
          loadMedia(
            `https://ipfs.io/ipfs/${res.data.image.split("ipfs://")[1]}`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    checkUrl();
  }, [url]);

  return (
    <div className="custom-card-2" onClick={onClick}>
      <div className="card-content-2">
        {source === "" ? null : image ? (
          <img
            className="card-image-2"
            src={source}
            alt="card-main"
            draggable="false"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            className="card-vid-2"
            src={source}
            alt="card-main"
            draggable="false"
          ></video>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
