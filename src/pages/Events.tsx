import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import "./events/events.css";
import { getEventYears } from "./events/posts";

function Events() {
  const years = getEventYears();

  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">
          <p className="section-label">ACTIVITIES</p>

          <h1>Innovation Events</h1>

          <p className="subpage-intro">
            Discover innovation events, competitions, talks and other
            activities that connect students through technology and
            creativity.
          </p>

          <div className="archive-grid">
            {years.map(({ year, count }) => (
              <article className="archive-card" key={year}>
                <span>{year}</span>

                <h2>{year} Events</h2>

                <p>
                  {count} innovation{" "}
                  {count === 1 ? "event" : "events"} and student activities
                  from {year}.
                </p>

                <Link to={`/activities/events/${year}`}>View Events →</Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Events;
