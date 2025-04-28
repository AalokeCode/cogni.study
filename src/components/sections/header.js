import Navbar from "../elements/navbar";
import Image from "next/image";
export default function Header() { 
    return (<div className="flex items-center justify-center">
        <div className="w-11/12 bg-gradient-to-t from-[#201F1F] to-[#131313] rounded-b-4xl pb-20">
    <Navbar></Navbar>
    <h1 className="text-center text-6xl text-white mt-5">An AI Learning Companion</h1>
    <h1 className="text-center text-6xl text-white mb-3">That helps you <span className="font-bold">focus</span></h1>
    <p className="text-center text-white">Enhance your learning with cogni, an AI-based education companion</p>
    <Image alt="header-image" src="/images/main-header.png" width="400" height="400"></Image>
    </div>
    </div>
    )
 }