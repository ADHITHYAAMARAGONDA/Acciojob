import { create } from "zustand";

const useChatStore = create((set) => ({
  sessions: [], // list of saved sessions
  currentSessionId: null, // id of the current open session
  chatHistory: [], // chat messages for current session
  code: {
    jsx: "",
    css: "",
  },

  setSessions: (sessions) => set({ sessions }),
  setCurrentSessionId: (id) => set({ currentSessionId: id }),
  setChatHistory: (history) => set({ chatHistory: history }),
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  setCode: (code) => set({ code }),
  updateCode: (newCode) =>
    set((state) => ({ code: { ...state.code, ...newCode } })),
}));

export default useChatStore;
