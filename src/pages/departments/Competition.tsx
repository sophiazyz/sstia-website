import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Departments.css";

function Competition() {
  return (
    <div className="publicity-page">
      <Navbar />

      <main className="publicity-container">
        {/* Header Section */}
        <header className="page-header">
          <p className="section-label">DEPARTMENTS</p>
          <h1 className="main-title">Competition <span className="cn-title">· 竞赛部</span></h1>
          <p className="subpage-intro">
            Empowering students through hands-on workshops and comprehensive competition resources.
          </p>
        </header>

        {/* Content Cards */}
        <section className="content-grid">
          {/* Card 1 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Workshops</span>
              <h3>Technical Workshops</h3>
              <p>
                We organize hands-on workshops covering various technologies 
                and tools. From programming languages to engineering software, 
                our workshops provide practical skills that complement academic 
                learning and prepare students for real-world challenges.
              </p>
            </div>
            <Link to="/activities/workshops" className="learn-more">
              Learn more <span>→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="info-card">
            <div className="card-content">
              <span className="category-tag">Competitions</span>
              <h3>Competition Information</h3>
              <p>
                We provide comprehensive information and support for academic 
                competitions including MCM/ICM (Mathematical Contest in Modeling) 
                and UPC (University Physics Competition). Get guidance on 
                registration, preparation, and teamwork strategies.
              </p>
            </div>
            <Link to="/activities/events" className="learn-more">
              Learn more <span>→</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Competition;
