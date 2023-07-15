import { useOrdershisQuery, useOrdersQuery } from "@/saleor/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

let accessToken;
if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("accessToken");
}

const Table = () => {
  const [items, setItems] = useState([]);
  const { loading, error, data } = useOrdersQuery({
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    },
  });
  const products = data;
  console.log(products);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Creation Date</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products?.me?.orders?.edges?.map((item) => (
          <tr key={item?.node?.id}>
            <Link href={`/ap/orders/${item?.node?.token}`}>
              <td>{item?.node?.number}</td>
            </Link>
            <td>{item?.node?.created.substring(0,10)}</td>
            <td>{item?.node?.status}</td>
            <td>{item?.node?.total?.gross?.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
