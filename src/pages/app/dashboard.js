import Navbar from "@/components/elements/navbar";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div className="bg-[#131313] h-screen flex flex-col justify-between">
      <Navbar isLoggedIn="true"></Navbar>
      <div className="flex flex-col text-white items-center justify-center w-full">
        <Image
          src="/images/chat-main.png"
          width={365}
          height={300}
          alt="Chat-main"
        ></Image>
        <h1 className="text-6xl text-center mb-3">
          Whats your topic<br></br> for today?
        </h1>
        <p className="text-[#979797]">
          it can range from Science to Javascript to Quantum Entanglement...
        </p>
      </div>
      <div className="text-center p-5 flex justify-center items-center gap-2 w-full flex-col">
        <div className="bg-[#1E1E1E] w-3xl h-[60px] rounded-full items-center flex justify-between p-5 text-white mt-5">
          <input
            type="text"
            placeholder="Enter your topic. Let AI do its magic!"
            className="flex-grow text-white placeholder:text-[#979797] focus:outline-0"
          ></input>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <p className="text-[#979797]">
          AI may make mistakes, For further information know our usage
          guidelines
        </p>
      </div>
    </div>
  );
}
