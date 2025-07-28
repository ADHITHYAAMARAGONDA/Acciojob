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

import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import CodeTemplates from "./CodeTemplates";
import ImageUpload from "./ImageUpload";

function ChatPanel() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatHistory = useStore((state) => state.chatHistory);
  const addChatMessage = useStore((state) => state.addChatMessage);
  const generatedCode = useStore((state) => state.generatedCode);
  const currentSessionId = useStore((state) => state.currentSessionId);

  // Auto-save function
  const autoSave = async () => {
    if (!currentSessionId) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(
        `https://acciojob-i0xu.onrender.com/api/sessions/${currentSessionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatHistory,
            generatedCode,
          }),
        }
      );
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  // Auto-save when chat history or code changes
  useEffect(() => {
    if (chatHistory.length > 0 || generatedCode.jsx || generatedCode.css) {
      const timeoutId = setTimeout(autoSave, 2000); // Save after 2 seconds of inactivity
      return () => clearTimeout(timeoutId);
    }
  }, [chatHistory, generatedCode, currentSessionId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    addChatMessage({ sender: "user", text: input });
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://acciojob-i0xu.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input, sessionId: currentSessionId }),
      });

      const data = await res.json();
      console.log("Chat response data:", data);

      addChatMessage({ sender: "ai", text: data.response });

      // Update generated code if provided
      if (data.generatedCode && data.generatedCode.jsx) {
        console.log("Setting generated code:", data.generatedCode);
        useStore.getState().setGeneratedCode(data.generatedCode);
      } else {
        console.log("No generated code in response or JSX is empty");
      }
    } catch (error) {
      console.error("Chat error:", error);
      addChatMessage({
        sender: "ai",
        text: "Error: Could not get AI response",
      });
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  const handleImageUpload = (image) => {
    setSelectedImage(image);
    // TODO: Implement image upload to backend
    console.log("Image selected:", image);
  };

  const handleTemplateMessage = (message) => {
    setInput(message);
    // Automatically send the message after setting input
    setTimeout(() => {
      if (message.trim()) {
        handleSend();
      }
    }, 100);
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Code Templates */}
      <CodeTemplates onTemplateSelect={handleTemplateMessage} />

      {/* Image Upload */}
      <ImageUpload onImageUpload={handleImageUpload} />

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
