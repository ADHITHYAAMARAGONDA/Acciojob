// src/pages/ChatPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import CodePreview from "../components/CodePreview";
import SessionManager from "../components/SessionManager";
import LivePreview from "../components/LivePreview";
import CollaborationPanel from "../components/CollaborationPanel";
import useStore from "../store/useStore";

function ChatPage() {
  const { generatedCode } = useStore();
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
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <SessionManager />
          <CollaborationPanel />
        </div>
        <div style={{ flex: 2 }}>
          <ChatPanel />
        </div>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <LivePreview />
        </div>
        <div style={{ flex: 1 }}>
          <CodePreview
            jsxCode={generatedCode.jsx}
            cssCode={generatedCode.css}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
