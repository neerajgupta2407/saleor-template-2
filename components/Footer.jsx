import { useRefreshTokenMutation } from "@/saleor/api";
import React, { useEffect } from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  const [tokenRefresh] = useRefreshTokenMutation();

  let refreshToken;
  let accessToken;

  if (typeof window !== "undefined") {
    refreshToken = localStorage.getItem("refreshToken");
    accessToken = localStorage.getItem("accessToken");
  }
  let rt;
  useEffect(() => {
    let refreshToken;

    if (typeof window !== "undefined") {
      refreshToken = localStorage.getItem("refreshToken");
      rt = async (refreshToken) => {
        try {
          const dataa = await tokenRefresh({
            variables: {
              refreshToken: refreshToken,
            },
          });
          return dataa?.data?.tokenRefresh?.token;
        } catch (error) {
          console.error("Error:", error);
        }
      };
    }

    if (accessToken) {
      const interval = setInterval(async () => {
        const refreshedToken = await rt(refreshToken);
        localStorage.setItem("accessToken", refreshedToken);
        console.log(refreshedToken);
      }, 50000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [refreshToken, rt]);

  return (
    <div className="footer-container">
      <p>2022 JSM Headphones All rights reserverd</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
