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

  const getReturn = () => {
    const path = location.pathname;
    const eventMatch = path.match(/^\/activities\/events\/([^/]+)(?:\/[^/]+)?$/);

    if (path === "/merchandise") return { to: "/departments/publicity", label: "Back to Publicity" };
    if (/^\/activities\/workshops\/\d+\/[^/]+$/.test(path)) return { to: "/activities/workshops", label: "Back to Workshops" };
    if (eventMatch) {
      return eventMatch[0].split("/").length > 4
        ? { to: `/activities/events/${eventMatch[1]}`, label: `Back to ${eventMatch[1]} Events` }
        : { to: "/activities/events", label: "Back to Innovation Events" };
    }
    if (/^\/activities\/gc-science\/[^/]+$/.test(path)) return { to: "/activities/gc-science", label: "Back to GC Science" };
    return { to: "/", label: "Back to Home" };
  };

  const returnTarget = getReturn();

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
        {isHome ? <a href="#about">About us</a> : <Link to="/#about">About us</Link>}

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

      {!isHome && (
        <Link to={returnTarget.to} className="subpage-home-link">
          ← {returnTarget.label}
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
