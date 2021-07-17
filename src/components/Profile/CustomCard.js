import React, { useState, useEffect } from "react";
import "./CustomCard.css";

import Web3 from "web3";

import { Avatar } from "@material-ui/core";

import axios from "axios";

const CustomCard = ({ url, onClick, nft }) => {
  const [image, setImage] = useState(true);
  const [source, setSource] = useState("");

  const [creator, setCreator] = useState(null);

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

  const getCreator = () => {
    console.log(nft);
    axios
      .get(`/api/users/${nft.creator.id}`)
      .then((res) => {
        if (res.data.dp) setCreator(res.data.dp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (nft && nft.creator) getCreator();
  }, [nft]);

  useEffect(() => {
    checkUrl();
  }, []);

  return (
    <div
      className="custom-card"
      onClick={onClick}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    >
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
        {nft.sale ? <span className="left-one">SALE</span> : null}
        <span className="right-one">
          {creator ? <Avatar src={creator}></Avatar> : null}
        </span>
        <div className="hover-card">
          <div
            style={{
              textAlign: "center",
              padding: "20px",
            }}
          >
            {nft.name}
            <p
              style={{
                wordWrap: "break-word",
                fontFamily: "AirbnbCerealLight",
              }}
            >
              {nft.owner.substr(2, 4) + "..." + nft.owner.substr(-4)}
            </p>
            {nft.sale ? (
              <p
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "4px 0px",
                  borderRadius: "5px",
                }}
              >
                {Web3.utils.fromWei(nft.sale.price, "ether") + " ETH"}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
