"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 w-full z-50 ${
          isScrolled ? "bg-[#ffffff70] shadow-md backdrop-blur-lg" : ""
        } text-white transition duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <div className="logo">
            <h1>
              <img
                src="/assets/images/logo.png"
                className="w-[70px] lg:w-[80px]"
              />
            </h1>
          </div>

          {/* Navigation Links - Hidden on small screens */}
          <nav className="hidden md:block text-black" aria-label="Main Navigation">
            <ul className="flex items-center space-x-6">
              <Link href={"/"}>
                <li className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300">
                  Home
                </li>
              </Link>
              <Link href={"/about-page"}>
                <li className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300">
                  About
                </li>
              </Link>
              <Link href={"/restaurant"}>
                <li className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300">
                  Restaurants
                </li>
              </Link>
            </ul>
          </nav>

          {/* Join Us Button - Always visible */}
          <div className="flex gap-5 items-center">
            <Link href={"/signup-page"}>
              <div className="py-1 sm:py-2 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 text-xs sm:text-base">
                Join Us
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Bottom Mobile Nav - Hidden on md+ screens */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden bg-[#444444c3] backdrop-blur-md text-white z-50">
        <ul className="flex justify-around items-center py-4 text-sm font-medium">
          <Link href={"/"}>
            <li className="hover:text-[#ffa100] transition">Home</li>
          </Link>
          <Link href={"/about"}>
            <li className="hover:text-[#ffa100] transition">About</li>
          </Link>
          <Link href={"/restaurant"}>
            <li className="hover:text-[#ffa100] transition">Restaurants</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
