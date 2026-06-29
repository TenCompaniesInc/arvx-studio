"use client";
import { useRef, useState } from "react";

const defaultVideos = [
  { id: 1, driveId: "1GqcEnCj2FoUmVEluZTL1A1EEju2DVvw_", title: "Norman Zizoff Environmental Hero Reel" },
  { id: 2, driveId: "1wPkboCk-g29YVCcT8_AVYKccaJK72_Mz", title: "Afro Mobile App" },
  { id: 3, driveId: "1BlJG9sxxg-PK3AlfSwuYjb46LXbDwI7X", title: "Content Creation Secrets" },
  { id: 4, driveId: "1d6pUWWfzaXey0qeAepfOhiZIljOmDmSB", title: "Fear of Failure" },
  { id: 5, driveId: "1E-jHNiOSXpqbiBk_qsjzQqHqsDKkhfXO", title: "Force Your Brain to Change" },
  { id: 6, driveId: "1Ok59G5fZ0CGptriXG5ETtESiuxCNqLab", title: "How I Go to Build My Wealth" },
  { id: 7, driveId: "1leZhwvM_tsXGd6nZLhYjb_R70SfOVtMp", title: "How to Improve Your Time" },
  { id: 8, driveId: "1r-Cos8gNE2g8Tgi_MmQ4OMOt0DVqISjr", title: "Inspiration" },
  { id: 9, driveId: "1-QPY1on04Ny2_uV2ef71b-vXjIXhfaY9", title: "Project Showcase" },
  { id: 10, driveId: "1eI8koA-IPZXVmZ3L3BjqKOe_8F6swqNf", title: "Featured Work" },
];

function VideoCard({ video }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const embedUrl = `https://drive.google.com/file/d/${video.driveId}/preview`;

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
          <iframe
            src={embedUrl}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "90vw", height: "90vh", border: "none", borderRadius: "12px" }}
            allow="autoplay"
          />
        </div>
      )}

      <div style={{
        overflow: "hidden", borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "black", position: "relative"
      }}>
        <div style={{ position: "relative", aspectRatio: "16/9", background: "black", overflow: "hidden" }}>
          <iframe
            src={embedUrl}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              border: "none"
            }}
            allow="autoplay"
            allowFullScreen
          />
          <button onClick={() => setIsFullscreen(true)} style={{
            position: "absolute", top: "10px", right: "10px", zIndex: 10,
            background: "rgba(0,0,0,0.6)", border: "none", color: "white",
            padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer"
          }}>⛶ Fullscreen</button>
        </div>
        <p style={{ padding: "12px 16px", color: "#9ca3af", fontSize: "14px", margin: 0 }}>{video.title}</p>
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