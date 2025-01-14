import { useState, useEffect } from "react";
import {
  User,
  Link as LinkIcon,
  Settings,
  LogOut,
  UserCog,
  KeyRound,
  Moon,
  Sun,
  FileText
} from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SidebarProps {
  onNavigate?: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  dropdown?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("Dashboard");
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const items: NavItem[] = [
    { id: "Profile", label: "Profile", icon: User, path: "/user/dashboard" },
    { id: "Orders", label: "My Orders", icon: LinkIcon, path: "/user/dashboard/order" },
    { id: "Address", label: "My Address", icon: LinkIcon, path: "/user/dashboard/address" },
    { id: "Settings", label: "Settings", icon: Settings, dropdown: true },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Modified to prevent sidebar closing on dropdown toggle
  function handleNav(item: NavItem, isDropdownToggle = false): void {
    setActive(item.id);
    if (!isDropdownToggle && onNavigate) onNavigate(item.id);
  }

  const handleLogout = async (): Promise<void> => {
    try {
      await axiosInstance.delete("/auth/user-logout");
      toast.success("Logout success");
      navigate("/login-page");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="flex flex-col justify-between text-gray-800 p-4 w-72 h-screen bg-base-100 border-r border-orange-200">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 text-white font-extrabold shadow-md">
            TS
          </div>
          <div>
            <Link to={"/"}>
              <h1 className="text-lg font-bold leading-none text-orange-600">Whats Link</h1>
            </Link>
            <p className="text-xs text-gray-500">Premium dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;

            return (
              <div key={it.id} className="relative">
                <Link
                  to={!it.dropdown ? it.path ?? "#" : "#"}
                  onClick={(e) => {
                    if (it.dropdown) {
                      e.preventDefault(); // Prevent redirect
                      setSettingsOpen((prev) => !prev);
                      handleNav(it, true); // Don't close sidebar
                    } else {
                      handleNav(it); // Close on mobile
                    }
                  }}
                  className={`flex items-center gap-3 w-full text-sm rounded-lg p-2 transition-all
                    ${
                      isActive
                        ? "bg-orange-100 text-orange-600 font-medium"
                        : "text-gray-700 hover:bg-orange-50"
                    }
                  `}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isActive ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 text-left">
                    <div>{it.label}</div>
                    {isActive && <div className="text-xs text-orange-500">Active</div>}
                  </div>
                  {it.dropdown && (
                    <div className="text-xs text-gray-500">
                      {settingsOpen ? "▲" : "▼"}
                    </div>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {it.dropdown && settingsOpen && (
                  <div className="ml-12 mt-1 flex flex-col gap-1">
                    <Link
                      to="/user/dashboard/settings/edit-profile"
                      onClick={() => handleNav(it)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 p-1 rounded-lg hover:bg-orange-50"
                    >
                      <UserCog size={14} /> Edit Profile
                    </Link>
                    <Link
                      to="/user/dashboard/settings/update-password"
                      onClick={() => handleNav(it)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 p-1 rounded-lg hover:bg-orange-50"
                    >
                      <KeyRound size={14} /> Change Password
                    </Link>
                    <button
                      onClick={toggleTheme}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 p-1 rounded-lg hover:bg-orange-50"
                    >
                      {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                      {darkMode ? "Day Theme" : "Dark Theme"}
                    </button>
                    <Link
                      to="/user/dashboard/settings/privacy-policy"
                      onClick={() => handleNav(it)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 p-1 rounded-lg hover:bg-orange-50"
                    >
                      <FileText size={14} /> Privacy Policy
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Profile & Logout */}
      <div className="flex items-center gap-3 border-t border-orange-100 pt-4">
        <img
          src={"/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full border border-orange-200"
        />
        <div>
          <div className="text-sm font-semibold">name</div>
          <div className="text-xs text-gray-500">role</div>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
