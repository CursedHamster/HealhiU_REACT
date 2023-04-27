import { useState, useEffect, createContext } from "react";
import textData from "./assets/text";
import api, { url } from "./components/config/axiosConfig";

const Context = createContext();

function ContextProvider(props) {
  const [loaded, setLoaded] = useState(false);
  const [language, setLanguage] = useState("ukr");
  const [text, setText] = useState(textData.ukr);
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
    window.fetch = null;
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
    if (user) {
      setLoaded(true);
    }
  }, [user]);

  function changeLanguage(lang) {
    if (languages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem(languageItemName, lang);
    }
  }

  function login(loginData, navigate, setErrorMessage, toggleShowToast) {
    setLoaded(false);
    api
      .post("/auth/login", loginData)
      .then((res) => {
        let data = res.data;
        if (!data.token) {
          throw new Error("Invalid login or password");
        }
        localStorage.setItem("auth", JSON.stringify(data));
        setUserData(data.username, data.token).finally(() => {
          setLoaded(true);
          navigate("/profile");
        });
      })
      .catch((error) => {
        setErrorMessage(true);
        setLoaded(true);
        toggleShowToast();
      });
  }

  async function renew(renewData) {
    await api
      .post("/auth/renew", renewData)
      .then((res) => {
        let data = res.data;
        if (data.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ ...renewData, token: data.token })
          );
          setUserData(renewData.username, data.token);
        } else {
          setLoaded(true);
        }
      })
      .catch((error) => {
        logout();
        setLoaded(true);
      });
  }

  function register(registerData, setInfoMessage, toggleShowToast) {
    setLoaded(false);
    if (!registerData.role) {
      api
        .post("/auth/register", registerData)
        .then((res) => {
          setInfoMessage(res.status);
        })
        .catch((error) => setInfoMessage(error.response.status))
        .finally(() => {
          setLoaded(true);
          toggleShowToast();
        });
    } else {
      api
        .post("/auth/admin-register?role=" + registerData.role, registerData)
        .then((res) => setInfoMessage({ error: false, success: true }))
        .catch((error) => setInfoMessage({ error: true, success: false }))
        .finally(() => {
          setLoaded(true);
          toggleShowToast();
        });
    }
  }

  function verifyUser(token, setEnabled) {
    setLoaded(false);
    api
      .get("/auth/verify", {
        params: {
          token: token,
        },
      })
      .then((res) => setEnabled(true))
      .catch((error) => setEnabled(false))
      .finally(() => {
        setLoaded(true);
      });
  }

  function verifyEmail(token, setEnabled) {
    setLoaded(false);
    api
      .get("/user/verify", {
        params: {
          token: token,
        },
      })
      .then((res) => setEnabled(true))
      .catch((error) => setEnabled(false))
      .finally(() => {
        setLoaded(true);
      });
  }

  async function changeUser(userData) {
    let errorCode = null;
    await api
      .put("/user/change", userData)
      .then((res) => {
        let data = res.data;
        if (!data.login) {
          throw new Error("Invalid request");
        }
        setUser(data);
        errorCode = res.status;
      })
      .catch((error) => {
        errorCode = error.response ? error.response.status : 400;
      });
    return errorCode;
  }

  async function changeUserAndProfilePicture(userData, pictureData) {
    let newImgUrl = null;
    await api
      .put("/user/change-picture", pictureData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        newImgUrl = res.data;
      })
      .catch((error) => {
        newImgUrl = null;
      });
    if (newImgUrl) {
      return changeUser({ ...userData, imgUrl: newImgUrl });
    }
    return 400;
  }

  function logout() {
    localStorage.removeItem("auth");
    setUser(null);
  }

  async function setUserData(login, token) {
    await api
      .get("/user", {
        params: {
          login: login,
          token: token,
        },
      })
      .then((res) => res.data)
      .then((data) => setUser(data));
  }

  function getUserProfile(login, setUser) {
    setLoaded(false);
    api
      .get("/user/" + login)
      .then((res) => res?.data)
      .then((data) => setUser(data))
      .catch((error) => setUser(null))
      .finally(() => setLoaded(true));
  }

  function getRequested(login) {
    api
      .get("/chatroom/requested", {
        params: {
          login: login,
        },
      })
      .then((res) => setRequested(res.data));
  }

  function requestChatroom(login, setDisabled) {
    setDisabled(true);
    api
      .post(
        "/chatroom/request-chatroom",
        {},
        {
          params: {
            login: login,
          },
        }
      )
      .then((res) => setRequested(res.data ? true : false))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDisabled(false));
  }

  function unrequestChatroom(login, setDisabled) {
    setDisabled(true);
    api
      .delete("/chatroom/unrequest-chatroom", {
        params: {
          login: login,
        },
      })
      .then((res) => setRequested(res.data ? false : true))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDisabled(false));
  }

  function getChatroomRequests() {
    setLoaded(false);
    api
      .get("/admin-messages/requests")
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

  function getChatrooms(login, load) {
    if (load) {
      setLoaded(false);
    }
    api
      .get("/chatroom/chatrooms", {
        params: {
          login: login,
        },
      })
      .then((res) => res.data)
      .then((res) => setChatrooms(res))
      .finally(() => {
        if (load) {
          setLoaded(true);
        }
      });
  }

  function addNewChatroom(requests, setInfoMessage, toggleShowToast) {
    api
      .post("/admin-messages/add-chatroom", requests)
      .then((res) => {
        setChatroomRequests((prev) => ({
          ...prev,
          user: prev.user.filter((val) => val.login !== requests.user),
        }));
        setInfoMessage({ error: false, success: true });
      })
      .catch((error) => {
        setInfoMessage({ error: true, success: false });
      })
      .finally(() => toggleShowToast());
  }

  function getMessages(userLogin, companionLogin, setMessages) {
    api
      .get("/chatroom/messages", {
        params: {
          login: userLogin,
          companion: companionLogin,
        },
      })
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

  function getNewMessage(message, setMessages) {
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
      .put(
        "/chatroom/message/update-status",
        {},
        {
          params: {
            id: message.id,
          },
        }
      )
      .then((res) => (updated = true))
      .catch((error) => {
        console.error(error);
      });
    return updated;
  }

  function getTestResult(testData, setResult) {
    api
      .post("/test/result", testData)
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
      .post("/test/result/save", testData, {
        params: {
          login: login,
        },
      })
      .then((res) => {
        if (!res?.data?.bmi) {
          throw new Error("Invalid request");
        }
        setInfoMessage(res.status);
      })
      .catch((error) => setInfoMessage(error.response.status));
  }

  function showTestResultOfUser(login, setTestResults) {
    api
      .get("/test/result/show", {
        params: {
          login: login,
        },
      })
      .then((res) => res.data)
      .then((results) =>
        setTestResults(results?.length > 0 ? results.reverse() : [])
      );
  }

  function deleteTestResult(
    id,
    setTestResults,
    setInfoMessage,
    toggleShowToast
  ) {
    setLoaded(false);
    api
      .delete("/test/result/delete", {
        params: {
          testId: id,
        },
      })
      .then((res) => {
        setTestResults((prev) => prev.filter((result) => result?.id !== id));
        setInfoMessage("test200");
      })
      .catch((error) => {
        setInfoMessage("test500");
      })
      .finally(() => {
        setLoaded(true);
        toggleShowToast();
      });
  }

  function getAllUsers(setUsers) {
    setLoaded(false);
    api
      .get("/admin-dashboard")
      .then((res) => res.data)
      .then((userList) =>
        setUsers(
          userList?.filter((userItem) => userItem?.login !== user?.login)
        )
      )
      .catch((error) => setUsers(null));
  }

  function deleteUser(login, setUsers) {
    setLoaded(false);
    api
      .delete("/admin-dashboard/delete", {
        params: {
          login: login,
        },
      })
      .then((res) => {
        setUsers((prev) => prev.filter((user) => user.login !== login));
      })
      .catch((error) => console.log(error))
      .finally(() => setLoaded(true));
  }

  return (
    <Context.Provider
      value={{
        loaded,
        setLoaded,
        text,
        user,
        userType,
        userLogin: user?.login,
        getChatrooms,
        getMessages,
        addNewChatroom,
        addNewMessage,
        getNewMessage,
        updateMessageStatus,
        askToUpdateMessages,
        changeLanguage,
        register,
        login,
        logout,
        verifyUser,
        verifyEmail,
        changeUser,
        changeUserAndProfilePicture,
        getUserProfile,
        getRequested,
        requested,
        requestChatroom,
        unrequestChatroom,
        getChatroomRequests,
        chatroomRequests,
        chatrooms,
        getTestResult,
        saveTestResult,
        deleteTestResult,
        showTestResultOfUser,
        getAllUsers,
        deleteUser,
        url,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
