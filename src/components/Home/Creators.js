import React from "react";

import { makeStyles } from "@material-ui/core";

import c1 from "../../assets/images/creators/1.jpg";
import c2 from "../../assets/images/creators/2.jpg";
import c3 from "../../assets/images/creators/3.jpg";
import c4 from "../../assets/images/creators/4.jpg";
import c5 from "../../assets/images/creators/5.jpg";
import c6 from "../../assets/images/creators/6.jpg";
import c7 from "../../assets/images/creators/7.jpg";
import c8 from "../../assets/images/creators/8.jpg";
import c9 from "../../assets/images/creators/9.jpg";
import c10 from "../../assets/images/creators/10.jpg";

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
    marginRight: "20px",
    cursor: "pointer",
  },
  slider: {
    display: "flex",
    justifyContent: "space-between",
    overflowX: "auto",
    height: "80px",
  },
});

const Creators = () => {
  const classes = useStyles();

  return (
    <div>
      <h2 style={{ letterSpacing: "1px" }}>Creators</h2>
      <div className={classes.slider}>
        <div className={classes.circle}>
          <img src={c1} className={classes.creator} alt="creator-1"></img>
        </div>
        <div className={classes.circle}>
          <img src={c2} className={classes.creator} alt="creator-2"></img>
        </div>
        <div className={classes.circle}>
          <img src={c3} className={classes.creator} alt="creator-3"></img>
        </div>
        <div className={classes.circle}>
          <img src={c4} className={classes.creator} alt="creator-4"></img>
        </div>
        <div className={classes.circle}>
          <img src={c5} className={classes.creator} alt="creator-5"></img>
        </div>
        <div className={classes.circle}>
          <img src={c6} className={classes.creator} alt="creator-6"></img>
        </div>
        <div className={classes.circle}>
          <img src={c7} className={classes.creator} alt="creator-7"></img>
        </div>
        <div className={classes.circle}>
          <img src={c8} className={classes.creator} alt="creator-8"></img>
        </div>
        <div className={classes.circle}>
          <img src={c9} className={classes.creator} alt="creator-9"></img>
        </div>
        <div className={classes.circle}>
          <img src={c10} className={classes.creator} alt="creator-10"></img>
        </div>
      </div>
    </div>
  );
};

export default Creators;
