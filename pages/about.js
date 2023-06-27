import Wrapper from "@/components/Wrapper";
import { useAboutPageQuery } from "@/saleor/api";
import React from "react";
import Header from "@/components/Header";

export default function about() {
  const { data } = useAboutPageQuery();
  console.log(data)

  var cont = data?.page?.content;
  if(cont)
  {
  var text = cont;
  }
//   if(text)
//   {
//     text.map((block)=>(
//         console.log(block?.data?.text)
//     ))
//   }
  return (
    <div>
      <Header />
      <div className="w-full md:py-20">
        <Wrapper>{text}</Wrapper>
      </div>
    </div>
  );
}
