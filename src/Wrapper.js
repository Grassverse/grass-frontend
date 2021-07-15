import React, { useState } from "react";

import { useRoutes } from "react-router-dom";

import setPropsToRoutes from "./routes";

import Footer from "./components/Footer";

import { Container } from "@material-ui/core";

const Wrapper = ({ nfts }) => {
  const [user, setUser] = useState(null);

  const updateUser = (acc) => {
    setUser(acc);
  };

  const routing = useRoutes(setPropsToRoutes(nfts, user, updateUser));

  //   if (nfts)
  //     return (
  //       <React.Fragment>
  //         {nfts.map((nft, key) => {
  //           return (
  //             <div key={key}>
  //               <img src={nft.uri} alt="ngt-img" />
  //               <span className="content">Artist : {nft.artist}</span>
  //               <span className="content">tokenId : {key}</span>
  //             </div>
  //           );
  //         })}
  //       </React.Fragment>
  //     );
  return (
    <div>
      <Container maxWidth="md">{routing}</Container>
      <Footer />
    </div>
  );
};

export default Wrapper;
