import React from "react";
import Router from "next/router";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";

function logout() {
  const handleClearLocalStorage = () => {
    localStorage.clear();
    Router.push({ pathname: "/" }, "/");
  };

  
  return (
    <div>
      <div className="w-full md:py-20">
        <Wrapper>
          <button onClick={handleClearLocalStorage}>Logout</button>
        </Wrapper>
      </div>
    </div>
  );
}

export default logout;
