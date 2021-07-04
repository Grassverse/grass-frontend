import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";
import "./App.css";

import Wrapper from "./Wrapper";

import Footer from "./components/Footer";

import { Container, CircularProgress } from "@material-ui/core";

let nftCount = -1;

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    console.log("newtork:", network);
  };

  const connectWeb3 = async () => {
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
      let accounts;
      //= await web3.eth.getAccounts();

      // Get the contract instance.
      //const networkId = await web3.eth.net.getId();
      //const deployedNetwork = SimpleStorageContract.networks[networkId];
      var abi = CONTRACT_ABI;
      var contractAddress = CONTRACT_ADDRESS;
      const instance = new web3.eth.Contract(abi, contractAddress);
      // new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  useEffect(() => {
    connectWeb3();
  }, []);

  useEffect(() => {
    if (contract) {
      runExample();
    }
  }, [contract]);

  const runExample = async () => {
    //var account =   accounts[0];
    //console.log(account);
    nftCount = await contract.methods.getCurrentCount().call();

    for (var i = 1; i <= nftCount; i++) {
      const nft = await contract.methods.getNft(i).call();
      setNfts((nfts) => [...nfts, nft]);
      // this.setState({
      //   nfts: [...this.state.nfts, nft],
      // });
    }

    console.log("nfts : ", nfts);
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
    <div className="App">
      {/* {nfts.map((nft, key) => {
        return (
          <div key={key}>
            <img src={nft.uri} alt="ngt-img" />
            <span className="content">Artist : {nft.artist}</span>
            <span className="content">tokenId : {key}</span>
          </div>
        );
      })} */}
      {parseInt(nftCount) === nfts.length ? (
        <Wrapper nfts={nfts} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default App;

// function App() {
//   const routing = useRoutes(routes);

//   return (
//     <div className="App">
//       <Container maxWidth="md">{routing}</Container>
//       <Footer />
//     </div>
//   );
// }

// export default App;
