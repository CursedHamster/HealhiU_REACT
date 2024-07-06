import { useState, useEffect, useContext, useRef } from "react";
import "./Header.css";
import { Context } from "../../Context";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalAlert from "../ModalAlert";
import logo from "/healthiu_logo.svg";
import { Divide as Hamburger } from "hamburger-react";

function Header() {
  const context = useContext(Context);
  const { userType, changeLanguage, text, logout } = context;
  const { modalText } = text.header;
  const { signIn, signUp } = text.header.unauthorized;
  const { test, messages, profile, signOut } = text.header.user;
  const { adminRegistration, adminMessages, adminDashboard } = text.header.admin;
  const [navs, setNavs] = useState(<></>);
  const [show, setShow] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleClickToggler = (e) => {
    setOpenNav((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (openNav) {
      setOpenNav(false);
    }
    setShow(true);
  };

  const logoutFunction = (allow) => {
    if (allow) {
      logout();
      navigate("/");
    }
  };

  function handleClickLink() {
    setOpenNav(false);
  }

  const getUserHeader = (uType) => {
    return !uType ? (
      <>
        <Link className="nav-link" to="/sign-in" onClick={handleClickLink}>
          {signIn}
        </Link>
        <Link className="nav-link" to="/sign-up" onClick={handleClickLink}>
          {signUp}
        </Link>
      </>
    ) : uType === "ADMIN" ? (
      <>
        <Link
          className="nav-link"
          to="/admin-registration"
          onClick={handleClickLink}
        >
          {adminRegistration}
        </Link>
        <Link
          className="nav-link"
          to="/admin-messages"
          onClick={handleClickLink}
        >
          {adminMessages}
        </Link>
        <Link
          className="nav-link"
          to="/admin-dashboard"
          onClick={handleClickLink}
        >
          {adminDashboard}
        </Link>
        <Link className="nav-link" to="/profile" onClick={handleClickLink}>
          {profile}
        </Link>
        <Link className="nav-link" to="/" onClick={handleLogout}>
          {signOut}
        </Link>
      </>
    ) : (
      <>
        <Link className="nav-link" to="/test" onClick={handleClickLink}>
          {test}
        </Link>
        <Link className="nav-link" to="/messages" onClick={handleClickLink}>
          {messages}
        </Link>
        <Link className="nav-link" to="/profile" onClick={handleClickLink}>
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

  useEffect(() => {
    if (openNav) {
      const checkIfClickedOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpenNav(false);
        }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }
  }, [openNav]);

  return (
    <>
      <Navbar expand="lg" ref={ref}>
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
          <Hamburger
            toggled={openNav}
            toggle={handleClickToggler}
            size={28}
            label="Menu"
            rounded
          />
          <Navbar.Collapse in={openNav}>
            <div>
              <Nav>{navs}</Nav>
            </div>
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
