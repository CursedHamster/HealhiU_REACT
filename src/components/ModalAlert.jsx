import { useState } from "react";
import "./ModalAlert.css";
import { Modal } from "react-bootstrap";
import { Context } from "../Context";
import Button from "./Button";

function ModalAlert(props) {
  const { show, setShow, allowFunction, value } = props;
  const { title, text, noButton, yesButton } = props.modalText;
  const handleClose = (allow) => {
    allowFunction(allow, value);
    setShow(false);
  };
  return (
    <Modal
      className="modal-alert"
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button buttonStyle="outline" onClick={() => handleClose(false)}>
          {noButton}
        </Button>
        <Button buttonStyle="primary" onClick={() => handleClose(true)}>
          {yesButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAlert;
