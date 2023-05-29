import React,{useEffect,useState} from 'react'
import {useOrdercompleteMutation } from '@/saleor/api';
import Router from "next/router";
import {AiFillCheckCircle} from "react-icons/ai" ;
import Link from 'next/link';

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
}, []);
    

console.log(myValue)
  return (

    <div>
      {myValue  && <div className="flex flex-col items-center justify-center h-screen">
      <AiFillCheckCircle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold mb-4">Order Success!</h1>
      <p className="text-lg">Thank you for your order.</p>
      <Link href="/" className="font-bold mt-5">
                        Continue Shopping
                    </Link>
      </div> }
    </div>
    
  )
}

export default ordersuccess