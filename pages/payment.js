import React from 'react'
import { useCheckoutComplete } from '@/saleor/api';

 function payment() {
  const {ctoken} = Router.query;
  const {checkoutComplete} = useCheckoutComplete()
  const {loading, error, data } = checkoutComplete({
    variables : {
      'token' : ctoken
    }
  })

  console.log(data)
  return (

    <div>
        Payment
    </div>
  )
}

export default payment