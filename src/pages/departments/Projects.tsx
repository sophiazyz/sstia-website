import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Publicity.css";

function Projects() {
  return (
    <div className="publicity-page">
      <Navbar />

      <main className="publicity-container">
        {/* Header Section */}
        <header className="page-header">
          <p className="section-label">DEPARTMENTS</p>
          <h1 className="main-title">Projects <span className="cn-title">· 项目部</span></h1>
          <p className="subpage-intro">
            Bridging knowledge and experience through publishing and mentorship.
          </p>
        </header>

        {/* Content Cards */}
        <section className="content-grid">
          {/* Card 1 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Publishing</span>
              <h3>GC Science</h3>
              <p>
                A popular science platform dedicated to introducing cutting-edge 
                knowledge and research. Content is curated and published through 
                our official WeChat account GCInnovation+, making complex topics 
                accessible to the student community.
              </p>
            </div>
            <Link to="/activities/gc-science" className="learn-more">
              Learn more <span>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Mentorship</span>
              <h3>Mentor Meetups</h3>
              <p>
                We organize in-person sessions where experienced mentors 
                share their insights and experiences. These intimate gatherings 
                provide students with valuable guidance on academic planning, 
                career development, and industry trends.
              </p>
            </div>
            <Link to="/activities/events" className="learn-more">
              Learn more <span>→</span>
            </Link>
          </div>
        </section>

        {/* Back Link */}
        <footer className="page-footer">
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
        </footer>
      </main>
    </div>
  );
}

export default Projects;
