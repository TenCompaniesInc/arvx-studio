"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [content, setContent] = useState({
    tag: "About",
    heading: "Creating Motion\nThat Captures Attention",
    col1: "I'm A.rvxStudio, a freelance video editor and motion graphics artist focused on creating visually striking content for creators, brands and digital products.",
    col2: "From short-form content to advanced motion graphics and UI animation, I help ideas become engaging visual experiences."
  });

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(d => setContent(d.about));
  }, []);

  return (
    <section id="about" style={{ background: "black", padding: "128px 24px", color: "white" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        <p style={{ color: "#a78bfa", marginBottom: "16px" }}>{content.tag}</p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: "bold", marginBottom: "32px", whiteSpace: "pre-line" }}>{content.heading}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
          <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#9ca3af" }}>{content.col1}</p>
          <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#9ca3af" }}>{content.col2}</p>
        </div>
      </div>
    </section>
  );
}
