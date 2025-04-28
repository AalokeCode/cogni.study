import Image from "next/image";
import Button from "./button";
import Link from "next/link";
export default function Navbar(){
    return (<nav className="w-full flex flex-col gap-3 items-center justify-center p-5">
        <div className="top-navbar flex gap-20">
            <Image src="/logo/logo-white.svg" alt="logo" width={240} height={56} className="logo" />
            <Button backgroundColor="white" textColor="[#131313]" isLink="true" url="/login">Login/Register</Button>
        </div>
        {
        // TODO: to implement the auto-scroll to the sections. 
        }
        <ul className="bottom-navbar flex text-white gap-16 bg-[#1E1E1E] px-12 py-4 rounded-full">
            <Link href="/">home</Link>
            <Link href="/">features</Link>
            <Link href="/">contact</Link>
            <Link href="/">github</Link>
        </ul>
    </nav>)
}