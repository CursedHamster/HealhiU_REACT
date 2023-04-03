import { useContext } from "react";
import "./ResultCard.css";
import { Context } from "../Context";

function ResultCard(props) {
  const context = useContext(Context);
  const {
    bmiLabel,
    resultLabel,
    resultVariants,
    dietLabel,
    dietVariants,
    caloriesLabel,
    caloriesVariants,
  } = context.text.resultCard;
  const { maintain, lose05, lose1, gain05, gain1 } = caloriesVariants;

  const { cardType } = props;
  const { bmi, testResult, goodProducts, badProducts, calories } = props.resultInfo;

  const goodProductsItems = dietVariants[goodProducts].map((gProduct, i) => (
    <div key={"good-product-" + i} className="product w-100 d-flex">
      <i className="bi bi-check"></i>
      <p>{gProduct}</p>
    </div>
  ));
  const badProductsItems = dietVariants[badProducts].map((bProduct, i) => (
    <div key={"good-product-" + i} className="product w-100 d-flex">
      <i className="bi bi-x"></i>
      <p>{bProduct}</p>
    </div>
  ));

  //'type-s' as type standard and 'type-d' as type with description, in the later one space is reserved for description
  const cardTypes = ["type-s", "type-d"];
  return (
    <div className="result-card d-flex">
      <div className="sides w-100 d-flex">
        <div className="left d-flex flex-column">
          <div className="bmi-cell w-100 d-flex">
            <h3>{bmiLabel}</h3>
            <p className="cell">{bmi?.toFixed(2)}</p>
          </div>
          <div className="diet-cell w-100">
            <h3 className="vertical-heading">{dietLabel}</h3>
            <div className="cell d-flex flex-column">
              {goodProductsItems}
              {badProductsItems}
            </div>
          </div>
        </div>
        <div className="right d-flex flex-column">
          <h3>{caloriesLabel}</h3>
          <div className="calories w-100 d-flex flex-column flex-fill">
            {calories.maintain && (
              <div className="calorie">
                <p>{maintain}</p>
                <p className="cell">{calories?.maintain.toFixed(2)}</p>
              </div>
            )}
            {calories.lose05 && (
              <div className="calorie">
                <p>{lose05}</p>
                <p className="cell">{calories?.lose05.toFixed(2)}</p>
              </div>
            )}
            {calories.lose1 && (
              <div className="calorie">
                <p>{lose1}</p>
                <p className="cell">{calories?.lose1.toFixed(2)}</p>
              </div>
            )}
            {calories.gain05 && (
              <div className="calorie">
                <p>{gain05}</p>
                <p className="cell">{calories?.gain05.toFixed(2)}</p>
              </div>
            )}
            {calories.gain1 && (
              <div className="calorie">
                <p>{gain1}</p>
                <p className="cell">{calories?.gain1.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {cardType && cardType === cardTypes[1] && (
        <div className="description-result w-100 d-flex flex-column">
          <h3>{resultLabel}</h3>
          <p className="cell">{resultVariants[testResult]}</p>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
