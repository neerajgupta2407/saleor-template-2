import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import { useCheckoutFetchByTokenQuery } from "@/saleor/api";
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
const Cart = () => {
  const [token] = useLocalStorage("token");
  const { data, loading, error } = useCheckoutFetchByTokenQuery({
    variables: { checkoutToken: token },
    skip: !token,
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

  const handlePayment = async () => {
    Router.push(
      { pathname: "/checkout", query: { data: JSON.stringify(products) } },
      "/checkout"
    );
  };

  return (
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
            products.map((product) => (
              <div className="product" key="">
                <img
                  loader={product?.variant?.product?.thumbnail?.url}
                  src={product?.variant?.product?.thumbnail?.url}
                  className="cart-product-image"
                />
                {console.log(product?.variant?.product?.thumbnail?.url)}
                <div className="item-desc">
                  <div className="flex top mb-30">
                    <h5>{product?.variant?.product?.name}</h5>
                  </div>
                  <h4>
                    MRP : &#8377;
                    {product?.variant?.pricing?.price?.gross?.amount}
                  </h4>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus">
                          <AiOutlineMinus />
                        </span>
                        <span className="num" onClick="">
                          quantity
                        </span>
                        <span className="plus">
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      // onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
  );
};

export default Cart;
