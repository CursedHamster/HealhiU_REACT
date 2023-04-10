import { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Context } from "../../Context";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../ModalAlert";
import logo from "/logo.svg";

function Header() {
  const context = useContext(Context);
  const { userType, changeLanguage, text, logout } = context;
  const { modalText } = text.header;
  const { signIn, signUp } = text.header.unauthorized;
  const { test, messages, profile, signOut } = text.header.user;
  const { adminRegistration, adminMessages } = text.header.admin;
  const [navs, setNavs] = useState(
    <>
      <Dropdown.Item>
        <Link className="nav-link" to="/sign-in">
          {signIn}
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
      <Link className="nav-link" to="/sign-up">
        {signUp}
      </Link>
      </Dropdown.Item>
    </>
  );
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

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

  // useEffect(() => {
  //   const checkIfClickedOutside = e => {
  //     if (show && ref.current && !ref.current.contains(e.target)) {
  //       setShow(false)
  //     }
  //   }
  //   document.addEventListener("mousedown", checkIfClickedOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside)
  //   }
  // }, [show])

  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <div className="logo-and-language">
            <Link className="navbar-brand" to="/">
              <img src={logo} className="logo" /> HealthiU
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
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="bi bi-list"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {navs}
            </Dropdown.Menu>
          </Dropdown>
          {/* <Navbar.Toggle ref={ref} aria-controls="basic-navbar-nav">
            <i className="bi bi-list"></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>{navs}</Nav>
          </Navbar.Collapse> */}
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
