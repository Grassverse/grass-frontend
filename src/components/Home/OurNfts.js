import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import CustomCard from "./CustomCard";

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

const OurNfts = ({ nfts }) => {
  const classes = useStyles();
  const navigate = useNavigate();

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
    // if (e.target.id !== "our-nfts") {
    //   console.log(isDragged);
    //   if (isDragged) {
    //     e.target.addEventListener("click", preventClick);
    //   } else {
    //     e.target.removeEventListener("click", preventClick);
    //   }
    // }
    // isDragged = false;

    ele.style.removeProperty("user-select");

    ele.removeEventListener("mousemove", mouseMoveHandler);
  };

  const mouseDownHandler = (e) => {
    isDragged = false;
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

  useEffect(() => {
    const element = document.getElementById("our-nfts");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);

    return () => {
      element.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div style={{ margin: "60px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>Our NFTs</h2>
      <div id="our-nfts" className={classes.section}>
        {nfts.map((nft, index) => {
          return (
            <CustomCard
              key={index}
              url={nft.uri}
              nft={nft}
              left="5/5"
              onClick={() => {
                // console.log(isDragged);
                if (!isDragged) navigate(`/nft/${nft.id.substr(2)}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurNfts;
