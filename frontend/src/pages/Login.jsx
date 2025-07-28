import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useStore from "../store/useStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate(); // <-- add navigate here

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://acciojob-i0xu.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...data, token: data.token })
      );
      setUser(data);

      console.log("Login successful - data:", data);
      console.log(
        "Login successful - userInfo stored:",
        JSON.stringify({ ...data, token: data.token })
      );
      console.log("Login successful, navigating to chat...");
      // Redirect to chat after successful login
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
