import Table from "@/components/Table";
import Layout from "@/pages/ap/Layout.js";
const HomePage = () => {
  return (
    <Layout
      content={
        <>
          <p className="mb-7 mt-7" >Your Previous Orders: </p>
          <Table/>
        </>
      }
    ></Layout>
  );
};

export default HomePage;
