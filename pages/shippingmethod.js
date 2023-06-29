import React, { useEffect } from "react";
import { useShippingMethodQuery } from "@/saleor/api";
import Router from "next/router";

function shippingmethod() {
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const ctokenn = localStorage.getItem("ctoken");
      console.log("data on shipping", ctokenn);

      const { loading, error, data } = useShippingMethodQuery({
        variables: {
          ctoken: ctokenn,
        },
      });
      const dID = data?.checkout?.availableCollectionPoints[0].id;
      localStorage.setItem("dID", dID);

      if (dID) {
        Router.push(
          {
            pathname: "/selectmethod",
          },
          "/selectmethod"
        );
      }
    }
  }, []);

  return <></>;
}

export default shippingmethod;
