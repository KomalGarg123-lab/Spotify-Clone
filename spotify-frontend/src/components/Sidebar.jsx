import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      }
    } catch (e) {
      console.log("Failed to read user from localStorage in sidebar", e);
    }
  }, []);
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

      {/* Library / actions section like Spotify */}
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
          <span style={{ fontWeight: 600, color: "#fff" }}>Your Library</span>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "999px",
              border: "none",
              background: "#1f1f1f",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#ffffff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              +
            </span>
            <span>Create</span>
          </button>
        </div>

        {currentUser?.role === "artist" && (
          <button
            type="button"
            onClick={() => navigate("/upload")}
            style={{
              marginTop: "8px",
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              background: "#1DB954",
              color: "#000",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Upload music
          </button>
        )}

        {/* Card: Create your first playlist */}
        <div
          style={{
            marginTop: "8px",
            padding: "14px 12px",
            borderRadius: "8px",
            background: "#242424",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Create your first playlist
          </div>
          <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
            It&apos;s easy, we&apos;ll help you
          </div>
          <button
            type="button"
            style={{
              marginTop: "8px",
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              background: "#ffffff",
              color: "#000",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create playlist
          </button>
        </div>

        {/* Card: Find some podcasts */}
        <div
          style={{
            marginTop: "4px",
            padding: "14px 12px",
            borderRadius: "8px",
            background: "#242424",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600 }}>
            Let&apos;s find some podcasts to follow
          </div>
          <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
            We&apos;ll keep you updated on new episodes
          </div>
          <button
            type="button"
            style={{
              marginTop: "8px",
              alignSelf: "flex-start",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "none",
              background: "#ffffff",
              color: "#000",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Browse podcasts
          </button>
        </div>

        {/* Footer links and language selector */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            fontSize: "11px",
            color: "#b3b3b3",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span style={{ cursor: "pointer" }}>Legal</span>
            <span style={{ cursor: "pointer" }}>Safety &amp; Privacy Center</span>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Cookies</span>
            <span style={{ cursor: "pointer" }}>About Ads</span>
            <span style={{ cursor: "pointer" }}>Accessibility</span>
          </div>

          <button
            type="button"
            style={{
              marginTop: "4px",
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "999px",
              border: "1px solid #4b4b4b",
              background: "transparent",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            <span>🌐</span>
            <span>English</span>
          </button>
        </div>
      </div>
    </div>
  );
}