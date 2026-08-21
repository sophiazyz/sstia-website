import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Workshops() {
  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">

          <p className="section-label">
            ACTIVITIES
          </p>

          <h1>
            Workshops
          </h1>

          <p className="subpage-intro">
            Explore workshops organized by SSTIA, including
            technical sessions, hands-on activities and
            student-led learning experiences.
          </p>

          <div className="archive-grid">

            {/* 2026 */}

            <article className="archive-card">
              <span>2026</span>

              <h2>
                2026 Workshops
              </h2>

              <ul className="workshop-list">
                <li>
                  <Link to="/activities/workshops/2026/web-development">
                    Web Development
                  </Link>
                </li>
              </ul>
            </article>

            {/* 2025 */}

            <article className="archive-card">
              <span>2025</span>

              <h2>
                2025 Workshops
              </h2>

              <ul className="workshop-list">
                <li>
                  <Link to="/activities/workshops/2025/python">
                    Python
                  </Link>
                </li>

                <li>
                  <Link to="/activities/workshops/2025/deep-learning">
                    Deep Learning
                  </Link>
                </li>

                <li>
                  <Link to="/activities/workshops/2025/latex">
                    LaTeX
                  </Link>
                </li>

                <li>
                  <Link to="/activities/workshops/2025/solidworks">
                    SolidWorks
                  </Link>
                </li>

                <li>
                  <Link to="/activities/workshops/2025/upc">
                    UPC
                  </Link>
                </li>

                <li>
                  <Link to="/activities/workshops/2025/liming-cup-sample-car">
                    Liming Cup Sample Car
                  </Link>
                </li>
              </ul>
            </article>

          </div>

        </div>
      </main>
    </div>
  );
}

export default Workshops;