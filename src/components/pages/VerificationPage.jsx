import { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import { useSearchParams, Link } from "react-router-dom";
import Button from "../Button";
import "./VerificationPage.css";

function VerificationPage(props) {
  const context = useContext(Context);
  const { verifyUser } = context;
  const { title, infoText, cta, image } = context.text.verificationPage;
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    verifyUser(token, setEnabled);
  }, []);

  return (
    <div className="verification-container section-padding vertical page-min-height d-flex">
      {enabled !== null && (
        <>
          <div className="verification-info d-flex flex-column">
            <h1>{title}</h1>
            <p>{enabled ? infoText.ok : infoText.bad}</p>
            {enabled ? (
              <Link to="/sign-in">
                <Button buttonStyle="cta">
                  {cta.ok}
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Link>
            ) : (
              <Link to="/sign-up">
                <Button buttonStyle="cta">
                  {cta.bad}
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Link>
            )}
          </div>
          <img
            className="verification-image"
            src={enabled ? image.ok : image.bad}
          />
        </>
      )}
    </div>
  );
}

export default VerificationPage;
