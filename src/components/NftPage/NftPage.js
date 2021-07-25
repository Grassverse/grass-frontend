import React, { useEffect, useState } from "react";
import "./NftPage.css";

import { CONTRACT_ADDRESS, ESCROW_CONTRACT_ADDRESS } from "../../config";
import Web3 from "web3";

import Modal from "../Modal";
import CustomCard from "./CustomCard";
import BidHistory from "./BidHistoryModal";

import { Button, Grid, makeStyles, IconButton } from "@material-ui/core";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import HistoryIcon from "@material-ui/icons/History";

import getUser from "../../db";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import polygon from "../../assets/images/icons/polygon-matic.png";
import cube from "../../assets/images/icons/cube-logo.png";

const useStyles = makeStyles((theme) => ({
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
  creator: {
    [theme.breakpoints.up("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
}));

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
      <div style={{ display: "flex", marginTop: "30px" }}>
        <div>
          <h4 style={{ margin: "0px 20px 0px 0px" }}>
            Proof&nbsp;of&nbsp;Authenticity
          </h4>
        </div>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%" }}>
            <hr style={{ width: "100%" }} />
          </div>
        </div>
      </div>
      <div
        className={classes.icon}
        onClick={() => {
          window.open(
            `https://ropsten.etherscan.io/token/${CONTRACT_ADDRESS}?a=${Web3.utils.hexToNumberString(
              id
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

const HistCard = ({ el }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(
    "https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
  );
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");

  const checkTransaction = async (from, to) => {
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

    setPerson(pers);

    setMessage(res);

    getUser(pers)
      .then((res) => {
        const data = res.name;
        if (data && data.trim() !== "") setName(data);
        else setName(pers.substr(0, 6) + "..." + pers.substr(-4));

        if (res.dp && res.dp.trim() !== "") setImage(res.dp);
      })
      .catch((err) => {
        console.log(err);
        setName(pers.substr(0, 6) + "..." + pers.substr(-4));
      });

    // await axios
    //   .get(`/api/users/${pers}`)
    //   .then((res) => {
    //     const data = res.data.name;
    //     if (data && data.trim() !== "") setName(data);
    //     else setName(pers.substr(0, 6) + "..." + pers.substr(-4));

    //     if (res.data.dp && res.data.dp.trim() !== "") setImage(res.data.dp);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setName(pers.substr(0, 6) + "..." + pers.substr(-4));
    //   });
  };

  useEffect(() => {
    checkTransaction(el.from, el.to);
  }, []);

  return (
    <div
      className="history-el"
      onClick={() => {
        window.open(`https://ropsten.etherscan.io/tx/${el.id.split("-")[0]}`);
      }}
    >
      <CheckCircleOutlineRoundedIcon />
      <img
        src={image}
        style={{
          width: "60px",
          height: "60px",
          margin: "0px 10px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        alt="user-avatar"
        onClick={(event) => {
          event.stopPropagation();

          if (person !== "") navigate(`/profile/${person}`);
        }}
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
          {message}
          &nbsp;
          <b
            style={{
              fontFamily: "AirbnbCereal",
              color: "rgb(116, 23, 234)",
            }}
          >
            {name}
          </b>
        </span>
        <span style={{ color: "grey" }}>{getTimeString(el.time)}</span>
      </div>
      <div className="open-icon">
        <OpenInNewIcon style={{ color: "rgb(80,80,80)" }} />
      </div>
    </div>
  );
};

const CreatorCard = ({ id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((res) => {
        setImg(res.dp);
        setName(res.name);
        setBio(res.bio);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`/api/users/${id}`)
    //   .then((res) => {
    //     setImg(res.data.dp);
    //     setName(res.data.name);
    //     setBio(res.data.bio);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <div style={{ margin: "40px 0px", textAlign: "left" }}>
      <h3>Creator</h3>
      <hr />
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={img}
            style={{
              borderRadius: "50%",
              height: "150px",
              width: "150px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            alt="creator"
            onClick={() => {
              navigate(`/profile/${id}`);
            }}
          />
          <h4
            style={{
              fontSize: "25px",
              fontFamily: "AirbnbCerealBook",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/profile/${id}`);
            }}
          >
            {name}
          </h4>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className={classes.creator}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "grey",
              wordBreak: "break-word",
            }}
          >
            {bio}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

const Timer = ({ duration, start, timeUp, updateAuctionTime }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timer;
    if (start)
      timer = setInterval(() => {
        let time =
          ((parseInt(start) + parseInt(duration)) * 1000 -
            new Date().getTime()) /
          1000;

        if (time < 0) {
          setTime("Auction Ended");
          updateAuctionTime(true);
          clearInterval(timer);
          return;
        }

        if (timeUp) updateAuctionTime(false);

        const days = parseInt(time / 86400);
        time = time % 86400;
        const hours = parseInt(time / 3600);
        time = time % 3600;
        const minutes = parseInt(time / 60);
        time = time % 60;
        const seconds = parseInt(time);

        setTime(
          `${days !== 0 ? days + "days " : ""}${
            hours !== 0 ? hours + " hours " : ""
          }${minutes !== 0 ? minutes + " min " : ""}${seconds + " sec"}`
        );
      }, 1000);
  }, []);

  if (start)
    return (
      <div>
        <b>Time remaining:</b>
        <br />
        <div style={{ color: "grey", fontSize: "18px" }}>{time}</div>
      </div>
    );
  return null;
};

const Auctioneer = ({ id }) => {
  const [name, setName] = useState("");
  const [dp, setDp] = useState("");

  useEffect(() => {
    getUser(id)
      .then((res) => {
        console.log(res);
        setName(res.name);
        setDp(res.dp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (name === "" || dp === "") return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "16px",
        margin: "15px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          boxShadow: "0px 0px 5px rgb(100,100,100)",
          borderRadius: "30px",
          padding: "5px 10px",
        }}
      >
        <img
          src={dp}
          style={{
            width: "20px",
            height: "20px",
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "5px",
          }}
          alt="auctioneer_dp"
        />
        {name}
      </div>
    </div>
  );
};

const NftPage = ({ user, contracts }) => {
  const navigate = useNavigate();

  const [nft, setNft] = useState(null);
  const [history, setHistory] = useState([]);
  const [imgUri, setImgUri] = useState(null);

  const [open, setOpen] = useState(false);
  const [openBH, setOpenBH] = useState(false);

  const [timeUp, setTimeUp] = useState(true);

  const updateAuctionTime = (el) => {
    setTimeUp(el);
  };

  const updateImageUri = (img) => {
    setImgUri(img);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const modalCloseBH = () => {
    setOpenBH(false);
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
          creator{
            id
          }
          sale {
            id
            price
            owner
          }
          auction {
            id
            status
            reservePrice
            bids{
              id
              bid
              bidder
              status
              timestamp
              txnHash
            }
            auctionCreatedAt
            duration
            owner
            firstBidTime
            lastBid{
              bid
              bidder
            }
          }
        }
      }`,
      })
      .then((res) => {
        const data = res.data.data.nftentity;
        console.log(data);
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

          setHistory(hist);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkPOA = () => {
    const left = document.getElementById("left-part-nft");
    const right = document.getElementById("right-part-nft");

    if (!left || !right) return;
    // console.log(left.offsetTop, right.offsetTop);

    let large = document.getElementById("larger-poa");
    let small = document.getElementById("smaller-poa");

    // console.log(large, small);
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

  const buyNft = async () => {
    const escContract = contracts[1];

    const status = window.confirm(
      `Are you sure want to buy nft "${nft.name}" ?`
    );

    if (status)
      escContract.methods
        .buySaleToken(Web3.utils.hexToNumberString(nft.id))
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

    console.log(Web3.utils.hexToNumberString(nft.id));
    const approved = await nftContract.methods
      .getApproved(Web3.utils.hexToNumberString(nft.id))
      .call();

    // console.log({ approveForAll, approved });

    return approveForAll || approved === ESCROW_CONTRACT_ADDRESS;
  };

  const sellNft = async () => {
    const checkApproval = await checkApprove();

    const nftContract = contracts[0];
    const escContract = contracts[1];

    if (checkApproval) {
      const price = prompt("Enter price");
      console.log(price);

      if (!price || price.trim() === "") return;

      escContract.methods
        .createSale(
          Web3.utils.hexToNumberString(nft.id),
          Web3.utils.toWei(price, "ether")
        )
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
          .approve(
            ESCROW_CONTRACT_ADDRESS,
            Web3.utils.hexToNumberString(nft.id)
          )
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

  const startAuction = async () => {
    const checkApproval = await checkApprove();

    const nftContract = contracts[0];
    const escContract = contracts[1];

    if (checkApproval) {
      const price = prompt("Enter reserve price");
      console.log(price);

      if (!price || price.trim() === "") return;

      const time = prompt("Enter time duration");
      console.log(time);

      if (!time || time.trim() === "") return;

      escContract.methods
        .createAuction(
          Web3.utils.hexToNumberString(nft.id),
          parseInt(time),
          Web3.utils.toWei(price, "ether")
        )
        .send({ from: user })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("Something went wrong");
        });
    } else {
      const status = window.confirm("Approve your NFT for starting Auction");
      if (status) {
        nftContract.methods
          .approve(
            ESCROW_CONTRACT_ADDRESS,
            Web3.utils.hexToNumberString(nft.id)
          )
          .send({
            from: user,
          })
          .then((res) => {
            console.log(res);
            startAuction();
          })
          .catch((err) => {
            alert("Something went wrong");
          });
      }
    }
  };

  const placeBid = async () => {
    const escContract = contracts[1];

    const price = prompt("Enter bid price");
    console.log(price);

    if (!price || price.trim() === "") return;

    escContract.methods
      .createBid(Web3.utils.hexToNumberString(nft.id))
      .send({
        from: user,
        value: Web3.utils.toWei(price, "ether"),
      })
      .then((res) => {
        console.log("Success", res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const claimNft = async () => {
    const escContract = contracts[1];

    escContract.methods
      .endAuction(Web3.utils.hexToNumberString(nft.id))
      .send({ from: user })
      .then((res) => {
        console.log("Success", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid container style={{ display: "flex", margin: "30px 0px" }}>
        <div
          style={{ marginLeft: "auto", marginRight: "auto" }}
          id="left-part-nft"
        >
          <CustomCard
            url={nft ? nft.uri : ""}
            updateImageUri={updateImageUri}
          />
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
              ) : nft.auction ? (
                <span
                  style={{
                    backgroundColor: "rgb(116, 23, 234)",
                    color: "white",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                >
                  ON&nbsp;&nbsp;AUCTION
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
              user && nft.owner !== user.toLowerCase() ? (
                <div style={{ fontSize: "24px" }}>
                  <b>Price&nbsp;:&nbsp;</b>
                  {Web3.utils.fromWei(nft.sale.price, "ether")}&nbsp;ETH
                  {nft.sale.owner !== user.toLowerCase() ? (
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
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
                          if (window.ethereum) {
                            window.ethereum
                              .request({ method: "net_version" })
                              .then(async (res) => {
                                if (res === "3") {
                                  await buyNft();
                                } else setOpen(true);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        }}
                      >
                        Buy Now
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div style={{ fontSize: "24px" }}>
                  <b>Price&nbsp;:&nbsp;</b>
                  {Web3.utils.fromWei(nft.sale.price, "ether")}&nbsp;ETH
                </div>
              )
            ) : nft.auction ? (
              <Grid
                container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", right: 0, top: -40 }}>
                  <IconButton
                    onClick={() => {
                      setOpenBH(true);
                    }}
                  >
                    <HistoryIcon />
                  </IconButton>
                </div>
                <Grid item xs={12} sm={6}>
                  {user && nft.owner !== user.toLowerCase() ? (
                    <div style={{ fontSize: "24px" }}>
                      <b>
                        {nft.auction.status === "OPEN"
                          ? "Reserve Price"
                          : "Highest Bid"}
                        &nbsp;:&nbsp;
                      </b>
                      {nft.auction.status === "OPEN"
                        ? Web3.utils.fromWei(nft.auction.reservePrice, "ether")
                        : Web3.utils.fromWei(nft.auction.lastBid.bid, "ether")}
                      &nbsp;ETH
                      {nft.auction.lastBid ? (
                        <Auctioneer id={nft.auction.lastBid.bidder} />
                      ) : null}
                      {nft.auction.owner !== user.toLowerCase() && !timeUp ? (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
                              if (window.ethereum) {
                                window.ethereum
                                  .request({ method: "net_version" })
                                  .then(async (res) => {
                                    if (res === "3") {
                                      await placeBid();
                                    } else setOpen(true);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }
                            }}
                          >
                            Place Bid
                          </Button>
                        </div>
                      ) : nft.auction.lastBid &&
                        nft.auction.lastBid.bidder === user.toLowerCase() &&
                        timeUp ? (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
                              if (window.ethereum) {
                                window.ethereum
                                  .request({ method: "net_version" })
                                  .then(async (res) => {
                                    if (res === "3") {
                                      await claimNft();
                                    } else setOpen(true);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }
                            }}
                          >
                            Claim Nft
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div style={{ fontSize: "24px" }}>
                      <b>
                        {nft.auction.status === "OPEN"
                          ? "Reserve Price"
                          : "Highest Bid"}
                        &nbsp;:&nbsp;
                      </b>
                      {nft.auction.status === "OPEN"
                        ? Web3.utils.fromWei(nft.auction.reservePrice, "ether")
                        : Web3.utils.fromWei(nft.auction.lastBid.bid, "ether")}
                      &nbsp;ETH
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Timer
                    duration={nft.auction.duration}
                    start={nft.auction.firstBidTime}
                    timeUp={timeUp}
                    updateAuctionTime={updateAuctionTime}
                  />
                </Grid>
              </Grid>
            ) : user && nft.owner === user.toLowerCase() ? (
              <div
                style={{
                  fontSize: "24px",
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <div>
                  <Button
                    style={{
                      backgroundColor: "rgb(116, 23, 234)",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "26px",
                      width: "200px",
                      // margin: "4px",
                      fontWeight: "600",
                      padding: "8px 40px",
                      margin: "10px 0px 0px 0px",
                    }}
                    onClick={async () => {
                      if (window.ethereum) {
                        window.ethereum
                          .request({ method: "net_version" })
                          .then(async (res) => {
                            if (res === "3") {
                              await sellNft();
                            } else setOpen(true);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    }}
                  >
                    Sell
                  </Button>
                </div>
                <div>
                  <Button
                    style={{
                      backgroundColor: "rgb(0, 0, 0)",
                      color: "white",
                      textTransform: "none",
                      borderRadius: "26px",
                      width: "200px",
                      // width: "120px",
                      // margin: "4px",
                      fontWeight: "600",
                      padding: "8px 30px",
                      margin: "10px 0px 0px 0px",
                    }}
                    onClick={async () => {
                      if (window.ethereum) {
                        window.ethereum
                          .request({ method: "net_version" })
                          .then(async (res) => {
                            if (res === "3") {
                              await startAuction();
                            } else setOpen(true);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    }}
                  >
                    Auction
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
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <div style={{ width: "100%" }}>
                <hr style={{ width: "100%" }} />
              </div>
            </div>
          </div>
          {history
            .slice(0)
            .reverse()
            .map((el, index) => (
              <HistCard el={el} key={"owner-" + index} />
            ))}
        </Grid>
      </Grid>
      {nft ? <CreatorCard id={nft.creator.id} /> : null}
      <Modal status={open} modalClose={modalClose} title="Wrong Network">
        <div>
          Your wallet is currently connected to a different network. Please
          change it to the Ropsten network to continue.
        </div>
      </Modal>
      {nft ? (
        <BidHistory
          status={openBH}
          modalClose={modalCloseBH}
          title="Bid History"
          bids={nft.auction.bids}
        />
      ) : null}
    </div>
  );
};

export default NftPage;
