import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../App.css";
import "../gcscience/gcscience.css";
import { formatPostDate, getEvent, getEventContent } from "./posts";

function EventPost() {
  const { year = "", postId = "" } = useParams();
  const post = getEvent(postId);
  const postExists = post && post.publishTime.slice(0, 4) === year;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [postId]);

  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 1;

      if (progressFillRef.current) {
        progressFillRef.current.style.height = `${progress * 100}%`;
      }

      if (progressCountRef.current) {
        progressCountRef.current.textContent = `${Math.round(progress * 100)}%`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!postExists || !post) {
    return (
      <div className="website">
        <Navbar />

        <main className="subpage">
          <div className="subpage-container">
            <p className="section-label">INNOVATION EVENTS</p>

            <h1>Post Not Found</h1>

            <p className="subpage-intro">
              The event you are looking for does not exist.
            </p>

            <div className="gcs-post-back gcs-post-back-block">
              <Link to="/activities/events">← Back to Innovation Events</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="website">
      <Navbar />

      <main className="gcs-post-page">
        {/* ============================= */}
        {/* Reading Progress (side rails) */}
        {/* ============================= */}

        <aside className="gcs-post-side" aria-hidden="true">
          <span className="gcs-post-side-label">Innovation Events</span>

          <span className="gcs-post-side-line" />
        </aside>

        <aside className="gcs-post-progress" aria-hidden="true">
          <div className="gcs-post-progress-track">
            <div className="gcs-post-progress-fill" ref={progressFillRef} />
          </div>

          <span className="gcs-post-progress-count" ref={progressCountRef}>
            0%
          </span>
        </aside>

        {/* ============================= */}
        {/* Post Header */}
        {/* ============================= */}

        <header className="gcs-post-hero">
          <div className="gcs-post-hero-inner">
            <div className="gcs-post-back">
              <Link to={`/activities/events/${year}`}>
                ← Back to {year} Events
              </Link>
            </div>

            <p className="section-label">INNOVATION EVENTS</p>

            <h1>{post.title}</h1>

            <div className="gcs-post-meta">
              <span>{post.author}</span>

              <span className="gcs-post-meta-sep">·</span>

              <span>{formatPostDate(post.publishTime)}</span>

              {post.sourceUrl && (
                <>
                  <span className="gcs-post-meta-sep">·</span>

                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Original ↗
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ============================= */}
        {/* Post Content */}
        {/* ============================= */}

        <div className="gcs-post-body-wrap">
          <article
            className="gcs-post-content"
            dangerouslySetInnerHTML={{
              __html: getEventContent(post.id),
            }}
          />
        </div>

        {/* ============================= */}
        {/* Back */}
        {/* ============================= */}

        <div className="gcs-post-footer">
          <div className="gcs-post-back">
            <Link to={`/activities/events/${year}`}>
              ← Back to {year} Events
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EventPost;
