import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#F6F8FB] font-manrope text-[#07142D]">
      <Sidebar />
      <div className="lg:pl-[248px]">
        <Navbar />
        <main className="px-6 py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
