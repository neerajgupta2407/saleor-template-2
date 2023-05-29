import React, { useState } from 'react'
import { useShippingMethodQuery } from '@/saleor/api';
import Router from 'next/router';

function shippingmethod() {

    // const ctoken = JSON.parse(Router.query.data);
    const ctokenn = localStorage.getItem("ctoken")
    console.log('data on shipping', ctokenn);

    const {loading, error, data } = useShippingMethodQuery({
        variables : {
          'ctoken' : ctokenn
        }
      })
      const dID = data?.checkout?.availableCollectionPoints[0].id;
      localStorage.setItem("dID",dID)

      if(dID){
        Router.push(
            { pathname: "/selectmethod"},
            "/selectmethod"
          );
      }

  return (<></>
    // <div>{availableMethods.map((item) => {
    //     return(
    //         <div>
    //             <h1>{item?.id}</h1>
    //             <h2>{item?.name}</h2>
    //         </div>
    //     )
    // })}</div>
  )
}

export default shippingmethod