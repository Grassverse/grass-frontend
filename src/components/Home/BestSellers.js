import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import CustomCard from "./CustomCard";

import v1 from "../../assets/videos/bestsellers/v1.mp4";

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

const BestSellers = () => {
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
    const element = document.getElementById("best-sellers");
    ele = element;

    element.addEventListener("mousedown", mouseDownHandler);
  }, []);

  return (
    <div style={{ margin: "60px 0px" }}>
      <h2 style={{ letterSpacing: "1px", marginBottom: 0 }}>Best sellers</h2>
      <div id="best-sellers" className={classes.section}>
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmayuUYx4FgxTrPXWgYhftXydkmcf6BvoNCPdXzPTxCvdM"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmTkEzXARanWwxarWweznWXJo9vCKPWWdbYr1ggLP38Pj8"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmYEhcjwpuycaKdcVxZ7AKZmvpGuQgMFGZsuLqgJ6gbkvP"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmVSq2Rz91nHniCPtXJ9ri9CeuzTPug9uySiWEPAcR2eTF"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmPtRAAZz5QJMLNdiEox7tTWUz6CJcBHVyt9WiaCmQkoed"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmdMiFw3y35uHbSNh2sy8HZVjWhKpnRusqp9vZwEv1Qqdc"
          left="1/1"
        />
        <CustomCard
          url="https://ternoa.mypinata.cloud/ipfs/QmaFSJMe9bYigdwvnKUq4cVssieWrK7nzizA7vF2Gtd4Jz"
          left="1/1"
        />
        <CustomCard vid={v1} left="1/1" />
      </div>
    </div>
  );
};

export default BestSellers;
