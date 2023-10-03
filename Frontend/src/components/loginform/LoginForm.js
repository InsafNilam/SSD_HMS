import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../pages/MakeApp.css";
import { LoginValidate } from "./Validate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginButton from "./loginButton";

import welcome from "../../assets/welcome.jpg";

export default function LoginForm() {
  toast.configure();
  const [values, setValues] = useState({
    email: "",
    password: "",
    type: "patient",
  });

  // Used to refer input fields
  const inputUserEmail = useRef();
  const inputPassword = useRef();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make Sure there is no spaces trailing and leading
    Object.keys(values).forEach((k) => (values[k] = values[k].trim()));
    // Validate input Fields
    setErrors(LoginValidate(values));
  };

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      values.email !== "" &&
      values.password !== ""
    ) {
      axios
        .post("/", values)
        .then((res) => {
          let userId = res.data.id;
          let userRole = res.data.type;
          let userName = res.data.name;
          let userToken = res.data.token;

          toast.success("Login was Successful", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          if (userToken !== null) {
            sessionStorage.setItem("isAuth", "true");
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("userRole", userRole);
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("userToken", userToken);
            setInterval(() => (window.location.pathname = "/home"), 1000);
          }
        })
        .catch((e) => {
          if (e.response)
            toast.error(e.response.data.msg, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
            });
          else console.log("Error", e.message);
        });
    }
  }, [errors]);

  return (
    <div className="body">
      <div className="appointment-container">
        <div className="title">Login</div>
        <div className="container login-form">
          <div className="left login">
            <img src={welcome} alt="welcome user" />
            <div>
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey</p>
            </div>
            <div className="btn">
              <Link to="/sign-up">
                <button>Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="right">
            <form action="#">
              <div className="user-details">
                <div className="input-box">
                  <label htmlFor="useremail" className="details">
                    UserEmail
                  </label>
                  <div className="input-group">
                    <input
                      id="useremail"
                      ref={inputUserEmail}
                      type="text"
                      name="email"
                      placeholder="useremail"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <i className="fa fa-user left-icon" />
                    <i
                      className={
                        !errors.email
                          ? "fa fa-times right-icon"
                          : "fa fa-exclamation right-icon"
                      }
                      onClick={() => {
                        inputUserEmail.current.focus();
                        inputUserEmail.current.value = "";
                        values.email = "";
                      }}
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="input-box">
                  <label htmlFor="password" className="details">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      id="password"
                      ref={inputPassword}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <i className="fa fa-key left-icon" />
                    <i
                      className={
                        !errors.password
                          ? "fa fa-times right-icon"
                          : "fa fa-exclamation right-icon"
                      }
                      onClick={() => {
                        inputPassword.current.focus();
                        inputPassword.current.value = "";
                        values.password = "";
                      }}
                    />
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                </div>
                <div className="time-details">
                  <p className="time-title">User Type</p>
                  <div className="time-group">
                    <label htmlFor="admin">
                      <i className="fa fa-user-tie" />
                    </label>
                    <label htmlFor="doctor">
                      <i className="fa fa-user-md" />
                    </label>
                    <label htmlFor="patient">
                      <i className="fa fa-hospital-user" />
                    </label>
                    <label htmlFor="other">
                      <i className="fa fa-users" />
                    </label>
                  </div>
                  <div className="time-group user-group">
                    <input
                      type="radio"
                      id="admin"
                      name="type"
                      value="admin"
                      onChange={handleChange}
                    />
                    <input
                      type="radio"
                      id="doctor"
                      name="type"
                      value="doctor"
                      onChange={handleChange}
                    />
                    <input
                      type="radio"
                      id="patient"
                      name="type"
                      value="patient"
                      defaultChecked
                      onChange={handleChange}
                    />
                    <input
                      type="radio"
                      id="other"
                      name="type"
                      value="other"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="time-group">
                    <label htmlFor="admin">Admin</label>
                    <label htmlFor="doctor">Doctor</label>
                    <label htmlFor="patient">Patient</label>
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>
              <div className="button">
                <input type="submit" onClick={handleSubmit} value="Login" />
              </div>
              <LoginButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
