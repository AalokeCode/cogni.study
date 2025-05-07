import Image from "next/image"
import Button from "@/components/elements/button"
import Link from "next/link"
export default function SignIn() {
    return (
        <div className="bg-[#131313] gap-20 flex text-white items-center justify-center h-screen">
            <div className="w-[480px] h-[520px]">
            <Image src="/images/sign-flow.png" alt="login" width={960} height={1040} />
            </div>
            <div>
                <Image src="/logo/logo-white.svg" alt="logo" width={240} height={56} className="logo" />
                <h1 className="text-6xl mb-1">Manage. Time. Excel</h1>
                <p className="mb-5">Enhance your study experience with cogni</p>
                <div className="text-[#131313] flex mb-3">
                <Button backgroundColor="white" textColor="[#131313]" isFullWidth="true"><div className="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a100,100,0,1,1-22.86-63.64,12,12,0,0,1-18.51,15.28A76,76,0,1,0,203.05,140H128a12,12,0,0,1,0-24h88A12,12,0,0,1,228,128Z"></path></svg>Sign In with Google</div></Button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-grow h-0.5 bg-[#1E1E1E]"></div>
                    <p>or continue with</p>
                    <div className="flex-grow h-0.5 bg-[#1E1E1E]"></div>
                </div>
                <form className="flex flex-col mb-5">
                    <label className="mb-1">Email</label>
                <input type="email" placeholder="Enter your email address" className="bg-[#1E1E1E] w-full p-3 py-2 border border-[#343434] rounded-lg mb-2"></input>
                <label className="mb-1">Password</label>
                <input type="password" placeholder="⋅⋅⋅⋅⋅⋅⋅" className="bg-[#1E1E1E] w-full p-3 py-2 border border-[#343434] rounded-lg mb-5"></input>
                </form>
                <div className="text-[#131313] flex mb-3">
                <Button backgroundColor="white" textColor="[#131313]" isFullWidth="true">Sign In</Button>
                </div>
                <p className="text-center">New to cogni? <Link className="underline" href="signup">Sign Up</Link></p>
            </div>
        </div>
    )
}