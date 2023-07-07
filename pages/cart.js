import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import {
  useCheckoutFetchByTokenQuery,
  useDeleteitemMutation,
  useUpdateitemMutation,
} from "@/saleor/api";
import { makePaymentRequest } from "@/utils/api";
import { useLocalStorage } from "react-use";
import Router from "next/router";
import Header from "@/components/Header";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { Button } from "react-bootstrap";
import Productitem from "@/components/Productitem";
import Navbar from "@/components/Navbar";
const Cart = () => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const [token] = useLocalStorage("token");
  const { data, loading, error } = useCheckoutFetchByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const products = data?.checkout?.lines || [];
  console.log(products);
  if (typeof window !== "undefined") {
    localStorage.setItem("products", JSON.stringify(products));
  }

  //   const [lzoading, setLzoading] = useState(false);
  //   const { cartItems } = useSelector((state) => state.cart);

  //   const subTotal = useMemo(() => {
  //     return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  //   }, [cartItems]);

  // const [checkoutLineDelete] = useDeleteitemMutation();

  // const handledelete = () => {
  //   checkoutLineDelete({
  //     variables: { checkoutToken: token, variantId: lineid },
  //   });
  //   localStorage.setItem("productsL", 0);
  //   Router.reload();
  // };

  // Handle quantity change
  // const [checkoutLineUpdate] = useUpdateitemMutation();
  // const handleQuantityChange = (event,product) => {
  //   const newQuantity = event.target.value;
  //   setQty(newQuantity);
  //   checkoutLineUpdate({
  //     variables: { checkoutToken: token, variantId: product?.id, quantity: newQuantity },
  //   });
  //   localStorage.setItem("productsL", 0);
  //   Router.reload();
  // };

  const handlePayment = async () => {
    Router.push(
      { pathname: "/checkout", query: { data: JSON.stringify(products) } },
      "/checkout"
    );
  };

  return (
    <>
      <Navbar />
      <div className="cart-wrapper">
        <div className="cart-container">
          <button type="button" className="cart-heading">
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items"> items</span>
          </button>

          {products.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href="/">
                <button
                  type="button"
                  // onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}

          <div className="product-container">
            {products.length >= 1 &&
              products.map((product) => <Productitem product={product} />)}
          </div>
          {products.length >= 1 && (
            <div className="container">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>$</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handlePayment}>
                  Pay with Card
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
