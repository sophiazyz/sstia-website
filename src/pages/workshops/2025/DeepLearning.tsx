import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "./Python.css";

function DeepLearning() {
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

            <h1>Deep Learning</h1>

            <p className="workshop-intro">
              A hands-on Deep Learning workshop designed to introduce students to
              neural networks and practical AI applications.
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
                  Deep Learning.
                  <br />
                  Train.
                  <br />
                  Innovate.
                </h2>
              </div>

              <div className="workshop-description">
                <p>Time: TBD</p>

                <p>Location: TBD</p>

                <p>Bring: Computer with Python and PyTorch installed.</p>
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

                  <h3>Neural Network Basics</h3>

                  <p>
                    Introduction to neurons, activation functions, forward
                    propagation and backpropagation.
                  </p>

                  <p>
                    Understanding loss functions, optimizers and the training
                    loop.
                  </p>
                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Model Architectures</h3>

                  <p>
                    Exploring CNNs, RNNs and Transformers — the building blocks
                    behind modern deep learning systems.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>Practical Training</h3>

                  <p>
                    Building and training your own deep learning models using
                    PyTorch to solve real-world problems.
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
                  href="#"
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

export default DeepLearning;
