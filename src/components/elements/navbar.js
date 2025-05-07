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

    function hoverEffectEnter(e) {
        return gsap.to(e.currentTarget, { y: -24, duration: 0.4, ease: "power2.easeOut" })
    }

    function hoverEffectLeave(e) {
        return gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "power2.easeIn" })
    }
    return (<nav className="w-full flex gap-20 items-center justify-center p-5 py-10">
            <Image src="/logo/logo-white.svg" alt="logo" width={240} height={56} className="logo" />
            <ul className="bottom-navbar flex text-white gap-16 bg-[#1E1E1E] px-12 py-4 rounded-full">
            <Link href="/" className="h-6 overflow-hidden inline-block"><span className="flex flex-col will-change-transform cursor-pointer"  onMouseEnter={hoverEffectEnter} onMouseLeave={hoverEffectLeave}><span>home</span><span>home</span></span></Link>
            <Link href="/" className="h-6 overflow-hidden inline-block"><span className="flex flex-col will-change-transform cursor-pointer"  onMouseEnter={hoverEffectEnter} onMouseLeave={hoverEffectLeave}><span>features</span><span>features</span></span></Link>
            <Link href="/" className="h-6 overflow-hidden inline-block"><span className="flex flex-col will-change-transform cursor-pointer"  onMouseEnter={hoverEffectEnter} onMouseLeave={hoverEffectLeave}><span>contact</span><span>contact</span></span></Link>
            <Link href="/" className="h-6 overflow-hidden inline-block"><span className="flex flex-col will-change-transform cursor-pointer"  onMouseEnter={hoverEffectEnter} onMouseLeave={hoverEffectLeave}><span>github</span><span>github</span></span></Link>
        </ul>
            <Button backgroundColor="white" textColor="[#131313]" isLink="true" url="signin">Sign In / Sign Up</Button>
        {
        // TODO: to implement the auto-scroll to the sections. 
        }
    </nav>)
}