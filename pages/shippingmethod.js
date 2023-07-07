import React, { useState } from "react";
import { useShippingMethodQuery } from "@/saleor/api";
import Router from "next/router";

function shippingmethod() {
  let ctokenn;
  if (typeof window !== "undefined") {
    ctokenn = localStorage.getItem("ctoken");
  }

  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const { loading, error, data } = useShippingMethodQuery({
    variables: {
      ctoken: ctokenn,
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    },
  });
  const dID = data?.checkout?.availableCollectionPoints[0].id;
  if (typeof window !== "undefined") {
    localStorage.setItem("dID", dID);
  }

  if (dID) {
    Router.push({ pathname: "/selectmethod" }, "/selectmethod");
  }

  return (
    <></>
    // <div>{availableMethods.map((item) => {
    //     return(
    //         <div>
    //             <h1>{item?.id}</h1>
    //             <h2>{item?.name}</h2>
    //         </div>
    //     )
    // })}</div>
  );
}

export default shippingmethod;
