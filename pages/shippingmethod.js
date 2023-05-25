import React, { useState } from 'react'
import { useShippingMethodQuery } from '@/saleor/api';
import Router from 'next/router';

function shippingmethod() {

    const ctoken = JSON.parse(Router.query.data);
    console.log('data on shipping', ctoken);

    const {loading, error, data } = useShippingMethodQuery({
        variables : {
          'ctoken' : ctoken
        }
      })
      const dID = data?.checkout?.availableCollectionPoints[0].id;
      console.log(dID);

      if(dID){
        Router.push(
            { pathname: "/selectmethod", query: {ctoken,dID}},
            "/selectmethod"
          );
      }

  return (<>shipping methods</>
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