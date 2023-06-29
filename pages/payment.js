import React, { useEffect } from "react";
import { useCheckoutPaymentCreateMutation } from "@/saleor/api";
import Router from "next/router";

function Payment() {
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const ctoken = localStorage.getItem("ctoken");
      const [
        checkoutPaymentCreate,
        { loading, error },
      ] = useCheckoutPaymentCreateMutation();

      const checkoutPaymentCreateMethod = async () => {
        try {
          const { data } = await checkoutPaymentCreate({
            variables: {
              ctoken: ctoken,
              locale: "EN",
            },
          });
          console.log("payment create data:", data);
          if (data) {
            Router.push({ pathname: "/ordersuccess" });
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle the error state here
        }
      };

      checkoutPaymentCreateMethod();
    }
  }, []);

  return <div></div>;
}

export default Payment;
