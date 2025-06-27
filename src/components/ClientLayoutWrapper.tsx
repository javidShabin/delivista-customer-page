"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthHeader from "@/components/AuthHeader";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHeader />
      {children}
    </Provider>
  );
}
