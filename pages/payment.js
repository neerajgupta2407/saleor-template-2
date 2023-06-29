import React, { useEffect } from 'react';
import { useCheckoutPaymentCreateMutation } from '@/saleor/api';
import Router from 'next/router';

function Payment() {
  let ctoken;
  if (typeof window !== "undefined") {
  ctoken = localStorage.getItem('ctoken');
  }
  const [checkoutPaymentCreate, { loading, error }] = useCheckoutPaymentCreateMutation();

  useEffect(() => {
    const checkoutPaymentCreateMethod = async () => {
      try {
        const { data } = await checkoutPaymentCreate({
          variables: {
            ctoken: ctoken,
            locale: 'EN',
          },
        });
        console.log('payment create data:', data);
        if (data) {
          Router.push({ pathname: '/ordersuccess' });
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle the error state here
      }
    };

    checkoutPaymentCreateMethod();
  }, []);

  if (loading) {
    // Render a loading state if needed
    return <div>Loading...</div>;
  }

  return <div></div>;
}

export default Payment;
