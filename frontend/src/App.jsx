import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import useStore from "./store/useStore";

function AppWrapper() {
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("userInfo");

      if (!token || !userInfo) {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing userInfo in AppWrapper:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
