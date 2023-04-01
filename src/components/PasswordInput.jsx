import { Form, Row, Col, InputGroup } from "react-bootstrap";
import useToggle from "./utils/useToggle";
import "./PasswordInput.css";

function PasswordInput(props) {
  const [show, toggleShow] = useToggle(false);
  const handleClick = (e) => {
    toggleShow();
  };
  const {
    label,
    id,
    error,
    name,
    onChange,
    onBlur,
    value,
    isValid,
    isInvalid,
    required,
  } = props;

  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label column>{label}</Form.Label>
      <Col>
        <InputGroup>
          <Form.Control
            className={error ? "error-input" : ""}
            type={show ? "text" : "password"}
            aria-describedby="eye-addon"
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            required={required}
            isValid={isValid}
            isInvalid={isInvalid}
          />
          <InputGroup.Text id="eye-addon">
            <i
              className={"bi " + (show ? "bi-eye-slash" : "bi-eye")}
              onClick={handleClick}
            ></i>
          </InputGroup.Text>
        </InputGroup>
        {isInvalid && (
          <Form.Control.Feedback type="invalid" tooltip>
            {isInvalid}
          </Form.Control.Feedback>
        )}
      </Col>
    </Form.Group>
  );
}

export default PasswordInput;
