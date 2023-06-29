import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useRouter } from "next/router";

import {
  useProductByIdQuery,
  useProductAddVariantToCartMutation,
  useProductFilterByNameQuery,
} from "@/saleor/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { useLocalStorage } from "react-use";
import Header from "@/components/Header";
import Image from "next/image";
import Product from "@/components/Product";
import Link from "next/link";

const ProductDetails = () => {
  const [token] = useLocalStorage("token");
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useProductByIdQuery({ variables: { id } });
  let product = data?.product;
  console.log(product);

  const [addProductToCart] = useProductAddVariantToCartMutation();

  const queryVariant = process.browser
    ? router.query.variant?.toString()
    : undefined;

  const selectedVariantID = queryVariant || product?.variants[0].id;
  var pl = 0;
  
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const onAddToCart = async () => {
    const { data, loading, error } = await addProductToCart({
      variables: { checkoutToken: token, variantId: selectedVariantID, qty: qty },
    });
    pl++;
    console.log("pl", pl);
    localStorage.setItem("productsL", pl);
    localStorage.setItem(
      "lineid",
      data?.checkoutLinesAdd?.checkout?.lines[0]?.id
    );
  };

  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const [isSelected, setIsSelected] = useState(false);

  const notify = (message, isSuccess) => {
    toast[isSuccess ? "success" : "error"](message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastClassName: isSuccess ? "toast-success" : "toast-error",
    });
  };

  const [selectedVariant, setSelectedVariant] = useState(null);

  const buttonStyle = {
    backgroundColor: "grey",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const selectedButtonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleClick = (variant) => {
    setSelectedVariant(variant);
    setIsSelected(!isSelected);
  };

  const getproducts = () => {
    const { data } = useProductFilterByNameQuery({
      variables: {
        filter: {},
      },
    });
    return data?.products?.edges;
  };

  const products = getproducts();
  console.log(products);

  const myLoader = ({ src }) => {
    return product?.media[0]?.url;
  };

  

  const [showCart, setShowCart] = useState(false);

  const handlebuy = () => {
    setShowCart(true);
  };

  const handleBuyNow = () => {
    router.push(
      {
        pathname: "/shippingmethod",
        query: { data: JSON.stringify(ctoken) },
      },
      "/shippingmethod"
    );

  }

  return (
    <div>
      <div className="product-detail-container">
        <ToastContainer />
        <div>
          <div className="image-container">
            <Image
              src={product?.media[0]?.url}
              loader={myLoader}
              width={250}
              height={250}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {/* {image?.map((item, i) => (
              <img 
                key={i}
                src={"d"}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product?.name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product?.category?.name}</p>
          <p className="price">
            &#8377;
            {product?.variants[0]?.pricing?.price?.gross?.amount}
          </p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
            <span className="num">
              {" "}
              Quantity Available : {product?.variants[0]?.quantityAvailable}
            </span>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                notify("Success", true);
                onAddToCart();
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((product) => (
              <Product idd={product?.node} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
