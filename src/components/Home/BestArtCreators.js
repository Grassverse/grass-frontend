import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import CustomCard from "./CustomCard";

import v1 from "../../assets/videos/bestartcreators/v1.mp4";

const useStyles = makeStyles({
  section: {
    display: "flex",
    overflowX: "auto",
    paddingTop: "20px",
    height: "350px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    alignItems: "center",
    justifyContent: "center",
  },
});

let pos = { top: 0, left: 0, x: 0, y: 0 };

let ele;

const BestArtCreators = () => {
  const classes = useStyles();

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
    const element = document.getElementById("best-art-creators");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);
  }, []);

  return (
    <div style={{ margin: "60px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>
        Best art creators 🔥
      </h2>
      <div id="best-art-creators" className={classes.section}>
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmSnnFPJzBYq9fEVcKVxA7Vg3QZCDx6hKCJ4qbP3Yfm8dT"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmUbBaZdoQ92ocbnwDKWoeBYKHRDEGzWRrzQd8M6vFtt29"
          left="1/1"
        />
        <CustomCard vid={v1} left="1/1" />
      </div>
    </div>
  );
};

export default BestArtCreators;
