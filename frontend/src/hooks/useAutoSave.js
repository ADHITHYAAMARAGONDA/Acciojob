// frontend/src/hooks/useAutoSave.js
import { useEffect, useRef } from "react";
import { sessionService } from "../services/sessionService";

export const useAutoSave = (
  sessionId,
  chatHistory,
  generatedCode,
  delay = 2000
) => {
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef({
    chatHistory: [],
    generatedCode: { jsx: "", css: "" },
  });

  useEffect(() => {
    // Check if data has actually changed
    const hasChanged =
      JSON.stringify(chatHistory) !==
        JSON.stringify(lastSavedRef.current.chatHistory) ||
      JSON.stringify(generatedCode) !==
        JSON.stringify(lastSavedRef.current.generatedCode);

    if (!hasChanged || !sessionId) {
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        await sessionService.autoSave(sessionId, chatHistory, generatedCode);
        lastSavedRef.current = {
          chatHistory: [...chatHistory],
          generatedCode: { ...generatedCode },
        };
        console.log("Auto-saved successfully");
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, delay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sessionId, chatHistory, generatedCode, delay]);

  // Manual save function
  const manualSave = async () => {
    if (!sessionId) return;

    try {
      await sessionService.autoSave(sessionId, chatHistory, generatedCode);
      lastSavedRef.current = {
        chatHistory: [...chatHistory],
        generatedCode: { ...generatedCode },
      };
      console.log("Manual save successful");
      return true;
    } catch (error) {
      console.error("Manual save failed:", error);
      return false;
    }
  };

  return { manualSave };
};
