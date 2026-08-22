import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "../Workshops.css";
function UPC() {
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

            <h1>UPC</h1>

            <p className="workshop-intro">
              A workshop on University Physics Competition, featuring physics
              insights and sharing experience from award-winning teams.
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
                  UPC.
                  <br />
                  Explore.
                  <br />
                  Compete.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: 2025.10.15 13:00-14:00</p>

                <p>Location: LBL 300</p>

                <p>Bring: Curiosity and enthusiasm for physics.</p>
              </div>
            </div>



            <div className="workshop-topics">
              <p className="section-label">WHAT WE COVERED</p>

              <div className="topic-grid">
                <article className="topic-card">
                  <span>01</span>

                  <h3>Part I — Physics Talk</h3>

                  <p>
                    Invite Zijie Qu to talk about the physics fundamentals
                    relevant to the University Physics Competition.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Part II — UPC Experience</h3>

                  <p>
                    Invite Golden Metal Team to share their UPC experience,
                    including problem-solving strategies and teamwork insights.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>ABOUT UPC</h3>

                  <p>
                    The University Physics Competition (UPC) is an international
                    physics competition that challenges students to apply physics
                    principles to solve real-world problems through teamwork and
                    innovation.
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
                  href="https://sjtu.feishu.cn/minutes/obcnhjt25lk9shg4ht49c63f?from=from_copylink"
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

export default UPC;
