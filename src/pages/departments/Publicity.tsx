import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Departments.css";

function Publicity() {
  return (
    <div className="publicity-page">
      <Navbar />

      <main className="publicity-container">
        {/* Header Section */}
        <header className="page-header">
          <p className="section-label">DEPARTMENTS</p>
          <h1 className="main-title">Publicity <span className="cn-title">· 宣传部</span></h1>
          <p className="subpage-intro">
            Elevating SSTIA's brand through creative design and strategic digital communication.
          </p>
        </header>

        {/* Content Cards */}
        <section className="content-grid">
          {/* Card 1 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Creative Design</span>
              <h3>SSTIA Merchandise</h3>
              <p>
                We bring the spirit of SSTIA to life by designing and producing logos, cultural creative merchandise, and emoji packs.
                We handle the entire creative process — from initial 
                sketching to material selection.
              </p>
            </div>
            <Link to="/merchandise" className="learn-more">
              Learn more <span>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Social Media</span>
              <h3>GCInnovation+</h3>
              <p>
                The digital voice of our community. We manage the official WeChat Account, 
                delivering high-quality content, event highlights, and tech insights to 
                our dedicated followers.
              </p>
            </div>
            <div className="learn-more">
              Learn more by searching on WeChat
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Publicity;
