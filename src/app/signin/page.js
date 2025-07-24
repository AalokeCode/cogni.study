"use client";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Button from "@/components/elements/button";
import Link from "next/link";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/app/dashboard";
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!formRef.current.email.value || !formRef.current.password.value) {
      toast.error("Please fill in all fields.");
      return;
    }
    const data = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      toast.success("Sign in successful! Redirecting to dashboard...");
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      setTimeout(() => {
        window.location.href = "/app/dashboard";
      }, 2000);
    }
  };
  return (
    <div className="bg-[#131313] flex flex-col md:flex-row gap-8 md:gap-20 text-white items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-xs md:max-w-md lg:max-w-lg flex-shrink-0 mb-8 md:mb-0 flex items-center justify-center">
        <Image
          src="/images/sign-flow.png"
          alt="login"
          width={480}
          height={520}
          className="w-3/4 md:w-full h-auto object-contain"
        />
      </div>
      <div className="w-full max-w-md">
        <Image
          src="/logo/logo-white.svg"
          alt="logo"
          width={180}
          height={42}
          className="logo mx-auto mb-2"
        />
        <h1 className="text-3xl sm:text-4xl md:text-6xl mb-1 text-center">
          Manage. Time. Excel
        </h1>
        <p className="mb-5 text-center text-base md:text-lg">
          Enhance your study experience with cogni
        </p>
        <form className="flex flex-col mb-5" ref={formRef}>
          <label className="mb-1 text-sm md:text-base">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-[#1E1E1E] w-full p-3 border border-[#343434] rounded-lg mb-4 text-white placeholder-gray-500 transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm md:text-base"
          />
          <label className="mb-1 text-sm md:text-base">Password</label>
          <div className="relative flex items-center mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="⋅⋅⋅⋅⋅⋅⋅"
              suggested="current-password"
              className="bg-[#1E1E1E] w-full p-3 pr-10 border border-[#343434] rounded-lg text-white placeholder-neutral-500 transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 text-sm md:text-base"
            />
            <span className="absolute right-3 cursor-pointer flex items-center h-full top-0">
              {showPassword ? (
                <EyeClosed onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>
          <div className="text-[#131313] flex mb-3">
            <Button
              backgroundColor="white"
              textColor="[#131313]"
              isFullWidth="true"
              clickHandler={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </form>
        <p className="text-center text-sm md:text-base">
          New to cogni?{" "}
          <Link className="underline" href="signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
