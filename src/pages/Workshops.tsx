function Workshops() {
  return (
    <main className="subpage">
      <div className="subpage-container">
        <p className="section-label">ACTIVITIES</p>

        <h1>Workshops</h1>

        <p className="subpage-intro">
          Explore workshops organized by SSTIA, including
          technical sessions, hands-on activities and
          student-led learning experiences.
        </p>

        <div className="archive-grid">
          <article className="archive-card">
            <span>2026</span>
            <h2>2026 Workshops</h2>
            <p>
              Workshops and technical activities organized
              during 2026.
            </p>
            <a href="#">View Workshops →</a>
          </article>

          <article className="archive-card">
            <span>2025</span>
            <h2>2025 Workshops</h2>
            <p>
              Explore workshops and technical sessions
              from 2025.
            </p>
            <a href="#">View Workshops →</a>
          </article>

          <article className="archive-card">
            <span>2024</span>
            <h2>2024 Workshops</h2>
            <p>
              Explore workshops and technical sessions
              from 2024.
            </p>
            <a href="#">View Workshops →</a>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Workshops;