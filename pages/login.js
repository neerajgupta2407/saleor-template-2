import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Router from "next/router";
import { useState, useContext, useEffect } from "react";
// import { login } from '@/functions/request';
// import AuthContext from '@/context/AuthProvider';
// import { setLocalStorage } from '@/functions/dashboardFunctions';
// import {redText} from '../../styles/styles.module.css'

import { useLoginMutation, useRefreshTokenMutation } from "@/saleor/api";

import AuthContext from "../context/AuthProvider";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/Navbar";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

export default function Login() {
  // const {auth, setAuth} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState([]);

  const [success, setSuccess] = useState(false);

  const [login, { loading, error }] = useLoginMutation();

  const handleClick = async () => {
    try {
      const { data } = await login({
        variables: {
          email: email,
          password: password,
        },
      });

      if (data && data.tokenCreate.errors.length < 1) {
        const accessToken = data?.tokenCreate?.token;
        const refreshToken = data?.tokenCreate?.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // const refreshToken = async () => {
        // Perform the necessary steps to generate a new token
        // let newToken = data
        // console.log(newToken)
        // Update the token in the local storage
        // localStorage.setItem('accessToken', newToken);

        // Restart the timer for the next token refresh
        // clearTimeout(refreshTimer);
        // refreshTimer = setTimeout(refreshToken, 1000); // 30 seconds
        // };

        // refreshToken();

        if (accessToken) {
          localStorage.setItem("isLoggedIn", true);
        }

        // setAuth({"accessToken" : accessToken, "refreshToken" : refreshToken});

        Router.push({ pathname: "/" });
      }
      if (data?.tokenCreate.errors) {
        console.log(data?.tokenCreate?.errors[0]?.message);
        setNotification(data?.tokenCreate?.errors[0]?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    console.log(notification);
  };

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }, [hasError]);

  useEffect(() => {
    if (Router.query.status) {
      setSuccess(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }, []);

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px",
          height: "70vh",
        }}
      >
        <div>
          {success ? (
            <h3 style={{ color: "green" }}>Account created successfully!</h3>
          ) : null}

          <Form style={{ padding: "3vh" }}>
            <div style={{ textAlign: "center", marginBottom: "3vh" }}>
              <h1 style={{ fontSize: "40px", fontWeight: "bolder" }}>
                Login Here!
              </h1>
            </div>
            {notification && (
              <p
                style={{ textAlign: "center", marginBottom: "3vh" }}
                className="text-red-500"
              >
                {notification}
              </p>
            )}

            <Form.Group
              className="flex justify-center"
              controlId="formBasicEmail"
            >
              <Form.Control
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid gray",
                  fontSize: "18px",
                  paddingLeft: "20px",
                  height: "29px",
                }}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="flex justify-center"
              controlId="formBasicPassword"
            >
              <Form.Control
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "1px solid gray",
                  fontSize: "18px",
                  paddingLeft: "20px",
                  height: "29px",
                  marginTop: "10px",
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="password-input"
              />

              {/* <div
                className="show-password-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
              </div> */}
            </Form.Group>
            <div className="flex justify-center">
              <Button
                variant="dark"
                className="align-middle"
                onClick={handleClick}
              >
                Submit
              </Button>
            </div>

            <div style={{ textAlign: "center", marginTop: "1.5vh" }}>
              {hasError ? <p className={redText}>{errorMessage}</p> : null}
            </div>

            <div style={{ textAlign: "center", marginTop: "1.5vh" }}>
              <a href="/register" style={{ textDecoration: "none" }}>
                Register here, If you don't have an account
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
