import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [musics, setMusics] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchMusics() {
      const res = await API.get("/");
      setMusics(res.data.musics || []);
    }

    fetchMusics();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      }
    } catch (e) {
      console.log("Failed to read user from localStorage", e);
    }
  }, []);

  function handlePlay(musicId) {
    API.post(`/play/${musicId}`).catch((err) => {
      console.log("Failed to record play", err);
    });

    setMusics((prev) =>
      prev.map((m) =>
        m._id === musicId
          ? { ...m, playCount: (m.playCount || 0) + 1 }
          : m
      )
    );
  }

  const trendingSongs = musics.filter((m) => (m.playCount || 0) > 5);

  const artistMap = new Map();
  musics.forEach((m) => {
    const artist = m.artist;
    if (!artist) return;
    const plays = m.playCount || 0;
    const id = artist._id || artist.id;
    if (!artistMap.has(id)) {
      artistMap.set(id, { artist, totalPlays: 0 });
    }
    artistMap.get(id).totalPlays += plays;
  });

  const popularArtists = Array.from(artistMap.values()).filter(
    (item) => item.totalPlays > 5
  );

  const popularAlbumsAndSingles = trendingSongs;
  const popularRadio = trendingSongs;
  const featuredCharts = [...trendingSongs].sort(
    (a, b) => (b.playCount || 0) - (a.playCount || 0)
  );

  const mySongs =
    currentUser?.role === "artist"
      ? musics.filter((m) => m.artist && (m.artist._id === currentUser.id || m.artist.id === currentUser.id))
      : [];

  function Section({ title, children }) {
    return (
      <section style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          {title}
        </h2>
        {children}
      </section>
    );
  }

  function HorizontalList({ items, renderItem }) {
    return (
      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {items.map((item, idx) => renderItem(item, idx))}
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(180deg, #1f1f1f 0, #121212 40%, #000 100%)",
        color: "white",
      }}
    >
      {/* Top navbar like Spotify (inside content area) */}
      <div
        style={{
          height: "64px",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "#050505",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {"<"}
          </button>
          <button
            type="button"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: "#050505",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {">"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "14px",
          }}
        >
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              color: "#b3b3b3",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign up
          </button>
          <button
            type="button"
            style={{
              borderRadius: "999px",
              border: "none",
              background: "white",
              color: "black",
              padding: "8px 16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Log in
          </button>
        </div>
      </div>

      {/* Scrollable main content */}
      <div
        style={{
          padding: "24px",
          paddingBottom: "80px",
          height: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Good evening
        </h1>

        {currentUser?.role === "artist" && mySongs.length > 0 && (
          <Section title="Your uploads">
            <HorizontalList
              items={mySongs}
              renderItem={(m) => (
                <div
                  key={m._id}
                  style={{
                    minWidth: "180px",
                    maxWidth: "200px",
                    background: "#181818",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "100%",
                      borderRadius: "6px",
                      backgroundImage: m.coverUri
                        ? `url(${m.coverUri})`
                        : "linear-gradient(135deg, #3b82f6, #1db954, #9333ea)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    {m.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                    Plays: {m.playCount || 0}
                  </div>
                  <audio
                    controls
                    src={m.uri}
                    onPlay={() => handlePlay(m._id)}
                    style={{
                      width: "100%",
                      marginTop: "8px",
                    }}
                  />
                </div>
              )}
            />
          </Section>
        )}

        <Section title="Trending songs">
          <HorizontalList
            items={trendingSongs}
            renderItem={(m) => (
              <div
                key={m._id}
                style={{
                  minWidth: "180px",
                  maxWidth: "200px",
                  background: "#181818",
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    borderRadius: "6px",
                    backgroundImage: m.coverUri
                      ? `url(${m.coverUri})`
                      : "linear-gradient(135deg, #3b82f6, #1db954, #9333ea)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                  {m.artist?.username || "Unknown artist"}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3", marginTop: "2px" }}>
                  Plays: {m.playCount || 0}
                </div>
                <audio
                  controls
                  src={m.uri}
                  onPlay={() => handlePlay(m._id)}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                  }}
                />
              </div>
            )}
          />
        </Section>

        <Section title="Popular artists">
          <HorizontalList
            items={popularArtists}
            renderItem={({ artist, totalPlays }) => (
              <div
                key={artist._id || artist.id}
                style={{
                  minWidth: "150px",
                  maxWidth: "170px",
                  background: "#181818",
                  borderRadius: "999px",
                  padding: "16px 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    backgroundImage: artist.photoUri
                      ? `url(${artist.photoUri})`
                      : "radial-gradient(circle at 30% 30%, #1db954, #181818)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {artist.username}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                  Plays: {totalPlays}
                </div>
              </div>
            )}
          />
        </Section>

        <Section title="Popular albums and singles">
          <HorizontalList
            items={popularAlbumsAndSingles}
            renderItem={(m) => (
              <div
                key={m._id}
                style={{
                  minWidth: "180px",
                  maxWidth: "200px",
                  background: "#181818",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    borderRadius: "6px",
                    backgroundImage: m.coverUri
                      ? `url(${m.coverUri})`
                      : "linear-gradient(135deg, #22c55e, #0ea5e9, #e11d48)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                  {m.artist?.username || "Unknown artist"}
                </div>
              </div>
            )}
          />
        </Section>

        <Section title="Popular radio">
          <HorizontalList
            items={popularRadio}
            renderItem={(m) => (
              <div
                key={m._id}
                style={{
                  minWidth: "180px",
                  maxWidth: "200px",
                  background: "#181818",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    borderRadius: "6px",
                    backgroundImage: m.coverUri
                      ? `url(${m.coverUri})`
                      : "linear-gradient(135deg, #f97316, #ec4899, #22c55e)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                  Radio • Based on your listening
                </div>
              </div>
            )}
          />
        </Section>

        <Section title="Featured charts">
          <HorizontalList
            items={featuredCharts}
            renderItem={(m) => (
              <div
                key={m._id}
                style={{
                  minWidth: "180px",
                  maxWidth: "200px",
                  background: "#181818",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    borderRadius: "6px",
                    backgroundImage: m.coverUri
                      ? `url(${m.coverUri})`
                      : "linear-gradient(135deg, #22c55e, #15803d, #166534)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {m.title}
                </div>
                <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
                  Playlist • Spotify
                </div>
              </div>
            )}
          />
        </Section>
      </div>
    </div>
  );
}