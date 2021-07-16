import React, { useEffect, useState } from "react";
import "./NftPage.css";

import { CONTRACT_ADDRESS, ESCROW_CONTRACT_ADDRESS } from "../../config";
import Web3 from "web3";

import CustomCard from "./CustomCard";

import { Button, Grid, makeStyles } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import polygon from "../../assets/images/icons/polygon-matic.png";
import cube from "../../assets/images/icons/cube-logo.png";

const useStyles = makeStyles(() => ({
  icon: {
    // height: "40px",
    // width: "40px",
    padding: "10px 20px",
    margin: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "10px",
    transition: "0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgb(240, 240, 240)",
    },
  },
}));

const POA = ({ id, uri, imgUri }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <h2>Proof of Authenticity</h2>
      <div
        className={classes.icon}
        onClick={() => {
          window.open(
            `https://ropsten.etherscan.io/token/${CONTRACT_ADDRESS}?a=${id.substr(
              2
            )}`
          );
        }}
      >
        View on Etherscan
        <img
          src={polygon}
          alt="etherscan"
          style={{ width: "20px", marginRight: "20px" }}
        />
      </div>
      <div
        className={classes.icon}
        onClick={() => {
          if (imgUri) window.open(imgUri);
        }}
      >
        View on IPFS
        <VisibilityOutlinedIcon
          style={{ width: "20px", marginRight: "20px" }}
        />
        {/* <img
          src={polygon}
          alt="etherscan"
          style={{ width: "20px", marginRight: "20px" }}
        /> */}
      </div>
      <div
        className={classes.icon}
        onClick={() => {
          window.open(`https://gateway.pinata.cloud/ipfs/${uri}`);
        }}
      >
        View IPFS Metadata
        <img
          src={cube}
          alt="metadata"
          style={{ width: "24px", marginRight: "20px" }}
        />
      </div>
    </div>
  );
};

const NftPage = ({ user, contracts }) => {
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [history, setHistory] = useState([]);
  const [imgUri, setImgUri] = useState(null);

  const updateImageUri = (img) => {
    setImgUri(img);
  };

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
            owner
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
    } else if (from === ESCROW_CONTRACT_ADDRESS.toLowerCase()) {
      res = "Bought by";
      pers = to;
    } else if (to === ESCROW_CONTRACT_ADDRESS.toLowerCase()) {
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

  const checkPOA = () => {
    const left = document.getElementById("left-part-nft");
    const right = document.getElementById("right-part-nft");

    console.log(left.offsetTop, right.offsetTop);

    let large = document.getElementById("larger-poa");
    let small = document.getElementById("smaller-poa");

    console.log(large, small);
    if (left.offsetTop === right.offsetTop && large.style.display === "none") {
      large.style.display = "block";
      small.style.display = "none";
    } else if (
      left.offsetTop !== right.offsetTop &&
      small.style.display === "none"
    ) {
      small.style.display = "block";
      large.style.display = "none";
    }
    console.log(large, small);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const url = window.location.pathname;
    const id = url.split("/")[url.split("/").length - 1];
    getNft(id);
    getTransactionHistory(id);

    checkPOA();

    window.addEventListener("resize", () => {
      checkPOA();
    });

    return () => {
      window.removeEventListener("resize", () => {
        checkPOA();
      });
    };
  }, []);

  useEffect(() => {
    if (contracts) {
      console.log(contracts[1].methods);
    }
  }, [contracts]);

  const buyNft = async () => {
    const escContract = contracts[1];

    console.log({ nft, user });

    escContract.methods
      .buySaleToken(nft.id.substr(2))
      .send({
        from: user,
        value: nft.sale.price,
      })
      .then((res) => {
        console.log("Success", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkApprove = async () => {
    const nftContract = contracts[0];

    const approveForAll = await nftContract.methods
      .isApprovedForAll(user, ESCROW_CONTRACT_ADDRESS)
      .call();

    const approved = await nftContract.methods
      .getApproved(nft.id.substr(2))
      .call();

    console.log({ approveForAll, approved });

    return approveForAll || approved === ESCROW_CONTRACT_ADDRESS;
  };

  const sellNft = async () => {
    const checkApproval = await checkApprove();

    const nftContract = contracts[0];
    const escContract = contracts[1];

    if (checkApproval) {
      const price = prompt("Enter price");
      console.log(price);

      escContract.methods
        .createSale(nft.id.substr(2), Web3.utils.toWei(price, "ether"))
        .send({ from: user })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    } else {
      const status = window.confirm("Approve your NFT for selling");
      if (status) {
        nftContract.methods
          .approve(ESCROW_CONTRACT_ADDRESS, nft.id.substr(2))
          .send({
            from: user,
          })
          .then((res) => {
            console.log(res);
            sellNft();
          })
          .catch((err) => {
            alert("Something went wrong");
          });
      }
    }
  };

  return (
    <Grid container style={{ display: "flex", margin: "30px 0px" }}>
      <div
        style={{ marginLeft: "auto", marginRight: "auto" }}
        id="left-part-nft"
      >
        <CustomCard url={nft ? nft.uri : ""} updateImageUri={updateImageUri} />
        <div id="larger-poa" style={{ display: "none" }}>
          {nft ? <POA id={nft.id} uri={nft.uri} imgUri={imgUri} /> : null}
        </div>
      </div>
      <Grid
        item
        md={7}
        xs={10}
        style={{ margin: "0px auto 30px auto" }}
        id="right-part-nft"
      >
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
        {console.log(nft)}
        {nft ? (
          nft.sale ? (
            nft.owner !== user.toLowerCase() ? (
              <div style={{ fontSize: "24px" }}>
                <b>Price&nbsp;:&nbsp;</b>
                {Web3.utils.fromWei(nft.sale.price, "ether")}&nbsp;ETH
                {nft.sale.owner !== user.toLowerCase() ? (
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
                      onClick={async () => {
                        await buyNft();
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null
          ) : user && nft.owner === user.toLowerCase() ? (
            <div style={{ fontSize: "24px" }}>
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
                  onClick={async () => {
                    sellNft();
                  }}
                >
                  Sell
                </Button>
              </div>
            </div>
          ) : null
        ) : null}
        <div id="smaller-poa" style={{ display: "none" }}>
          {nft ? <POA id={nft.id} uri={nft.uri} imgUri={imgUri} /> : null}
        </div>
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
