// src/pages/ChatPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import CodePreview from "../components/CodePreview";
import useChatStore from "../store/useChatStore";
import useStore from "../store/useStore";

function ChatPage() {
  const { code } = useChatStore();
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      <div style={{ flex: 1 }}>
        <ChatPanel />
      </div>
      <div style={{ flex: 1 }}>
        <CodePreview jsxCode={code.jsx} cssCode={code.css} />
      </div>
    </div>
  );
}

export default ChatPage;
