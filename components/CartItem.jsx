"use client";

import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { useDeleteitemMutation, useUpdateitemMutation } from "@/saleor/api";

import { useLocalStorage } from "react-use";
import Router from "next/router";
const CartItem = ({ data }) => {
  console.log(data)
  const p = data?.variant;
  console.log(p?.id);
  const myLoader = ({ src }) => {
    return p?.product?.thumbnail?.url;
  };
  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };
  const [token] = useLocalStorage("token");
  const lineid = localStorage.getItem("lineid");
  const [checkoutLineDelete] = useDeleteitemMutation();

  const handledelete = () => {
    checkoutLineDelete({
      variables: { checkoutToken: token, variantId: lineid },
    });
    localStorage.setItem("productsL", 0);
    Router.reload();
  };
  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const [checkoutLineUpdate] = useUpdateitemMutation();
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
    checkoutLineUpdate({
      variables: { checkoutToken: token, variantId: p?.id, quantity: newQuantity },
    });
    localStorage.setItem("productsL", 0);
    Router.reload();
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          loader={myLoader}
          src={p?.product?.thumbnail?.url}
          alt={p?.name}
          width={120}
          height={120}
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {p?.product?.name}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {p?.product?.slug}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : &#8377;{p?.pricing?.price?.gross?.amount}
          </div>
        </div>

        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {p?.product?.slug}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {p?.variants?.map((item) => {
                  return (
                    <option
                      key={item.id}
                      value={item.name}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.name}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <input
                type="number"
                onChange={handleQuantityChange}
              />
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={handledelete}
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
