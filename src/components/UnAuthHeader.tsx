import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const UnAuthHeader = () => {
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

          {/* Join Us Button Only */}
          <div className="flex gap-5 items-center">
            <Link to="/signup-page">
              <div className="py-1 sm:py-2 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 text-xs sm:text-base">
                Join Us
              </div>
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
  )
}

export default UnAuthHeader
