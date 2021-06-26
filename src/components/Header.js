import clsx from "clsx";
import React from "react";

import { makeStyles, Button, Hidden } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  menu: {
    listStyle: "none",
    display: "flex",
    fontWeight: 900,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    margin: "25px 0px",
  },
  item: {
    cursor: "pointer",
    margin: "0px 10px",
  },
  button: {
    textTransform: "none",
    border: "2px solid black",
    borderRadius: "22px",
    padding: "7px 25px",
    fontWeight: 500,
  },
  b1: {
    backgroundColor: "white",
    color: "black",
    borderColor: "black",
    transition: "0.3s ease-out",
    "&:hover": {
      color: "white",
      backgroundColor: "#7417EA",
      borderColor: "#7417EA",
    },
  },
  b2: {
    backgroundColor: "black",
    color: "white",
    transition: "0.3s ease-out",
    "&:hover": {
      color: "black",
      backgroundColor: "white",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          LOGO HERE
        </div>
        <div>
          <ul className={classes.menu}>
            <Hidden mdDown>
              <li className={classes.item} style={{ margin: "0px 20px" }}>
                Explore
              </li>
              <li
                className={classes.item}
                style={{ margin: "0px 40px 0px 20px" }}
              >
                How it works
              </li>
            </Hidden>
            <li className={classes.item}>
              <Button className={clsx(classes.button, classes.b1)}>
                Create NFT
              </Button>
            </li>
            <li className={classes.item}>
              <Button className={clsx(classes.button, classes.b2)}>
                Connect
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
