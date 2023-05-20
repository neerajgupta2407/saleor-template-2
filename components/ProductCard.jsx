import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ key, data }) => {
    const myLoader=({src})=>{
        return data.thumbnail.url;
      }
  console.log(data);
  const id = data.id;
  return (
    <Link
      href={`/product/${id}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image loader={myLoader}
        width={500}
        height={500}
        src={data.thumbnail.url}
        alt={data.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{data.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          {/* <p className="mr-2 text-lg font-semibold">
                        &#8377;{data.pricing.priceRange.start.gross.amount} */}
          {/* </p>

                    {p.original_price && (
                        <>
                            <p className="text-base  font-medium line-through">
                                &#8377;{p.original_price}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                {getDiscountedPricePercentage(
                                    p.original_price,
                                    p.price
                                )}
                                % off
                            </p> */}
          {/* </> */}
          {/* )} */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
