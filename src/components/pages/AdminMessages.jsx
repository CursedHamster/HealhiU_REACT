import { useEffect, useState, useContext } from "react";
import "./AdminMessages.css";
import { Form } from "react-bootstrap";
import { Context } from "../../Context";
import Button from "../Button";
import ModalAlert from "../ModalAlert";

function AdminMessages() {
  const context = useContext(Context);
  const { chatroomRequests, addNewChatroom } = context;
  const {
    title,
    users,
    doctors,
    userInputPlaceholder,
    doctorInputPlaceholder,
    cta,
    modalText,
    messageText,
  } = context.text.adminMessages;
  const [inputData, setInputData] = useState({ user: "", doctor: "" });
  const [infoMessage, setInfoMessage] = useState({
    error: false,
    success: false,
  });
  const [show, setShow] = useState(false);

  const userListItems = chatroomRequests?.user.map((request, i) => (
    <li
      key={"userListItem" + i}
      className="chat-list-item"
      onClick={() => handleAddLogin(request.userLogin, "user")}
    >
      <div className="user">
        <div className={"circle " + request.color}></div>
        <p>{request.userLogin}</p>
      </div>
      <i className="bi bi-person-plus-fill"></i>
    </li>
  ));
  const doctorListItems = chatroomRequests?.doctor.map((request, i) => (
    <li
      key={"userListItem" + i}
      className="chat-list-item"
      onClick={() => handleAddLogin(request.doctorLogin, "doctor")}
    >
      <div className="user">
        <div className={"circle " + request.color}></div>
        <p>{request.doctorLogin}</p>
      </div>
      <i className="bi bi-person-plus-fill"></i>
    </li>
  ));

  function handleAddLogin(login, type) {
    setInputData((prev) => ({ ...prev, [type]: login }));
  }

  function handleClick(e) {
    e.preventDefault();
    if (
      inputData.user.trim().length > 0 &&
      inputData.doctor.trim().length > 0
    ) {
      setShow(true);
    }
  }

  function handleNewChatroom(allow) {
    if (allow) {
      let error = addNewChatroom({
        user: chatroomRequests?.user.find(
          (val) => val.userLogin === inputData.user
        ),
        doctor: chatroomRequests?.doctor.find(
          (val) => val.doctorLogin === inputData.doctor
        ),
      });
      error.then((res) => setInfoMessage({ error: res, success: !res }));
      setInputData({ user: "", doctor: "" });
    }
  }

  return (
    <>
      <div className="admin-messages section-padding vertical page-min-height">
        <h1>{title}</h1>
        <div className="sides d-flex">
          <div className="side left">
            <p>{users}</p>
            <ul className="chat-list client">{userListItems}</ul>
          </div>
          <div className="side right">
            <p>{doctors}</p>
            <ul className="chat-list doctor">{doctorListItems}</ul>
          </div>
        </div>
        <Form
          action="post"
          className={
            "admin-messages-form " +
            (infoMessage.error ? "invalid" : "") +
            (infoMessage.success ? "valid" : "")
          }
        >
          <div className="chat-inputs">
            <Form.Control
              type="text"
              placeholder={userInputPlaceholder}
              readOnly
              value={inputData.user}
            />
            <Form.Control
              type="text"
              placeholder={doctorInputPlaceholder}
              readOnly
              value={inputData.doctor}
            />
          </div>
          <Button buttonSize="medium" buttonStyle="cta" onClick={handleClick}>
            {cta}
            <i className="bi bi-envelope-plus-fill"></i>
          </Button>
          <div className="error-text">
            {infoMessage.error ? messageText.error : messageText.success}
          </div>
        </Form>
      </div>
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={handleNewChatroom}
        modalText={modalText}
      />
    </>
  );
}

export default AdminMessages;