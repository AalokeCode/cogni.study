"use client";
import Button from "@/components/elements/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Check, SendHorizontal } from "lucide-react";

export default function Chat() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log(id);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/session/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setChat(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error fetching chat:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const renderAIContent = (content) => {
    try {
      const data = JSON.parse(content);
      return (
        <div>
          <div className="sticky top-0 pb-3 bg-neutral-800 px-5 py-3 rounded-2xl mb-4 z-10 shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">{data.title}</h2>
                <p className="text-sm text-[#979797]">
                  Click save to add this to your study lists
                </p>
              </div>
              <Button
                backgroundColor="white"
                textColor="[#131313]"
                clickHandler={async () => {
                  const loadingToast = toast.loading("Saving topiclist...");
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topiclist`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          userToken: localStorage.getItem("token"),
                          topicData: content,
                        }),
                      }
                    );

                    if (response.ok) {
                      toast.success("Topiclist saved successfully!", {
                        id: loadingToast,
                      });
                    } else {
                      toast.error("Failed to save topiclist", {
                        id: loadingToast,
                      });
                    }
                  } catch (error) {
                    console.error("Save error:", error);
                    toast.error("Failed to save topiclist", {
                      id: loadingToast,
                    });
                  }
                }}
              >
                Save Topiclist
              </Button>
            </div>
          </div>
          {data.sections.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold">{section.name}</h3>
              <div>
                {section.topics.map((topic, topicIdx) => (
                  <div key={topicIdx} className="flex items-center gap-2">
                    <label className="relative inline-block h-5 w-5">
                      <input
                        type="checkbox"
                        className="peer appearance-none h-full w-full rounded border-2 border-[#343434] checked:bg-white checked:hover:bg-white bg-[#1E1E1E] hover:border-[#4A4A4A] hover:bg-[#252525] focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#131313] transition-all duration-200 ease-in-out cursor-pointer"
                      />
                      <Check
                        className="absolute inset-0 m-auto h-3.5 w-3.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                        strokeWidth={3}
                      />
                    </label>
                    <span className="text-gray-300">{topic}</span>
                  </div>
                ))}
              </div>
              <hr className="border-t border-neutral-600 my-2"></hr>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error parsing AI content:", error);
      return <p className="whitespace-pre-wrap">{content}</p>;
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-lg">Loading chat...</div>
      </div>
    );

  if (!chat)
    return (
      <div className="flex items-center justify-center h-full px-2 sm:px-4">
        <div className="text-white text-lg text-center">No chat found.</div>
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-[#131313] text-white">
      <Toaster />
      <div
        className="max-h-[70vh] overflow-y-auto bg-[#1A1A1A] p-5 rounded-t-2xl w-full
        sm:max-w-4xl mx-auto
        px-2 sm:px-5
        "
      >
        {chat.messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`mb-3 max-w-full sm:max-w-2xl md:max-w-3xl`}>
              <p className="text-xs sm:text-sm mb-1 text-[#979797]">
                {message.role === "user" ? "You" : "CogniAI"}
              </p>
              <div
                className={`leading-relaxed p-3 sm:p-4 rounded-lg whitespace-pre-wrap break-words ${
                  message.role === "user"
                    ? "bg-white text-[#131313] rounded-br-sm"
                    : "bg-[#1E1E1E] text-white border border-[#343434] rounded-bl-sm"
                }`}
              >
                {message.role === "user"
                  ? message.content
                  : renderAIContent(message.content)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center flex justify-center items-center gap-2 w-full flex-col px-2 sm:px-0">
        <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] w-full sm:w-5xl flex flex-row justify-between items-center rounded-full p-2 px-3 sm:px-5 hover:border-[#3A3A3A] focus-within:border-white/40 transition-all duration-300">
          <input
            type="text"
            placeholder="Want some configuration? Chat with CogniAI"
            className="flex-grow text-white placeholder:text-[#979797] focus:outline-0 py-2 px-3 sm:py-3 sm:px-8 bg-transparent rounded-full text-sm sm:text-base"
          />
          <button className="bg-white text-[#131313] mt-2 sm:mt-0 sm:mr-5 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium text-sm sm:text-base">
            <span className="hidden sm:inline">Send</span>{" "}
            <SendHorizontal className="inline" />
          </button>
        </div>
        <p className="text-[#979797] text-xs sm:text-sm text-center px-2">
          AI may make mistakes, For further information know our usage
          guidelines
        </p>
      </div>
    </div>
  );
}
