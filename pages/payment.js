import React,{useEffect} from 'react'
import { useCheckoutPaymentCreateMutation } from '@/saleor/api';
import Router from "next/router";

 function payment() {
  const {ctoken} = Router.query;
  const [checkoutPaymentCreate, { loading, error }] = useCheckoutPaymentCreateMutation();
  useEffect(() => {
    const checkoutPaymentCreateMethod = async () => { 
      try {
        const { data } = await checkoutPaymentCreate({
          variables: {
            ctoken: ctoken,
            locale: "EN"
          }
        });
        console.log("payment create data : ", data);
        if (data) {
          Router.push({ pathname: "/ordersuccess", query: { ctoken } }, "/ordersuccess");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkoutPaymentCreateMethod();
  }, []);

  return (

    <div>
        Payment
    </div>
  )
}

export default payment