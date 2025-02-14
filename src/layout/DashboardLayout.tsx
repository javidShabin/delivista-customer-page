import { useEffect, useState } from "react";
import Sidebar from "../components/authUser/SideBar";
import { Outlet } from "react-router-dom";

interface HamburgerIconProps {
  isOpen: boolean;
  toggle: () => void;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, toggle }) => (
  <button
    aria-label="Toggle sidebar"
    onClick={toggle}
    className="fixed top-4 left-4 z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 md:hidden"
  >
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`block h-1 w-8 rounded-full ${isOpen ? "bg-white" : "bg-orange-500"} transition-all duration-300 ease-in-out
          ${
            isOpen
              ? i === 0
                ? "translate-y-2 rotate-45"
                : i === 1
                ? "opacity-0"
                : "translate-y-[-8px] -rotate-45"
              : "translate-y-0 rotate-0 opacity-100"
          }
        `}
      />
    ))}
  </button>
);

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-orange-200 shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:shadow-none
        `}
      >
        <Sidebar
          onNavigate={() => {
            if (isMobile) setSidebarOpen(false);
          }}
        />
      </div>

      {/* Hamburger toggle */}
      {isMobile && (
        <HamburgerIcon
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full">
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
