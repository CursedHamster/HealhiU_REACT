import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../Context";
import "./TestResult.css";
import ResultCard from "../ResultCard";
import Button from "../Button";
import ModalAlert from "../ModalAlert";

function TestResult(props) {
  const context = useContext(Context);
  const { userLogin, saveTestResult } = context;
  const { resultVariants } = context.text.resultCard;
  const { title, goToHome, saveButton, modalText, messageText } = context.text.testResult;
  const location = useLocation();
  const testResult = location.state;
  const [result, setResult] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [show, setShow] = useState(false);
  const handleSave = () => setShow(true);
  useEffect(() => {
    if (testResult) {
      setResult(testResult);
    }
  }, [testResult]);
  function saveResult() {
    saveTestResult(result, userLogin, setInfoMessage);
  }
  return (
    <>
      <div
        className={
          "test-result section-padding vertical page-min-height d-flex flex-column gap-4" +
          (infoMessage ? " invalid" : "")
        }
      >
        <img className="green" src="green.png" />
        <h1>{title}</h1>
        {result && (
          <>
            <p>{resultVariants[result.testResult]}</p>
            <ResultCard cardType="type-s" resultInfo={result} />
          </>
        )}
        <div className="button-group">
          <Link to="/">
            <Button buttonStyle="outline" buttonSize="medium">
              {goToHome}
            </Button>
          </Link>
          {userLogin && result && (
            <Button buttonStyle="cta" buttonSize="medium" onClick={handleSave}>
              {saveButton} <i className="bi bi-sd-card"></i>
            </Button>
          )}
        </div>
        <div
          className={"error-text " + (infoMessage ? "s-" + infoMessage : "")}
        >
          {messageText[infoMessage] ? messageText[infoMessage] : ""}
        </div>
      </div>
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={saveResult}
        modalText={modalText}
      />
    </>
  );
}

export default TestResult;
