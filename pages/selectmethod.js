import React from "react";
import { useCheckoutDeliveryMethodUpdateMutation } from "@/saleor/api";
import Router from "next/router";

 function selectmethod() {
  const { ctoken, dID } = Router.query;
  console.log("ctoken : ", ctoken);
  console.log("dID : ", dID);
  
  const [checkoutDeliveryMethodUpdate, { loading, error }] =
  useCheckoutDeliveryMethodUpdateMutation();
  const {data } = checkoutDeliveryMethodUpdate({
    variables: {
      deliveryMethodId: dID,
      token: ctoken,
    },
  });
  if (data) {
    Router.push({ pathname: "/payment", query: { ctoken } }, "/payment");
  }

  return <div>select method</div>;
}

export default selectmethod;

