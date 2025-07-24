import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function MainFeatureSection() {
  return (
    <section className="p-5 md:p-16 text-white">
      <h1 className="text-3xl md:text-6xl text-center">Introducing CogniAI</h1>
      <div className="text-2xl md:text-4xl text-[#979797] text-center flex items-end gap-2 justify-center">
        Powered by{" "}
        <Image
          src="/others/gemini-logo-gray.png"
          alt="Gemini Logo"
          width={1024}
          height={377}
          className="mb-2 w-14 h-5 md:w-28 md:h-10"
        ></Image>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="p-1 rounded-2xl relative overflow-hidden border-2 border-[#313131] w-20 h-20 md:w-40 md:h-40 flex items-center justify-center">
          <Image
            src="/others/gemini-icon.png"
            alt="Gemini Icon"
            width={100}
            height={100}
            className="w-[50] h-[50] md:w-[100] md:h-[100]"
          ></Image>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="h-5 w-1 bg-amber-50"></div>
          <div className="h-5 w-1 bg-amber-50"></div>
          <div className="h-5 w-1 bg-amber-50"></div>
          <div className="h-5 w-1 bg-amber-50"></div>
        </div>
        <div className="bg-[#201F1F] px-4 md:px-10 pt-4 md:pt-5 w-full max-w-md md:max-w-2xl rounded-2xl mx-auto">
          <p className="flex gap-2 items-center text-base md:text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="fill-white"
              viewBox="0 0 256 256"
            >
              <path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path>
            </svg>
            Generating topiclist...
          </p>
          <div className="bg-gradient-to-b mt-3 rounded-2xl from-[#131313] to-[#201F1F] p-3 md:p-5 w-full">
            <div className="bg-[#313131] animate-pulse h-4 md:h-5 rounded-2xl w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
