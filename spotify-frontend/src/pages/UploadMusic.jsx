import { useState } from "react";
import API from "../services/api";

export default function UploadMusic() {
  const [title, setTitle] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!musicFile) {
      setError("Please select a music file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("music", musicFile);
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", res.data);
      setSuccess("Music uploaded successfully.");
      setTitle("");
      setMusicFile(null);
      setCoverFile(null);
    } catch (err) {
      console.log("Upload error:", err);
      const msg =
        err.response?.data?.message ||
        "Upload failed. Make sure you are logged in as an artist.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #121212, #000000)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#181818",
          padding: "28px 32px",
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          Upload music
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "#b3b3b3",
            marginBottom: "16px",
          }}
        >
          Post your track and add a cover image, just like Spotify.
        </p>

        {error && (
          <div
            style={{
              marginBottom: "12px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "rgba(255,0,0,0.1)",
              border: "1px solid rgba(255,0,0,0.5)",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginBottom: "12px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.7)",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Track title"
              required
              style={{
                width: "100%",
                padding: "9px 10px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#303030",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Music file
            </label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
              required
              style={{
                width: "100%",
                fontSize: "13px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Cover image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              style={{
                width: "100%",
                fontSize: "13px",
              }}
            />
            <p
              style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "#b3b3b3",
              }}
            >
              Recommended: square image, similar to Spotify album covers.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "999px",
              border: "none",
              cursor: loading ? "default" : "pointer",
              background: "#1DB954",
              color: "black",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {loading ? "Uploading..." : "Post music"}
          </button>
        </form>
      </div>
    </div>
  );
}

