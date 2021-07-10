import React, { useState, useEffect } from "react";

const Preview = ({ url }) => {
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

  useEffect(() => {
    loadMedia(url);
  }, [url]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {image ? (
        <img
          src={source}
          alt="card-main"
          draggable="false"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          src={source}
          alt="card-main"
          draggable="false"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ></video>
      )}
    </div>
  );
};

export default Preview;
