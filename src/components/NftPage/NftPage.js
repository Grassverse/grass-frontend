import React, { useEffect, useState } from "react";
import "./NftPage.css";

import { CONTRACT_ADDRESS } from "../../config";
import CustomCard from "./CustomCard";

import Web3 from "web3";

import { Button, Grid } from "@material-ui/core";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

import { useNavigate } from "react-router-dom";

import axios from "axios";

const NftPage = () => {
  const navigate = useNavigate();

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
          creator
          sale {
            id
            price
          }
        }
      }`,
      })
      .then((res) => {
        const data = res.data.data.nftentity;
        if (data) setNft(data);
        else navigate("/");
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
            hist.push({
              from: el.from,
              to: el.to,
              time: el.timestamp,
              id: el.id,
            });
          });

          console.log(hist);
          setHistory(hist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkTransaction = (from, to) => {
    let res, pers;
    if (from === "0x0000000000000000000000000000000000000000") {
      res = "Minted by";
      pers = to;
    } else if (to === CONTRACT_ADDRESS) {
      res = "Listed by";
      pers = from;
    } else {
      res = "Ownership transferred to";
      pers = to;
    }
    return [res, pers.substr(0, 6) + "..." + pers.substr(-4)];
  };

  const getMonth = (mon) => {
    if (mon === 0) return "Jan";
    if (mon === 1) return "Feb";
    if (mon === 2) return "Mar";
    if (mon === 3) return "Apr";
    if (mon === 4) return "May";
    if (mon === 5) return "June";
    if (mon === 6) return "July";
    if (mon === 7) return "Aug";
    if (mon === 8) return "Sept";
    if (mon === 9) return "Oct";
    if (mon === 10) return "Nov";
    if (mon === 11) return "Dec";
  };

  const getTime = (time) => {
    return (
      time.split(":")[0] + ":" + time.split(":")[1] + " " + time.split(" ")[1]
    );
  };

  const getTimeString = (time) => {
    let date = new Date(time * 1000);
    return (
      getMonth(date.getMonth()) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear() +
      " at " +
      getTime(date.toLocaleTimeString())
    );
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
      <Grid item md={7} xs={10} style={{ margin: "0px auto 30px auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          {nft ? (
            nft.sale ? (
              <span
                style={{
                  backgroundColor: "rgb(116, 23, 234)",
                  color: "white",
                  padding: "3px 5px",
                  borderRadius: "5px",
                }}
              >
                ON&nbsp;&nbsp;SALE
              </span>
            ) : null
          ) : null}
        </div>
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
        {nft ? (
          nft.sale ? (
            <div style={{ fontSize: "24px" }}>
              <b>Price&nbsp;:&nbsp;</b>
              {Web3.utils.fromWei(nft.sale.price, "ether")}&nbsp;ETH
              <div>
                <Button
                  style={{
                    backgroundColor: "rgb(116, 23, 234)",
                    color: "white",
                    textTransform: "none",
                    borderRadius: "26px",
                    // width: "120px",
                    // margin: "4px",
                    fontWeight: "600",
                    padding: "8px 40px",
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          ) : null
        ) : null}
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div>
            <h4 style={{ margin: "0px 20px 0px 0px" }}>Activity</h4>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <hr style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        {history
          .slice(0)
          .reverse()
          .map((el, index) => (
            <div
              key={"owner-" + index}
              className="history-el"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0px",
                position: "relative",
              }}
              onClick={() => {
                window.open(
                  `https://ropsten.etherscan.io/tx/${el.id.split("-")[0]}`
                );
              }}
            >
              <CheckCircleOutlineRoundedIcon />
              <img
                src="https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
                style={{
                  width: "60px",
                  margin: "0px 10px",
                  borderRadius: "50%",
                }}
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
                <span
                  style={{
                    fontFamily: "AirbnbCerealLight",
                  }}
                >
                  {checkTransaction(el.from, el.to)[0]}
                  &nbsp;
                  <b
                    style={{
                      fontFamily: "AirbnbCereal",
                      color: "rgb(116, 23, 234)",
                    }}
                  >
                    {checkTransaction(el.from, el.to)[1]}
                  </b>
                </span>
                <span style={{ color: "grey" }}>{getTimeString(el.time)}</span>
              </div>
              <div className="open-icon">
                <OpenInNewIcon style={{ color: "rgb(80,80,80)" }} />
              </div>
            </div>
          ))}
      </Grid>
    </Grid>
  );
};

export default NftPage;
