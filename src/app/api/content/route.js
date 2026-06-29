import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const defaultData = {
  hero: {
    headline: "A.rvxStudio",
    subheadline: "Turning visuals into experiences through motion design, cinematic editing and digital storytelling.",
    tag: "Motion Graphics • Video Editing"
  },
  about: {
    tag: "About",
    heading: "Creating Motion\nThat Captures Attention",
    col1: "I'm A.rvxStudio, a freelance video editor and motion graphics artist focused on creating visually striking content for creators, brands and digital products.",
    col2: "From short-form content to advanced motion graphics and UI animation, I help ideas become engaging visual experiences."
  },
  contact: {
    tag: "Contact",
    heading: "Let's Work Together",
    subtext: "Available for freelance projects worldwide.",
    phone: "+256 778 642 803",
    email: "Adrianrave75@gmail.com"
  },
  videos: [
    { id: 1, driveId: "1GqcEnCj2FoUmVEluZTL1A1EEju2DVvw_", title: "Norman Zizoff Environmental Hero Reel" },
    { id: 2, driveId: "1wPkboCk-g29YVCcT8_AVYKccaJK72_Mz", title: "Afro Mobile App" },
    { id: 3, driveId: "1BlJG9sxxg-PK3AlfSwuYjb46LXbDwI7X", title: "Content Creation Secrets" },
    { id: 4, driveId: "1d6pUWWfzaXey0qeAepfOhiZIljOmDmSB", title: "Fear of Failure" },
    { id: 5, driveId: "1E-jHNiOSXpqbiBk_qsjzQqHqsDKkhfXO", title: "Force Your Brain to Change" },
    { id: 6, driveId: "1Ok59G5fZ0CGptriXG5ETtESiuxCNqLab", title: "How I Go to Build My Wealth" },
    { id: 7, driveId: "1leZhwvM_tsXGd6nZLhYjb_R70SfOVtMp", title: "How to Improve Your Time" },
    { id: 8, driveId: "1r-Cos8gNE2g8Tgi_MmQ4OMOt0DVqISjr", title: "Inspiration" },
    { id: 9, driveId: "1-QPY1on04Ny2_uV2ef71b-vXjIXhfaY9", title: "Project Showcase" },
    { id: 10, driveId: "1eI8koA-IPZXVmZ3L3BjqKOe_8F6swqNf", title: "Featured Work" }
  ]
};

export async function GET() {
  try {
    let data = await redis.get("siteData");
    if (!data) {
      await redis.set("siteData", defaultData);
      data = defaultData;
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(defaultData);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await redis.set("siteData", body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}