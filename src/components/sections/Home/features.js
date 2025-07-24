import { Brain, List, Timer, MessageSquare } from "lucide-react";

const features = [
  {
    title: "AI Topic Generation",
    description: "Let AI generate study topics tailored to your needs.",
    icon: <Brain className="w-8 h-8 text-white" />,
  },
  {
    title: "Topiclists",
    description: "Organize and manage your study topics efficiently.",
    icon: <List className="w-8 h-8 text-white" />,
  },
  {
    title: "Break Reminders",
    description: "Stay focused with smart break reminders.",
    icon: <Timer className="w-8 h-8 text-white" />,
  },
  {
    title: "Chat",
    description: "Interact and study with a simple chat interface.",
    icon: <MessageSquare className="w-8 h-8 text-white" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 pb-24 text-white" id="features">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl text-center mb-8">App Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col hover:scale-110 transition duration-200 items-center bg-neutral-800 rounded-lg shadow p-6 text-center hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
