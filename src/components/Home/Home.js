import React, { useState } from "react";
import clsx from "clsx";

import vid from "../assets/videos/ternoart.mp4";

import Creators from "./Creators";
import BetaTesters from "./BetaTesters";
import MostPopular from "./MostPopular";
import BestSellers from "./BestSellers";
import BestArtCreators from "./BestArtCreators";
import BoxedCreators from "./BoxedCreators";

import { makeStyles, Button } from "@material-ui/core";

import { VolumeUp, VolumeOff } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  video: {
    display: "block",
    margin: "auto",
    width: "90%",
    borderRadius: "20px",
  },
  button: {
    textTransform: "none",
    border: "2px solid black",
    borderRadius: "24px",
    padding: "10px 25px",
    fontWeight: 500,
  },
  b0: {
    backgroundColor: "white",
    width: "180px",
    color: "#7417EA",
    borderColor: "#7417EA",
    transition: "0.3s ease-out",
    fontFamily: "AirbnbCerealLight",
    fontWeight: 600,
    "&:hover": {
      color: "white",
      backgroundColor: "#7417EA",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  const [mute, setMute] = useState(true);

  return (
    <div>
      <div style={{ margin: "50px 65px", position: "relative" }}>
        <video id="header-video" autoPlay loop muted className={classes.video}>
          <source src={vid} type="video/mp4"></source>
        </video>
        <div
          style={{
            cursor: "pointer",
            right: -10,
            bottom: -10,
            position: "absolute",
          }}
          onClick={() => {
            document.getElementById("header-video").muted = !mute;
            setMute(!mute);
          }}
        >
          {mute ? (
            <VolumeOff style={{ width: "30px", height: "30px" }} />
          ) : (
            <VolumeUp style={{ width: "30px", height: "30px" }} />
          )}
        </div>
      </div>
      <div style={{ textAlign: "left", margin: "100px 0px 40px 0px" }}>
        <Creators />
        <BetaTesters />
        <MostPopular />
        <BestSellers />
        <BestArtCreators />
        <BoxedCreators />
      </div>
      <Button
        className={clsx(classes.button, classes.b0)}
        style={{ margin: "60px 0px 100px 0px" }}
      >
        See more
      </Button>
    </div>
  );
};

export default Home;
