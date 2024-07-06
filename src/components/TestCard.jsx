import { useContext } from "react";
import "./ResultCard.css";
import { Context } from "../Context";

function TestCard(props) {
  const context = useContext(Context);
  const {
    genderLabel,
    ageLabel,
    heightLabel,
    weightLabel,
    chestSizeLabel,
    waistSizeLabel,
    hipSizeLabel,
    bloodTypeLabel,
    genderText,
  } = context.text.testCard;
  const {
    gender,
    age,
    height,
    weight,
    chestSize,
    waistSize,
    hipSize,
    bloodType,
  } = props.testInfo;

  return (
    <div className="result-card test-card d-flex rounded-5">
        <div className="col">
          <div className="test-cell">
            <h3>{genderLabel}</h3>
            <p className="cell">{genderText[gender]}</p>
          </div>
          <div className="test-cell">
            <h3>{ageLabel}</h3>
            <p className="cell">{age}</p>
          </div>
          <div className="test-cell">
            <h3>{heightLabel}</h3>
            <p className="cell">{height}</p>
          </div>
          <div className="test-cell">
            <h3>{weightLabel}</h3>
            <p className="cell">{weight}</p>
          </div>
        </div>
        <div className="col">
          <div className="test-cell">
            <h3>{chestSizeLabel}</h3>
            <p className="cell">{chestSize}</p>
          </div>
          <div className="test-cell">
            <h3>{waistSizeLabel}</h3>
            <p className="cell">{waistSize}</p>
          </div>
          <div className="test-cell">
            <h3>{hipSizeLabel}</h3>
            <p className="cell">{hipSize}</p>
          </div>
          <div className="test-cell">
            <h3>{bloodTypeLabel}</h3>
            <p className="cell">{bloodType}</p>
          </div>
        </div>
    </div>
  );
}

export default TestCard;
