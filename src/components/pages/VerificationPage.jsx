import { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import { useSearchParams, Link } from "react-router-dom";
import Button from "../Button";
import "./VerificationPage.css";

function VerificationPage(props) {
  const { type = "profile" } = props;
  const context = useContext(Context);
  const { verifyUser, verifyEmail } = context;
  const { title, image } = context.text.verificationPage;
  const infoText = context.text.verificationPage.infoText[type];
  const cta = context.text.verificationPage.cta[type];
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    if (type === "profile") {
      verifyUser(token, setEnabled);
    } else {
      verifyEmail(token, setEnabled);
    }
  }, []);

  return (
    <div className="verification-container section-padding vertical page-min-height d-flex">
      {enabled !== null && (
        <>
          <div className="verification-info d-flex flex-column">
            <h1>{title}</h1>
            <p>{enabled ? infoText.ok : infoText.bad}</p>
            {enabled ? (
              <Link to={type === "profile" ? "/sign-in" : "/profile"}>
                <Button buttonStyle="cta">
                  {cta.ok}
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Link>
            ) : (
              <Link to={type === "profile" ? "/sign-up" : "/profile"}>
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
