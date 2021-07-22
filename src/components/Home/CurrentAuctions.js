import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import CustomCard from "./CustomCard";

import axios from "axios";

const useStyles = makeStyles({
  section: {
    paddingTop: "20px",
    display: "flex",
    overflowX: "auto",
    height: "460px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

let pos = { top: 0, left: 0, x: 0, y: 0 };

let ele;

const CurrentAuctions = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [nfts, setNfts] = useState([]);

  let isDragged = false;

  const preventClick = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  const mouseMoveHandler = (e) => {
    isDragged = true;
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;

    ele.style.userSelect = "none";
  };

  const mouseUpHandler = (e) => {
    if (e.target.id !== "on-sale") {
      if (isDragged) {
        e.target.addEventListener("click", preventClick);
      } else {
        e.target.removeEventListener("click", preventClick);
      }
    }
    isDragged = false;

    ele.style.removeProperty("user-select");

    ele.removeEventListener("mousemove", mouseMoveHandler);
  };

  const mouseDownHandler = (e) => {
    pos = {
      // The current scroll
      left: ele.scrollLeft,
      top: ele.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    ele.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const getCurrentAuctions = () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
          nftentities (where: {auction_not: null}) {
            name
            id
            uri
            owner
            creator{
              id
            }
            auction {
              status
              reservePrice
            }
          }
        }`,
      })
      .then((res) => {
        const data = res.data.data.nftentities;
        const sorted = data.sort((a, b) => {
          return a.bids.length - b.bids.length;
        });
        setNfts(sorted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const element = document.getElementById("on-sale");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);

    getCurrentAuctions();

    return () => {
      element.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div style={{ margin: "60px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>Live Auctions</h2>
      <div id="on-sale" className={classes.section}>
        {nfts
          ? nfts.map((nft, index) => {
              return (
                <CustomCard
                  key={index}
                  url={nft.uri}
                  nft={nft}
                  left="5/5"
                  onClick={() => {
                    navigate(`/nft/${nft.id.substr(2)}`);
                  }}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default CurrentAuctions;
