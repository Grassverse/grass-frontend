import React, { useState, useEffect } from "react";
import "./App.css";

import Wrapper from "./Wrapper";

import axios from "axios";

const App = () => {
  const [nfts, setNfts] = useState([]);

  const getAllNfts = () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/swapnil1023/grass3", {
        query: `{
      nftentities {
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
        // console.log(res);
        setNfts(res.data.data.nftentities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllNfts();
  }, []);

  return (
    <div className="App">
      <Wrapper nfts={nfts} />
    </div>
  );
};

export default App;
