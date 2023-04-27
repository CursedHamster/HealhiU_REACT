import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../Context";
import "./TestResult.css";
import ResultCard from "../ResultCard";
import Button from "../Button";
import Toast from "react-bootstrap/Toast";

function TestResult(props) {
  const context = useContext(Context);
  const { userLogin, saveTestResult } = context;
  const { resultVariants } = context.text.resultCard;
  const { title, goToHome, saveButton, messageText } = context.text.testResult;
  const location = useLocation();
  const testResult = location.state;
  const [result, setResult] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast((prev) => !prev);
  
  useEffect(() => {
    if (testResult) {
      setResult(testResult);
    }
  }, [testResult]);

  function saveResult() {
    saveTestResult(result, userLogin, setInfoMessage, setShowToast);
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
            <Button buttonStyle="cta" buttonSize="medium" onClick={saveResult}>
              {saveButton} <i className="bi bi-sd-card"></i>
            </Button>
          )}
        </div>
      </div>
      <Toast
        className={infoMessage ? "s-" + infoMessage : ""}
        show={showToast}
        onClose={toggleShowToast}
        delay={5000}
        autohide
      >
        <Toast.Header className="justify-content-between">
          <i className="icon bi bi-exclamation-square-fill"></i>
          {messageText[infoMessage] ? messageText[infoMessage] : ""}
        </Toast.Header>
      </Toast>
    </>
  );
}

export default TestResult;
