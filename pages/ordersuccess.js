import React,{useEffect,useState} from 'react'
import {useOrdercompleteMutation } from '@/saleor/api';
import Router from "next/router";
import {AiFillCheckCircle} from "react-icons/ai" ;
import Link from 'next/link';
import Header from '@/components/Header';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../lib/utils';


 function ordersuccess() {
    const [checkoutComplete] = useOrdercompleteMutation();
    const [myValue, setMyValue] = useState('Initial Value');
    useEffect(() => {
  const ctoken = localStorage.getItem("ctoken")
  
    const checkoutMethod = async () => { 
      try {
        const { data } = await checkoutComplete({
          variables: {
            ctoken: ctoken,
            locale: "EN"
          }
        });
        console.log("payment create data : ", data?.checkoutComplete?.order?.status);
        return data?.checkoutComplete?.order?.status;
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const res = checkoutMethod();
    setMyValue(res);

    console.log(res)
    runFireworks();
}, []);
    

console.log(myValue)
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ordersuccess