import React, { useState, useEffect } from "react";

import { ESCROW_CONTRACT_ADDRESS } from "../../config";
import Web3 from "web3";

import { IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import getUser from "../../db";

import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const HistCard = ({ bid }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(
    "https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
  );

  const [name, setName] = useState("");
  const [person, setPerson] = useState("");

  const checkBid = async (from, to) => {
    let pers = bid.bidder;

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
  };

  useEffect(() => {
    checkBid();
  }, []);

  return (
    <div
      className="history-el"
      style={
        bid.status === "OPEN"
          ? {
              backgroundColor: "rgb(116 23 234 / 18%)",
            }
          : null
      }
      onClick={() => {
        window.open(`https://ropsten.etherscan.io/tx/${bid.txnHash}`);
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
        alt="bid-user-avatar"
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
          <b
            style={{
              fontFamily: "AirbnbCereal",
              color: "rgb(116, 23, 234)",
            }}
          >
            {name}
          </b>
        </span>
        <span style={{ color: "grey" }}>{getTimeString(bid.timestamp)}</span>
      </div>
      <div style={{ position: "absolute", right: "20px" }}>
        <div>
          <b style={{ fontSize: "24px" }}>
            {Web3.utils.fromWei(bid.bid, "ether")}
          </b>
          &nbsp;ETH
        </div>
      </div>
    </div>
  );
};

export default function BidHistory({ status, modalClose, title, bids }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    modalClose();
  };

  useEffect(() => {
    setOpen(status);
  }, [status]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        style={{
          textAlign: "center",
          //   color: "black",
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            // backgroundColor: "black",
            color: "black",
            paddingTop: "10px",
          }}
        >
          <h2>{title}</h2>
          <IconButton
            style={{
              color: "black",
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon style={{ color: "black" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor: "white",
            fontFamily: "AirbnbCerealLight",
            color: "black",
            paddingBottom: "50px",
          }}
        >
          {bids
            .slice(0)
            .sort((a, b) => {
              console.log(a.timestamp, b.timestamp, a.timestamp > b.timestamp);
              return b.timestamp - a.timestamp;
            })
            .map((el, index) => (
              <HistCard bid={el} />
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
