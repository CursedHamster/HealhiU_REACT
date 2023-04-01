import "./Footer.css";
import { useContext } from "react";
import { Context } from "../../Context";

function Footer() {
  const context = useContext(Context);
  const footer = context.text.footer;

  return (
    <footer className="footer section-padding">
      <p>{footer}</p>
    </footer>
  );
}

export default Footer;
