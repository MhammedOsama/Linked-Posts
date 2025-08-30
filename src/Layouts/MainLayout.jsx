import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className='bg-gray-100 min-h-screen pt-4'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
