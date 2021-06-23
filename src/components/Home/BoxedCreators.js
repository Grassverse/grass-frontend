import React from "react";

import "./BoxedCreators.css";

import { makeStyles, Tooltip, withStyles } from "@material-ui/core";

import c1 from "../../assets/images/creators/1.jpg";
import c2 from "../../assets/images/creators/2.jpg";
import c3 from "../../assets/images/creators/3.jpg";
import c4 from "../../assets/images/creators/4.jpg";
import c5 from "../../assets/images/creators/5.jpg";
import c6 from "../../assets/images/creators/6.jpg";
import c7 from "../../assets/images/creators/7.jpg";
import c8 from "../../assets/images/creators/8.jpg";
import c9 from "../../assets/images/creators/9.jpg";

const useStyles = makeStyles({
  creator: {
    borderRadius: "50%",
    height: "70px",
    width: "70px",
    objectFit: "cover",
  },
  circle: {
    boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
    borderRadius: "50%",
    height: "70px",
    width: "70px",
    margin: "10px",
    cursor: "pointer",
  },
  slider: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    boxShadow: "0 0 9px 4px rgb(0 0 0 / 5%)",
    padding: "24px 32px",
    borderRadius: "20px",
  },
  tooltip: {
    backgroundColor: "black",
  },
});

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "black",
    color: "white",
    boxShadow: "0px 1px 1px black",
    fontSize: 18,
    padding: "10px 20px",
    fontFamily: "AirbnbCereal",
    marginBottom: "30px",
  },
  arrow: {
    color: "black",
  },
}))(Tooltip);

const BoxedCreators = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.slider}>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Zipo"
            placement="top"
          >
            <img src={c1} className={classes.creator} alt="creator-1"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Nathan"
            placement="top"
          >
            <img src={c2} className={classes.creator} alt="creator-2"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="kidzdontplay"
            placement="top"
          >
            <img src={c3} className={classes.creator} alt="creator-3"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Alexis Leto"
            placement="top"
          >
            <img src={c4} className={classes.creator} alt="creator-4"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Maxime Baillivet"
            placement="top"
          >
            <img src={c5} className={classes.creator} alt="creator-5"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="R-Eve"
            placement="top"
          >
            <img src={c6} className={classes.creator} alt="creator-6"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Leo Caillard"
            placement="top"
          >
            <img src={c7} className={classes.creator} alt="creator-7"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Maria"
            placement="top"
          >
            <img src={c8} className={classes.creator} alt="creator-8"></img>
          </CustomTooltip>
        </div>
        <div className={classes.circle}>
          <CustomTooltip
            arrow
            className={classes.tooltip}
            title="Alexa Zepp"
            placement="top"
          >
            <img src={c9} className={classes.creator} alt="creator-9"></img>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default BoxedCreators;
