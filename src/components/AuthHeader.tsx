"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { axiosInstance } from "@/config/axiosInstance";

const AuthHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImage, setProfileImage] = useState("/assets/images/default-user.png");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/authentication/verify-auth");
        setIsAuthenticated(true);
        setProfileImage(res.data?.user?.profile || "/assets/images/default-user.png");
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 w-full z-50 ${
          isScrolled ? "bg-[#ffffff70] shadow-md backdrop-blur-lg" : ""
        } text-white transition duration-300`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-10 py-1">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="Zippyzag Logo"
                width={80}
                height={80}
                className="w-[70px] lg:w-[80px] h-auto"
                priority
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
                  href="/"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-page"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/restaurant-page"
                  className="font-semibold py-1 px-3 bg-[#ffa100] text-white rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300"
                >
                  Restaurants
                </Link>
              </li>
            </ul>
          </nav>

          {/* Auth Area */}
          <div className="flex gap-5 items-center">
            {!isAuthenticated ? (
              <Link href="/signup-page">
                <div className="py-1 sm:py-2 px-4 sm:px-6 bg-[#ffa100] text-white font-semibold rounded-full shadow-lg hover:shadow-[#ffa100] transition duration-300 text-xs sm:text-base">
                  Join Us
                </div>
              </Link>
            ) : (
              <Image
                src={profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover border border-white"
              />
            )}
          </div>
        </div>
      </header>

      {/* Bottom Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 w-full md:hidden bg-[#444444c3] backdrop-blur-md text-white z-50">
        <ul className="flex justify-around items-center py-4 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-[#ffa100] transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about-page" className="hover:text-[#ffa100] transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/restaurant-page" className="hover:text-[#ffa100] transition">
              Restaurants
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AuthHeader;
