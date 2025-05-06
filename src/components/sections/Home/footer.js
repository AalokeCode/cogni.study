import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
gsap.registerPlugin(SplitText)
export default function Footer() {
    useGSAP(() => {
        let footerText = SplitText.create(".footer-text")
        gsap.from(footerText.chars, {
            y: 50,
            duration: 1,
            stagger: 0.05,
            opacity: 0,
            ease: "power2.easeIn",
        })
        gsap.to(footerText.chars, {
            y: 0,
            duration: 1,
            stagger: 0.05,
            opacity: 1,
            ease: "power2.easeOut",
        })
    }, [])
    return (
        <footer className="relative">
        <div className="text-white text-center -mb-20 z-30 relative">
            <p>&copy; 2025 cogni.study. Made by <Link href="https://aaloke.com" className="underline">Aaloke Eppalapalli</Link></p>
        </div>
        <h1 className="text-[248px] overflow-hidden h-64 text-center text-white -mb-64 -z-10">COGNI.STUDY</h1>
        </footer>
    )
}