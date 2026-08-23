import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const [lightMode, setLightMode] = useState(location.pathname === "/");
  const [surface, setSurface] = useState<"hero" | "paper" | "parchment" | "graphite">(
    location.pathname === "/" ? "hero" : "paper",
  );

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setLightMode(false);
      setSurface("paper");
      return;
    }

    const updateNavbarMode = () => {
      const probe = window.scrollY + 88;
      const sections = ["home", "about", "activities", "members"]
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const current = [...sections].reverse().find((section) => probe >= section.offsetTop);
      const currentId = current?.id ?? "home";

      setLightMode(currentId === "home" || currentId === "members");
      setSurface(
        currentId === "home"
          ? "hero"
          : currentId === "activities"
            ? "parchment"
            : currentId === "members"
              ? "graphite"
              : "paper",
      );
    };

    updateNavbarMode();
    window.addEventListener("scroll", updateNavbarMode, { passive: true });
    window.addEventListener("resize", updateNavbarMode);

    return () => {
      window.removeEventListener("scroll", updateNavbarMode);
      window.removeEventListener("resize", updateNavbarMode);
    };
  }, [isHome]);

  return (
    <nav className={`navbar navbar-surface-${surface}${lightMode ? " navbar-dark" : ""}`}>
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
