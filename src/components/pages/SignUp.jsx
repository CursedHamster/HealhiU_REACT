import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserForm.css";
import { Context } from "../../Context";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../Button";
import PasswordInput from "../PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";

function SignUp() {
  const context = useContext(Context);
  const { register } = context;
  const { required, min, max, confirm, email, login } = context.text.validation;
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);
  const navigate = useNavigate();

  const { title, inputs, info, cta, linkText, link, messageText } = context.text.signUp;
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
    dateOfBirth: Yup.date().required(required),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      register(values, setInfoMessage);
    },
  });

  return (
    <div className="sign-container section-padding vertical page-min-height">
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
            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                isInvalid={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.dateOfBirth}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>
          <div className="btn-container">
            <Button buttonSize="medium" buttonStyle="cta" type="submit">
              {cta}
              <i className="bi bi-arrow-right"></i>
            </Button>
            <p>
              {linkText}
              <Link className="btn-link" to="/sign-in">
                {link}
              </Link>
            </p>
          </div>
          <div
              className={
                "error-text " + (infoMessage ? "s-" + infoMessage : "")
              }
            >
              {messageText[infoMessage] ? messageText[infoMessage] : ""}
            </div>
        </Form>
        <p className="info">{info}</p>
      </div>
    </div>
  );
}

export default SignUp;
