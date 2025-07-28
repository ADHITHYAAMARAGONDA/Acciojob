// // src/pages/Profile.jsx
// import { useEffect } from "react";
// import useStore from "../store/useStore";

// function Profile() {
//   const user = useStore((state) => state.user);
//   const setUser = useStore((state) => state.setUser);

//   useEffect(() => {
//     // Simple check - if no user in store, try to get from localStorage
//     if (!user) {
//       const userInfo = localStorage.getItem("userInfo");
//       if (userInfo) {
//         try {
//           const parsedUser = JSON.parse(userInfo);
//           setUser(parsedUser);
//         } catch (err) {
//           console.error("Error parsing userInfo:", err);
//         }
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     window.location.href = "/login";
//   };

//   if (!user) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//     <div>
//       <h2>Profile</h2>
//       <p>
//         <strong>Name:</strong> {user.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {user.email}
//       </p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import useStore from "../store/useStore";

function Profile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        try {
          const parsedUser = JSON.parse(userInfo);
          setUser(parsedUser);
        } catch (err) {
          console.error("Error parsing userInfo:", err);
        }
      }
    }
    setLoading(false);
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
    window.location.href = "/login";
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user data found. Please login.</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
