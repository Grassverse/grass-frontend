import React, { useEffect, useState } from "react";

import { Button, Grid } from "@material-ui/core";
import CustomCard from "./CustomCard";

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

import axios from "axios";

const NftPage = () => {
  const [nft, setNft] = useState(null);
  const [history, setHistory] = useState([]);

  const getNft = (id) => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
        nftentity(id: "${"0x" + id}") {
          name
          description
          id
          uri
          owner
          artist
        }
      }`,
      })
      .then((res) => {
        setNft(res.data.data.nftentity);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTransactionHistory = (id) => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
        transactions(where: {token: "${
          "0x" + id
        }"}, orderBy: timestamp, orderDirection: asc) {
          id
          from
          to
          timestamp
          token {
            id
          }
        }
      }`,
      })
      .then((res) => {
        const transactions = res.data.data.transactions;

        if (transactions.length > 0) {
          let hist = [];
          transactions.forEach((el) => {
            hist.push({ person: el.to, time: el.timestamp });
          });
          setHistory(hist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const url = window.location.pathname;
    const id = url.split("/")[url.split("/").length - 1];
    getNft(id);
    getTransactionHistory(id);
  }, []);

  return (
    <Grid container style={{ display: "flex", margin: "30px 0px" }}>
      <CustomCard url={nft ? nft.uri : ""} />
      <Grid item md={7} style={{ margin: "0px 30px 30px 30px" }}>
        <h1
          style={{
            letterSpacing: "1px",
            textAlign: "left",
            padding: "0px 0px",
            margin: "0px 0px 10px 0px",
          }}
        >
          {nft ? nft.name : " "}
        </h1>
        <hr />
        <div
          style={{
            fontFamily: "AirbnbCerealBook",
            textAlign: "left",
            fontSize: "14px",
            lineHeight: "26px",
            margin: "35px 0px 30px 0px",
          }}
        >
          {nft
            ? nft.description
                .toString()
                .split("\\n")
                .map((el, index) => {
                  if (
                    index ===
                    nft.description.toString().split("\\n").length - 1
                  )
                    return <div key={"element" + index}>{el}</div>;
                  return (
                    <div key={"element" + index}>
                      {el}
                      <br />
                    </div>
                  );
                })
            : " "}
        </div>
        {/* <Grid
          item
          sm={10}
          md={8}
          style={{
            display: "flex",
            flexWrap: "wrap-reverse",
          }}
        >
          <Grid
            item
            md={6}
            xs={10}
            style={{ margin: "auto", justifyContent: "center" }}
          >
            <div>
              <b style={{ fontSize: "12px", margin: "auto" }}>
                Available : 4 of 5
              </b>
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "rgb(116, 23, 234)",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "26px",
                  width: "140px",
                  margin: "4px",
                  fontWeight: "600",
                  fontSize: "17px",
                  padding: "5px 0px",
                }}
              >
                Buy
              </Button>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            xs={10}
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              fontSize: "20px",
            }}
          >
            <b> 100 CAPS</b>
            <span
              style={{
                fontWeight: "100",
                fontFamily: "AirbnbCerealLight",
                color: "rgb(177,177,177)",
              }}
            >
              12.7301$
            </span>
          </Grid>
        </Grid> */}
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div>
            <h4 style={{ margin: "0px 20px 0px 0px" }}>History</h4>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <hr style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        {history.map((el, index) => (
          <div
            key={"owner-" + index}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0px",
            }}
          >
            <CheckCircleOutlineRoundedIcon />
            <img
              src="https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
              style={{ width: "60px", margin: "0px 10px", borderRadius: "50%" }}
              alt="user-avatar"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "900",
                fontFamily: "AirbnbCerealBook",
              }}
            >
              <span style={{ color: "rgb(116, 23, 234)" }}>
                {index === history.length - 1 ? "Artist" : "Owner"}
              </span>
              <span>{el.person}</span>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default NftPage;
