"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Check,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  Loader2,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/elements/button";

export default function StudyPage() {
  const { id } = useParams();

  const [topicList, setTopicList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedTopics, setCheckedTopics] = useState({});

  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isBreak, setIsBreak] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [expandedSections, setExpandedSections] = useState({});
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [showSettings, setShowSettings] = useState(false);

  const WORK_TIME = workMinutes * 60;
  const BREAK_TIME = breakMinutes * 60;

  useEffect(() => {
    const fetchTopicList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No authentication token found");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topiclist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch topic list");
        }

        const data = await response.json();
        setTopicList(data);

        const initialChecked = {};
        const initialExpanded = {};
        data.sections?.forEach((section) => {
          initialExpanded[section.id] = true;
          section.topics?.forEach((topic) => {
            initialChecked[topic.id] = topic.completed || false;
          });
        });
        setCheckedTopics(initialChecked);
        setExpandedSections(initialExpanded);
      } catch (err) {
        console.error("Error fetching topic list:", err);
        toast.error("Failed to load study material");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTopicList();
    }
  }, [id]);

  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            if (isBreak) {
              setIsBreak(false);
              setTimeLeft(workMinutes * 60);
              setCycle((prev) => prev + 1);
              toast.success("Break over! Time to focus! 💪");
            } else {
              setIsBreak(true);
              setTimeLeft(breakMinutes * 60);
              toast.success("Great work! Time for a break! ☕");
            }
            return isBreak ? workMinutes * 60 : breakMinutes * 60;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isBreak, breakMinutes, workMinutes]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workMinutes * 60);
    setCycle(1);
  };

  const updateSettings = () => {
    if (!isRunning) {
      setTimeLeft(workMinutes * 60);
      setIsBreak(false);
    }
    setShowSettings(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTopic = async (topicId) => {
    const wasChecked = checkedTopics[topicId];

    setCheckedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));

    if (!wasChecked) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/topiclist/complete/${topicId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setCheckedTopics((prev) => ({
            ...prev,
            [topicId]: wasChecked,
          }));
          toast.error("Failed to mark topic as complete");
        } else {
          toast.success("Topic completed! 🎉");
        }
      } catch (error) {
        setCheckedTopics((prev) => ({
          ...prev,
          [topicId]: wasChecked,
        }));
        toast.error("Failed to update topic status");
        console.error("Error updating topic:", error);
      }
    } else {
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getTotalTopics = () => {
    return (
      topicList?.sections?.reduce(
        (total, section) => total + (section.topics?.length || 0),
        0
      ) || 0
    );
  };

  const getCheckedCount = () => {
    return Object.values(checkedTopics).filter(Boolean).length;
  };

  const getProgress = () => {
    const totalTime = isBreak ? breakMinutes * 60 : workMinutes * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#131313] text-white">
        <Loader2 className="animate-spin h-10 w-10 text-white" />
        <div className="text-lg">Loading study material...</div>
      </div>
    );
  }

  if (!topicList) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#131313] text-white">
        <h1 className="text-2xl font-bold mb-4">Study material not found</h1>
      </div>
    );
  }

  return (
    <div className="h-[80vh] w-full bg-[#131313] text-white flex md:flex-row flex-col">
      <Toaster />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="relative w-80 h-80 mb-8">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#2A2A2A"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${
                2 * Math.PI * 45 * (1 - getProgress() / 100)
              }`}
              className="transition-all duration-1000"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Image
                src={isBreak ? "/images/break.png" : "/images/focus.png"}
                alt={isBreak ? "Break time" : "Focus time"}
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>

            <div className="text-6xl font-bold mb-2">
              {formatTime(timeLeft)}
            </div>

            <div className="text-sm text-[#979797]">
              {isBreak
                ? "Next Up: Focus session (25m)"
                : `${Math.floor(timeLeft / 60)} minutes left`}
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={toggleTimer}
            className="bg-white text-[#131313] p-4 rounded-full hover:bg-gray-200 transition-colors"
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={resetTimer}
            className="bg-[#2A2A2A] text-white p-4 rounded-full hover:bg-[#3A3A3A] transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center text-[#979797] text-sm">
          <div>Cycle: {cycle}</div>
          <div>{isBreak ? "Break Time" : "Focus Time"}</div>
          <div className="mt-4 text-black">
            <Button
              clickHandler={() => setShowSettings(true)}
              backgroundColor="white"
              textColor="[#1A1A1A]"
            >
              Settings
            </Button>
          </div>
        </div>
        {showSettings && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            onClick={() => setShowSettings(false)}
          >
            <div
              className="bg-[#1E1E1E] p-6 rounded-lg border border-[#343434] w-80 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#979797] mb-2">
                    Work Minutes
                  </label>
                  <input
                    type="number"
                    value={workMinutes}
                    onChange={(e) => setWorkMinutes(Number(e.target.value))}
                    min="1"
                    max="60"
                    className="w-full bg-[#131313] border border-[#343434] rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#979797] mb-2">
                    Break Minutes
                  </label>
                  <input
                    type="number"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Number(e.target.value))}
                    min="1"
                    max="30"
                    className="w-full bg-[#131313] border border-[#343434] rounded px-3 py-2 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={updateSettings}
                    className="flex-1 bg-white rounded-full text-[#131313] py-2 hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-[#2A2A2A] rounded-full text-white py-2 hover:bg-[#3A3A3A] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 bg-[#1A1A1A] p-8 h-[80vh]">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{topicList.title}</h2>
            <div className="text-sm text-[#979797]">
              {getCheckedCount()}/{getTotalTopics()} Topics
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {topicList.sections?.map((section) => (
                <div key={section.id} className="bg-[#131313] rounded-lg">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E1E1E] transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          expandedSections[section.id]
                            ? "rotate-0"
                            : "-rotate-90"
                        }`}
                      />
                      <span className="font-semibold text-lg">
                        {section.name}
                      </span>
                    </div>
                    <div className="text-sm text-[#979797]">
                      {section.topics?.filter(
                        (topic) => checkedTopics[topic.id]
                      ).length || 0}
                      /{section.topics?.length || 0} Topics
                    </div>
                  </button>

                  {expandedSections[section.id] && (
                    <div className="px-4 pb-4 space-y-2">
                      {section.topics?.map((topic) => {
                        const isChecked = checkedTopics[topic.id];
                        return (
                          <div
                            key={topic.id}
                            className="flex items-center gap-3 p-3 hover:bg-[#1E1E1E] rounded-lg transition-colors cursor-pointer"
                          >
                            <label className="relative inline-block h-5 w-5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleTopic(topic.id)}
                                className="peer appearance-none h-full w-full rounded border-2 border-[#343434] checked:bg-white checked:hover:bg-white bg-[#1E1E1E] hover:border-[#4A4A4A] hover:bg-[#252525] transition-all duration-200 ease-in-out cursor-pointer"
                              />
                              <Check
                                className="absolute inset-0 m-auto h-3.5 w-3.5 text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
                                strokeWidth={3}
                              />
                            </label>
                            <span
                              className={`${
                                isChecked
                                  ? "line-through text-[#979797]"
                                  : "text-white"
                              } transition-colors flex-1`}
                            >
                              {topic.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
