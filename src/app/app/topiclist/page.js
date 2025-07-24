"use client";
import { useEffect, useState } from "react";
import { Calendar, BookOpen, Trash2, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Button from "@/components/elements/button";

export default function TopicLists() {
  const [topicLists, setTopicLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopicLists();
  }, []);

  const fetchTopicLists = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topiclist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch topic lists");
      }

      const data = await response.json();
      setTopicLists(data);
    } catch (err) {
      console.error("Error fetching topic lists:", err);
      setError(err.message);
      toast.error("Failed to load topic lists");
    } finally {
      setLoading(false);
    }
  };

  const deleteTopicList = async (id) => {
    const loadingToast = toast.loading("Deleting topic list...");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topiclist/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setTopicLists(topicLists.filter((list) => list.id !== id));
        toast.success("Topic list deleted successfully!", {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to delete topic list", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete topic list", {
        id: loadingToast,
      });
    }
  };

  const TopicListCard = ({ topicList }) => {
    console.log(topicList);

    const sections = topicList.sections || [];
    const totalSections = sections.length;

    return (
      <div className="bg-[#1E1E1E] border border-[#343434] rounded-lg p-6 hover:border-[#4A4A4A] transition-colors duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {topicList.title || "Untitled Topic List"}
            </h3>
            <div className="flex items-center gap-4 text-sm text-[#979797]">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{totalSections} sections</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(topicList.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => deleteTopicList(topicList.id)}
            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {sections.slice(0, 5).map((section, idx) => (
            <div key={idx} className="border-l-2 border-[#343434] pl-3">
              <h4 className="font-semibold text-white text-sm mb-1">
                {section.name}
              </h4>
              <div className="text-xs text-[#979797]">
                Created: {new Date(section.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
          {sections.length > 5 && (
            <div className="text-xs text-[#979797] italic">
              ... +{sections.length - 5} more sections
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-[#343434]">
          <Button
            backgroundColor="white"
            textColor="[#131313]"
            clickHandler={() => {
              window.location.href = `/app/study/${topicList.id}`;
            }}
          >
            Start Studying
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen bg-[#131313] text-white">
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin h-10 w-10 text-white" />
          <div className="text-white text-lg">Loading your topic lists...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full h-screen bg-[#131313] text-white">
        <div className="flex items-center justify-center h-full flex-col gap-4">
          <div className="text-white text-lg">Failed to load topic lists</div>
          <Button
            backgroundColor="white"
            textColor="[#131313]"
            clickHandler={fetchTopicLists}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#131313] text-white">
      <Toaster />
      <div className="px-4 py-6 sm:px-6 md:px-10 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Your Topiclists
            </h1>
            <p className="text-base sm:text-lg text-[#979797]">
              {topicLists.length === 0
                ? "No topic lists yet. Create one by chatting with CogniAI!"
                : `${topicLists.length} topic list${
                    topicLists.length === 1 ? "" : "s"
                  } saved`}
            </p>
          </div>
          <Button
            backgroundColor="white"
            textColor="[#131313]"
            isLink={true}
            url="/app/dashboard"
            className="w-full sm:w-auto"
          >
            Create New List
          </Button>
        </div>

        {topicLists.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-[#343434] mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No Topic Lists Yet
              </h3>
              <p className="text-[#979797] mb-6 text-sm sm:text-base">
                Start by creating your first topic list with CogniAI
              </p>
              <Button
                backgroundColor="white"
                textColor="[#131313]"
                isLink={true}
                url="/app/chat"
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topicLists.map((topicList) => (
              <TopicListCard key={topicList.id} topicList={topicList} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
