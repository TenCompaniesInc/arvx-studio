"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  if (typeof window !== "undefined") {
    window.onresize = () => setIsMobile(window.innerWidth < 768);
  }

  return (
    <>
      <nav style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "90vw",
        maxWidth: "500px",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.7)",
          padding: "8px 20px",
          backdropFilter: "blur(20px)",
        }}>
          <span style={{ color: "#9ca3af", fontSize: "14px" }}>A.rvxStudio</span>

          {!isMobile && (
            <div style={{ display: "flex", gap: "24px" }}>
              {["#work", "#about", "#contact"].map((href) => (
                <a key={href} href={href} style={{ color: "#9ca3af", fontSize: "14px", textDecoration: "none" }}>
                  {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
                </a>
              ))}
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setOpen(!open)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <span style={{ display: "block", width: "20px", height: "2px", background: "white", transition: "all 0.2s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "white", transition: "all 0.2s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "white", transition: "all 0.2s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          )}
        </div>

        {open && isMobile && (
          <div style={{
            marginTop: "8px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(0,0,0,0.9)",
            padding: "16px 24px",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {[["#work", "Work"], ["#about", "About"], ["#contact", "Contact"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}
                style={{ color: "#9ca3af", fontSize: "14px", textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}