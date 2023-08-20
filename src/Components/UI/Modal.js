import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const portalElement = document.getElementById("overlays");
export const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
    </>
  );
};
