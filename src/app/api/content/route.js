import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
  return NextResponse.json({ success: true });
}
