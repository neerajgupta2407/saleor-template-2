import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Router from "next/router";
import { useState, useContext, useEffect } from "react";

import { useSignupMutation } from "@/saleor/api";

import AuthContext from "../context/AuthProvider";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/Navbar";

export default function JoinOurTeam() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  const [Signup, { loading, error }] = useSignupMutation();

  const handleClick = async () => {
    try {
      const { data } = await Signup({
        variables: {
          email: email,
          password: password,
        },
      });

      console.log("Signup data: ", data);

      if (data.accountRegister.user !== null) {
        Router.push({ pathname: "/login", query: { status: true } }, "/login");
      }
    } catch (err) {
      setHasError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }, [hasError]);

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
        <Form style={{ padding: "3vh" }}>
          <div style={{ textAlign: "center", marginBottom: "3vh" }}>
            <h1 style={{ fontSize: "40px", fontWeight: "bolder" }}>
              Sign Up Here!
            </h1>
          </div>

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
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

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
                marginTop: "10px",
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
                marginTop: "10px",
                height: "29px",
              }}
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
            <a href="/login" style={{ textDecoration: "none" }}>
              Login here, If you already have an account
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}
