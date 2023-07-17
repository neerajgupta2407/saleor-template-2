import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import Router from "next/router";
import { BiUserCircle } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = ({ cl }) => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("accessToken");
      const productsl = window.localStorage.getItem("pl");
      if (token && token !== "undefined" ) {
        setHasToken(true);
      }
      if (productsl !== null) {
        setPl(productsl);
      }
    }
  }, []);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>

      <div>
        <Link href="/search">
          <button type="button" className="cart-icon mr-2">
            <AiOutlineSearch />
          </button>
        </Link>
        <button type="button" className="cart-icon mr-4" onClick={handleCart}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{cl}</span>
        </button>
        {console.log(hasToken)}
        {hasToken && (
          <>
            <button type="button" className="cart-icon" onClick={toggleMenu}>
              <BiUserCircle />
            </button>
            {isMenuOpen && (
              <div className="user-menu bg-white rounded-md shadow-lg">
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <Link href="/logout">Logout</Link>
                  </li>
                  <li style={{ marginTop: "5px" }}>
                    <Link href="/ap/account">Account Preferences</Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
        {!hasToken && (
          <button type="button" className="cart-icon" onClick={handlereg}>
            <AiOutlineUser />
          </button>
        )}
      </div>

      {/* {showCart && <Cart />} */}
    </div>
  );
};

export default Navbar;
