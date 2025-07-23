"use client";
import { useEffect } from "react";
export default function SignOutPage() {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/";
  }, []);
  return (
    <div>
      <h1>Sign Out</h1>
      <p>You have been signed out successfully.</p>
    </div>
  );
}
