import Navbar from "../../../components/Navbar";
import "../../../App.css";
import "../Workshops.css";
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
            <p className="section-label">WORKSHOPS / 2026</p>

            <h1>Deep Learning</h1>

            <p className="workshop-intro">
              A hands-on Deep Learning workshop that takes you from core prerequisites to classic models (KNN, CNN, RNN) and cutting-edge topics like PPO and VLA - all with real coding practice.
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
                <p>Time: 2026.4.26 14:00-16:00</p>

                <p>Location: dzy 4-102</p>

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

                  <h3>Prerequisite Knowledge</h3>

                  <p>
                    Brush up on Python, NumPy, linear algebra, calculus, and basic machine learning concepts - so you can jump straight into deep learning without getting stuck.
                  </p>


                </article>

                <article className="topic-card">
                  <span>02</span>

                  <h3>Core Models: KNN, CNN, RNN</h3>

                  <p>
                    Start with KNN and linear classifiers, then dive into convolutional neural networks for image processing and recurrent neural networks for sequence modeling. Understand their inner workings and when to use each.
                  </p>
                </article>

                <article className="topic-card">
                  <span>03</span>

                  <h3>PPO & VLA</h3>

                  <p>
                    Explore Proximal Policy Optimization (PPO) for reinforcement learning, and Vision-Language-Action (VLA) models that unify perception, language, and control.


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
                  href="https://sjtu.feishu.cn/minutes/obcn9w3qqg64718j1e81k5q9"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Feishu Meeting</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://github.com/UMJI-SSTIA/Deeplearning-wksp-2025"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub Repository</span>

                  <span>↗</span>
                </a>

                <a
                  href="https://umji-sstia.github.io/Deep-Learning-Workshop/"
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Workshop Website</span>

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

export default DeepLearning;
