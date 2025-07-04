import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, MessagesSquare } from "lucide-react";
import logo from "../../assets/images/logo.png";

type Props = {
  profileUrl: string;
};

const AuthHeader = ({ profileUrl }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition duration-300 ${
          isScrolled ? "bg-[#ffffff70] shadow-md backdrop-blur-lg" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-10 py-1">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="Zippyzag Logo"
                width={60}
                height={60}
                className="w-[60px] lg:w-[70px] h-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav
            className="hidden md:block text-black"
            aria-label="Main Navigation"
            role="navigation"
          >
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-page"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurant-page"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  Restaurants
                </Link>
              </li>
            </ul>
          </nav>

          {/* Help + Cart + Profile */}
          <div className="flex gap-4 lg:gap-10 items-center">
            {/* Help Icon */}
            <Link to="/support" className="relative group">
              <MessagesSquare className="w-6 h-6 text-[#ffa100] hover:scale-110 transition" />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 text-[#ffa100] hover:scale-110 transition" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                2
              </span>
            </Link>

            {/* Profile Image */}
            <Link to="/profile">
              <img
                src={profileUrl}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-[#ffa100] hover:scale-105 transition duration-200 object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden bg-[#444444c3] backdrop-blur-md text-white z-50">
        <ul className="flex justify-around items-center py-4 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-[#ffa100] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-page" className="hover:text-[#ffa100] transition">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/restaurant-page"
              className="hover:text-[#ffa100] transition"
            >
              Restaurants
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AuthHeader;
