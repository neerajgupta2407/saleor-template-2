import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ content }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">{content}</div>
      </div>
    </>
  );
};

export default Layout;
