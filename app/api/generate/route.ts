// app/api/generate/route.ts

import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import IORedis from "ioredis";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, style, prompt, images = [], options = {}, userId = null } = body;

    if (!prompt && !title) {
      return NextResponse.json({ error: "Missing prompt/title" }, { status: 400 });
    }

    // LAZY INIT — only run on request (NOT during build)
    const redis = new IORedis(process.env.REDIS_URL!);
    const queue = new Queue("thumbnails", { connection: redis });

    const jobId = uuidv4();

    const jobPayload = {
      jobId,
      userId,
      title,
      style,
      prompt,
      images,
      options,
      createdAt: new Date().toISOString()
    };

    await queue.add("generate", jobPayload, {
      jobId,
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 }
    });

    return NextResponse.json({ jobId, status: "queued" });
  } catch (err: any) {
    console.error("API /generate error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}