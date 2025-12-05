// app/api/generate/route.ts

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Lightweight queue using Upstash REST
async function enqueue(jobId: string, payload: any) {
  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/rpush/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      value: JSON.stringify({ jobId, ...payload }),
    }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, style, prompt, images = [], options = {}, userId = null } = body;

    if (!prompt && !title) {
      return NextResponse.json({ error: "Missing prompt/title" }, { status: 400 });
    }

    const jobId = uuidv4();

    await enqueue(jobId, {
      userId,
      title,
      style,
      prompt,
      images,
      options,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ jobId, status: "queued" });

  } catch (err: any) {
    console.error("API /generate error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}