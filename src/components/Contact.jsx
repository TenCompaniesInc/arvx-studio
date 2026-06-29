"use client";
import { useEffect, useState } from "react";

export default function Contact() {
  const [content, setContent] = useState({
    tag: "Contact",
    heading: "Let's Work Together",
    subtext: "Available for freelance projects worldwide.",
    phone: "+256 778 642 803",
    email: "Adrianrave75@gmail.com"
  });

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(d => setContent(d.contact));
  }, []);

  return (
    <section id="contact" style={{ background: "black", padding: "128px 24px", color: "white" }}>
      <div style={{ maxWidth: "896px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ color: "#a78bfa", marginBottom: "16px" }}>{content.tag}</p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "bold", marginBottom: "24px" }}>{content.heading}</h2>
        <p style={{ color: "#9ca3af", marginBottom: "32px" }}>{content.subtext}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
          <a href={`tel:${content.phone}`} style={{ borderRadius: "999px", background: "white", padding: "16px 32px", color: "black", textDecoration: "none", fontWeight: 500 }}>{content.phone}</a>
          <a href={`mailto:${content.email}`} style={{ borderRadius: "999px", border: "1px solid rgba(167,139,250,0.5)", padding: "16px 32px", color: "#a78bfa", textDecoration: "none" }}>{content.email}</a>
        </div>
      </div>
    </section>
  );
}
