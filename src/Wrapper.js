import React from "react";

import { useRoutes } from "react-router-dom";

import setPropsToRoutes from "./routes";

import Footer from "./components/Footer";

import { Container } from "@material-ui/core";

const Wrapper = ({ nfts }) => {
  const routing = useRoutes(setPropsToRoutes(nfts));

  console.log(setPropsToRoutes(nfts));

  console.log(nfts);
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
