import CheckoutSidebar from '@/components/CheckoutSidebar'
import React from 'react'
import { useLocalStorage } from 'react-use';
import { useCheckoutFetchByTokenQuery } from "@/saleor/api";
import CheckoutForm from '@/components/CheckoutForm';
import Router from 'next/router'


const Checkout = () => {
  const products = JSON.parse(Router.query.data);
  console.log(products)
  // const [token] = useLocalStorage('token');
  // const { data, loading, error } = useCheckoutFetchByTokenQuery({
  //   variables: { checkoutToken: token },
  //   skip: !token,
  // });

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error</div>;
  // if (!data || !data.checkout) return null;

  // const products = data.checkout?.lines || [];

  return (
    <main className="w-screen max-w-7xl md:px-8 md:mx-auto overflow-hidden flex md:flex-row flex-col justify-between">
        <div className="md:w-1/2 w-full">
          <CheckoutForm products = {products}/>
        </div>
        <div className="md:w-1/2 w-full">
          <CheckoutSidebar products = {products}/>
        </div>
      </main>

  );
};

export default Checkout;