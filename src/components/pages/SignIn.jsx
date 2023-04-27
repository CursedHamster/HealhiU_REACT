import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserForm.css";
import { Context } from "../../Context";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../Button";
import PasswordInput from "../PasswordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-bootstrap/Toast";

function SignIn() {
  const context = useContext(Context);
  const handleLogin = context.login;
  const { required, min, max, login } = context.text.validation;

  const { title, inputs, info, cta, linkText, link, errorText } =
    context.text.signIn;
  const { loginLabel, passwordLabel } = inputs.inputLabels;
  const { loginPlaceholder } = inputs.inputPlaceholders;

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast((prev) => !prev);

  const schema = Yup.object().shape({
    login: Yup.string()
      .min(4, min + 4)
      .max(12, max + 12)
      .matches(/^[A-Za-z0-9._-]*$/, login)
      .required(required),
    password: Yup.string()
      .min(6, min + 6)
      .max(15, max + 15)
      .required(required),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      handleLogin(
        {
          username: values.login,
          password: values.password,
        },
        navigate,
        setErrorMessage,
        toggleShowToast
      );
    },
  });

  return (
    <div className="sign-container section-padding vertical page-min-height">
      <h1>{title}</h1>
      <div className="sides">
        <Form
          action="post"
          noValidate
          className={"sign-form" + (errorMessage ? " invalid" : "")}
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
          <PasswordInput
            label={passwordLabel}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <div className="btn-container">
            <Button buttonSize="medium" buttonStyle="cta" type="submit">
              {cta}
              <i className="bi bi-arrow-right"></i>
            </Button>
            <p>
              {linkText}
              <Link className="btn-link" to="/sign-up">
                {link}
              </Link>
            </p>
          </div>
        </Form>
        <p className="info">{info}</p>
      </div>
      <Toast
        show={showToast}
        onClose={toggleShowToast}
        delay={5000}
        autohide
      >
        <Toast.Header className="justify-content-between">
          <i className="icon bi bi-exclamation-square-fill"></i>
          {errorText}
        </Toast.Header>
      </Toast>
    </div>
  );
}

export default SignIn;
