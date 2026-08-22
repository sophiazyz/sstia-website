import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "./Python.css";

function Solidworks() {
  return (
    <div className="website">
      <Navbar />

      <main className="workshop-page">
        {/* ============================= */}
        {/* Workshop Header */}
        {/* ============================= */}

        <section className="workshop-hero">
          <div className="workshop-container">
            <p className="section-label">WORKSHOPS / 2025</p>

            <h1>SolidWorks</h1>

            <p className="workshop-intro">
              A hands-on SolidWorks workshop designed to introduce students to
              3D modeling, assembly design and engineering drawing.
            </p>
          </div>
        </section>

        {/* ============================= */}
        {/* Workshop Information */}
        {/* ============================= */}

        <section className="workshop-content">
          <div className="workshop-container">
            <div className="workshop-info-grid">
              <div>
                <p className="section-label">ABOUT THE WORKSHOP</p>

                <h2>
                  SolidWorks.
                  <br />
                  Design.
                  <br />
                  Build.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: 2025.11.23 16:00-18:00</p>

                <p>Location: dzy 4-102</p>

                <p>Bring: Computer with SolidWorks installed.</p>
              </div>
            </div>

            {/* ============================= */}
            {/* Topics */}
            {/* ============================= */}

            <div className="workshop-topics">
              <p className="section-label">WHAT WE COVERED</p>

              <div className="topic-grid">
                <article className="topic-card">
                  <span>01</span>

                  <h3>Part Modeling</h3>

                  <p>
                    Introduction to sketching, extrusion, revolution and other
                    fundamental feature creation tools.
                  </p>

                  <p>
                    Understanding design intent, constraints and parametric
                    modeling concepts.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Assembly Design</h3>

                  <p>
                    Learning how to create assemblies, apply mates and
                    validate mechanical interactions between components.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Engineering Drawings</h3>

                  <p>
                    Generating detailed 2D drawings from 3D models with proper
                    dimensions, annotations and views.
                  </p>
                </article>
              </div>
            </div>

            {/* ============================= */}
            {/* Workshop Resources */}
            {/* ============================= */}

            <div className="workshop-materials">
              <p className="section-label">WORKSHOP RESOURCES</p>

              <div className="materials-list">
                <a
                  href="https://sjtu.feishu.cn/minutes/obcn9dn3r3h58354u28t1ji9"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>

              </div>
            </div>

            {/* ============================= */}
            {/* Back */}
            {/* ============================= */}

            <div className="workshop-back">
              <Link to="/activities/workshops">← Back to Workshops</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Solidworks;
