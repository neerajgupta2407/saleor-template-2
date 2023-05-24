'use client'

import React from "react";
import Router from "next/router";

function logout() {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    Router.push({ pathname: "/"}, "/");
  };
  return (
    <div>
      <button onClick={handleClearLocalStorage}>Logout</button>
    </div>
  );
}

export default logout;
