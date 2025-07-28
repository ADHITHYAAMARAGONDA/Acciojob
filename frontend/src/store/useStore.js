import { create } from "zustand";

const useStore = create((set) => ({
  user: null, // user info after login
  setUser: (user) => set({ user }),

  // Chat functionality
  chatHistory: [], // array of { sender: "user" | "ai", text: string }
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChatHistory: () => set({ chatHistory: [] }),

  // Code generation
  generatedCode: { jsx: "", css: "" },
  setGeneratedCode: (code) => set({ generatedCode: code }),
  updateCode: (newCode) =>
    set((state) => ({ generatedCode: { ...state.generatedCode, ...newCode } })),

  // Session management
  sessions: [],
  currentSessionId: null,
  setSessions: (sessions) => set({ sessions }),
  setCurrentSessionId: (id) => set({ currentSessionId: id }),

  // Loading state for async calls
  loading: false,
  setLoading: (val) => set({ loading: val }),
}));

export default useStore;
