import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Python from "./pages/workshops/2025/Python";
import DeepLearning from "./pages/workshops/2025/DeepLearning";
import Latex from "./pages/workshops/2025/Latex";
import Solidworks from "./pages/workshops/2025/Solidworks";
import UPC from "./pages/workshops/2025/UPC";
import LimingCupSampleCar from "./pages/workshops/2025/LimingCupSampleCar";
import Events from "./pages/Events";
import GCScience from "./pages/GCScience";
import GCSciencePost from "./pages/gcscience/GCSciencePost";
import Competition from "./pages/departments/Competition";
import Projects from "./pages/departments/Projects";
import Publicity from "./pages/departments/Publicity";
import YearEvents from "./pages/events/YearEvents";
import EventPost from "./pages/events/EventPost";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/activities/workshops" element={<Workshops />} />

        <Route path="/activities/workshops/2025/python" element={<Python />} />
        <Route
          path="/activities/workshops/2025/deep-learning"
          element={<DeepLearning />}
        />
        <Route path="/activities/workshops/2025/latex" element={<Latex />} />
        <Route path="/activities/workshops/2025/solidworks" element={<Solidworks />} />
        <Route path="/activities/workshops/2025/upc" element={<UPC />} />
        <Route
          path="/activities/workshops/2025/liming-cup-sample-car"
          element={<LimingCupSampleCar />}
        />

        <Route path="/activities/events" element={<Events />} />

        <Route path="/activities/events/:year" element={<YearEvents />} />

        <Route
          path="/activities/events/:year/:postId"
          element={<EventPost />}
        />

        <Route path="/activities/gc-science" element={<GCScience />} />

        <Route
          path="/activities/gc-science/:postId"
          element={<GCSciencePost />}
        />

        <Route path="/departments/competition" element={<Competition />} />
        <Route path="/departments/projects" element={<Projects />} />
        <Route path="/departments/publicity" element={<Publicity />} />
      </Routes>
    </>
  );
}

export default App;
