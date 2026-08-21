import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Python from "./pages/workshops/2025/Python";
import Events from "./pages/Events";
import GCScience from "./pages/GCScience";
import GCSciencePost from "./pages/gcscience/GCSciencePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/activities/workshops" element={<Workshops />} />

      <Route path="/activities/workshops/2025/python" element={<Python />} />

      <Route path="/activities/events" element={<Events />} />

      <Route path="/activities/gc-science" element={<GCScience />} />

      <Route path="/activities/gc-science/:postId" element={<GCSciencePost />} />
    </Routes>
  );
}

export default App;
