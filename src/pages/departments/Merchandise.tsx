import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./Departments.css";

import img1 from "./pictures/1.jpg";
import img2 from "./pictures/2.jpg";
import img3 from "./pictures/3.jpg";
import img4 from "./pictures/4.jpg";
import img5 from "./pictures/5.jpg";
import img6 from "./pictures/6.jpg";
import img7 from "./pictures/7.jpg";
import img8 from "./pictures/8.jpg";
import img9 from "./pictures/9.jpg";
import img10 from "./pictures/10.jpg";
import img11 from "./pictures/11.jpg";
import img12 from "./pictures/12.jpg";
import img13 from "./pictures/13.jpg";
import img14 from "./pictures/14.jpg";
import img15 from "./pictures/15.jpg";


interface MerchItem {
  src: string;
  alt: string;
  description: string;
}
  
const merchItems: MerchItem[] = [
  { src: img1, alt: "Merchandise 1", description: "SSTIA Booklet" },
  { src: img2, alt: "Merchandise 2", description: "Code Snippet Card" },
  { src: img3, alt: "Merchandise 3", description: "Liming Cup Clothing" },
  { src: img4, alt: "Merchandise 4", description: "Freshman Fun Survey" },
  { src: img5, alt: "Merchandise 5", description: "Freshman Welcome Gifts" },
  { src: img6, alt: "Merchandise 6", description: "SSTIA Moon-shaped Fan" },
  { src: img7, alt: "Merchandise 7", description: "Myf's Handmade Booklet" },
  { src: img8, alt: "Merchandise 8", description: "Freshman Welcome Gifts" },
  { src: img9, alt: "Merchandise 9", description: "SSTIA Cap" },
  { src: img15, alt: "Merchandise 15", description: "SSTIA Memes" },
  { src: img10, alt: "Merchandise 10", description: "SSTIA Mouse Pad" },
  { src: img11, alt: "Merchandise 11", description: "Liming \"Cup\"" },
  { src: img12, alt: "Merchandise 12", description: "SSTIA PCB Keyring" },
  { src: img13, alt: "Merchandise 13", description: "SSTIA Mascot Pillow" },
  { src: img14, alt: "Merchandise 14", description: "Freshman Welcome Gifts" },
];

function Merchandise() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <div className="publicity-page">
      <Navbar />

      <main className="publicity-container">
        {/* Header */}
        <header className="page-header">
          <p className="section-label">DEPARTMENTS</p>
          <h1 className="main-title">
            SSTIA Merchandise <span className="cn-title">· 周边产品</span>
          </h1>
          <p className="subpage-intro">
            Explore our collection of SSTIA-branded merchandise, designed and
            produced by the Publicity Department.
          </p>
        </header>

        {/* Image Grid */}
        <section className="merch-grid">
          {merchItems.map((item, index) => (
            <div key={index} className="merch-card">
              <img
                src={item.src}
                alt={item.alt}
                className="merch-image"
                onClick={() => openLightbox(item.src)}
              />
              <p className="merch-caption">{item.description}</p>
            </div>
          ))}
        </section>

      </main>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxSrc} alt="Enlarged merchandise" className="lightbox-image" />
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Merchandise;
