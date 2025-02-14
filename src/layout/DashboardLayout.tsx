import Sidebar from "../components/authUser/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
