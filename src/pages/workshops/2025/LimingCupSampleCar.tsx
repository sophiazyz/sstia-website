import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "../Workshops.css";
function LimingCupSampleCar() {
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

            <h1>Liming Cup Sample Car</h1>

            <p className="workshop-intro">
              A hands-on workshop on building a sample car for the Liming Cup,
              covering mechanical design, electronics and Arduino programming.
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
                  Sample Car.
                  <br />
                  Build.
                  <br />
                  Drive.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: 2026.3.29 18:00-19:00</p>

                <p>Location: dsy 215</p>

                <p>Bring: Laptop with Arduino IDE installed.</p>
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

                  <h3>Mechanical Structure</h3>

                  <p>
                    Modeling and fabrication of the car's mechanical structure,
                    including chassis, wheels and mounting components.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Electronics Control</h3>

                  <p>
                    Circuit wiring, component introduction and understanding
                    how electronic parts work together to control the car.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Arduino Programming</h3>

                  <p>
                    Writing Arduino code to control motors, sensors and other
                    components to make the car move autonomously.
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
                  href="https://sjtu.feishu.cn/minutes/obcnps94f92q5w231172jefl"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://sjtu.feishu.cn/docx/JJxJdYLRIodKQDxuqR3cWJXQnqe"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Meeting Materials</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://github.com/UMJI-SSTIA/Liming-Cup-Sample-Car-2026"
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

            <div className="workshop-back">
              <Link to="/activities/workshops">← Back to Workshops</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LimingCupSampleCar;
