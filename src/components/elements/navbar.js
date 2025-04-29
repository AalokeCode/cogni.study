'use client';
import Image from "next/image";
import Button from "./button";
import Link from "next/link";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
export default function Navbar(){
    useGSAP(() => {
        gsap.from("nav", {
            y:-100,  
            duration: 1,
            opacity: 0,
            ease: "power2.easeIn",
        })
        gsap.to("nav", {
            y:0,  
            duration: 1.2,
            opacity: 1,
            ease: "power2.easeIn",
        })

        gsap.from(".link span", {
            y: 48, 
            duration: 1.2,
            ease: "power2.easeIn",
        })

        gsap.to(".link span", {
            y: 0, 
            duration: 1.2,
            ease: "power2.easeIn",
        })
    });

    function hoverEffect(e) {
        gsap.from(e.target.children[0], {
            y: -48, 
            duration: 1,
            ease: "power2.easeIn",
        })
        gsap.to(e.target.children[0], {
            y: 0, 
            duration: 1,
            ease: "power2.easeIn",
        })
    }
    return (<nav className="w-full flex flex-col gap-3 items-center justify-center p-5">
        <div className="top-navbar flex gap-20">
            <Image src="/logo/logo-white.svg" alt="logo" width={240} height={56} className="logo" />
            <Button backgroundColor="white" textColor="[#131313]" isLink="true" url="login">Login/Register</Button>
        </div>
        {
        // TODO: to implement the auto-scroll to the sections. 
        }
        <ul className="bottom-navbar flex text-white gap-16 bg-[#1E1E1E] px-12 py-4 rounded-full">
            <Link href="/"><span className="h-6 overflow-hidden flex flex-col link" onMouseEnter={(e) => {hoverEffect(e)}}>home <span>home</span></span></Link>
            <Link href="/">features</Link>
            <Link href="/">contact</Link>
            <Link href="/">github</Link>
        </ul>
    </nav>)
}