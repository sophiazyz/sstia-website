import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import "./gcscience/gcscience.css";
import { formatPostDate, getPosts } from "./gcscience/posts";

function GCScience() {
  const posts = getPosts();

  return (
    <div className="website">
      <Navbar />

      <main className="subpage">
        <div className="subpage-container">
          <p className="section-label">PUBLICATION</p>

          <h1>GC Science</h1>

          <p className="subpage-intro">
            GC Science is a student-led publication featuring research,
            projects, achievements and ideas in science and technology.
          </p>

          <div className="gcs-grid">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/activities/gc-science/${post.id}`}
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
        </div>
      </main>
    </div>
  );
}

export default GCScience;
