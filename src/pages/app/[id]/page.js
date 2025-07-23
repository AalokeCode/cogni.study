// chat history and current message service. route [id]/page.js
// fetches chat using [id] from the URL
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setChat(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching chat:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!chat) return <div>No chat found.</div>;

  return (
    <div>
      <h1>{chat.title}</h1>
      <div>
        {chat.messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.user}</strong>: {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
