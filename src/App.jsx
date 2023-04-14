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
import AdminDashboard from "./components/pages/AdminDashboard";
import TestPage from "./components/pages/TestPage";
import TestResult from "./components/pages/TestResult";
import VerificationPage from "./components/pages/VerificationPage";
import ErrorPage from "./components/pages/ErrorPage";

import { useContext } from "react";
import { Context } from "./Context";

function App() {
  const context = useContext(Context);
  const { loaded, userType } = context;
  const nonUserLinks = (
    <>
      <Route path="/sign-in" exact element={<SignIn />} />
      <Route path="/sign-up" exact element={<SignUp />} />
      <Route path="/profile" exact element={<ErrorPage errorCode={401} />} />
      <Route
        path="/profile/:login"
        exact
        element={<ErrorPage errorCode={401} />}
      />
    </>
  );
  const userLinks = (
    <>
      <Route path="/sign-in" exact element={<ErrorPage errorCode={400} />} />
      <Route path="/sign-up" exact element={<ErrorPage errorCode={400} />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/profile/:login" exact element={<UserProfile />} />
    </>
  );
  const nonAdminLinks = (
    <>
      <Route
        path="/admin-registration"
        exact
        element={<ErrorPage errorCode={403} />}
      />
      <Route
        path="/admin-messages"
        exact
        element={<ErrorPage errorCode={403} />}
      />
      <Route
        path="/admin-dashboard"
        exact
        element={<ErrorPage errorCode={403} />}
      />
    </>
  );
  const adminLinks = (
    <>
      <Route path="/admin-registration" exact element={<AdminRegistration />} />
      <Route path="/admin-messages" exact element={<AdminMessages />} />
      <Route path="/admin-dashboard" exact element={<AdminDashboard />} />
    </>
  );
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          {userType === null ? nonUserLinks : userLinks}
          {userType === "ADMIN" ? adminLinks : nonAdminLinks}
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
            path="/sign-up/verification"
            exact
            element={<VerificationPage type="profile" />}
          />
          <Route
            path="/profile/verification"
            exact
            element={<VerificationPage type="email" />}
          />
          <Route path="/test" exact element={<TestPage />} />
          <Route path="/test-result" exact element={<TestResult />} />
          <Route path="*" exact element={<ErrorPage errorCode={404} />} />
        </Routes>
        <Footer />
      </Router>
      {!loaded && (
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
