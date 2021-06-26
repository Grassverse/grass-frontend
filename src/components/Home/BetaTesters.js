import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import CustomCard from "./CustomCard";

const useStyles = makeStyles({
  section: {
    paddingTop: "20px",
    display: "flex",
    overflowX: "auto",
    height: "350px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

let pos = { top: 0, left: 0, x: 0, y: 0 };

let ele;

const BetaTesters = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;

    ele.style.userSelect = "none";
  };

  const mouseUpHandler = function () {
    ele.style.removeProperty("user-select");

    ele.removeEventListener("mousemove", mouseMoveHandler);
  };

  const mouseDownHandler = function (e) {
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
    const element = document.getElementById("beta-testers");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);
  }, []);

  return (
    <div style={{ margin: "60px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>Beta Testers</h2>
      <div id="beta-testers" className={classes.section}>
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmfUt4DeFsgpUn4oyzATVp1uMAEe56qvRCrodgAX4dPLqs"
          left="5/5"
          onClick={() => {
            navigate("/nft");
          }}
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/Qmc3UTMWphtzv46qUwc4Zo57CDJZthZ77bRSRcS2zNKGRc"
          left="4/5"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmX3aSBheg8QixrKmyEuH8JvJeKBscy6bisDPnv46vF6DA"
          left="5/5"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmPBcJ7bkwgx1JsyiBK3B6YG1Y8SrXzsa27s1Wjymx1qLx"
          left="5/5"
        />
      </div>
    </div>
  );
};

export default BetaTesters;
