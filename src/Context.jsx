import { useState, useEffect, createContext } from "react";
import textData from "./assets/text";
import getRandomColor from "./components/utils/getRandomColor";
import api from "./components/config/axiosConfig";

const Context = createContext();

function ContextProvider(props) {
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState("ukr");
  const [text, setText] = useState(textData.ukr);
  const [messages, setMessages] = useState([]);
  const languages = ["ukr", "eng"];
  const languageItemName = "language";
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [requested, setRequested] = useState(null);
  const [chatroomRequests, setChatroomRequests] = useState({
    user: [],
    doctor: [],
  });
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem(languageItemName)) {
      localStorage.setItem(languageItemName, language);
    } else {
      setLanguage(localStorage.getItem(languageItemName));
    }

    if (localStorage.getItem("auth")) {
      let authData = JSON.parse(localStorage.getItem("auth"));
      renew({
        username: authData.username,
        refreshToken: authData.refreshToken,
      });
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (language === "ukr") {
      setText(textData.ukr);
    } else {
      setText(textData.eng);
    }
  }, [language]);

  useEffect(() => {
    setUserType(user ? user.role : null);
    if (user?.role == "ADMIN") {
      getChatroomRequests();
    } else {
      if (user) {
        getRequested(user.login);
        setLoaded(false);
        getChatrooms(user.login).finally(() => setLoaded(true));
      }
    }
  }, [user]);

  function changeLanguage(lang) {
    if (languages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem(languageItemName, lang);
    }
  }

  async function login(loginData) {
    setLoaded(false);
    let errorText = null;
    await api
      .post("/api/auth/login", loginData)
      .then((res) => {
        let data = res.data;
        if (!data.token) {
          throw new Error("Invalid login or password");
        }
        localStorage.setItem("auth", JSON.stringify(data));
        setUserData(data.username, data.token);
      })
      .catch((error) => (errorText = true))
      .finally(() => setLoaded(true));

    return errorText;
  }

  async function renew(renewData) {
    setLoaded(false);
    await api
      .post("/api/auth/renew", renewData)
      .then((res) => {
        let data = res.data;
        if (data.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ ...renewData, token: data.token })
          );
          setUserData(renewData.username, data.token);
        }
      })
      .catch((error) => console.error(error));
  }

  async function register(registerData) {
    let errorText = null;
    if (!registerData.role) {
      setLoaded(false);
      await api
        .post("/api/auth/register", registerData)
        .then((res) => {
          let data = res.data;
          if (!data.token) {
            throw new Error("Login or email in use");
          }
          localStorage.setItem("auth", JSON.stringify(data));
          setUserData(data.username, data.token);
        })
        .catch((error) => (errorText = true))
        .finally(() => setLoaded(true));
    } else {
      await api
        .post(
          "/api/auth/admin-register?role=" + registerData.role,
          registerData
        )
        .catch((error) => (errorText = true));
    }
    return errorText;
  }

  async function changeUser(userData) {
    let errorCode = null;
    await api
      .post("/api/user/change", userData)
      .then((res) => {
        let data = res.data;
        if (!data.login) {
          throw new Error("Invalid request");
        }
        setUser(data);
        errorCode = res.status;
      })
      .catch((error) => {
        errorCode = error.response ? error.response.status : null;
      });
    return errorCode;
  }

  function logout() {
    localStorage.removeItem("auth");
    setUser(null);
  }

  function setUserData(login, token) {
    api
      .get("/api/user?login=" + login + "&token=" + token)
      .then((res) => res.data)
      .then((data) => setUser(data));
  }

  function getUserProfile(login, setUser) {
    setLoaded(false);
    api
      .get("/api/user/" + login)
      .then((res) => res.data)
      .then((data) => setUser(data))
      .catch((error) => setUser(null))
      .finally(() => setLoaded(true));
  }

  function getRequested(login) {
    api
      .get("/api/chatroom/requested?login=" + login)
      .then((res) => setRequested(res.data));
  }

  function requestChatroom(login) {
    api
      .post(
        "/api/chatroom/request-chatroom?login=" +
          login +
          "&color=" +
          getRandomColor()
      )
      .then((res) => setRequested(res.data ? res.data : false))
      .catch((error) => {
        console.error(error);
      });
  }

  function unrequestChatroom(login) {
    api
      .delete("/api/chatroom/unrequest-chatroom?login=" + login)
      .then((res) => setRequested(res.data ? !res.data : true))
      .catch((error) => {
        console.error(error);
      });
  }

  function getChatroomRequests() {
    setLoaded(false);
    api
      .get("/api/admin-messages/requests")
      .then((res) =>
        setChatroomRequests(
          res.data
            ? res.data
            : {
                user: [],
                doctor: [],
              }
        )
      )
      .finally(() => setLoaded(true));
  }

  async function getChatrooms(login) {
    await api
      .get("/api/chatroom/chatrooms?login=" + login)
      .then((res) => res.data)
      .then((res) => setChatrooms(res));
  }

  function addNewChatroom(requests) {
    let errorText = null;
    api
      .post("/api/admin-messages/add-chatroom", requests)
      .then((res) =>
        setChatroomRequests((prev) => ({
          ...prev,
          user: prev.user.filter(
            (val) => val.userLogin !== requests.user.userLogin
          ),
        }))
      )
      .catch((error) => {
        errorText = true;
      });

    return errorText;
  }

  function getMessages(userLogin, companionLogin) {
    api
      .get(
        "/api/chatroom/messages?login=" +
          userLogin +
          "&companion=" +
          companionLogin
      )
      .then((res) => res.data)
      .then((messagesList) => setMessages(messagesList));
  }

  function addNewMessage(messageObj, stompClient) {
    stompClient.send(
      "/app/message/" +
        messageObj.senderLogin +
        "/" +
        messageObj.recipientLogin,
      {},
      JSON.stringify({
        content: messageObj.content,
        senderLogin: messageObj.senderLogin,
        recipientLogin: messageObj.recipientLogin,
      })
    );
  }

  function getNewMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  function askToUpdateMessages(senderLogin, recipientLogin, stompClient) {
    stompClient.send(
      "/app/message/" + senderLogin + "/" + recipientLogin,
      {},
      JSON.stringify({
        content: null,
        senderLogin: senderLogin,
        recipientLogin: recipientLogin,
      })
    );
  }

  async function updateMessageStatus(message) {
    let updated = false;
    await api
      .put("/api/chatroom/message/update-status?id=" + message.id)
      .then((res) => (updated = true))
      .catch((error) => {
        console.error(error);
      });
    return updated;
  }

  function getTestResult(testData, setResult) {
    api
      .post("/api/test/result", testData)
      .then((res) => {
        let data = res.data;
        if (!data?.bmi) {
          throw new Error("Invalid request");
        }
        setResult(data);
      })
      .catch((error) => console.log(error));
  }

  function saveTestResult(testData, login, setInfoMessage) {
    api
      .post("/api/test/result/save?login=" + login, testData)
      .then((res) => {
        if (!res?.data?.bmi) {
          throw new Error("Invalid request");
        }
        setInfoMessage(res.status);
      })
      .catch((error) => setInfoMessage(error.response.status));
  }

  function showTestResultOfUser(login, setTestResult) {
    api
      .get("/api/test/result/show?login=" + login)
      .then((res) => res.data)
      .then((result) => setTestResult(result?.bmi ? result : null));
  }

  return (
    <Context.Provider
      value={{
        loaded,
        text,
        user,
        userType,
        userLogin: user?.login,
        getChatrooms,
        getMessages,
        messages,
        addNewChatroom,
        addNewMessage,
        getNewMessage,
        updateMessageStatus,
        askToUpdateMessages,
        changeLanguage,
        register,
        login,
        logout,
        changeUser,
        getUserProfile,
        requested,
        requestChatroom,
        unrequestChatroom,
        chatroomRequests,
        chatrooms,
        getTestResult,
        saveTestResult,
        showTestResultOfUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
