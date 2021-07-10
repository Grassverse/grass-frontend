import React, { useEffect, useState, useRef } from "react";
import "./CreateNft.css";

import Preview from "./Preview";

import { makeStyles } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  createCont: {
    [theme.breakpoints.down("sm")]: {
      padding: "24px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "40px 60px",
    },
  },
}));

const CreateNft = () => {
  const classes = useStyles();

  const nameRef = useRef(null);
  const descRef = useRef(null);
  const quantRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const whenResized = () => {
    const el1 = document.getElementById("create-cont-1");
    const el2 = document.getElementById("create-cont-2");

    if (window.matchMedia("(max-width: 500px)").matches) {
      el1.style.marginLeft = "0px";
      el1.style.marginRight = "0px";
    } else if (el1.offsetTop === el2.offsetTop) {
      el1.style.marginRight = "70px";
      el1.style.marginLeft = "0px";
    } else if (el1.offsetTop !== el2.offsetTop) {
      el1.style.marginRight = "70px";
      el1.style.marginLeft = "70px";
    }
  };

  useEffect(() => {
    whenResized();
    window.addEventListener("resize", () => {
      whenResized();
    });

    return () => {
      window.removeEventListener("resize", () => {
        whenResized();
      });
    };
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file.type);
      if (file.type.startsWith("image") || file.type.startsWith("video"))
        setSelectedFile(event.target.files[0]);
      else alert("Upload only Image or Video");
    }
  };

  const validateNft = () => {
    if (
      !selectedFile ||
      nameRef.current.value.trim() === "" ||
      descRef.current.value.trim() === "" ||
      quantRef.current.value.trim === ""
    )
      alert("Fill the form completely");
    else {
      alert("Functionality yet to be implemented 🙂");
    }
  };

  return (
    <div style={{ textAlign: "left" }}>
      <h1>Create NFT</h1>
      <div
        className={classes.createCont}
        style={{
          textAlign: "left",
          borderRadius: "25px",
          boxShadow: "0 0 11px 2px rgb(0 0 0 / 5%)",
          marginBottom: "50px",
        }}
      >
        <h3 style={{ alignItems: "center", display: "flex" }}>
          <VisibilityIcon />
          &nbsp;&nbsp;NFT Preview
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <input
            type="file"
            id="upload-file"
            style={{ display: "none" }}
            accept="video/*,image/*"
            onChange={(event) => {
              onFileChange(event);
            }}
          />
          <label htmlFor="upload-file">
            <div
              id="create-cont-1"
              style={{
                fontFamily: "AirbnbCerealLight",
                fontWeight: 100,
                border: "1px dashed #7417ea",
                borderRadius: "25px",
                padding: selectedFile ? "0px" : "100px 60px",
                width: "270px",
                textAlign: "center",
                cursor: "pointer",
                marginRight: "70px",
                boxSizing: "border-box",
                height: "417px",
                overflow: "hidden",
              }}
            >
              {!selectedFile ? (
                <React.Fragment>
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png"
                    alt="upload"
                    style={{ height: "80px" }}
                  />
                  <p style={{ color: "rgb(104, 100, 100)" }}>
                    Click here to upload your file
                  </p>
                  <p style={{ color: "rgb(177, 177, 177)" }}>
                    JPEG, JPG, PNG, GIF, or MP4
                  </p>
                </React.Fragment>
              ) : (
                <Preview url={URL.createObjectURL(selectedFile)} />
              )}
            </div>
          </label>
          <div id="create-cont-2" style={{ flex: "1 1 150px" }}>
            <h4>Name</h4>
            <input
              type="text"
              className="create-input"
              placeholder="Ternoa Collection"
              ref={nameRef}
            ></input>
            <h4>Description</h4>
            <textarea
              multiline="true"
              rows={3}
              type="text"
              className="create-input"
              placeholder="A cool description"
              style={{ resize: "none" }}
              ref={descRef}
            ></textarea>
            <h4>Quantity</h4>
            <input
              type="number"
              className="create-input"
              placeholder="1"
              ref={quantRef}
            ></input>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "50px 0px 20px 0px" }}>
          <button
            className="create-nft-button"
            onClick={() => {
              validateNft();
            }}
          >
            Create NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNft;
