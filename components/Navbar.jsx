import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import  Router  from 'next/router';


const Navbar = () => {
//   const { showCart, setShowCart, totalQuantities } = useStateContext();

  const handleCart = () => {
    Router.push({ pathname: "/cart"});
  }

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Headphones</Link>
      </p>
      
      <button type="button" className="cart-icon" onClick={handleCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty"></span>
      </button>

      {/* {showCart && <Cart />} */}
    </div>
  )
}

export default Navbar