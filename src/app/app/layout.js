"use client";
import Navbar from "@/components/elements/navbar";
import { useEffect } from "react";

export default function AppLayout({ children }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
    }
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      <main className="flex-1 flex flex-col text-white items-center justify-center px-6">
        {children}
      </main>
    </div>
  );
}
