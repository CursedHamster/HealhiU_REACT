import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import UserProfile from "./components/pages/UserProfile";
import AdminRegistration from "./components/pages/AdminRegistration";
import Messages from "./components/pages/Messages";
import AdminMessages from "./components/pages/AdminMessages";
import TestPage from "./components/pages/TestPage";
import TestResult from "./components/pages/TestResult";
import ErrorPage from "./components/pages/ErrorPage";

import { useContext } from "react";
import { Context } from "./Context";

function App() {
  const context = useContext(Context);
  const { loaded, userType } = context;
  return (
    <div className="App">
      {loaded ? (
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/sign-in"
              exact
              element={
                userType === null ? <SignIn /> : <ErrorPage errorCode={400} />
              }
            />
            <Route
              path="/sign-up"
              exact
              element={
                userType === null ? <SignUp /> : <ErrorPage errorCode={400} />
              }
            />
            <Route
              path="/profile"
              exact
              element={
                userType !== null ? <Profile /> : <ErrorPage errorCode={401} />
              }
            />
            <Route
              path="/profile/:login"
              exact
              element={
                userType !== null ? (
                  <UserProfile />
                ) : (
                  <ErrorPage errorCode={401} />
                )
              }
            />
            <Route path="/test" exact element={<TestPage />} />
            <Route path="/test-result" exact element={<TestResult />} />
            <Route
              path="/admin-registration"
              exact
              element={
                userType === "ADMIN" ? (
                  <AdminRegistration />
                ) : (
                  <ErrorPage errorCode={403} />
                )
              }
            />
            <Route
              path="/messages"
              exact
              element={
                userType !== null && userType !== "ADMIN" ? (
                  <Messages />
                ) : (
                  <ErrorPage errorCode={401} />
                )
              }
            />
            <Route
              path="/admin-messages"
              exact
              element={
                userType === "ADMIN" ? (
                  <AdminMessages />
                ) : (
                  <ErrorPage errorCode={403} />
                )
              }
            />
            <Route path="*" exact element={<ErrorPage errorCode={404} />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <div className="loading-container">
          <div className="spinner-border loading-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
