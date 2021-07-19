import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";

import getUser from "../../db";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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
    justifyContent: "flex-start",
    overflowX: "auto",
    height: "80px",
    paddingBottom: "30px",
    overflowY: "hidden",
  },
});

const CreatorCircle = ({ id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [img, setImg] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((res) => {
        setImg(res.dp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className={classes.circle}
      onClick={() => {
        navigate(`/profile/${id}`);
      }}
    >
      {img ? (
        <img src={img} className={classes.creator} alt="creator-1" />
      ) : null}
    </div>
  );
};

const Creators = () => {
  const classes = useStyles();

  const [creators, setCreators] = useState(null);

  useEffect(() => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
          creators {
            id
          }
        }`,
      })
      .then((res) => {
        setCreators(res.data.data.creators);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 style={{ letterSpacing: "1px" }}>Creators</h2>
      <div className={classes.slider}>
        {creators
          ? creators.map((el, index) => {
              return <CreatorCircle key={index} id={el.id} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Creators;
