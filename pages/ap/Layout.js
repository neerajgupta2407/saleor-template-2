import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ content }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 w-full p-4 md:mr-2 md:mb-0 mb-4">
          <Sidebar />
        </div>
        <div className="md:w-2/3 p-4">{content}</div>
      </div>
    </>
  );
};

export default Layout;
