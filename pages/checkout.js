import React, { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useCheckoutFetchByTokenQuery } from "@/saleor/api";
import CheckoutForm from "@/components/CheckoutForm";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import Router from "next/router";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

const Checkout = () => {
  const products =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("products"))
      : null;

      console.log(products)
      

  useEffect(() => {
    if (!products) {
      Router.push("/"); // Redirect to the home page if products are not available
    }
  }, [products]);

  return (
    <>
    <Navbar/>
      <main className="flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full p-4 md:mr-4 md:mb-0 mb-4">
          <CheckoutForm products={products} />
        </div>
        <div className="md:w-1/2 p-4">
          <CheckoutSidebar products={products} />
        </div>
      </main>
    </>
  );
};

export default Checkout;
