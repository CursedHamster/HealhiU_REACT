import { useContext } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import { Context } from "../../Context";
import Button from "../Button";

function ErrorPage() {
  const context = useContext(Context);
  const { title, text, cta } = context.text.errorPage;
  return (
    <div className="error-container section-padding vertical page-min-height d-flex flex-column">
      <h1>{title}</h1>
      <p>{text}</p>
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
