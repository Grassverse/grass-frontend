import React, { useEffect } from "react";

import { Button, Grid } from "@material-ui/core";
import CustomCard from "./CustomCard";

import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

const NftPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container style={{ display: "flex", margin: "30px 0px" }}>
      <CustomCard url="https://ternoa.mypinata.cloud/ipfs/QmfUt4DeFsgpUn4oyzATVp1uMAEe56qvRCrodgAX4dPLqs" />
      <Grid item md={7} style={{ margin: "0px 30px 30px 30px" }}>
        <h1
          style={{
            letterSpacing: "1px",
            textAlign: "left",
            padding: "0px 0px",
            margin: "0px 0px 10px 0px",
          }}
        >
          CAPS machine
        </h1>
        <hr />
        <p
          style={{
            fontFamily: "AirbnbCerealBook",
            textAlign: "left",
            fontSize: "14px",
            lineHeight: "26px",
            margin: "35px 0px 30px 0px",
          }}
        >
          "I wanted to represent an analogy, the Ternoa capsules as ""caps"",
          drugs, gelules....permitting time travel thanks to the mythical
          DeLorean DMC-12. A Pop vision of the magic capsule"
        </p>
        <Grid
          item
          sm={10}
          md={8}
          style={{
            display: "flex",
            flexWrap: "wrap-reverse",
          }}
        >
          <Grid
            item
            md={6}
            xs={10}
            style={{ margin: "auto", justifyContent: "center" }}
          >
            <div>
              <b style={{ fontSize: "12px", margin: "auto" }}>
                Available : 4 of 5
              </b>
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: "rgb(116, 23, 234)",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "26px",
                  width: "140px",
                  margin: "4px",
                  fontWeight: "600",
                  fontSize: "17px",
                  padding: "5px 0px",
                }}
              >
                Buy
              </Button>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            xs={10}
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              fontSize: "20px",
            }}
          >
            <b> 100 CAPS</b>
            <span
              style={{
                fontWeight: "100",
                fontFamily: "AirbnbCerealLight",
                color: "rgb(177,177,177)",
              }}
            >
              12.7301$
            </span>
          </Grid>
        </Grid>
        <div style={{ display: "flex", marginTop: "30px" }}>
          <div>
            <h4 style={{ margin: "0px 20px 0px 0px" }}>History</h4>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <hr style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "20px 0px" }}
        >
          <CheckCircleOutlineRoundedIcon />
          <img
            src="https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
            style={{ width: "60px", margin: "0px 10px", borderRadius: "50%" }}
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
            <span style={{ color: "rgb(116, 23, 234)" }}>Owner</span>
            <span>Rafael Pereira</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleOutlineRoundedIcon />
          <img
            src="https://marketplacemedias.fra1.digitaloceanspaces.com/5DqWHNhop6ZLWTJmdBzGjtVLnrH6AaEoN2k4WDkWaWTUsu7U"
            style={{ width: "60px", margin: "0px 10px", borderRadius: "50%" }}
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
            <span style={{ color: "rgb(116, 23, 234)" }}>Creator</span>
            <span>Rafael Pereira</span>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default NftPage;
