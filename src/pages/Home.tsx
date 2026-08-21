import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

function Home() {
  return (
    <div className="website">
      <Navbar />
        <div className="logo">SSTIA</div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#activities">Activities</a>
          <a href="#members">Members</a>
          <a href="#contact">Contact</a>
        </nav>

      <main>
        {/* Hero */}

        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-small-title">
              Student Science Technology Innovation Association
            </p>

            <h1>
              Technology.
              <br />
              Innovation.
              <br />
              Collaboration.
            </h1>

            <p className="hero-description">
              Connecting students through technology, innovation and
              collaboration.
            </p>

            <a href="#about" className="hero-button">
              Explore SSTIA
            </a>
          </div>
        </section>

        {/* About */}

        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-title">
              <p className="section-label">WHO WE ARE</p>
              <h2>About SSTIA</h2>
            </div>

            <div className="about-content">
              <p className="about-lead">
                SSTIA, Student Science Technology Innovation Association,
                is a student organization under SJTU Global College.
              </p>

              <p>
                We provide a platform for students to explore new
                technologies, develop practical skills, exchange ideas
                and work together on meaningful projects.
              </p>

              <p>
                Through workshops, technical events and competitions,
                we aim to foster a culture of innovation and creativity
                among students. SSTIA aims to create an active and open
                community where students can turn ideas into real-world
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}

        <section id="activities" className="activities-section">
          <div className="activities-container">
            <div className="activities-header">
              <div>
                <p className="section-label">WHAT WE DO</p>
                <h2>Activities</h2>
              </div>

              <p className="activities-intro">
                Explore our workshops, technical events and projects
                designed to help students learn, create and connect.
              </p>
            </div>

            <div className="activities-grid">

              {/* Workshops */}

              <article className="activity-card">
                <div className="activity-number">01</div>

                <div>
                  <h3>Workshops</h3>

                  <p>
                    Hands-on workshops where students can learn new
                    technologies and develop practical skills.
                  </p>

                  <Link to="/activities/workshops">
                    Learn More →
                  </Link>
                </div>
              </article>

              {/* Innovation Events */}

              <article className="activity-card">
                <div className="activity-number">02</div>

                <div>
                  <h3>Innovation Events</h3>

                  <p>
                    Talks, competitions and events that bring students
                    together to exchange ideas and explore innovation.
                  </p>

                  <Link to="/activities/events">
                    Learn More →
                  </Link>
                </div>
              </article>

              {/* GC Science */}

              <article className="activity-card">
                <div className="activity-number">03</div>

                <div>
                  <h3>GC Science</h3>

                  <p>
                    A student-led publication that showcases the latest
                    research, projects and achievements in science and
                    technology.
                  </p>

                  <Link to="/activities/gc-science">
                    Learn More →
                  </Link>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Members */}

        <section id="members" className="placeholder-section">
          <h2>Members</h2>
        </section>

        {/* Contact */}

        <section id="contact" className="placeholder-section">
          <h2>Contact</h2>
        </section>
      </main>
    </div>
  );
}

export default Home;