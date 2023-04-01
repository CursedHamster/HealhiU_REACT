import { useStatem, useEffect } from "react";
import "./Test.css";
import { Form } from "react-bootstrap";

function Test(props) {
  const { inputValue, setInputValue, changeAnswered } = props;
  const { id, imgUrl, title, description, type, answers, restrictions, name } =
    props.question;
  const getRadioItem = (value, text, i) => (
    <Form.Check
      className="d-flex align-items-center gap-3"
      inline
      key={"radio-" + i}
      type="radio"
      label={text}
      value={value}
      name={"radio-" + id}
      checked={value === inputValue}
      onChange={(e) =>
        e.target.checked ? setInputValue(name, e.target.value) : ""
      }
      id={"radio-" + i}
    />
  );
  const getSelectItem = (value, text, i) => (
    <option key={"option-" + i} value={value}>
      {text}
    </option>
  );
  const changeInputValue = (e) => setInputValue(name, e.target.value);

  useEffect(() => {
    if (type === "select") {
      changeAnswered(name, true);
    }
  }, [type]);

  function getInputComponent(type) {
    let component;

    switch (type) {
      case "radio":
        component = (
          <div className="test-input test-radios">
            {answers.map((val, i) => getRadioItem(val.value, val.text, i))}
          </div>
        );
        break;
      case "select":
        component = (
          <Form.Group className="mb-3 test-input" controlId={name}>
            <Form.Select
              id={name}
              name={name}
              onChange={(e) => setInputValue(name, e.target.value)}
              value={inputValue}
            >
              {answers.map((val, i) => getSelectItem(val.value, val.text, i))}
            </Form.Select>
          </Form.Group>
        );
        break;
      case "input":
        component = (
          <Form.Group className="mb-3 test-input" controlId={name}>
            <Form.Control
              className="number-input"
              placeholder="0"
              type="number"
              name={name}
              value={inputValue}
              onChange={changeInputValue}
              onBlur={(e) =>
                restrictions
                  ? validateInput(
                      e.target.value,
                      restrictions.min,
                      restrictions.max
                    )
                  : ""
              }
              min={restrictions ? restrictions.min : ""}
              max={restrictions ? restrictions.max : ""}
              required
            />
          </Form.Group>
        );
        break;
      default:
        break;
    }

    return component;
  }

  function validateInput(value, min, max) {
    if (value < min) {
      setInputValue(name, min + "");
    } else if (value > max) {
      setInputValue(name, max + "");
    }
  }

  return (
    <div className="test">
      <div className="text">
        <h2>
          {id}. {title}
        </h2>
        <p>{description}</p>
        {getInputComponent(type)}
      </div>
      <img className="test-image shadow-sm" src={imgUrl} />
    </div>
  );
}

export default Test;
