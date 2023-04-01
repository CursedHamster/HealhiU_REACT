import { useState, useEffect, useContext, useRef } from "react";
import "./Messages.css";
import { Context } from "../../Context";
import Message from "../Message";
import Button from "../Button";
import useToggle from "../utils/useToggle";
import Stomp from "stompjs";

function Messages() {
  //constants
  const BROKER_URL = "ws://localhost:8080/chat-messaging";
  const TOPIC_NAME = "/chat/messages/";
  const messageId = "messageId";

  //context data
  const context = useContext(Context);
  const {
    userType,
    userLogin,
    getChatrooms,
    addNewMessage,
    getNewMessage,
    getMessages,
    updateMessageStatus,
    askToUpdateMessages,
    messages,
    requested,
    requestChatroom,
    unrequestChatroom,
    chatrooms,
  } = context;
  const {
    enableApplication,
    disableApplication,
    titleWithLogin,
    titleWithoutLogin,
    defaultMessage,
    messagePlaceholder,
  } = context.text.messages;

  //states
  const [showNav, toggleShowNav] = useToggle(false);
  const [chatroom, setChatroom] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  //functions to get chatroom information
  const getCompanionLogin = (chat) =>
    userType === "USER" ? chat.doctorLogin : chat.userLogin;
  const getCompanionColor = (chat) =>
    userType === "USER" ? chat.doctorColor : chat.userColor;

  //get jsx chatroom list
  const chatItems = chatrooms.map((chat) => {
    const unreadCount = chat.unreadMessagesCount;
    return (
      <div
        key={"chat-" + getCompanionLogin(chat)}
        className={"chat" + (chat.id === chatroom?.id ? " active" : "")}
        onClick={() => setChatroom(chat)}
      >
        <div className={"circle " + getCompanionColor(chat)}></div>
        <p>{getCompanionLogin(chat)}</p>
        {unreadCount > 0 && (
          <div className="unread-tag">
            {unreadCount < 10 ? unreadCount : "9+"}
          </div>
        )}
      </div>
    );
  });

  //get jsx messages list
  const messageItems = messages.map((message) => {
    if (message.status === "UNREAD" && message.recipientLogin === userLogin) {
      updateStatus(message);
    }
    return (
      <Message
        key={"message-" + message.id}
        messageType={
          message.recipientLogin === userLogin ? "receiver" : "sender"
        }
        text={message.content}
        time={convertDateToTime(new Date(message.timestamp))}
        read={message.status === "READ"}
      />
    );
  });

  //scrolling to bottom
  const bottomRef = useRef(null);
  const scrollToBottomMessage = () =>
    (bottomRef.current.scrollTop = bottomRef.current.scrollHeight);

  //useEffect's
  useEffect(() => {
    scrollToBottomMessage();
    window.addEventListener("resize", scrollToBottomMessage);
    setWebSocket(new WebSocket(BROKER_URL));

    return () => {
      window.removeEventListener("resize", scrollToBottomMessage);
    };
  }, []);

  useEffect(() => {
    if (chatrooms.length > 0) {
      if (!chatrooms.some((chat) => chat.id === chatroom?.id)) {
        setChatroom(chatrooms[0]);
      }
    }
  }, [chatrooms]);

  useEffect(() => {
    if (chatroom) {
      getMessages(userLogin, getCompanionLogin(chatroom));
      if (stompClient) {
        subscribe();
      }
    }
  }, [chatroom]);

  useEffect(() => {
    if (webSocket) {
      setStompClient(Stomp.over(webSocket));
    }
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, subscribe);
    }
    return () => {
      if (stompClient) {
        disconnect();
      }
    };
  }, [stompClient]);

  useEffect(() => {
    scrollToBottomMessage();
  }, [messages]);

  useEffect(() => {
    scrollToBottomMessage();
  }, [showNav]);

  //handlers
  const handleRequest = (e) => requestChatroom(userLogin);
  const handleUnrequest = (e) => unrequestChatroom(userLogin);
  function handleEnter(e) {
    if ((e.ctrlKey && e.key === "Enter") || (e.shiftKey && e.key === "Enter")) {
      e.preventDefault();
      setMessageInput((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  //converting time from message to time string
  function convertDateToTime(dateObj) {
    return (
      dateObj.getHours().toString().padStart(2, "0") +
      ":" +
      dateObj.getMinutes().toString().padStart(2, "0") +
      ":" +
      dateObj.getSeconds().toString().padStart(2, "0")
    );
  }

  //messaging functions
  function subscribe() {
    if (stompClient.subscriptions.messageId) {
      stompClient.unsubscribe(messageId);
    }
    stompClient.subscribe(TOPIC_NAME + userLogin, onSubscribe, {
      id: messageId,
    });
  }

  function onSubscribe(data) {
    const message = JSON.parse(data.body);
    const companionLogin = chatroom ? getCompanionLogin(chatroom) : null;
    if (message?.id === null && message?.content === null) {
      getMessages(userLogin, companionLogin);
    } else if (message?.senderLogin === companionLogin) {
      updateStatus(message);
    } else if (message?.recipientLogin === companionLogin) {
      getNewMessage(message);
    }

    getChatrooms(userLogin);
  }

  function disconnect() {
    if (stompClient.subscriptions.messageId) {
      stompClient.unsubscribe(messageId);
    }
    stompClient.disconnect();
  }

  function sendMessage() {
    if (messageInput.trim().length > 0) {
      addNewMessage(
        {
          senderLogin: userLogin,
          recipientLogin: getCompanionLogin(chatroom),
          content: messageInput,
        },
        stompClient
      );
      setMessageInput("");
    }
  }

  function updateStatus(message) {
    const updated = updateMessageStatus(message);
    updated.then((res) => {
      if (res) {
        askToUpdateMessages(userLogin, message.senderLogin, stompClient);
      }
    });
  }

  return (
    <div
      className={
        "messages-page section-padding page-min-height " +
        (showNav && "open-nav")
      }
    >
      <div className="messages d-flex">
        <div className="messages-nav-container">
          <div className="messages-nav-header">
            <i
              className={"bi bi-" + (showNav ? "chevron-left" : "list")}
              onClick={toggleShowNav}
            ></i>
          </div>
          {!(userType === "USER" && chatrooms.length > 0) &&
            (requested ? (
              <Button buttonStyle="outline" onClick={handleUnrequest}>
                {disableApplication}
              </Button>
            ) : (
              <Button buttonStyle="primary" onClick={handleRequest}>
                {enableApplication}
              </Button>
            ))}
          <div className="messages-nav-chats">{chatItems}</div>
        </div>
        <div className="messages-container flex-column">
          <h4 className="companion">
            {chatroom ? (
              <>
                {titleWithLogin} <b>{getCompanionLogin(chatroom)}</b>
              </>
            ) : (
              <>{titleWithoutLogin}</>
            )}
          </h4>
          <div className="text-boxes" ref={bottomRef}>
            {chatroom ? (
              messageItems
            ) : (
              <Message
                messageType="receiver"
                text={defaultMessage}
                time="00:00:00"
              />
            )}
          </div>
          <div className="text-input-container">
            <textarea
              className="text-input"
              name="text_input"
              id="text_input"
              rows="3"
              onKeyDown={handleEnter}
              placeholder={messagePlaceholder}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            ></textarea>
            <div className="text-blob" onClick={sendMessage}>
              <i className="bi bi-send-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;