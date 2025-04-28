import Navbar from "../../elements/navbar";
import Image from "next/image";
import Button from "../../elements/button";
export default function Header() { 
    return (<div className="flex items-center justify-center">
    <div className="w-11/12 bg-gradient-to-t from-[#201F1F] to-[#131313] rounded-b-4xl pb-5">
        <Navbar></Navbar>
        <h1 className="text-center text-6xl text-white mt-5">An AI Learning Companion</h1>
        <h1 className="text-center text-6xl text-white mb-3">That helps you <span className="font-bold">focus</span></h1>
        <p className="text-center text-white">Enhance your learning with cogni-curated features, AI integrations and many more.</p>
        {
        // TODO: to implement the auto-scroll to the features section.
        }
        <div className="flex items-center justify-center">
        <Image alt="header-image" src="/images/main-header.png" width="800" height="800" className="w-[400px] h-[400px]"></Image>
        </div>
    </div>
    </div>
    )
 }