"use client";
import { useRef } from "react";
import Navbar from "../../elements/navbar";
import Image from "next/image";
import Button from "../../elements/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
export default function Header() {
  const navbarRef = useRef(null);
  useGSAP(() => {
    gsap.from(navbarRef.current, {
      y: 100,
      duration: 1,
      opacity: 0,
      ease: "power2.easeIn",
    });

    gsap.to(navbarRef.current, {
      y: 0,
      duration: 1,
      opacity: 0,
      ease: "power2.easeIn",
    });

    let topHeaderText = SplitText.create(".top-header-text");
    let bottomHeaderText = SplitText.create(".bottom-header-text");

    gsap.from(topHeaderText.chars, {
      y: 50,
      duration: 1,
      stagger: 0.05,
      opacity: 0,
      ease: "power2.easeIn",
    });
    gsap.to(topHeaderText.chars, {
      y: 0,
      duration: 1,
      stagger: 0.05,
      opacity: 1,
      ease: "power2.easeOut",
    });

    gsap.from(bottomHeaderText.chars, {
      y: -50,
      duration: 1.2,
      stagger: 0.05,
      opacity: 0,
      ease: "power2.easeIn",
    });
    gsap.to(bottomHeaderText.chars, {
      y: 0,
      duration: 1,
      stagger: 0.05,
      opacity: 1,
      ease: "power2.easeOut",
    });

    gsap.from(".header", {
      duration: 2.5,
      opacity: 0,
      ease: "power2.easeIn",
    });

    gsap.to(".header", {
      duration: 2.5,
      opacity: 1,
      ease: "power2.easeOut",
    });

    gsap.from(".header p", {
      y: 25,
      duration: 1.5,
      opacity: 0,
      ease: "power2.easeIn",
    });

    gsap.to(".header p", {
      y: 0,
      duration: 1.5,
      opacity: 1,
      ease: "power2.easeOut",
    });

    gsap.to(".header-image", {
      duration: 2,
      y: -20,
      repeat: -1,
      yoyo: true,
    });
  }, []);
  return (
    <div className="flex items-center justify-center">
      <div className="md:w-11/12 bg-gradient-to-t from-[#201F1F] to-[#131313] rounded-b-4xl pb-5 header">
        <Navbar ref={navbarRef} isLoggedIn={false}></Navbar>
        <div className="block overflow-hidden pb-2">
          <h1 className="text-center text-4xl md:text-6xl text-white mt-5 top-header-text">
            An AI Learning Companion
          </h1>
        </div>
        <div className="block overflow-hidden">
          <h1 className="text-center text-4xl md:text-6xl text-white mb-3 bottom-header-text">
            That helps you{" "}
            <span className="font-bold">
              <span>focus</span>
            </span>
          </h1>
        </div>
        <p className="text-center text-white">
          Enhance your learning with cogni-curated features, AI integrations and
          many more.
        </p>
        <div className="flex items-center justify-center">
          <Image
            alt="header-image"
            src="/images/main-header.png"
            width="800"
            height="800"
            className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] header-image"
          ></Image>
        </div>
      </div>
    </div>
  );
}
