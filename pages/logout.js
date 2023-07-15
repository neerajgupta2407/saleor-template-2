import React from "react";
import Router from "next/router";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/Navbar";
import { Button } from "react-bootstrap";

function logout() {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    Router.push({ pathname: "/" }, "/");
  };

  return (
    <div style={{ padding: "0px", margin: "0px" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px",
          height: "70vh",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "bolder" }}>
          See you Soon!
        </h1>
        <Button
          style={{width: "120px", fontSize:"15px"}}
          variant="dark"
          className="align-middle"
          onClick={handleClearLocalStorage}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default logout;
