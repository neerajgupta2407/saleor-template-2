import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import { useProductCollectionSearchQuery } from "@/saleor/api";
import React, { useState } from "react";

const search = () => {
  const [query, setQuery] = useState("");
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const { data } = useProductCollectionSearchQuery({
    variables: {
      filter: { search: query },
      locale: "EN_US",
      channel: "in",
    },
  });
  const products = data?.products?.edges;
  return (
    <div>
      <Navbar />
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            marginTop: "80px",
            marginBottom: "30px",
            fontSize: "35px",
          }}
          className="font-semibold"
        >
          Search
        </div>
        <input
          style={{
            padding: "4px",
            fontsize: "35px",
            width: "200px",
            marginBottom: "30px",
          }}
          type="text"
          placeholder="What are you looking for ?"
          onChange={handleSearch}
        />
        <div className="products-container">
          {products?.map((product) => (
            <Product idd={product?.node} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default search;
