import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import CustomCard from "./CustomCard";

import v1 from "../../assets/videos/mostpopular/v1.mp4";
import v2 from "../../assets/videos/mostpopular/v2.mp4";

const useStyles = makeStyles({
  section: {
    display: "flex",
    overflowX: "auto",
    paddingTop: "20px",
    height: "350px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

let pos = { top: 0, left: 0, x: 0, y: 0 };

let ele;

const MostPopular = () => {
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
    const element = document.getElementById("most-popular");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);
  }, []);

  return (
    <div style={{ margin: "60px 0px 0px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>Most Popular</h2>
      <div id="most-popular" className={classes.section}>
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmdePA28mYQKFkhMtyK6CtRPSb59QwbcKfR5Faz94Dfgq6"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmVgtgx21seXqJ5vZnTdss6gs6k5gDa59ixWF6hXVxHe9v"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmeGbBk18iPJKRSButeTDdsHzBdjzPVpQ78oztkFRM1Sa2"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmZhAYEYY2oKHKAahe1vCRXME5UyXaEfimZRaunBipBcU3"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/Qmf7Nz7JsH4jVKdsuJsJnxAc6GyWW45bizXbN97AR2VRF5"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmVqqnZ433iHG81buKjzCPcn5MWyVNtcC4dB34bHUyjcBb"
          left="1/1"
        />
        <CustomCard vid={v1} left="1/1" />
        <CustomCard vid={v2} left="1/1" />
      </div>
    </div>
  );
};

export default MostPopular;
