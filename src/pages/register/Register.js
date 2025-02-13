import React, { useState } from "react";
import "./register.css";
import { CircularProgress } from "@mui/material";
import { isValidEmailId } from "../../utils/validation.util";
import { registerUser } from "../../redux/slices/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.register);
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isError, setIsError] = useState({
    emailError: "",
    passwordError: "",
    userNameError: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const currentError = {};
    if (!isValidEmailId(data.email))
      currentError.emailError = "Invalid Email ID";
    if (data.password.length < 6)
      currentError.passwordError = "Invalid Password";
    if (data.username.length < 3)
      currentError.userNameError = "Name should be more than three character";

    if (Object.keys(currentError).length) {
      setIsError((prev) => ({ ...prev, ...currentError }));
      return;
    }
    const res = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(res)) {
      navigate("/");
    }
  };

  const handleOnChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (isError.emailError && e.target.name === "email") {
      setIsError((pre) => ({ ...pre, emailError: "" }));
    }
    if (isError.passwordError && e.target.name === "password") {
      setIsError((pre) => ({ ...pre, passwordError: "" }));
    }
    if (isError.userNameError && e.target.name === "username") {
      setIsError((pre) => ({ ...pre, userNameError: "" }));
    }
  };
  const navigateLogin = () => {
    navigate("/");
  };
  return (
    <div className="register-container">
      <h1 className="tag">Social</h1>
      <div className="register-box">
        <div className="form-heading">
          <h3 style={{ fontSize: "25px" }}>Create a new account</h3>
          <span style={{ fontSize: "15px" }}>It's quick and easy.</span>
        </div>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            name="username"
            className="registerInput"
            onChange={handleOnChange}
          />
          {isError.userNameError && (
            <span className="error">{isError.userNameError}</span>
          )}
          <input
            type="text"
            placeholder="email"
            name="email"
            className="registerInput"
            onChange={handleOnChange}
          />
          {isError.emailError && (
            <span className="error">{isError.emailError}</span>
          )}
          <input
            type="text"
            placeholder="password"
            name="password"
            className="registerInput"
            onChange={handleOnChange}
          />
          {isError.passwordError && (
            <span className="error">{isError.passwordError}</span>
          )}
          <button type="submit" className="registerButton" disabled={loading}>
            {loading ? (
              <CircularProgress size="30px" color="inherit" />
            ) : (
              "Sing Up"
            )}
          </button>
        </form>
        <p className="have_account" onClick={navigateLogin}>
          Already have an account?
        </p>
      </div>
    </div>
  );
}

export default Register;
