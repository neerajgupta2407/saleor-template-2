import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useLocalStorage } from "react-use";
import { useEffect } from "react";
import {useProductFilterByNameQuery, useCheckoutCreateMutation } from '@/saleor/api';

export default function Home({ }) {
    const { loading, error, data, fetchMore } = useProductFilterByNameQuery({
        variables: {
          filter: {},
        },
      });
    const products = data?.products?.edges
    console.log(products)
    const [token, setToken] = useLocalStorage("token");

  const [checkoutCreate, { kdata, kloading }] = useCheckoutCreateMutation();

  useEffect(() => {
    async function doCheckout() {
      const { data } = await checkoutCreate();
      const token = data?.checkoutCreate?.checkout?.token;
      console.log('token : ',token)
      setToken(token);
    }

    doCheckout();

  }, []);
    return (
        <main>
            <HeroBanner />
            <Wrapper>
                {/* heading and paragaph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        Cushioning for Your Miles
                    </div>
                    <div className="text-md md:text-xl">
                        A lightweight Nike ZoomX midsole is combined with
                        increased stack heights to help provide cushioning
                        during extended stretches of running.
                    </div>
                </div>
                {/* heading and paragaph end */}

                {/* products grid start */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {products?.map((product) => (
                        <ProductCard key={product?.node?.id} data={product?.node} />
                    ))}
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
                </div>
                {/* products grid end */}
            </Wrapper>
        </main>
    );
}