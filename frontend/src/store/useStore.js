import { create } from "zustand";

const useStore = create((set) => ({
  user: null, // user info after login
  setUser: (user) => set({ user }),

  chatHistory: [], // array of { sender: "user" | "ai", message: string }
  addChatMessage: (message) =>
    set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChatHistory: () => set({ chatHistory: [] }),

  generatedCode: { jsx: "", css: "" },
  setGeneratedCode: (code) => set({ generatedCode: code }),

  // Optional: loading state for async calls
  loading: false,
  setLoading: (val) => set({ loading: val }),
}));

export default useStore;
