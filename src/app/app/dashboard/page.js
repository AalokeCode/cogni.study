"use client";
import Image from "next/image";
import { SendHorizontal } from "lucide-react";
import Button from "@/components/elements/button";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
export default function Dashboard() {
  const inputRef = useRef(null);
  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Generating Content!");
    const token = localStorage.getItem("token");
    try {
      const sessionResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (sessionResponse.ok) {
        const data = await sessionResponse.json();
        const chatResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: data.sessionId,
              message: inputRef.current.value,
            }),
          }
        );
        if (chatResponse.ok) {
          toast.dismiss(loadingToast);
          toast.success("Chat Generated successfully! Redirecting");
          window.location.href = `/app/chat/${data.sessionId}`;
        }
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to create a session/chat");
    }
  };
  return (
    <div className="flex flex-col text-white justify-between px-6 pb-12 bg-[#131313] max-h-screen">
      <Toaster />
      <div className="flex flex-col text-white items-center justify-center w-full">
        <Image
          src="/images/chat-main.png"
          width={365}
          height={300}
          alt="Chat-main"
          className="mb-5"
        ></Image>
        <h1 className="text-6xl text-center mb-5">
          Whats your topic
          <br /> for today?
        </h1>
        <p className="text-[#979797]">
          it can range from Science to Javascript to Quantum Entanglement...
        </p>
      </div>

      <form className="text-center p-5 mt-10 flex justify-center items-center gap-2 w-full flex-col">
        <div className="bg-[#1A1A1A] w-3xl flex justify-between items-center border-2 border-[#2A2A2A] rounded-full p-2 hover:border-[#3A3A3A] focus-within:border-white/40 focus-within:shadow-lg focus-within:shadow-neutral-400/10 transition-all duration-300">
          <input
            type="text"
            placeholder="Enter your topic. Let AI do its magic!"
            className="flex-grow text-white placeholder:text-[#979797] focus:outline-0 py-3 px-8"
            ref={inputRef}
          ></input>
          <Button
            backgroundColor="white"
            textColor="black"
            clickHandler={handleInputSubmit}
          >
            Send <SendHorizontal className="inline" />
          </Button>
        </div>
        <p className="text-[#979797]">
          AI may make mistakes, For further information know our usage
          guidelines
        </p>
      </form>
    </div>
  );
}
