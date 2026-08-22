import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="logo">SSTIA</div>

      <div className="nav-links">
        {/* Home */}
        {isHome ? <a href="#home">Home</a> : <Link to="/#home">Home</Link>}

        {/* About */}
        {isHome ? <a href="#about">About</a> : <Link to="/#about">About</Link>}

        {/* Activities */}
        {isHome ? (
          <a href="#activities">Activities</a>
        ) : (
          <Link to="/#activities">Activities</Link>
        )}

        {/* Workshops */}
        <Link to="/activities/workshops">Workshops</Link>

        {/* Events */}
        <Link to="/activities/events">Events</Link>

        {/* GC Science */}
        <Link to="/activities/gc-science">GC Science</Link>

        {/* Members */}
        {isHome ? (
          <a href="#members">Our Organization</a>
        ) : (
          <Link to="/#members">Our Organization</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
