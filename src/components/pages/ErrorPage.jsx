import { useContext } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import { Context } from "../../Context";
import Button from "../Button";

function ErrorPage(props) {
  const context = useContext(Context);
  const { title, error, cta } = context.text.errorPage;
  const { errorCode = 404 } = props;
  return (
    <div className="error-container section-padding vertical page-min-height d-flex flex-column">
      <h1>{title + " " + errorCode}</h1>
      <p>{error[errorCode]}</p>
      <Link to="/">
        <Button buttonStyle="cta" buttonSize="medium">
          {cta}
          <i className="bi bi-arrow-right"></i>
        </Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
