import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "../Workshops.css";
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
            <p className="section-label">WORKSHOPS / 2026</p>

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
                <p>Time: 2026.10.25 14:00 - 16:00</p>

                <p>Location: DSY 115</p>

                <p>Bring: Mouse and computer with SolidWorks and Bambu Studio installed.</p>
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

                  <h3>Sketching</h3>

                  <p>
                    Master the foundation of parametric design. Learn to create sketches using geometric relations, smart dimensions, and constraints to achieve a fully defined state and capture design intent.
                  </p>


                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Features</h3>

                  <p>
                    Transform sketches into 3D parts using core features like Extrude Boss/Base and Extrude Cut.
                  </p>

                  <p>
                    Learn how to prepare your models for slicing and execute 3D printing using on-campus facilities.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Assembly Design</h3>

                  <p>
                    Bring components together using standard, advanced, and mechanical mates. Validate mechanical interactions, run interference checks, and create exploded views.
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
                  href="#"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>
                <a
                  href="https://github.com/UMJI-SSTIA/Solidworks-Workshop-26"
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

export default Solidworks;
