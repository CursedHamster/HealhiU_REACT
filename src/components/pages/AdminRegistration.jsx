import { useState, useContext } from "react";
import "./UserForm.css";
import { Context } from "../../Context";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../Button";
import PasswordInput from "../PasswordInput";
import ModalAlert from "../ModalAlert";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-bootstrap/Toast";


function AdminRegistration() {
  const context = useContext(Context);
  const { register } = context;
  const { required, min, max, dateError, confirm, email, login } = context.text.validation;

  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState({
    error: false,
    success: false,
  });
  const [formValues, setFormValues] = useState(null);

  const minDateOfBirth = "1900-01-01";
  const maxDateOfBirth = new Date().toLocaleDateString("fr-ca");

  const { title, inputs, info, cta, modalText, messageText } =
    context.text.adminRegistration;
  const {
    loginLabel,
    emailLabel,
    nameLabel,
    passwordLabel,
    confirmPasswordLabel,
    dateOfBirthLabel,
    roleLabel,
  } = inputs.inputLabels;
  const { loginPlaceholder, emailPlaceholder, namePlaceholder } =
    inputs.inputPlaceholders;
  const [show, setShow] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast((prev) => !prev);

  const schema = Yup.object().shape({
    login: Yup.string()
      .min(4, min + 4)
      .max(12, max + 12)
      .matches(/^[A-Za-z0-9._-]*$/, login)
      .required(required),
    email: Yup.string().email(email).required(required),
    name: Yup.string()
      .min(1, min + 1)
      .max(30, max + 30)
      .required(required),
    password: Yup.string()
      .min(6, min + 6)
      .max(15, max + 15)
      .required(required),
    confirmPassword: Yup.string()
      .matches(new RegExp(password, "g"), confirm)
      .required(required),
    dateOfBirth: Yup.date().required(required).min(minDateOfBirth, dateError)
    .max(maxDateOfBirth, dateError),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      role: "USER",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setFormValues(values);
      setShow(true);
    },
  });

  function addNewUser(allow) {
    if (allow) {
      register(formValues, setInfoMessage, toggleShowToast);
    }
  }

  return (
    <>
      <div className="sign-container section-padding vertical page-min-height">
        <h1>{title}</h1>
        <div className="sides">
          <Form
            action="post"
            className={
              "sign-form " +
              (infoMessage.error ? "invalid" : "") +
              (infoMessage.success ? "valid" : "")
            }
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.login}
                  required
                  isInvalid={formik.touched.login && formik.errors.login}
                />
                {formik.touched.login && formik.errors.login && (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.login}
                  </Form.Control.Feedback>
                )}
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
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
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
            <Form.Group as={Row} className="mb-3" controlId="role">
              <Form.Label column>{roleLabel}</Form.Label>
              <Col>
                <Form.Select
                  id="role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option value="USER">USER</option>
                  <option value="DOCTOR">DOCTOR</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <div className="btn-container">
              <Button buttonSize="medium" buttonStyle="cta" type="submit">
                {cta}
                <i className="bi bi-arrow-right"></i>
              </Button>
            </div>
          </Form>
          <div className="info">{info}</div>
        </div>
      </div>
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={addNewUser}
        modalText={modalText}
      />
      <Toast
        show={showToast}
        onClose={toggleShowToast}
        className={infoMessage.success ? "s-200" : "s-500"}
        delay={5000}
        autohide
      >
        <Toast.Header className="justify-content-between">
          <i className="icon bi bi-exclamation-square-fill"></i>
          {infoMessage.error ? messageText.error : messageText.success}
        </Toast.Header>
      </Toast>
    </>
  );
}

export default AdminRegistration;
