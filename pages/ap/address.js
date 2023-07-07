
import AddressList from "@/components/AddressList";
import Layout from "@/pages/ap/Layout.js";
import React from "react";

const address = () => {
  return (
    <Layout
      content={
        <>
          <p className="mb-7 mt-7">Your AddressList: </p>
          <AddressList />
        </>
      }
    ></Layout>
  );
};

export default address;
