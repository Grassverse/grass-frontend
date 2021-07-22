import clsx from "clsx";
import React, { useState, useEffect } from "react";

import { Badge } from "@material-ui/core";

import getWeb3 from "../getWeb3";
import Web3 from "web3";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
} from "../config";

import logo from "../assets/images/logo/logo_g.png";

import {
  makeStyles,
  withStyles,
  Button,
  Hidden,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Modal from "./Modal";

const StyledMenu = withStyles({
  list: { padding: "0px" },
  paper: {
    border: "1px solid #d3d4d5",
    padding: "0px",
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // "&:focus": {
    //   backgroundColor: theme.palette.primary.main,
    //   "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
    //     color: theme.palette.common.white,
    //   },
    // },
    // "&:hover": {
    // backgroundColor: "rgb(0,0,0)",
    // "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
    // color: theme.palette.common.white,
    // },
    // },
  },
}))(MenuItem);

const StyledListItemText = withStyles((theme) => ({
  primary: {
    fontFamily: "AirbnbCereal",
  },
}))((props) => <ListItemText {...props} />);

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
  b2n: {
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
}));

let nftCount = -1;
let acc;

const Header = ({ updateUser, updateContracts }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [badge, setBadge] = useState(false);
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const modalClose = () => {
    setOpen(false);
  };

  // const loadBlockchainData = async () => {
  //   const web3 = new Web3(Web3.givenProvider);
  //   const network = await web3.eth.net.getNetworkType();
  //   console.log("newtork:", network);
  // };

  const makeSignatureRequest = async (web3) => {
    web3.eth.personal
      .sign(
        "Hi there from Grass! \n Sign this message to prove you have access to this wallet and we'll log you in. This won't cost you anything.",
        acc
      )
      .then((res) => {
        console.log(res);
        setStatus(1);
      })
      .catch((err) => {
        console.log(err);
        disconnect();
        alert("Please sign the request to connect");
      });
  };

  const connectWeb3 = async () => {
    setStatus(0);
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      web3.eth.net.getId().then((res) => {
        if (res === 3) setBadge(false);
        else setBadge(true);
      });
      // Use web3 to get the user's accounts.
      let accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      //const networkId = await web3.eth.net.getId();
      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      var abi = CONTRACT_ABI;
      var contractAddress = CONTRACT_ADDRESS;
      const nftInstance = new web3.eth.Contract(abi, contractAddress);

      const escrowInstance = new web3.eth.Contract(
        ESCROW_CONTRACT_ABI,
        ESCROW_CONTRACT_ADDRESS
      );

      updateContracts([nftInstance, escrowInstance]);

      // new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      acc = accounts[0];

      setWeb3(web3);
      setAccounts(accounts);
      setContract(nftInstance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
      setStatus(-1);
    }
  };

  const checkSessionStorage = () => {
    if (typeof Storage !== undefined) {
      if (sessionStorage.getItem("connected") === "true") connectWeb3();
      else if (window.ethereum) {
        window.ethereum
          .request({ method: "net_version" })
          .then((res) => {
            if (res === "3") setBadge(false);
            else setBadge(true);
          })
          .catch((err) => {
            console.log(err);
          });
        setStatus(-1);
      } else setStatus(-1);
    }
  };

  const disconnect = () => {
    setStatus(0);

    sessionStorage.removeItem("connected");
    updateUser(null);
    updateContracts(null);

    setStatus(-1);

    handleClose();
  };

  useEffect(() => {
    checkSessionStorage();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("accountsChanges", accounts);
        if (accounts.length === 0 || acc !== accounts[0]) {
          if (acc) disconnect();
          acc = null;
        }
      });

      // detect Network account change
      window.ethereum.on("networkChanged", (networkId) => {
        console.log("networkChanged", networkId);
        if (networkId === "3") setBadge(false);
        else setBadge(true);
      });
    }
  }, []);

  useEffect(() => {
    if (web3) {
      if (sessionStorage.getItem("connected") !== "true") {
        makeSignatureRequest(web3);
        sessionStorage.setItem("connected", "true");
      } else setStatus(1);
    }
  }, [web3]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      updateUser(accounts[0]);
    }
  }, [accounts]);

  useEffect(() => {
    if (!badge) modalClose();
  }, [badge]);

  const runExample = async () => {
    // nftCount = await contract.methods.getCurrentCount().call();
    // for (var i = 1; i <= nftCount; i++) {
    //   const nft = await contract.methods.getNft(i).call();
    //   setNfts((nfts) => [...nfts, nft]);
    // this.setState({
    //   nfts: [...this.state.nfts, nft],
    // });
    // }
    // console.log("nfts : ", this.state.nfts);
    //const accounts = await web3.eth.getAccounts();
    // contract.methods.balanceOf(account).call((err, bal) => {
    //       console.log('account1 NFT balance:' + bal);
    //       this.setState({ storageValue: bal });
    //   });
    // contract.methods.transferFrom(account1,account2,1).call((err, bal) => {
    //     console.log('account1 NFT balance:' + bal);
    //     //this.setState({ storageValue: bal });
    //   });
  };

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
          <img
            src={logo}
            alt="grass-logo"
            style={{
              width: "60px",
              filter: "grayscale(100%) invert(1) contrast(800%)",
            }}
          />
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
              <Button
                className={clsx(classes.button, classes.b1)}
                onClick={() => {
                  navigate("/create-nft");
                }}
              >
                Create NFT
              </Button>
            </li>
            <li className={classes.item}>
              <Badge
                color="secondary"
                // overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                invisible={!badge}
                badgeContent="Wrong Network"
              >
                <Button
                  className={clsx(
                    classes.button,
                    status === -1 ? classes.b2 : classes.b2n
                  )}
                  style={{ width: "109px" }}
                  onClick={async (event) => {
                    if (status === -1) {
                      if (badge) setOpen(true);
                      else await connectWeb3();
                    } else if (status === 1) handleClick(event);
                  }}
                >
                  {status === 1 ? (
                    `${accounts[0].substr(0, 6)}...${accounts[0].substr(
                      accounts[0].length - 5,
                      4
                    )}`
                  ) : status === 0 ? (
                    <CircularProgress
                      style={{ width: "25px", height: "25px", color: "white" }}
                    />
                  ) : (
                    "Connect"
                  )}
                </Button>
              </Badge>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ padding: "0px" }}
              >
                <StyledMenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/profile");
                  }}
                >
                  <StyledListItemText
                    primary="Your Profile"
                    style={{ fontFamily: "AirbnbCereal" }}
                  />
                  <ListItemIcon style={{ justifyContent: "flex-end" }}>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/edit-profile");
                  }}
                >
                  <StyledListItemText
                    primary="Edit Profile"
                    style={{ fontFamily: "AirbnbCereal" }}
                  />
                  <ListItemIcon style={{ justifyContent: "flex-end" }}>
                    <EditOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <StyledListItemText
                    primary="Disconnect"
                    style={{ fontFamily: "AirbnbCereal" }}
                  />
                  <ListItemIcon style={{ justifyContent: "flex-end" }}>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                </StyledMenuItem>
              </StyledMenu>
            </li>
          </ul>
        </div>
      </div>
      <Modal status={open} modalClose={modalClose} title="Wrong Network">
        <div>
          Your wallet is currently connected to a different network. Please
          change it to the Ropsten network to continue.
        </div>
      </Modal>
    </div>
  );
};

export default Header;
