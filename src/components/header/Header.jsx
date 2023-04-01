import { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Context } from "../../Context";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../ModalAlert";

function Header() {
  const context = useContext(Context);
  const { userType, changeLanguage, text, logout } = context;
  const { modalText } = text.header;
  const { signIn, signUp } = text.header.unauthorized;
  const { test, messages, profile, signOut } = text.header.user;
  const { adminRegistration, adminMessages } = text.header.admin;
  const [navs, setNavs] = useState(
    <>
      <Link className="nav-link" to="/sign-in">
        {signIn}
      </Link>
      <Link className="nav-link" to="/sign-up">
        {signUp}
      </Link>
    </>
  );
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const logoutFunction = (allow) => {
    if (allow) {
      logout();
      navigate("/");
    }
  };

  const getUserHeader = (uType) => {
    return !uType ? (
      <>
        <Link className="nav-link" to="/sign-in">
          {signIn}
        </Link>
        <Link className="nav-link" to="/sign-up">
          {signUp}
        </Link>
      </>
    ) : uType === "ADMIN" ? (
      <>
        <Link className="nav-link" to="/test">
          {test}
        </Link>
        <Link className="nav-link" to="/admin-registration">
          {adminRegistration}
        </Link>
        <Link className="nav-link" to="/admin-messages">
          {adminMessages}
        </Link>
        <Link className="nav-link" to="/profile">
          {profile}
        </Link>
        <Link className="nav-link" to="/" onClick={handleLogout}>
          {signOut}
        </Link>
      </>
    ) : (
      <>
        <Link className="nav-link" to="/test">
          {test}
        </Link>
        <Link className="nav-link" to="/messages">
          {messages}
        </Link>
        <Link className="nav-link" to="/profile">
          {profile}
        </Link>
        <Link className="nav-link" to="/" onClick={handleLogout}>
          {signOut}
        </Link>
      </>
    );
  };

  useEffect(() => {
    setNavs(getUserHeader(userType));
  }, [text]);

  useEffect(() => {
    setNavs(getUserHeader(userType));
  }, [userType]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <div className="logo-and-language">
            <Link className="navbar-brand" to="/">
              <img src="logo.svg" className="logo" /> HealthiU
            </Link>
            <div className="language">
              <p
                className="language-option"
                onClick={() => changeLanguage("ukr")}
              >
                УКР
              </p>
              <p
                className="language-option"
                onClick={() => changeLanguage("eng")}
              >
                ENG
              </p>
            </div>
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i className="bi bi-list"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>{navs}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={logoutFunction}
        modalText={modalText}
      />
    </>
  );
}

export default Header;
