import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const index = ({children}) => {
  return (
    <div>
      <Navbar/>
      <Sidebar />
      {children}
    </div>
  );
};

export default index;
