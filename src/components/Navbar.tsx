import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        SSTIA
      </div>

      <nav className="nav-links">
        <Link to="/">
          Home
        </Link>

        <Link to="/#about">
          About
        </Link>

        <Link to="/#activities">
          Activities
        </Link>

        <Link to="/#members">
          Members
        </Link>

        <Link to="/#contact">
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;