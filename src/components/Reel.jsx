"use client";
import { useEffect, useRef, useState } from "react";

const defaultVideos = [
  { id: 1, src: "/hero-reel.mp4", title: "Norman Zizoff Environmental Hero Reel" },
  { id: 2, src: "/afro-mobile.mp4", title: "Afro Mobile App" },
  { id: 3, src: "/content-secrets-v2.mp4", title: "Content Creation Secrets" },
  { id: 4, src: "/fear-failure.mp4", title: "Fear of Failure" },
  { id: 5, src: "/force-brain.mp4", title: "Force Your Brain to Change" },
  { id: 6, src: "/build-wealth.mp4", title: "How I Go to Build My Wealth" },
  { id: 7, src: "/improve-time.mp4", title: "How to Improve Your Time" },
  { id: 8, src: "/inspiration-fix.mp4", title: "Inspiration" },
];

function VideoCard({ video }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    const container = containerRef.current;
    if (!vid || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            vid.muted = true;
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isFullscreen && (
        <div onClick={() => setIsFullscreen(false)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "black", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <button onClick={() => setIsFullscreen(false)} style={{
            position: "absolute", top: "24px", right: "24px",
            background: "rgba(255,255,255,0.15)", border: "none",
            color: "white", padding: "10px 20px", borderRadius: "999px",
            cursor: "pointer", fontSize: "14px", zIndex: 10
          }}>✕ Close</button>
          <video controls autoPlay onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "100vh", maxWidth: "100vw", width: "100%" }}>
            <source src={video.src} type="video/mp4" />
          </video>
        </div>
      )}

      <div
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          overflow: "hidden", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "black", position: "relative"
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9", background: "black", overflow: "hidden" }}>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", display: "block"
            }}
          >
            <source src={video.src} type="video/mp4" />
          </video>

          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s"
          }}>
            <button onClick={() => setIsFullscreen(true)} style={{
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)", color: "white",
              padding: "10px 24px", borderRadius: "999px",
              fontSize: "13px", cursor: "pointer", fontWeight: 500
            }}>
              ▶ Watch Full
            </button>
          </div>
        </div>

        <p style={{
          padding: "12px 16px", color: "#9ca3af",
          fontSize: "14px", margin: 0, background: "black"
        }}>{video.title}</p>
      </div>
    </>
  );
}

export default function Reel() {
  return (
    <section id="work" style={{ background: "black", padding: "96px 24px", color: "white" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ color: "#a78bfa", marginBottom: "8px" }}>Featured Work</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: "bold", margin: "0 0 16px" }}>Showreel</h2>
          <p style={{ color: "#9ca3af", maxWidth: "640px" }}>A collection of motion graphics, video editing and visual storytelling projects.</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "24px"
        }}>
          {defaultVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}