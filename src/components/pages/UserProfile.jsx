import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "./Profile.css";
import "./UserForm.css";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Context } from "../../Context";
import Button from "../Button";
import ResultCard from "../ResultCard";
import TestCard from "../TestCard";

function UserProfile() {
  const { login } = useParams();
  const context = useContext(Context);
  const {
    userLogin = "",
    userType,
    getUserProfile,
    showTestResultOfUser,
  } = context;
  const {
    noUser,
    inputs,
    goBack,
    showTestResult,
    noResultText,
    closeTestResult,
  } = context.text.profile;
  const { nameLabel, dateOfBirthLabel, roleLabel } = inputs.inputLabels;
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login) {
      if (login === userLogin) {
        navigate("/profile");
      } else {
        getUserProfile(login, setUser);
        showTestResultOfUser(login, setResult);
      }
    }
  }, [login]);

  const handleClose = () => {
    setShowResultCard(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShowResultCard(true);
    setCurrentIndex(0);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  function nextCard(index) {
    if (index + 1 > 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(1);
    }
  }

  function prevCard(index) {
    if (index - 1 < 0) {
      setCurrentIndex(cardsData.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }

  return (
    <>
      <div className="profile sign-container section-padding vertical page-min-height">
        <h1>{user ? user.login : noUser}</h1>
        {user ? (
          <div className="sides">
            <Form action="post" className="sign-form">
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column>{nameLabel}</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    readOnly={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="dateOfBirth">
                <Form.Label column>{dateOfBirthLabel}</Form.Label>
                <Col>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    readOnly={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column>{roleLabel}</Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    name="role"
                    value={user.role}
                    readOnly={true}
                  />
                </Col>
              </Form.Group>
              <div className="btn-container">
                <Button
                  buttonSize="medium"
                  buttonStyle="primary"
                  onClick={handleGoBack}
                >
                  <i className="bi bi-arrow-left"></i>
                  {goBack}
                </Button>
                {(userType === "DOCTOR" || userType === "ADMIN") && (
                  <Button
                    buttonSize="medium"
                    buttonStyle="outline"
                    onClick={handleShow}
                  >
                    {showTestResult}
                  </Button>
                )}
              </div>
            </Form>
            <div className="profile-picture">
              <img src={user.imgUrl ? user.imgUrl : "/profile_image.png"} />
            </div>
          </div>
        ) : (
          <div className="btn-container">
            <Button
              buttonSize="medium"
              buttonStyle="primary"
              onClick={handleGoBack}
            >
              <i className="bi bi-arrow-left"></i>
              {goBack}
            </Button>
          </div>
        )}
      </div>
      <Modal
        className="profile-modal"
        show={showResultCard}
        onHide={handleClose}
      >
        <div className="modal-close" onClick={handleClose}>
          {closeTestResult}
          <i className="bi bi-x"></i>
        </div>
        {result ? (
          <div className="card-container">
            {currentIndex === 0 ? (
              <>
                <ResultCard cardType="type-d" resultInfo={result} />
                <Button
                  className="button-right"
                  buttonStyle="icon"
                  buttonSize="medium"
                  onClick={() => nextCard(currentIndex)}
                >
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </>
            ) : (
              <>
                <TestCard testInfo={result} />
                <Button
                  className="button-left"
                  buttonStyle="icon"
                  buttonSize="medium"
                  onClick={() => prevCard(currentIndex)}
                >
                  <i className="bi bi-chevron-left"></i>
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="no-result">{noResultText}</div>
        )}
      </Modal>
    </>
  );
}

export default UserProfile;
