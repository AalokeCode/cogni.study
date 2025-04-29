'use client';
import { useRef } from "react";  
import Navbar from "../../elements/navbar";
import Image from "next/image";
import Button from "../../elements/button";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
export default function Header() { 
    const navbarRef = useRef(null);
    useGSAP(() => {
        gsap.from(navbarRef.current, {
            y:100,  
            duration: 1,
            opacity: 0,
            ease: "power2.easeIn",
        })

        gsap.to(navbarRef.current, {
            y:0,  
            duration: 1,
            opacity: 0,
            ease: "power2.easeIn",
        })


        gsap.from(".top-header-text .element", {
            y:50,  
            duration: 1,
            stagger: 0.05,
            opacity: 0,
            ease: "power2.easeIn",
        })
        gsap.to(".top-header-text .element", {
            y:0,  
            duration: 1,
            stagger: 0.05,
            opacity: 1,
            ease: "power2.easeOut",
        })

        gsap.from(".bottom-header-text .element", {
            y:-50,  
            duration: 1.2,
            stagger: 0.05,
            opacity: 0,
            ease: "power2.easeIn",
        })
        gsap.to(".bottom-header-text .element", {
            y:0,  
            duration: 1,
            stagger: 0.05,
            opacity: 1,
            ease: "power2.easeOut",
        })

        gsap.from(".header", { 
            duration: 2.5,
            opacity: 0,
            ease: "power2.easeIn",
        })

        gsap.to(".header", {
            duration: 2.5,
            opacity: 1,
            ease: "power2.easeOut",
        })  

        gsap.from(".header p", {
            y:25,
            duration: 1.5,
            opacity: 0,
            ease: "power2.easeIn",
        })

        gsap.to(".header p", {
            y:0,
            duration: 1.5,
            opacity: 1,
            ease: "power2.easeOut",
        })  

        gsap.to(".header-image", {
            duration: 2,
            y: -20,
            repeat: -1,
            yoyo: true
        });
    });
    return (<div className="flex items-center justify-center">
    <div className="w-11/12 bg-gradient-to-t from-[#201F1F] to-[#131313] rounded-b-4xl pb-5 header">
        <Navbar ref={navbarRef}></Navbar>
        <div className="block overflow-hidden pb-2">
        <h1 className="text-center text-6xl text-white mt-5 top-header-text">{"An AI Learning Companion".split("").map((e, iter) => {return e !== " " ? <span key={iter} className="element inline-block">{e}</span> : <span key={iter} className="element inline-block w-2"></span>})}</h1>
        </div>
        <div className="block overflow-hidden">
        <h1 className="text-center text-6xl text-white mb-3 bottom-header-text">{"That helps you".split("").map((e, iter) => {return e !== " " ? <span key={iter} className="element inline-block">{e}</span> : <span key={iter} className="element inline-block w-2"></span>})} <span className="font-bold">focus</span></h1>
        </div>
        <p className="text-center text-white">Enhance your learning with cogni-curated features, AI integrations and many more.</p>
        {
        // TODO: to implement the auto-scroll to the features section.
        }
        <div className="flex items-center justify-center">
        <Image alt="header-image" src="/images/main-header.png" width="800" height="800" className="w-[400px] h-[400px] header-image"></Image>
        </div>
    </div>
    </div>
    )
 }