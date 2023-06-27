import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Router from "next/router";
import { useState, useContext, useEffect } from "react";

import { useSignupMutation } from "@/saleor/api";

import AuthContext from "../context/AuthProvider";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

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
    <>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Form
          style={{ width: "40vw", border: "solid 1px gray", padding: "3vh" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3vh" }}>
            <h1 style={{ fontSize: "40px", fontWeight: "bolder" }}>
              Sign Up Here!
            </h1>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            style={{ width: "100%" }}
            onClick={handleClick}
          >
            Submit
          </Button>

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
    </>
  );
}
