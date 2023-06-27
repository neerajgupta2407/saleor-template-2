import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";

import Link from "next/link";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight,BiUserCircle } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = ({ isLoggedIn }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);
  
  
  const { cartItems } = useSelector((state) => state.cart);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const [hasToken, setHasToken] = useState(false);
  const [pL, setPl] = useState(0);

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

      console.log(pL)

    }
  },[]);

  // console.log(hasToken)
  

  // useEffect(() => {
  //     console.log(hasToken)
  //     console.log(pL)
  // }, []);

  // const fetchCategories = async () => {
  //     const { data } = await fetchDataFromApi("/api/categories?populate=*");
  //     setCategories(data);
  // };

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/">
          <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />

        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* Icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
              51
            </div>
          </div>
          {/* Icon end */}

          {/* Icon start */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {pL > 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {pL}
                </div>
              )}
            </div>
          </Link>
          {/* Icon end */}

          {/* Icon start */}
          <>
          {console.log("ab",hasToken)}
          {hasToken && <Link href="/logout">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <BiUserCircle className="text-[15px] md:text-[20px]" />
                </div>
              </Link> }
          {!hasToken &&  <Link href="/register">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <AiOutlineUser className="text-[15px] md:text-[20px]" />
                </div>
              </Link> }
            {/* {hasToken  ? (
              // Token exists, render the link for the authenticated user
              <Link href="/logout">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <BiUserCircle className="text-[15px] md:text-[20px]" />
                </div>
              </Link>
            ) : (
              // Token doesn't exist, render the link for the unauthenticated user
              <Link href="/register">
                <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                  <AiOutlineUser className="text-[15px] md:text-[20px]" />
                </div>
              </Link>
            )} */}
          </>
          {/* Icon end */}

          {/* Mobile icon start */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
          {/* Mobile icon end */}
        </div>
      </Wrapper>
    </header>
  );
};

export const getServerSideProps = async (context) => {
    // Logic to determine if the user is logged in or logged out
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
    return {
      props: {
        isLoggedIn,
      },
    };
  };
export default Header;
