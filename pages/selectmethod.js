import React,{useEffect} from "react";
import { useCheckoutDeliveryMethodUpdateMutation } from "@/saleor/api";
import Router from "next/router";

 function selectmethod() {
  const ctoken = localStorage.getItem("ctoken")
  const dID = localStorage.getItem("dID")
  
  const [checkoutDeliveryMethodUpdate, { loading, error }] = useCheckoutDeliveryMethodUpdateMutation();

  useEffect(() => {
    const updateDeliveryMethod = async () => {
      try {
        const { data } = await checkoutDeliveryMethodUpdate({
          variables: {
            dId: dID,
            ctoken: ctoken,
            locale: "EN",
          },
        });
        console.log("selectmethod data: ", data);
        if (data) {
          Router.push({ pathname: "/payment"});
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateDeliveryMethod();
  }, []);


  return <div></div>;
}

export default selectmethod;