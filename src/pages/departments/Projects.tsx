import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../App.css";

function Projects() {
  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">
          <p className="section-label">DEPARTMENTS</p>

          <h1>Projects · 项目部</h1>

          <p className="subpage-intro">
            GC Science &amp; Mentor Meetups
          </p>

          {/* ============================= */}
          {/* Content */}
          {/* ============================= */}

          <div className="department-content">
            <p>Department introduction goes here.</p>
          </div>

          {/* ============================= */}
          {/* Back */}
          {/* ============================= */}

          <div className="workshop-back">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projects;
