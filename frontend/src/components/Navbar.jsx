// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";

function Navbar() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      {!user ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Profile</Link> | <Link to="/chat">Chat</Link> |{" "}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
