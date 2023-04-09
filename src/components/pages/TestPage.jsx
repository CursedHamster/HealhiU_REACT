import { useState, useEffect, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import "./TestPage.css";
import Test from "../Test";
import Button from "../Button";

function TestPage() {
  const context = useContext(Context);
  const { getTestResult } = context;
  const { back, next, complete, questions, errorText } = context.text?.test;

  const navigate = useNavigate();

  const questionsLength = questions?.length;
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({
    gender: "MALE",
    age: "",
    height: "",
    weight: "",
    chestSize: "",
    waistSize: "",
    hipSize: "",
    bloodType: "O",
  });
  const [answered, setAnswered] = useState({
    gender: true,
    age: false,
    height: false,
    weight: false,
    chestSize: false,
    waistSize: false,
    hipSize: false,
    bloodType: false,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const changeAnswered = (name, val) =>
    setAnswered((prev) => ({ ...prev, [name]: val }));

  const testPages = questions.map((question, i) => (
    <Fragment key={"test-pages-" + i}>
      {i !== 0 && <div className="page-breaker"></div>}
      <div
        className={
          "page-number" +
          (answered[question.name] ? " answered" : "") +
          (question.id === currentQuestion ? " active" : "")
        }
        onClick={() => goToQuestion(question.id)}
      >
        {question.id}
      </div>
    </Fragment>
  ));

  useEffect(() => {
    if (error) {
      setError(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (result) {
      navigate("/test-result", { state: result });
    }
  }, [result]);

  function changeAnswers(name, newValue) {
    setAnswers((prev) => ({ ...prev, [name]: newValue }));
    changeAnswered(name, newValue.length > 0);
  }

  function previousQuestion() {
    setCurrentQuestion((prev) => prev - 1);
  }

  function nextQuestion() {
    setCurrentQuestion((prev) => prev + 1);
  }

  function goToQuestion(questionNumber) {
    setCurrentQuestion(questionNumber);
  }

  function completeTest() {
    let valid = true;
    for (var key in answered) {
      if (answered[key] === false) {
        valid = false;
      } else {
        answers[key] = Number.parseFloat(answers[key])
          ? Number.parseFloat(answers[key])
          : answers[key];
      }
    }

    if (valid) {
      getTestResult(answers, setResult);
    } else {
      setError(true);
    }
  }

  return (
    <div
      className={
        "test-page section-padding vertical page-min-height" +
        (error ? " invalid" : "")
      }
    >
      <div className="page-numbers">{testPages}</div>
      <Test
        question={questions[currentQuestion - 1]}
        inputValue={answers[questions[currentQuestion - 1].name]}
        setInputValue={changeAnswers}
        changeAnswered={changeAnswered}
      />
      <div className="button-group">
        <Button
          buttonStyle={currentQuestion === 1 ? "outline" : "primary"}
          buttonSize="medium"
          disabled={currentQuestion === 1}
          onClick={previousQuestion}
        >
          {back}
        </Button>
        {currentQuestion === questionsLength ? (
          <Button buttonStyle="cta" buttonSize="medium" onClick={completeTest}>
            {complete}
            <i className="bi bi-arrow-right"></i>
          </Button>
        ) : (
          <Button
            buttonStyle="primary"
            buttonSize="medium"
            onClick={nextQuestion}
          >
            {next}
          </Button>
        )}
      </div>
      <div className="error-text">{errorText}</div>
    </div>
  );
}

export default TestPage;
