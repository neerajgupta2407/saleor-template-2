import React from "react";
import Router from "next/router";

function CheckoutSidebar({ item, isMobile }) {
  let products;
  if (typeof window !== "undefined") {
    products = JSON.parse(localStorage.getItem("products"));
  }
  console.log(products);

  const totalPrice = products?.lines?.reduce(
    (total, item) => total + item.totalPrice.gross.amount,
    0
  );

  return (
    <div className="max-w-xl w-full px-8 py-12 bg-white rounded-md shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-300 list-none">
        {products?.lines?.map((item) => (
          <li key={item.id} className="py-2">
            <div className="flex justify-between items-center">
              <img
                style={{
                  height: "60px",
                  width: "60px",
                }}
                className=""
                src={item.variant.product.thumbnail.url}
              ></img>
              <span className="ct">{item.quantity}</span>
              <span className="ct">{item.variant.product.slug}</span>
              <span className="ct">
                MRP : &#8377;{item.totalPrice.gross.amount}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600 ct">Total:</span>
        <span className="text-gray-600 ct">&#8377;{totalPrice}</span>
      </div>
    </div>
  );
}

export default CheckoutSidebar;
