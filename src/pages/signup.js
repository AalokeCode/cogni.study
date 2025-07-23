import { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/elements/button";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="bg-[#131313] gap-20 flex text-white items-center justify-center h-screen">
      <div className="w-[480px] h-[520px]">
        <Image
          src="/images/sign-flow.png"
          alt="login"
          width={960}
          height={1040}
        />
      </div>
      <div>
        <Image
          src="/logo/logo-white.svg"
          alt="logo"
          width={240}
          height={56}
          className="logo"
        />
        <h1 className="text-6xl mb-1">Manage. Time. Excel</h1>
        <p className="mb-5">Enhance your study experience with cogni</p>
        <form className="flex flex-col mb-5">
          <label className="mb-1">What do we call you?</label>
          <input
            type="text"
            placeholder="Eg. John Doe"
            className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-gray-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
          ></input>
          <label className="mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-gray-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
          ></input>
          <label className="mb-1">Password</label>
          <input
            type="password"
            placeholder="⋅⋅⋅⋅⋅⋅⋅"
            className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-gray-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
          ></input>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-2 border-[#343434] bg-[#1E1E1E] text-white accent-white hover:border-[#4A4A4A] hover:bg-[#252525] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#131313] transition-all duration-200 ease-in-out cursor-pointer flex-shrink-0"
            ></input>
            <label className="text-sm">
              I agree to the{" "}
              <Link href="terms-of-service" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        </form>
        <div className="text-[#131313] flex mb-3">
          <Button
            backgroundColor="white"
            textColor="[#131313]"
            isFullWidth="true"
          >
            Sign Up
          </Button>
        </div>
        <p className="text-center">
          Already a User?{" "}
          <Link className="underline" href="signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
