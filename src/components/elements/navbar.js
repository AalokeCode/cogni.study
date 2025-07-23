"use client";
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
export default function Navbar({ isLoggedIn }) {
  let navbarLinks = [
    { name: "home", url: "/" },
    { name: "features", url: "/" },
    { name: "contact", url: "/" },
    { name: "github", url: "/" },
  ];
  let authorizedNavbarLinks = [
    { name: "dashboard", url: "/app/dashboard" },
    { name: "chat", url: "/app/chat" },
    { name: "topiclist", url: "/app/topiclist" },
    { name: "profile", url: "/app/profile" },
  ];
  useGSAP(() => {
    gsap.from("nav", {
      y: -100,
      duration: 1,
      opacity: 0,
      ease: "power2.easeIn",
    });
    gsap.to("nav", {
      y: 0,
      duration: 1.2,
      opacity: 1,
      ease: "power2.easeIn",
    });

    gsap.from(".link span", {
      y: 48,
      duration: 1.2,
      ease: "power2.easeIn",
    });

    gsap.to(".link span", {
      y: 0,
      duration: 1.2,
      ease: "power2.easeIn",
    });
  });

  function hoverEffectEnter(e) {
    return gsap.to(e.currentTarget, {
      y: -24,
      duration: 0.4,
      ease: "power2.easeOut",
    });
  }

  function hoverEffectLeave(e) {
    return gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: "power2.easeIn",
    });
  }
  return (
    <nav className="w-full flex gap-20 items-center justify-center p-5 py-10">
      <Image
        src="/logo/logo-white.svg"
        alt="logo"
        width={240}
        height={56}
        className="logo"
      />
      <ul className="bottom-navbar flex text-white gap-16 bg-[#1E1E1E] px-12 py-4 rounded-full">
        {isLoggedIn
          ? authorizedNavbarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="h-6 overflow-hidden inline-block"
              >
                <span
                  className="flex flex-col will-change-transform cursor-pointer"
                  onMouseEnter={hoverEffectEnter}
                  onMouseLeave={hoverEffectLeave}
                >
                  <span>{link.name}</span>
                  <span>{link.name}</span>
                </span>
              </Link>
            ))
          : navbarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className="h-6 overflow-hidden inline-block"
              >
                <span
                  className="flex flex-col will-change-transform cursor-pointer"
                  onMouseEnter={hoverEffectEnter}
                  onMouseLeave={hoverEffectLeave}
                >
                  <span>{link.name}</span>
                  <span>{link.name}</span>
                </span>
              </Link>
            ))}
      </ul>
      {!isLoggedIn ? (
        <Button
          backgroundColor="white"
          textColor="[#131313]"
          isLink="true"
          url="signin"
        >
          Sign In / Sign Up
        </Button>
      ) : (
        <Button
          backgroundColor="white"
          textColor="[#131313]"
          isLink="true"
          url="/logout"
        >
          Sign Out
        </Button>
      )}
    </nav>
  );
}
