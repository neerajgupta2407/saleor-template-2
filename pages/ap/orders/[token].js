import Layout from "@/pages/ap/Layout.js";
import { useOrderDetailsByTokenQuery } from "@/saleor/api";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const idpage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { loading, error, data } = useOrderDetailsByTokenQuery({
    variables: { token },
  });
  //   let product = data?.product;
  console.log(data);
  return (
    <>
      <Layout
        content={
          <>
            <p className="mb-7 mt-7">Previous Orders: </p>
            <table>
              <tbody>
                <tr>
                  <h3>
                    <td>Your order number:</td>
                    <td>{data?.orderByToken.number}</td>
                  </h3>
                </tr>
                <tr>
                  <h6>
                    <td>Status:</td>
                    <td>{data?.orderByToken.status}</td>
                  </h6>
                </tr>
                <tr>
                  <td colSpan="4">
                    <div className="mt-7"></div>
                  </td>
                </tr>
                <tr>
                  <td className="colu">Items</td>
                  <td className="colu"> Price</td>
                  <td className="colu">Quantity</td>
                  <td className="colu">Total</td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <div className="mt-3"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <div className="mt-3"></div>
                  </td>
                </tr>
                {data?.orderByToken?.lines.map((line) => (
                  <tr key={line?.id}>
                    <td>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          loader={line?.thumbnail?.url}
                          src={line?.thumbnail?.url}
                          width={100}
                          height={100}
                        ></img>
                        <div style={{ marginTop: "40px", marginLeft: "10px" }}>
                          {line.productName}
                        </div>
                      </div>
                    </td>
                    <td> &#8377;{line.totalPrice.gross.amount}</td>
                    <td>{line.quantity}</td>
                    <td>
                      {" "}
                      &#8377;{line.totalPrice.gross.amount * line.quantity}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td className="golu">Shipping Price</td>
                  <td className="golu">
                    {" "}
                    &#8377;{data?.orderByToken?.shippingPrice.gross.amount}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    &#8377;{data?.orderByToken?.total.gross.amount}
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>Billing Address</p>
                <p>{data?.orderByToken?.billingAddress.streetAddress1}</p>
                <p>{data?.orderByToken?.billingAddress.city}</p>
                <p>{data?.orderByToken?.billingAddress.postalCode}</p>
                <p>{data?.orderByToken?.billingAddress.country.country}</p>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                <p>Shipping Address</p>
                <p>{data?.orderByToken?.shippingAddress.streetAddress1}</p>
                <p>{data?.orderByToken?.shippingAddress.city}</p>
                <p>{data?.orderByToken?.shippingAddress.postalCode}</p>
                <p>{data?.orderByToken?.shippingAddress.country.country}</p>
              </div>
            </div>
          </>
        }
      ></Layout>
    </>
  );
};

export default idpage;
