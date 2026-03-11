import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#121212",
      color: "white",
      padding: "20px"
    }}>
      <h2>Spotify</h2>

      <nav>

<Link to="/">Home</Link>
<br /><br />

<Link to="/albums">Albums</Link>
<br /><br />

<Link to="/login">Login</Link>
<br /><br />

<Link to="/register">Register</Link>

</nav>
    </div>
  );
}