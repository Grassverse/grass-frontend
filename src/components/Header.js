import clsx from "clsx";
import React, { useState, useEffect } from "react";

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

const Header = ({ updateUser, updateContracts }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  const [status, setStatus] = useState(-1);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const loadBlockchainData = async () => {
  //   const web3 = new Web3(Web3.givenProvider);
  //   const network = await web3.eth.net.getNetworkType();
  //   console.log("newtork:", network);
  // };

  const connectWeb3 = async () => {
    setStatus(0);
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // let web3;
      // if(window.ethereum)
      // {
      //   web3 = new Web3(window.ethereum);
      //   await ethereum.enable();
      // }
      // else if(window.web3){
      //   web3 = new Web3(window.web3.currentProvider);
      // }

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
      setWeb3(web3);
      setAccounts(accounts);
      setContract(nftInstance);

      sessionStorage.setItem("connected", "true");
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const checkSessionStorage = () => {
    if (typeof Storage !== undefined) {
      if (sessionStorage.getItem("connected") === "true") connectWeb3();
    }
  };

  useEffect(() => {
    checkSessionStorage();
  }, []);

  useEffect(() => {
    if (contract) {
      setStatus(1);
      // runExample();
    }
  }, [contract]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      updateUser(accounts[0]);
    }
  }, [accounts]);

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
              <Button
                className={clsx(
                  classes.button,
                  status === -1 ? classes.b2 : classes.b2n
                )}
                style={{ width: "109px" }}
                onClick={async (event) => {
                  if (status === -1) await connectWeb3();
                  else if (status === 1) handleClick(event);
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
                    setStatus(0);

                    sessionStorage.removeItem("connected");
                    updateUser(null);
                    updateContracts(null);
                    setStatus(-1);

                    handleClose();
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
    </div>
  );
};

export default Header;
