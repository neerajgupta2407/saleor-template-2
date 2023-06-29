import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Router from "next/router";
import { useState, useContext, useEffect } from "react";
// import { login } from '@/functions/request';
// import AuthContext from '@/context/AuthProvider';
// import { setLocalStorage } from '@/functions/dashboardFunctions';
// import {redText} from '../../styles/styles.module.css'

import { useLoginMutation } from "@/saleor/api";

import AuthContext from "../context/AuthProvider";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

export default function Login() {
  // const {auth, setAuth} = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      console.log("login data: ", data);
      if (data) {
        const accessToken = data?.tokenCreate?.token;
        const refreshToken = data?.tokenCreate?.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        if (accessToken) {
          localStorage.setItem("isLoggedIn", true);
        }
        localStorage.setItem("refreshToken", refreshToken);

        // setAuth({"accessToken" : accessToken, "refreshToken" : refreshToken});

        Router.push({ pathname: "/" });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // try{
    //   let json = await login(email, password);

    //     if(json?.code > 202){
    //       setHasError(true);
    //       setErrorMessage(json?.message);
    //       console.log('main error : ', json?.message);
    //     }

    //     else{
    //       const accessToken = json?.data?.tokens?.access?.token;
    //       const refreshToken = json?.data?.tokens?.refresh?.token;
    //       const userId = json?.data?.user?.id;
    //       const name = json?.data?.user?.name;

    //       setAuth({email, password, accessToken, refreshToken, userId, name});
    //       setData(json);

    //       console.log('token : ', accessToken);
    //       console.log('user id : ', userId);

    //       setLocalStorage('accessToken', accessToken);
    //       setLocalStorage('refreshToken', refreshToken);
    //       setLocalStorage('userId', userId);
    //       setLocalStorage('name', name);

    //       // if(accessToken){
    //       //   Router.push(`/dashboard`);
    //       // }
    //     }

    // }
    // catch(err){
    //   setHasError(true);
    //   console.log('error : ',err);
    // }
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
    <>
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
