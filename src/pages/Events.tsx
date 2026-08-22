function Events() {
  return (
    <main className="subpage">
      <div className="subpage-container">
        <p className="section-label">ACTIVITIES</p>

        <h1>Innovation Events</h1>

        <p className="subpage-intro">
          Discover innovation events, competitions, talks and other activities
          that connect students through technology and creativity.
        </p>

        <div className="archive-grid">
          <article className="archive-card">
            <span>2026</span>
            <h2>2026 Events</h2>
            <p>
              Innovation events and student activities organized during 2026.
            </p>
            <a href="#">View Events →</a>
          </article>

          <article className="archive-card">
            <span>2025</span>
            <h2>2025 Events</h2>
            <p>Innovation events and student activities from 2025.</p>
            <a href="#">View Events →</a>
          </article>

          <article className="archive-card">
            <span>2024</span>
            <h2>2024 Events</h2>
            <p>Explore previous innovation events and activities.</p>
            <a href="#">View Events →</a>
          </article>
        </div>
      </div>
    </main>
  );
}

export default Events;
