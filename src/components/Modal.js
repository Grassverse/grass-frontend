import React, { useEffect } from "react";
import { Button, IconButton } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  status,
  modalClose,
  title,
  ...props
}) {
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
          color: "black",
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            backgroundColor: "black",
            color: "white",
            paddingTop: "10px",
          }}
        >
          <h2>{title}</h2>
          <IconButton
            style={{
              color: "white",
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{
            width: "max(300px,40vw)",
            backgroundColor: "black",
            fontFamily: "AirbnbCerealLight",
            color: "white",
            paddingBottom: "50px",
          }}
        >
          {props.children}
        </DialogContent>
        {/* <DialogActions></DialogActions> */}
      </Dialog>
    </div>
  );
}
