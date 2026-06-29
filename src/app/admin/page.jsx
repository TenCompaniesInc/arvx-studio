"use client";
import { useState, useEffect, useRef } from "react";

const PASSWORD = "arvx@75";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("videos");
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (authed) fetch("/api/content").then(r => r.json()).then(setData);
  }, [authed]);

  const save = async (updated) => {
    setData(updated);
    await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const uploadVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const { src } = await res.json();
    const newVideo = { id: Date.now(), src, thumb: "", title: file.name.replace(/\.[^.]+$/, "").replace(/-/g, " ") };
    const updated = { ...data, videos: [...data.videos, newVideo] };
    await save(updated);
    setUploading(false);
  };

  const removeVideo = async (id) => {
    const updated = { ...data, videos: data.videos.filter(v => v.id !== id) };
    await save(updated);
  };

  const moveVideo = async (index, dir) => {
    const vids = [...data.videos];
    const swap = index + dir;
    if (swap < 0 || swap >= vids.length) return;
    [vids[index], vids[swap]] = [vids[swap], vids[index]];
    await save({ ...data, videos: vids });
  };

  const updateContent = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  if (!authed) return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "black" }}>
      <div style={{ width: "100%", maxWidth: "360px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "40px" }}>
        <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Admin Access</h1>
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { if (password === PASSWORD) setAuthed(true); else setError("Wrong password"); }}}
          style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "12px", padding: "14px 16px", color: "white", fontSize: "16px", outline: "none", boxSizing: "border-box" }} />
        {error && <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
        <button onClick={() => { if (password === PASSWORD) setAuthed(true); else setError("Wrong password"); }}
          style={{ marginTop: "16px", width: "100%", background: "#7c3aed", border: "none", borderRadius: "12px", padding: "14px", color: "white", fontSize: "16px", fontWeight: 600, cursor: "pointer" }}>
          Login
        </button>
      </div>
    </div>
  );

  if (!data) return <div style={{ background: "black", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>Loading...</div>;

  const tabStyle = (t) => ({
    padding: "10px 24px", borderRadius: "999px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 500,
    background: tab === t ? "#7c3aed" : "rgba(255,255,255,0.05)",
    color: tab === t ? "white" : "#9ca3af"
  });

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "12px 14px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" };
  const labelStyle = { color: "#a78bfa", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px", display: "block" };
  const fieldStyle = { marginBottom: "20px" };

  return (
    <div style={{ minHeight: "100vh", background: "black", color: "white", padding: "40px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <p style={{ color: "#a78bfa", fontSize: "13px", marginBottom: "4px" }}>A.rvxStudio</p>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>Site Manager</h1>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {saved && <span style={{ color: "#4ade80", fontSize: "14px" }}>✓ Saved</span>}
            <a href="/" style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>← View Site</a>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
          {["videos", "hero", "about", "contact"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Videos Tab */}
        {tab === "videos" && (
          <div>
            <input ref={fileRef} type="file" accept="video/*" onChange={uploadVideo} style={{ display: "none" }} />
            <button onClick={() => fileRef.current.click()}
              style={{ width: "100%", padding: "20px", borderRadius: "16px", border: "2px dashed rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.05)", color: "#a78bfa", fontSize: "16px", cursor: "pointer", marginBottom: "24px" }}>
              {uploading ? "Uploading..." : "+ Upload Video from Mac or Phone"}
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {data.videos.map((video, index) => (
                <div key={video.id} style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "14px 16px" }}>
                  <video style={{ width: "100px", height: "60px", borderRadius: "8px", objectFit: "cover", background: "#111" }} preload="metadata">
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div style={{ flex: 1 }}>
                    <input value={video.title} onChange={e => {
                      const vids = [...data.videos];
                      vids[index] = { ...vids[index], title: e.target.value };
                      setData({ ...data, videos: vids });
                    }}
                    onBlur={() => save(data)}
                    style={{ ...inputStyle, padding: "8px 12px" }} />
                    <p style={{ color: "#6b7280", fontSize: "12px", margin: "4px 0 0" }}>{video.src}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <button onClick={() => moveVideo(index, -1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "white", padding: "4px 10px", borderRadius: "6px", cursor: "pointer" }}>↑</button>
                    <button onClick={() => moveVideo(index, 1)} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "white", padding: "4px 10px", borderRadius: "6px", cursor: "pointer" }}>↓</button>
                  </div>
                  <button onClick={() => removeVideo(video.id)}
                    style={{ background: "rgba(239,68,68,0.15)", border: "none", color: "#f87171", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Tab */}
        {tab === "hero" && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
            <h2 style={{ marginBottom: "24px", fontSize: "18px" }}>Hero Section</h2>
            {[["tag", "Tag Line"], ["headline", "Main Headline"], ["subheadline", "Sub Headline"]].map(([field, label]) => (
              <div key={field} style={fieldStyle}>
                <label style={labelStyle}>{label}</label>
                <textarea value={data.hero[field]} rows={field === "subheadline" ? 3 : 1}
                  onChange={e => updateContent("hero", field, e.target.value)}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            ))}
            <button onClick={() => save(data)} style={{ background: "#7c3aed", border: "none", borderRadius: "12px", padding: "12px 28px", color: "white", fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
          </div>
        )}

        {/* About Tab */}
        {tab === "about" && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
            <h2 style={{ marginBottom: "24px", fontSize: "18px" }}>About Section</h2>
            {[["tag", "Tag"], ["heading", "Heading"], ["col1", "Left Column"], ["col2", "Right Column"]].map(([field, label]) => (
              <div key={field} style={fieldStyle}>
                <label style={labelStyle}>{label}</label>
                <textarea value={data.about[field]} rows={field.startsWith("col") ? 4 : 2}
                  onChange={e => updateContent("about", field, e.target.value)}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>
            ))}
            <button onClick={() => save(data)} style={{ background: "#7c3aed", border: "none", borderRadius: "12px", padding: "12px 28px", color: "white", fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
          </div>
        )}

        {/* Contact Tab */}
        {tab === "contact" && (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
            <h2 style={{ marginBottom: "24px", fontSize: "18px" }}>Contact Section</h2>
            {[["tag", "Tag"], ["heading", "Heading"], ["subtext", "Sub Text"], ["phone", "Phone Number"], ["email", "Email Address"]].map(([field, label]) => (
              <div key={field} style={fieldStyle}>
                <label style={labelStyle}>{label}</label>
                <input value={data.contact[field]}
                  onChange={e => updateContent("contact", field, e.target.value)}
                  style={inputStyle} />
              </div>
            ))}
            <button onClick={() => save(data)} style={{ background: "#7c3aed", border: "none", borderRadius: "12px", padding: "12px 28px", color: "white", fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
          </div>
        )}

      </div>
    </div>
  );
}
