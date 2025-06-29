"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthHeader from "@/components/AuthHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuth } from "@/utils/api";
import { PropagateLoader } from "react-spinners";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true); // Initially loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await checkAuth();
       
      } catch (error) {
        console.error("Auth check failed:", error);
        
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PropagateLoader color="#f97316" size={15} />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AuthHeader />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="colored"
        toastClassName="text-white text-sm md:text-base"
        style={{ zIndex: 99999 }}
      />

      {children}
    </Provider>
  );
}
