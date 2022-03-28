import React from "react";
import Card from "./Card";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  return (
    <div className="h-screen w-scren bg-[#242424] overflow-auto">
      <NavigationBar />
      {children}
    </div>
  );
}
