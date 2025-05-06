import Image from "next/image"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
export default function MainFeatureSection() {
    useGSAP(() => {
        gsap.to(".gradient", {
            transform: "rotateZ(179deg)",
            duration: 3,
            ease: "power2.easeIn",
            repeat: -1,
            yoyo: true,
        })

    }, [])
    return (
        <section className="p-16 text-white">
            <h1 className="text-6xl text-center">Introducing CogniAI</h1>
            <div className="text-4xl text-[#979797] text-center flex items-end gap-2 justify-center">Powered by <Image src="/others/gemini-logo-gray.png" alt="Gemini Logo" width={1024} height={377} className="mb-2 w-28 h-10"></Image></div>
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="p-1 rounded-2xl relative overflow-hidden w-40 h-40 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-pink-400 w-56 h-56 -z-1 gradient absolute"></div>
                <div className="bg-[#201F1F] p-8 rounded-2xl shadow-inner shadow-white z-10 w-36 h-36">
                    <Image src="/others/gemini-icon.png" alt="Gemini Icon" width={100} height={100}></Image>
                </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-1 bg-amber-50"></div>
                <div className="h-5 w-1 bg-amber-50"></div>
                <div className="h-5 w-1 bg-amber-50"></div>
                <div className="h-5 w-1 bg-amber-50"></div>
                </div>
                <div className="bg-[#201F1F] px-10 pt-5 w-2xl rounded-2xl">
                    <p className="flex gap-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="fill-white" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg> Generating topiclist...</p>
                    <div className="bg-gradient-to-b mt-3 rounded-2xl from-[#131313] to-[#201F1F] p-5">
                        <div className="bg-[#313131] animate-pulse h-5 rounded-2xl"></div>
                    </div>
                </div>
            
            </div>

        </section>
    )
}