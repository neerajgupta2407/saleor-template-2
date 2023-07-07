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

export default function Login() {
  // const {auth, setAuth} = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [data, setData] = useState([]);

  const [success, setSuccess] = useState(false);

  const [login, { loading, error }] = useLoginMutation();
  const [tokenRefresh] = useRefreshTokenMutation();

  async function rt(refreshToken) {
    try {
      const dataa = await tokenRefresh({
        variables: {
          refreshToken: refreshToken,
        },
      });
      return dataa?.data?.tokenRefresh?.token
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

  let refreshToken;

  if (typeof window !== "undefined") {
    refreshToken = localStorage.getItem("refreshToken");
  }

  useEffect(() => {
    const interval = setInterval(async () => {

      let refreshToken
      if (typeof window !== "undefined") {
      refreshToken = localStorage.getItem("refreshToken");
      }
      const refreshedToken = await rt(refreshToken);

      localStorage.setItem("accessToken", refreshedToken);
      console.log(refreshedToken)
    },1000); 

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, rt]);
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div>
          {success ? (
            <h3 style={{ color: "green" }}>Account created successfully!</h3>
          ) : null}

          <Form
            style={{
              width: "35vw",
              border: "solid 1px gray",
              padding: "3vh",
            }}
          >
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
              className="form-group-width mb-3 flex justify-center"
              controlId="formBasicEmail"
            >
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group-width mb-3 flex justify-center"
              controlId="formBasicPassword"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
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
    </>
  );
}
