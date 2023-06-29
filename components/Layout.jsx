import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthContext from "@/context/AuthProvider";

const Layout = ({ children }) => {
  const [iconValue, setIconValue] = useState("default");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIconValue("loggedInIcon");
    } else {
      setIconValue("default");
    }
  }, [iconValue]);

  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
