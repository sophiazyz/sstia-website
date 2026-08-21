import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "./Python.css";

function Python() {
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

            <h1>Python</h1>

            <p className="workshop-intro">
              A hands-on Python workshop designed to introduce students to
              programming fundamentals and practical coding skills.
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
                  Python.
                  <br />
                  Code.
                  <br />
                  Create.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: 2026.3.15 14:00-16:00</p>

                <p>Location: lbl 325</p>

                <p>Bring: Computer with Python installed.</p>
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

                  <h3>Python Basics</h3>

                  <p>
                    Introduction to Python syntax, variables, data types and
                    basic programming concepts.
                  </p>

                  <p>
                    Understanding conditional statements, loops and basic
                    program logic.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Data Analysis</h3>

                  <p>
                    Learning how to analyze and visualize data using Python
                    libraries, such as pandas, numpy and matplotlib.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Practical Coding</h3>

                  <p>
                    Creating your own Python games, applications and scripts to
                    solve real-world problems.
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
                  href="https://sjtu.feishu.cn/minutes/obcnf3ld782jq22l4of3wd57?from=from_copylink"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://github.com/UMJI-SSTIA/Python-Workshop-2026"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub Repository</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://github.com/UMJI-SSTIA/Python-Workshop-2026/tree/main/setup"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Setup Instructions (File)</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://www.bilibili.com/video/BV17P7DzeEmm/"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Setup Instructions (Video)</span>

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

export default Python;
