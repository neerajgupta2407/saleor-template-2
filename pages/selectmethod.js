import React, { useEffect } from "react";
import { useCheckoutDeliveryMethodUpdateMutation } from "@/saleor/api";
import Router from "next/router";

function SelectMethod() {
  const ctoken =
    typeof window !== "undefined" ? localStorage.getItem("ctoken") : null;
  const dID =
    typeof window !== "undefined" ? localStorage.getItem("dID") : null;
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }

  const [
    checkoutDeliveryMethodUpdate,
    { loading, error },
  ] = useCheckoutDeliveryMethodUpdateMutation();

  useEffect(() => {
    const updateDeliveryMethod = async () => {
      try {
        const { data } = await checkoutDeliveryMethodUpdate({
          variables: {
            dId: dID,
            ctoken: ctoken,
            locale: "EN",
          },
          context: {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
            },
          },
        });
        console.log("selectmethod data: ", data);
        if (data) {
          Router.push({ pathname: "/payment" });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateDeliveryMethod();
  }, []);

  return null;
}

export default SelectMethod;
