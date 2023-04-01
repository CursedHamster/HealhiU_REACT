import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import "./TestResult.css";
import ResultCard from "../ResultCard";
import Button from "../Button";

function TestResult(props) {
  const context = useContext(Context);
  const { resultVariants } = context.text.resultCard;
  const { title, goToHome } = context.text.testResult;
  const { resultInfo } = context.testData;
  return (
    <div className="test-result section-padding vertical page-min-height d-flex flex-column gap-4">
      <img className="green" src="green.png" />
      <h1>{title}</h1>
      <p>{resultVariants[resultInfo.result]}</p>
      <ResultCard cardType="type-s" resultInfo={resultInfo} />
      <Link to="/">
        <Button buttonStyle="cta" buttonSize="medium">
          {goToHome} <i className="bi bi-arrow-right"></i>
        </Button>
      </Link>
    </div>
  );
}

export default TestResult;
