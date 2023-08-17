import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, selectAuth } from "../../utils/authSlice";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";
import styles from "./MyAccount.module.css";

function MyAccount() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  const handleLogout = () => {
    // Remove token and user object from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear any user-related state
    dispatch(logOut());
  };

  return (
    <div className={styles.container}>
      {authState.status === "none" && <Login onSuccess={() => dispatch(logIn())} />}
      {authState.status === "loggingIn" && <Login onSuccess={() => dispatch(logIn())} />}
      {authState.status === "signingUp" && <SignUp onSuccess={() => dispatch(logIn())} />}
      {authState.isAuthenticated && <Dashboard user={authState.user} onLogOut={handleLogout} />}
    </div>
  );
}

export default MyAccount;
