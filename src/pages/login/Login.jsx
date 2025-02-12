import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { isValidEmailId } from "../../utils/validation.util";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isError, setIsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [data, setData] = useState({
    Email: "",
    Password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmailId(data.Email) || data.Password.length < 6) {
      if (!isValidEmailId(data.Email)) {
        setIsError((prev) => ({ ...prev, emailError: "Invalid Email ID" }));
      }
      if (data.Password.length < 6) {
        setIsError((prev) => ({ ...prev, passwordError: "Invalid Password" }));
      }
      return;
    }

    const res = await dispatch(
      login({ email: data.Email, password: data.Password })
    );
    if (login.fulfilled.match(res)) {
      navigate("/home");
    }
  };
  const handleOnChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (isError.emailError && e.target.name === "Email") {
      setIsError((pre) => ({ ...pre, emailError: "" }));
    }
    if (isError.passwordError && e.target.name === "Password") {
      setIsError((pre) => ({ ...pre, passwordError: "" }));
    }
  };
  console.log(error);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Social.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin} className="form-container">
              <input
                type="text"
                placeholder="Email"
                name="Email"
                className="loginInput"
                onChange={handleOnChange}
              />
              {isError.emailError && (
                <span className="error">{isError.emailError}</span>
              )}
              <input
                type="text"
                placeholder="Password"
                name="Password"
                className="loginInput"
                onChange={handleOnChange}
              />
              {isError.passwordError && (
                <span className="error">{isError.passwordError}</span>
              )}
              <button className="loginButton" type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress size="30px" color="inherit" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
