import React, { useState, useEffect, useRef } from "react";

import { Button, Grid, makeStyles, CircularProgress } from "@material-ui/core";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import getUser from "../../db";

const useStyles = makeStyles((theme) => ({
  input: {
    padding: "15px",
    borderRadius: "10px",
    outline: 0,
    fontSize: "18px",
    borderWidth: "1px",
    margin: "1px",
    resize: "none",
    width: "250px",
    fontFamily: "AirbnbCerealLight",
    "&:focus": {
      margin: "0px",
      borderWidth: "2px",
      borderColor: "black",
    },
  },
  rows: {
    margin: "20px 0px",
    [theme.breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
  },
  label: {
    display: "block",
    width: "102px",
    [theme.breakpoints.up("xs")]: {
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0px",
    },
  },
}));

const EditProfile = ({ user }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const emailRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    getUser(user)
      .then((res) => {
        setProfile(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // axios
    //   .get(`/api/users/${user}`)
    //   .then((res) => {
    //     setProfile(res.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     setLoading(false);
    //   });
  }, []);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image")) setSelectedFile(event.target.files[0]);
      else alert("Upload only Image");
    }
  };

  const validate = () => {
    return !(
      nameRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === "" ||
      bioRef.current.value.trim() === "" ||
      !(selectedFile || (profile.dp && profile.dp.trim() !== ""))
    );
  };

  const updateProfile = async () => {
    if (!validate()) {
      alert("All fields must be filled");
      return;
    }
    setLoading(true);

    let data = new FormData();

    data.append("name", nameRef.current.value.trim());
    data.append("photo", selectedFile);
    data.append("email", emailRef.current.value.trim());
    data.append("bio", bioRef.current.value.trim());
    if (
      profile.dp &&
      profile.dp !== "" &&
      profile.dp.includes(user.toLowerCase())
    ) {
      data.append(
        "oldext",
        profile.dp.split(user.toLowerCase())[1].split("?")[0]
      );
    }

    console.log(data);

    axios
      .patch(`/api/users/${user.toLowerCase()}`, data)
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <div style={{ textAlign: "left", marginBottom: "60px" }}>
      <h2>Edit Profile</h2>
      <div style={{ marginTop: "50px" }}>
        <div>
          <Grid container className={classes.rows}>
            <Grid item xs={12} sm={5}>
              <div style={{ fontSize: "18px", border: "0px" }}>Your Name</div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ border: "0px" }}>
                <input
                  ref={nameRef}
                  type="name"
                  className={classes.input}
                  defaultValue={profile ? profile.name : ""}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container className={classes.rows}>
            <Grid item xs={12} sm={5}>
              <div style={{ fontSize: "18px", border: "0px" }}>
                Profile Image
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ border: "0px" }}>
                <input
                  ref={imgRef}
                  type="file"
                  id="photo"
                  name="img"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    onFileChange(event);
                  }}
                />
                <label htmlFor="photo" className={classes.label}>
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      border: "1px solid black",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="profile-pic"
                        draggable="false"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : profile && profile.dp.trim() !== "" ? (
                      <img
                        src={profile.dp}
                        alt="profile-pic"
                        draggable="false"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <p style={{ textAlign: "center", color: "grey" }}>
                        Upload image
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid container className={classes.rows}>
            <Grid item xs={12} sm={5}>
              <div style={{ fontSize: "18px", border: "0px" }}>Your Email</div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ border: "0px" }}>
                <input
                  ref={emailRef}
                  type="email"
                  className={classes.input}
                  defaultValue={profile ? profile.email : ""}
                />
              </div>
            </Grid>
          </Grid>
          <Grid container className={classes.rows}>
            <Grid item xs={12} sm={5}>
              <div style={{ fontSize: "18px", border: "0px" }}>
                Bio (upto 200 characters)
              </div>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ border: "0px" }}>
                <textarea
                  ref={bioRef}
                  rows="3"
                  maxLength="200"
                  className={classes.input}
                  defaultValue={profile ? profile.bio : ""}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              fontFamily: "AirbnbCereal",
              textTransform: "none",
              borderRadius: "30px",
              padding: "10px 30px",
              fontSize: "16px",
              marginTop: "20px",
            }}
            onClick={() => {
              updateProfile();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
