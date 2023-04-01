import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
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
  const { userType } = context;
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/sign-in"
            exact
            element={userType === null ? <SignIn /> :<ErrorPage />}
          />
          <Route
            path="/sign-up"
            exact
            element={userType === null ? <SignUp /> : <ErrorPage />}
          />
          <Route
            path="/profile"
            exact
            element={userType !== null ? <Profile /> : <ErrorPage />}
          />
          <Route path="/test" exact element={<TestPage />} />
          <Route path="/test-result" exact element={<TestResult />} />
          <Route
            path="/admin-registration"
            exact
            element={
              userType === "ADMIN" ? <AdminRegistration /> : <ErrorPage />
            }
          />
          <Route
            path="/messages"
            exact
            element={
              userType !== null && userType !== "ADMIN" ? (
                <Messages />
              ) : (
                <ErrorPage />
              )
            }
          />
          <Route
            path="/admin-messages"
            exact
            element={userType === "ADMIN" ? <AdminMessages /> : <ErrorPage />}
          />
          <Route path="*" exact element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
