import { useUpdateitemMutation } from "@/saleor/api";
import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useLocalStorage } from "react-use";

const Productitem = (product) => {
  const [token] = useLocalStorage("token");
  const lineid = localStorage.getItem("lineid");
  const [checkoutLineUpdate] = useUpdateitemMutation();
  const [qty, setQty] = useState(product?.product.quantity);
  const vid = product?.product?.variant?.id;

  useEffect(() => {
    updateMutation();
  }, [qty]); // Run the mutation whenever 'qty' changes

  const updateMutation = () => {
    checkoutLineUpdate({
      variables: {
        checkoutToken: token,
        variantId: vid,
        quantity: qty,
      },
    });
    localStorage.setItem("productsL", qty);
  };

  const handleMin = () => {
    setQty(qty - 1);
  };

  const handlePlus = () => {
    setQty(qty + 1);
  };
  return (
    <div>
      <div className="product" key="">
        <img
          loader={product?.product?.variant?.product?.thumbnail?.url}
          src={product?.product?.variant?.product?.thumbnail?.url}
          className="cart-product-image"
        />
        {console.log(product?.product?.variant?.product?.thumbnail?.url)}
        <div className="item-desc">
          <div className="flex top mb-30">
            <h5>{product?.product?.variant?.product?.name}</h5>
          </div>
          <h4>
            MRP : &#8377;
            {product?.product?.variant?.pricing?.price?.gross?.amount}
          </h4>
          <div className="flex bottom">
            <div>
              <p className="quantity-desc">
                <span className="minus">
                  <AiOutlineMinus onClick={handleMin} />
                </span>
                <span className="num" onClick="">
                  {qty}
                </span>
                <span className="plus">
                  <AiOutlinePlus onClick={handlePlus} />
                </span>
              </p>
            </div>
            <button type="button" className="remove-item">
              <TiDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productitem;
