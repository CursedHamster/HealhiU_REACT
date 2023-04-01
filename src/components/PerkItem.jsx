import "./PerkItem.css";

function PerkItem(props) {
  const { icon, title, text } = props;
  return (
    <div className="perk-item">
      <div className="icon-container">
        <i className={icon}></i>
      </div>
      <div className="text">
        <h2>{props.title}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default PerkItem;
