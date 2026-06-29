import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { frameIndex, imageData } = await req.json();

    const dir = path.join(process.cwd(), "public", "images", "sequence");
    await mkdir(dir, { recursive: true });

    const num = (frameIndex as number).toString().padStart(3, "0");
    const filename = `ezgif-frame-${num}.jpg`;
    const filePath = path.join(dir, filename);

    // imageData is a base64 data URL like "data:image/jpeg;base64,..."
    const base64 = (imageData as string).replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, file: filename });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
