import CustomCard from "./CustomCard";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import pic from "../../assets/images/creators/1.jpg";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles(() => ({
  cid: {
    boxShadow: "0px 0px 3px rgb(100,100,100)",
    transition: "0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0px 0px 6px rgb(50,50,50)",
    },
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [created, setCreated] = useState([]);
  const [owned, setOwned] = useState([]);

  const getCreatedNfts = () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
          nftentities(where: {creator: "${user}"}) {
            name
            id
            uri
            owner
          }
        }`,
      })
      .then((res) => {
        const data = res.data.data.nftentities;
        console.log(data);
        setCreated(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOwnedNfts = () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
          nftentities(where: {owner: "${user}"}) {
            name
            description
            id
            uri
            owner
            creator{
              id
            }
          }
        }`,
      })
      .then((res) => {
        const data = res.data.data.nftentities;
        console.log(data);
        setOwned(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCreatedNfts();
    getOwnedNfts();
  }, []);

  return (
    <div style={{ textAlign: "left", marginBottom: "60px" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
          alt="cover"
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
        <img
          src={pic}
          alt="you"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            transform: "translateY(-50%)",
            margin: "auto",
            border: "6px white solid",
          }}
        />
        <div
          style={{
            transform: "translateY(-40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: "50%",
              textAlign: "right",
              paddingRight: "10px",
              borderRight: "1px solid black",
            }}
          >
            <h2 style={{ margin: "10px 0px" }}>Zipo</h2>
          </span>
          <div style={{ width: "50%", textAlign: "left", paddingLeft: "10px" }}>
            <span
              style={{
                borderRadius: "15px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              className={classes.cid}
            >
              {user.substr(0, 6)}....{user.substr(-4)}
            </span>
          </div>
        </div>
        <div
          style={{
            fontFamily: "AirbnbCerealLight",
            padding: "0px 20px",
            transform: "translateY(-30px)",
          }}
        >
          <p style={{}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
      <div style={{ userSelect: "none", display: "flex" }}>
        <div
          style={{
            margin: "20px",
            padding: "10px 0px",
            cursor: "pointer",
            color: tab === 0 ? "black" : "grey",
            borderBottom: tab === 0 ? "2px solid black" : "0px",
          }}
          onClick={() => {
            setTab(0);
          }}
        >
          Created
        </div>
        <div
          style={{
            margin: "20px",
            padding: "10px 0px",
            cursor: "pointer",
            color: tab === 1 ? "black" : "grey",
            borderBottom: tab === 1 ? "2px solid black" : "0px",
          }}
          onClick={() => {
            setTab(1);
          }}
        >
          Owned
        </div>
      </div>
      <div
        style={{
          minHeight: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tab === 0 ? (
          created.length > 0 ? (
            <div>
              {created.map((el, index) => {
                return (
                  <CustomCard
                    key={"owned-" + index}
                    url={el.uri}
                    nft={el}
                    onClick={() => {
                      navigate(`/nft/${el.id.substr(2)}`);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div>Your collection is empty</div>
          )
        ) : owned.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {owned.map((el, index) => {
              return (
                <CustomCard
                  key={"owned-" + index}
                  url={el.uri}
                  nft={el}
                  onClick={() => {
                    navigate(`/nft/${el.id.substr(2)}`);
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div>Your collection is empty</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
