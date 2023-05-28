import React,{useEffect} from "react";
import { useCheckoutDeliveryMethodUpdateMutation } from "@/saleor/api";
import Router from "next/router";

 function selectmethod() {
  const { ctoken, dID } = Router.query;
  console.log("ctoken : ", ctoken);
  console.log("dID : ", dID);
  
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
          Router.push({ pathname: "/payment", query: { ctoken } }, "/payment");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    updateDeliveryMethod();
  }, []);


  return <div>select method</div>;
}

export default selectmethod;