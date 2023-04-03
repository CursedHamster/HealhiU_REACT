import "./Button.css";

function Button(props) {
  const { className, buttonSize, buttonStyle, onClick, type, disabled } = props;
  const buttonSizes = ["small", "medium", "large"];
  const buttonStyles = ["cta", "outline", "solid", "icon"];
  return (
    <button
      className={
        "button " +
        (className ? className : "") +
        " " +
        (buttonSizes.includes(buttonSize) ? buttonSize : "small") +
        " " +
        (buttonStyles.includes(buttonStyle) ? buttonStyle : "solid")
      }
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
