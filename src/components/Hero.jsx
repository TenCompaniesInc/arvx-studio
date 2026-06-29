"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [content, setContent] = useState({
    tag: "Motion Graphics • Video Editing",
    headline: "A.rvxStudio",
    subheadline: "Turning visuals into experiences through motion design, cinematic editing and digital storytelling."
  });

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(d => setContent(d.hero));
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "black", color: "white" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}>
        <source src="/hero-reel.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: "500px", height: "500px", transform: "translate(-50%,-50%)", borderRadius: "50%", background: "rgba(124,58,237,0.2)", filter: "blur(150px)" }} />
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "96px 24px 0", textAlign: "center" }}>
        <p style={{ marginBottom: "16px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#a78bfa" }}>{content.tag}</p>
        <h1 style={{ fontSize: "clamp(3rem, 10vw, 6rem)", fontWeight: "bold", maxWidth: "900px", margin: "0 0 24px" }}>{content.headline}</h1>
        <p style={{ maxWidth: "560px", fontSize: "18px", color: "#9ca3af", lineHeight: 1.6 }}>{content.subheadline}</p>
        <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          <a href="#work" style={{ borderRadius: "999px", background: "white", padding: "12px 24px", fontWeight: 500, color: "black", textDecoration: "none" }}>Watch Reel</a>
          <a href="#contact" style={{ borderRadius: "999px", border: "1px solid white", padding: "12px 24px", color: "white", textDecoration: "none" }}>Hire Me</a>
        </div>
        <div style={{ marginTop: "48px", color: "#6b7280" }}>@A.rvxStudio</div>
      </div>
    </section>
  );
}
