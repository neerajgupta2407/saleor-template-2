import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useProductByIdQuery,
  useProductAddVariantToCartMutation,
  useProductFilterByNameQuery,
  useCheckoutCreateMutation,
} from "@/saleor/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { useLocalStorage } from "react-use";
import Image from "next/image";
import Product from "@/components/Product";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ProductDetails = () => {
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("accessToken");
  }
  const [token] = useLocalStorage("token");
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useProductByIdQuery({ variables: { id } });
  let product = data?.product;
  console.log(product);

  const [addProductToCart] = useProductAddVariantToCartMutation();
  const [notification, setNotification] = useState("");

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

  const [cl, setCl] = useState(0);
  const [checkoutCreate, { kdata, kloading }] = useCheckoutCreateMutation();

  const onAddToCart = async () => {
    if (accessToken !== null) {
      notify("Success", true);
      setCl(cl + 1);
    }

    let token;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token === null && accessToken !== null) {
      const { data } = await checkoutCreate({
        context: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      token = data?.checkoutCreate?.checkout?.token;
      console.log("token: ", token);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
    }
    if (!accessToken) {
      setNotification("Please login to continue");
    }

    if (token !== null && accessToken !== null) {
      const { data, loading, error } = await addProductToCart({
        variables: {
          checkoutToken: token,
          variantId: selectedVariantID,
          qty: qty,
        },
        context: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });

      pl++;
      localStorage.setItem("productsL", pl);
      localStorage.setItem(
        "lineid",
        data?.checkoutLinesAdd?.checkout?.lines[0]?.id
      );
    }
  };

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
    return product?.media[index]?.url;
  };

  const handleBuyNow = () => {
    if (!accessToken) {
      setNotification("Please login to continue");
    } else {
      notify("Success", true);
      onAddToCart();
      router.push({
        pathname: "/cart",
      });
    }
  };

  let dataa;

  if (product?.description) {
    const jsonString = product?.description;
    console.log(jsonString);
    dataa = JSON.parse(jsonString);
    console.log(dataa.blocks[0].data.text);
  }
  const [index, setIndex] = useState(0);

  return (
    <>
      <Navbar cl={cl} />
      <div>
        <div className="product-detail-container">
          <ToastContainer />
          <div>
            <div className="image-container">
              <Image
                src={product?.media[index]?.url}
                alt={product?.name}
                loader={myLoader}
                width={300}
                height={300}
                className="product-detail-image"
              />
            </div>
            <div className="small-images-container">
              {product?.media.map((item, i) => (
                <img
                  key={i}
                  loader={item.url}
                  src={item.url}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
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
            <p>{dataa?.blocks[0].data.text}</p>
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
            </div>
            <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => {
                  onAddToCart();
                }}
              >
                Add to Cart
              </button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
            <Link href="/login">
              {notification && (
                <h3 className="animate-charcter"> {notification}</h3>
              )}
            </Link>
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
    </>
  );
};

export default ProductDetails;
