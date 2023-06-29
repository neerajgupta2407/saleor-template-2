import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import Router from "next/router";
import { BiUserCircle } from "react-icons/bi";

const Navbar = ({ iconValue }) => {
  //   const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [hasToken, setHasToken] = useState(false);
  const handleCart = () => {
    Router.push({ pathname: "/cart" });
  };
  const handlelog = () => {
    Router.push({ pathname: "/logout" });
  };
  const handlereg = () => {
    Router.push({ pathname: "/register" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("accessToken");
      const productsl = window.localStorage.getItem("pl");
      if(token)
      {
      setHasToken(true);
      }
      if(productsl !== null)
      {
      setPl(productsl);
      }

    }
  },[]);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <div>
        <button type="button" className="cart-icon mr-4" onClick={handleCart} >
          <AiOutlineShopping />
          <span className="cart-item-qty"></span>
        </button>
        {console.log(hasToken)}
        {hasToken && (
          <button type="button" className="cart-icon" onClick={handlelog}>
            <BiUserCircle className="text-[15px] md:text-[20px]" />
          </button>
        )}
        {!hasToken && (
          <button type="button" className="cart-icon" onClick={handlereg}>
            <AiOutlineUser className="text-[15px] md:text-[20px]" />
          </button>
        )}
      </div>

      {/* {showCart && <Cart />} */}
    </div>
  );
};

export default Navbar;
