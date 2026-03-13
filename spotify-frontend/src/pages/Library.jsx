import { useEffect, useState } from "react";
import API from "../services/api";

export default function Library() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    async function fetchMusics() {
      const res = await API.get("/");
      setMusics(res.data.musics || []);
    }

    fetchMusics();
  }, []);

  function handlePlay(musicId) {
    API.post(`/play/${musicId}`).catch((err) => {
      console.log("Failed to record play", err);
    });

    setMusics((prev) =>
      prev.map((m) =>
        m._id === musicId ? { ...m, playCount: (m.playCount || 0) + 1 } : m
      )
    );
  }

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        overflowY: "auto",
        background: "#121212",
        color: "white",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "16px" }}>
        All songs
      </h1>
      <p style={{ fontSize: "13px", color: "#b3b3b3", marginBottom: "20px" }}>
        Here you can see every uploaded track on the platform, including your
        own uploads.
      </p>

      {musics.length === 0 && (
        <p style={{ fontSize: "14px", color: "#b3b3b3" }}>
          No music uploaded yet.
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {musics.map((m) => (
          <div
            key={m._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "10px 12px",
              borderRadius: "8px",
              background: "#181818",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "6px",
                backgroundImage: m.coverUri
                  ? `url(${m.coverUri})`
                  : "linear-gradient(135deg, #3b82f6, #1db954, #9333ea)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {m.title}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#b3b3b3",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {m.artist?.username || "Unknown artist"}
              </div>
              <div style={{ fontSize: "12px", color: "#b3b3b3", marginTop: "2px" }}>
                Plays: {m.playCount || 0}
              </div>
            </div>

            <audio
              controls
              src={m.uri}
              onPlay={() => handlePlay(m._id)}
              style={{ width: "220px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

