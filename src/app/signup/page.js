"use client";
import { useRef, useState } from "react";
import { Eye, EyeClosed, Check } from "lucide-react";
import Image from "next/image";
import Button from "@/components/elements/button";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!formRef.current.terms.checked) {
      toast.error("You must agree to the Terms of Service and Privacy Policy.");
      return;
    } else {
      if (
        !formRef.current.displayName.value ||
        !formRef.current.email.value ||
        !formRef.current.password.value
      ) {
        toast.error("Please fill in all fields.");
        return;
      }
      const data = {
        displayName: formRef.current.displayName.value,
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Sign up successful! Redirecting to sign in...");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Sign up failed: ${errorData.message}`);
      }
    }
  };
  return (
    <div className="bg-[#131313] gap-20 flex text-white items-center justify-center h-screen">
      <Toaster />
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
          className="logo mb-3"
        />
        <h1 className="text-6xl mb-2">Manage. Time. Excel</h1>
        <p className="mb-5 text-neutral-400">
          Enhance your study experience with cogni
        </p>
        <form className="flex flex-col mb-5" ref={formRef}>
          <label className="mb-1">What do we call you?</label>
          <input
            type="text"
            name="displayName"
            placeholder="Eg. John Doe"
            className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-neutral-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
          ></input>
          <label className="mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-neutral-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
          ></input>
          <label className="mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="⋅⋅⋅⋅⋅⋅⋅"
              suggested="current-password"
              className="bg-[#1E1E1E] w-full p-3 py-3 border border-[#343434] rounded-lg mb-4  text-white placeholder-neutral-500  transition-all duration-200 ease-in-out hover:border-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
            ></input>
            <div className="absolute right-3 top-[20%] transform cursor-pointer">
              {showPassword ? (
                <EyeClosed onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <label className="relative inline-block h-5 w-5">
              <input
                type="checkbox"
                className="peer appearance-none h-full w-full rounded border-2 border-[#343434] checked:bg-white checked:hover:bg-white bg-[#1E1E1E] hover:border-[#4A4A4A] hover:bg-[#252525] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#131313] transition-all duration-200 ease-in-out cursor-pointer"
              />
              <Check
                className="absolute inset-0 m-auto h-3.5 w-3.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                strokeWidth={3}
              />
            </label>
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
          <div className="text-[#131313] flex mb-3">
            <Button
              backgroundColor="white"
              textColor="[#131313]"
              isFullWidth="true"
              clickHandler={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </form>
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
