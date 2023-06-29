import React from "react";
import Link from "next/link";
import Image from "next/image";

const Product = ({ idd }) => {
  console.log(idd)
  const myLoader = ({ src }) => {
    return idd?.thumbnail?.url;
  };
  const id = idd?.id;
  const iname =  idd?.name.split(' ').slice(0,4).join(' ');
  return (
    <div>
      <Link href={`/product/${id}`}>
        <div className="product-card">
          <Image
            loader={myLoader}
            src={idd?.thumbnail?.url}
            alt={idd?.name}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{iname}</p>
          <p className="product-price">
            &#8377;{idd?.pricing.priceRange.start.gross.amount}{" "}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
