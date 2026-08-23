import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../App.css";
import "../gcscience/gcscience.css";
import "./events.css";
import { formatPostDate, getEventsByYear } from "./posts";

function YearEvents() {
  const { year = "" } = useParams();
  const events = getEventsByYear(year);

  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">
          <p className="section-label">INNOVATION EVENTS</p>

          <h1>{year} Events</h1>

          <p className="subpage-intro">
            {events.length > 0
              ? `${events.length} innovation ${events.length === 1 ? "event" : "events"} and student activities from ${year}.`
              : `No events found in ${year}.`}
          </p>

          {events.length > 0 ? (
            <>
              <div className="gcs-grid">
                {events.map((post) => (
                  <Link
                    key={post.id}
                    to={`/activities/events/${year}/${post.id}`}
                    className="gcs-card"
                  >
                    <div className="gcs-card-cover">
                      <img src={post.cover} alt={post.title} loading="lazy" />
                    </div>

                    <div className="gcs-card-body">
                      <span className="gcs-card-date">
                        {post.pinned && (
                          <span className="gcs-card-pin">PINNED</span>
                        )}

                        {formatPostDate(post.publishTime)}
                      </span>

                      <h2>{post.title}</h2>

                      <p className="gcs-card-author">{post.author}</p>

                      <span className="gcs-card-read">Read →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="evt-empty">No events found.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default YearEvents;
