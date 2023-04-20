import { useState, useContext, useEffect } from "react";
import "./Profile.css";
import "./UserForm.css";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Context } from "../../Context";
import Button from "../Button";
import ResultCard from "../ResultCard";
import TestCard from "../TestCard";
import PasswordInput from "../PasswordInput";
import ModalAlert from "../ModalAlert";
import { useFormik } from "formik";
import * as Yup from "yup";

function Profile() {
  const context = useContext(Context);
  const {
    userLogin = "",
    changeUser,
    showTestResultOfUser,
    changeUserAndProfilePicture,
    setLoaded,
  } = context;
  const contextUser = context.user;
  const { min, max, dateError, confirm, email } = context.text.validation;
  const [infoMessage, setInfoMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    name: "",
    dateOfBirth: "",
    imgUrl: null,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const minDateOfBirth = "1900-01-01";
  const maxDateOfBirth = new Date().toLocaleDateString("fr-ca");

  useEffect(() => {
    if (contextUser) {
      setUser((prev) => ({ ...prev, ...contextUser }));
      showTestResultOfUser(contextUser.login, setResult);
    }
  }, [contextUser]);

  const [password, setPassword] = useState("");
  const [showResultCard, setShowResultCard] = useState(false);

  const [formValues, setFormValues] = useState(null);
  const {
    title,
    inputs,
    cta,
    uploadImage,
    showTestResult,
    noResultText,
    closeTestResult,
    modalText,
    messageText,
  } = context.text.profile;
  const {
    loginLabel,
    emailLabel,
    nameLabel,
    passwordLabel,
    confirmPasswordLabel,
    dateOfBirthLabel,
  } = inputs.inputLabels;
  const { loginPlaceholder, emailPlaceholder, namePlaceholder } =
    inputs.inputPlaceholders;
  const [show, setShow] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email(email),
    name: Yup.string()
      .min(1, min + 1)
      .max(30, max + 30),
    password: Yup.string()
      .min(6, min + 6)
      .max(15, max + 15),
    confirmPassword: Yup.string().matches(new RegExp(password, "g"), confirm),
    dateOfBirth: Yup.date()
      .min(minDateOfBirth, dateError)
      .max(maxDateOfBirth, dateError),
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.name,
      password: "",
      confirmPassword: "",
      dateOfBirth: user.dateOfBirth,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setFormValues(values);
      setShow(true);
    },
    enableReinitialize: true,
  });

  function handleUploadImage(e) {
    setProfileImage(e.target.files[0]);
  }

  function handleChangeUser(allow) {
    if (allow) {
      setLoaded(false);
      const userData = { ...formValues, login: userLogin, imgUrl: user.imgUrl };
      const formData = new FormData();
      formData.append("file", profileImage);
      let error = profileImage
        ? changeUserAndProfilePicture(userData, formData)
        : changeUser(userData);
      error
        .then((res) => {
          setInfoMessage(res);
        })
        .finally(() => setLoaded(true));
      formik.setTouched({});
      formik.setErrors({});
    }
  }

  const handleClose = () => {
    setShowResultCard(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShowResultCard(true);
    setCurrentIndex(0);
  };
  const handleLoginInput = (e) => {
    e.preventDefault();
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
        <h1>{title}</h1>
        <div className="sides">
          <Form
            action="post"
            className={"sign-form" + (infoMessage ? " invalid" : "")}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Form.Group as={Row} className="mb-3" controlId="login">
              <Form.Label column>{loginLabel}</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder={loginPlaceholder}
                  name="login"
                  value={userLogin}
                  onChange={handleLoginInput}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column>{emailLabel}</Form.Label>
              <Col>
                <Form.Control
                  type="email"
                  placeholder={emailPlaceholder}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                  isValid={formik.touched.email && !formik.errors.email}
                  isInvalid={formik.errors.email}
                />
                {formik.errors.email && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column>{nameLabel}</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder={namePlaceholder}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  required
                  isValid={formik.touched.name && !formik.errors.name}
                  isInvalid={formik.touched.name && formik.errors.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.name}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <PasswordInput
              label={passwordLabel}
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <PasswordInput
              label={confirmPasswordLabel}
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              required
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Form.Group as={Row} className="mb-3" controlId="dateOfBirth">
              <Form.Label column>{dateOfBirthLabel}</Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min={minDateOfBirth}
                  max={maxDateOfBirth}
                  name="dateOfBirth"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                  required
                  isValid={
                    formik.touched.dateOfBirth && !formik.errors.dateOfBirth
                  }
                  isInvalid={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.dateOfBirth}
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <div className="btn-container">
              <Button buttonSize="medium" buttonStyle="primary" type="submit">
                {cta}
                <i className="bi bi-gear-fill"></i>
              </Button>
              <Button
                buttonSize="medium"
                buttonStyle="outline"
                onClick={handleShow}
              >
                {showTestResult}
              </Button>
            </div>
            <div
              className={
                "error-text " + (infoMessage ? "s-" + infoMessage : "")
              }
            >
              {messageText[infoMessage] ? messageText[infoMessage] : ""}
            </div>
          </Form>
          <div className="profile-picture">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : user.imgUrl
                  ? user.imgUrl
                  : "/profile_image.png"
              }
            />
            <Form.Group className="mb-3" controlId="imgFile">
              <Form.Label className="button outline file-label" column>
                {uploadImage}
                <i className="bi bi-camera-fill"></i>
              </Form.Label>
              <Form.Control
                type="file"
                name="imgFile"
                className="file-input"
                accept="image/png, image/jpeg"
                onChange={handleUploadImage}
              />
              {formik.errors.name && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </div>
        </div>
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
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={handleChangeUser}
        modalText={modalText}
      />
    </>
  );
}

export default Profile;
