import Navbar from "@/components/elements/navbar";
export default function TopicLists() {
  return (
    <div className="flex flex-col w-full h-screen bg-[#131313] text-white">
      <Navbar isLoggedIn="true"></Navbar>
      <div className="p-10">
        <h1 className="text-4xl mb-4">Your Topiclists</h1>
        <p className="text-lg italic text-[#979797]">List of topics</p>
      </div>
    </div>
  );
}
