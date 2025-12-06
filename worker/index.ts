// worker/index.ts

import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL!;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN!;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function popJob() {
  const res = await fetch(`${redisUrl}/lpop/jobs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json"
    }
  });

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

async function loop() {
  console.log("Worker running...");

  while (true) {
    const job = await popJob();
    if (!job) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    console.log("Processing job:", job.jobId);

    try {
      await processJob(job);
    } catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);

  console.error("Job failed:", message);

  await supabase.from("thumbnails").insert({
    job_id: job.jobId,
    status: "failed",
    error: message
  });
}
  }
}

async function processJob(job: any) {
  const jobId = job.jobId;

  const prompt =
    job.prompt ||
    job.title ||
    "Cinematic high contrast professional YouTube thumbnail";

  const finalPrompt = `
You are a thumbnail designer. Generate 1792x1024 PNG.
${prompt}
`;

  // Call OpenAI
const resp = await openai.images.generate({
  model: "gpt-image-1",
  prompt: finalPrompt,
  size: "1792x1024"
});

// Fix TypeScript error — full safety check
const data = resp.data;

if (!data || !data[0] || !data[0].b64_json) {
  throw new Error("No image data received from OpenAI");
}

const imageB64: string = data[0].b64_json;
const buffer = Buffer.from(imageB64, "base64");

  const tmpOutput = path.join(os.tmpdir(), jobId + ".png");
  await fs.writeFile(tmpOutput, buffer);

  // Resize final image to correct dimensions
  const finalPath = path.join(os.tmpdir(), jobId + "-final.png");
  await sharp(tmpOutput).resize(1792, 1024).png().toFile(finalPath);

  const storagePath = `thumbnails/${jobId}.png`;
  const fileBuffer = await fs.readFile(finalPath);

  await supabase.storage.from("thumbnails").upload(storagePath, fileBuffer, {
    upsert: true
  });

  await supabase.from("thumbnails").insert({
    job_id: jobId,
    title: job.title,
    prompt: job.prompt,
    style: job.style,
    storage_path: storagePath,
    status: "done"
  });

  console.log("Job completed:", jobId);
}

loop();