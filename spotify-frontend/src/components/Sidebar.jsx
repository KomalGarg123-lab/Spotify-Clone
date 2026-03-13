import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  const linkStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "6px",
    color: active ? "white" : "#b3b3b3",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    background: active ? "#282828" : "transparent",
  });

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#000000",
        color: "white",
        padding: "16px 12px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 12px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "#1DB954",
            borderRadius: "50%",
          }}
        />
        <h2 style={{ fontSize: "20px", fontWeight: 700 }}>Spotify</h2>
      </div>

      {/* Main navigation like Spotify */}
      <div
        style={{
          background: "#121212",
          borderRadius: "8px",
          padding: "8px 8px 10px",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Link to="/" style={linkStyle(isActive("/"))}>
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <Link to="/search" style={linkStyle(isActive("/search"))}>
            <span>🔍</span>
            <span>Search</span>
          </Link>

          <Link to="/library" style={linkStyle(isActive("/library"))}>
            <span>📚</span>
            <span>Your Library</span>
          </Link>
        </nav>
      </div>

      {/* Library / actions section */}
      <div
        style={{
          background: "#121212",
          borderRadius: "8px",
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            color: "#b3b3b3",
          }}
        >
          <span>Your Library</span>
        </div>

        <Link
          to="/upload"
          style={{
            ...linkStyle(isActive("/upload")),
            background: isActive("/upload") ? "#282828" : "#242424",
            marginTop: "4px",
          }}
        >
          <span>➕</span>
          <span>Upload music (artist)</span>
        </Link>

        <div
          style={{
            marginTop: "auto",
            fontSize: "12px",
            color: "#b3b3b3",
            borderTop: "1px solid #282828",
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span style={{ fontWeight: 600 }}>Account</span>

          <Link to="/login" style={linkStyle(isActive("/login"))}>
            <span>🔐</span>
            <span>Login</span>
          </Link>

          <Link to="/register" style={linkStyle(isActive("/register"))}>
            <span>🧑</span>
            <span>Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}