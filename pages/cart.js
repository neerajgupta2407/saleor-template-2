import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useCheckoutCreateMutation,
  useCheckoutFetchByTokenQuery,
} from "@/saleor/api";
import { AiOutlineShopping } from "react-icons/ai";
import Productitem from "@/components/Productitem";
import Navbar from "@/components/Navbar";

const Cart = () => {
  let accessToken;
  let token;

  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
    token = localStorage.getItem("token");
  }

  let products = [];
  let productss;
  const [checkoutCreate, { kdata, kloading }] = useCheckoutCreateMutation();

  if (!token && accessToken !== null) {
    const { data } = checkoutCreate({
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    let generatedToken = data?.checkoutCreate?.checkout?.token;
    console.log("Generated token:", generatedToken);

  }

  if (token) {
    const { data, loading, error } = useCheckoutFetchByTokenQuery({
      variables: { checkoutToken: token },
      context: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    products = data?.checkout?.lines || [];
    productss = data?.checkout || [];

    console.log("Product count:", products.length);

    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(productss));
    }
  }

  return (
    <>
      <Navbar />
      {products?.length < 1 && (
        <div className="empty-cart">
          <AiOutlineShopping size={150} />
          <h3>Your shopping bag is empty</h3>
          <Link href="/">
            <button type="button" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full p-4 md:mr-4 md:mb-0 mb-4">
          <div className="product-container">
            {products?.length >= 1 &&
              products?.map((product) => <Productitem product={product} />)}
          </div>
        </div>
        <div className="md:w-1/2 p-4">
          {products?.length >= 1 && (
            <div className="btn-container">
              <Link className="inline-flex" href="/checkout">
                <span className="h-12 flex items-center justify-center uppercase font-semibold px-8 border border-black hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  checkout
                </span>
                <span className="h-12 w-12 flex-shrink-0 flex items-center justify-center border border-l-0 border-black hover:bg-black hover:text-white transition duration-500 ease-in-out">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-icon="chevron-right"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                    className="svg-inline--fa fa-chevron-right fa-w-8 fa-9x h-3 w-3"
                  >
                    <path
                      fill="currentColor"
                      d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
