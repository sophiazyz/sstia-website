import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../App.css";

function Publicity() {
  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">
          <p className="section-label">DEPARTMENTS</p>

          <h1>Publicity · 宣传部</h1>

          <p className="subpage-intro">
            Social Media &amp; SSTIA Merchandise Design
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

export default Publicity;
