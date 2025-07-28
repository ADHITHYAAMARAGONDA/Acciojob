// // src/components/ChatPanel.jsx
// import { useState } from "react";
// import useChatStore from "../store/useChatStore";

// function ChatPanel() {
//   const [input, setInput] = useState("");
//   const chatHistory = useChatStore((state) => state.chatHistory);
//   const addChatMessage = useChatStore((state) => state.addChatMessage);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     addChatMessage({ sender: "user", text: input });

//     try {
//       const token = localStorage.getItem("token"); // get token if needed

//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Uncomment if your chat API requires authorization
//           // Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();

//       addChatMessage({ sender: "ai", text: data.response });
//     } catch (error) {
//       addChatMessage({
//         sender: "ai",
//         text: "Error: Could not get AI response",
//       });
//     }

//     setInput("");
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid gray",
//         padding: "10px",
//         height: "400px",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
//         {chatHistory.map((msg, i) => (
//           <div
//             key={i}
//             style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
//           >
//             <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
//           </div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type your message..."
//           style={{ width: "80%" }}
//         />
//         <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatPanel;

import { useState } from "react";
import useChatStore from "../store/useChatStore";

function ChatPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatHistory = useChatStore((state) => state.chatHistory);
  const addChatMessage = useChatStore((state) => state.addChatMessage);

  const handleSend = async () => {
    if (!input.trim()) return;

    addChatMessage({ sender: "user", text: input });
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // get token if needed

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Uncomment if your chat API requires authorization
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      addChatMessage({ sender: "ai", text: data.response });
    } catch (error) {
      addChatMessage({
        sender: "ai",
        text: "Error: Could not get AI response",
      });
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
          >
            <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          style={{ width: "80%" }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          style={{ width: "18%", marginLeft: "2%" }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
