import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="SSTIA Logo" className="logo-img" />
      </div>

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

        {/* Merchandise */}
        <Link to="/merchandise">Merchandise</Link>

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
