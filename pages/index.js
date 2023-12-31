import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import {
  useProductFilterByNameQuery,
  useCheckoutCreateMutation,
  useRefreshTokenMutation,
} from "@/saleor/api";
import Header from "@/components/Header";
import { client } from "@/lib/client";
import FooterBanner from "@/components/FooterBanner";
import Product from "@/components/Product";
import Navbar from "@/components/Navbar";

export default function Home({ bannerData }) {
  const { loading, error, data, fetchMore } = useProductFilterByNameQuery({
    variables: {
      filter: {},
    },
  });
  const products = data?.products?.edges;
  console.log(products);

  return (
    <div>
      <Navbar />
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product idd={product?.node} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
