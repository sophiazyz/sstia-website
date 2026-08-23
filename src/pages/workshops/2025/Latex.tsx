import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "../Workshops.css";
function Latex() {
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

            <h1>LaTeX</h1>

            <p className="workshop-intro">
              A hands-on LaTeX workshop designed to introduce students to
              professional typesetting and academic document preparation.
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
                  LaTeX.
                  <br />
                  Write.
                  <br />
                  Publish.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: 2025.9.20 19:00-20:30</p>

                <p>Location: LBL 325</p>

                <p>Bring: Computer.</p>
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

                  <h3>LaTeX Basics</h3>

                  <p>
                    Introduction to LaTeX syntax, document structure, sections,
                    lists and basic formatting commands.
                  </p>

                  <p>
                    Understanding compilation workflow and common error messages.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Math &amp; Figures</h3>

                  <p>
                    Learning how to typeset mathematical equations, insert
                    figures, tables and cross-references.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Academic Writing</h3>

                  <p>
                    Creating professional academic documents such as reports,
                    presentations and posters using LaTeX templates.
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
                  href="https://sjtu.feishu.cn/minutes/obcnzkkcd4ds58q7525426uk"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://github.com/UMJI-SSTIA/LaTex-Workshop-2025"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub Repository</span>

                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* ============================= */}
            {/* Back */}
            {/* ============================= */}

          </div>
        </section>
      </main>
    </div>
  );
}

export default Latex;
