import { useState, useContext, useEffect } from "react";
import "./Profile.css";
import "./UserForm.css";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col } from "react-bootstrap";
import { Context } from "../../Context";
import Button from "../Button";
import ResultCard from "../ResultCard";
import PasswordInput from "../PasswordInput";
import ModalAlert from "../ModalAlert";
import { useFormik } from "formik";
import * as Yup from "yup";

function Profile() {
  const context = useContext(Context);
  const { userLogin = "", changeUser } = context;
  const contextUser = context.user;
  const { min, max, confirm, email } = context.text.validation;
  const { resultInfo } = context.testData;
  const [infoMessage, setInfoMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    name: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (contextUser) {
      setUser(contextUser);
    }
  }, [contextUser]);

  const [password, setPassword] = useState("");
  const [showResultCard, setShowResultCard] = useState(false);

  const [formValues, setFormValues] = useState(null);
  const {
    title,
    inputs,
    info,
    cta,
    showTestResult,
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
    dateOfBirth: Yup.date(),
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

  function handleChangeUser(allow) {
    if (allow) {
      let error = changeUser({ ...formValues, login: userLogin });
      error.then((res) => {
        setInfoMessage(res)
      });
      formik.setTouched({})
      formik.setErrors({})
    }
  }

  const handleClose = (e) => {
    e.preventDefault();
    setShowResultCard(false);
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShowResultCard(true);
  };
  const handleLoginInput = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="sign-container section-padding vertical">
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
                  isInvalid={formik.errors.name}
                />
                {formik.errors.name && (
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
              isInvalid={formik.errors.password}
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
              isInvalid={formik.errors.confirmPassword}
            />
            <Form.Group as={Row} className="mb-3" controlId="dateOfBirth">
              <Form.Label column>{dateOfBirthLabel}</Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  min="1900-01-01"
                  name="dateOfBirth"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                  required
                  isValid={
                    formik.touched.dateOfBirth && !formik.errors.dateOfBirth
                  }
                  isInvalid={formik.errors.dateOfBirth}
                />
                {formik.errors.dateOfBirth && (
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
            <div className={"error-text " + (infoMessage ? "s-" + infoMessage : "")}>
              {messageText[infoMessage] ? messageText[infoMessage] : ""}
            </div>
          </Form>
          <p className="info">{info}</p>
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
        <ResultCard cardType="type-d" resultInfo={resultInfo} />
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
