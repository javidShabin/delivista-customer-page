import { useState, useEffect, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  X,
  UserCog,
  KeyRound,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  to?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { to: "/user/dashboard", label: "Dashboard", icon: Home },
  { to: "/user/profile", label: "Profile", icon: User },
  { to: "/user/orders", label: "Orders", icon: ShoppingBag },
  { to: "/user/address", label: "Address", icon: MapPin },
  {
    label: "Settings",
    icon: Settings,
    children: [
      { to: "/settings/edit-profile", label: "Edit Profile", icon: UserCog },
      { to: "/settings/change-password", label: "Change Password", icon: KeyRound },
      { to: "/settings/privacy-policy", label: "Privacy Policy", icon: ShieldCheck },
    ],
  },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored) setCollapsed(stored === "1");

    const darkStored = localStorage.getItem("dark-mode");
    if (darkStored) setDarkMode(darkStored === "1");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", isCollapsed ? "1" : "0");
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem("dark-mode", darkMode ? "1" : "0");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const sidebarWidth = useMemo(() => (isCollapsed ? 80 : 260), [isCollapsed]);

  const cx = (...classes: (string | false | null | undefined)[]) =>
    classes.filter(Boolean).join(" ");

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      const isOpen = openDropdown === item.label;
      return (
        <div key={item.label}>
          <button
            onClick={() => setOpenDropdown(isOpen ? null : item.label)}
            className={cx(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 transition group",
              isOpen ? "bg-orange-50 text-orange-600" : "hover:bg-orange-50 text-gray-600"
            )}
          >
            <item.icon className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
            {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
            {!isCollapsed && (
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            )}
          </button>
          <AnimatePresence>
            {isOpen && !isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-8 mt-1 space-y-1"
              >
                {item.children.map((sub) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to!}
                    className={({ isActive }) =>
                      cx(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                        isActive
                          ? "bg-orange-100 text-orange-600 font-medium"
                          : "hover:bg-orange-50 text-gray-600"
                      )
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    <sub.icon className="h-4 w-4" />
                    {sub.label}
                  </NavLink>
                ))}

                {/* Dark mode toggle */}
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-orange-50 text-gray-600 w-full"
                >
                  {darkMode ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-500" />
                  )}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <NavLink
        key={item.to}
        to={item.to!}
        className={({ isActive }) =>
          cx(
            "relative flex items-center gap-3 rounded-lg px-3 py-2 transition group",
            isActive
              ? "bg-orange-50 text-orange-600 font-medium"
              : "hover:bg-orange-50 text-gray-600"
          )
        }
        title={isCollapsed ? item.label : undefined}
        onClick={() => setMobileOpen(false)}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-md" />
            )}
            <item.icon className="h-5 w-5 group-hover:text-orange-500 transition-colors" />
            {!isCollapsed && <span>{item.label}</span>}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white/80 backdrop-blur border-b sticky top-0 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-orange-50 transition"
        >
          <Menu className="h-5 w-5 text-orange-500" />
        </button>
        <Link to={"/"}>
          <span className="font-bold tracking-wide text-orange-600 text-lg">
            YourBrand
          </span>
        </Link>
        <div className="w-9" />
      </div>

      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col backdrop-blur bg-white/80 shadow-xl sticky top-0 h-screen transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-orange-100">
          <div className="h-9 w-9 rounded-lg bg-orange-500 shadow-md" />
          {!isCollapsed && (
            <Link to={"/"}>
              <span className="font-bold text-orange-600 tracking-wide">
                YourBrand
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="ml-auto p-1 rounded-lg hover:bg-orange-50 transition"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-orange-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-orange-500" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">{NAV_ITEMS.map(renderNavItem)}</nav>

        {/* User */}
        <div className="border-t border-orange-100 p-4 flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="h-10 w-10 rounded-full border-2 border-orange-200 object-cover shadow-sm"
          />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800">Jane Smith</p>
              <p className="text-xs text-gray-500 truncate">jane@example.com</p>
            </div>
          )}
          <button className="ml-auto p-1 rounded-lg hover:bg-orange-50 transition">
            <LogOut className="h-4 w-4 text-orange-500" />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-72 bg-white/90 backdrop-blur border-r flex flex-col shadow-xl"
            >
              <div className="flex items-center gap-3 px-4 h-14 border-b border-orange-100">
                <div className="h-8 w-8 rounded-lg bg-orange-500" />
                <span className="font-bold text-orange-600">YourBrand</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="ml-auto p-1 rounded-lg hover:bg-orange-50"
                >
                  <X className="h-5 w-5 text-orange-500" />
                </button>
              </div>
              <nav className="flex-1 px-2 py-4 space-y-1">
                {NAV_ITEMS.map(renderNavItem)}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
