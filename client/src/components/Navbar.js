import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="navbar">
      <h2>JobPortal</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/internships">Internships</Link>

        {role === "admin" && <Link to="/admin">Admin</Link>}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </div>
  );
}
