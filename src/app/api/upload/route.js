import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = file.name.replace(/\s+/g, "-").toLowerCase();
  const filepath = path.join(process.cwd(), "public", filename);
  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({ src: `/${filename}` });
}
