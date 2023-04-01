import "./Message.css";

function Message(props) {
  const { messageType, text, time, read } = props;
  // type-s - sender, right. type-r - receiver, left
  const messageTypes = ["sender", "receiver"];
  const getMessageType = (type) =>
    messageTypes.includes(type) > -1 ? type : messageTypes[1];

  return (
    <div className={"message " + getMessageType(messageType)}>
      <p className="text">{text}</p>
      <div className="additional">
        <p className="time">{time}</p>
        {messageType === messageTypes[0] && (
          <i className={"bi bi-check2" + (read ? "-all" : "")}></i>
        )}
      </div>
    </div>
  );
}

export default Message;
