import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useCheckoutFetchByTokenQuery } from "@/saleor/api";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import Router from "next/router";
import Header from "@/components/Header";

const Checkout = () => {
  const products =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("products"))
      : null;

  useEffect(() => {
    if (!products) {
      Router.push("/"); // Redirect to the home page if products are not available
    }
  }, [products]);

  return (
    <>
      <main className="w-screen max-w-7xl md:px-8 md:mx-auto overflow-hidden flex md:flex-row flex-col justify-between">
        <div className="md:w-1/2 w-full">
          <CheckoutForm products={products} />
        </div>
        <div className="md:w-1/2 w-full">
          <CheckoutSidebar products={products} />
        </div>
      </main>
    </>
  );
};

export default Checkout;
