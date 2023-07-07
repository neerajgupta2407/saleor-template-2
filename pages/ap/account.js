import EmailChange from "@/components/EmailChange";
import PasswordChange from "@/components/PasswordChange";
import Layout from "@/pages/ap/Layout.js";
import React from "react";

const account = () => {
  return (
    <Layout
      content={
        <>
          <p className="mb-7 mt-7">Account Prefrences: </p>
          <EmailChange/>
          <PasswordChange/>
        </>
      }
    ></Layout>
  );
};

export default account;
