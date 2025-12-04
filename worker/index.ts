// worker/index.ts
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import os from "os";
import sharp from "sharp";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const connection = new IORedis(redisUrl);

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function downloadToTmp(url: string) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const tmpPath = path.join(os.tmpdir(), uuidv4() + ".jpg");
  await fs.writeFile(tmpPath, buffer);
  return tmpPath;
}

async function uploadToSupabase(filePath: string, destPath: string) {
  const buf = await fs.readFile(filePath);
  const { error } = await supabase.storage.from("thumbnails").upload(destPath, buf, {
    cacheControl: "3600",
    upsert: true,
    contentType: "image/png"
  });
  if (error) throw error;
  const { data: publicData } = supabase.storage.from("thumbnails").getPublicUrl(destPath);
  return publicData.publicUrl;
}

const worker = new Worker(
  "thumbnails",
  async job => {
    const payload = job.data as any;
    console.log("Worker: processing", payload.jobId);

    const jobId = payload.jobId || uuidv4();
    const prompt = payload.prompt || payload.title || "YouTube thumbnail";
    const style = payload.style || "default";
    const images = payload.images || [];

    // Build super prompt
    const superPrompt = `
You are a pro thumbnail designer. Create a single cinematic, high-contrast, high-CTR YouTube thumbnail.
STYLE: ${style}
TITLE: ${payload.title || ""}
PROMPT: ${prompt}
OUTPUT: PNG, 1792x1024, sharp composition, space for title, no watermark.
`.trim();

    // Call OpenAI images API (gpt-image-1). Adjust if using other provider.
    const resp = await openai.images.generate({
      model: "gpt-image-1",
      prompt: superPrompt,
      size: "1792x1024",
      n: 1
    });

    const b64 = resp.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image data from image generation provider");

    const buffer = Buffer.from(b64, "base64");
    const tmpOut = path.join(os.tmpdir(), `${jobId}.png`);
    await fs.writeFile(tmpOut, buffer);

    // If user provided image(s), attempt a simple composite using sharp
    if (images.length > 0) {
      try {
        const userTmp = await downloadToTmp(images[0]);
        const userBuf = await sharp(userTmp).resize(700, 700, { fit: "cover" }).png().toBuffer();
        const base = sharp(tmpOut);
        const baseMeta = await base.metadata();

        const composite = await base
          .composite([{ input: userBuf, left: 60, top: Math.floor((baseMeta.height! - 700) / 2) }])
          .png()
          .toBuffer();

        await fs.writeFile(tmpOut, composite);
        await fs.unlink(userTmp).catch(() => {});
      } catch (err) {
        console.warn("Composite step failed, continuing:", err);
      }
    }

    // Ensure final PNG & size
    const finalPath = path.join(os.tmpdir(), `${jobId}-final.png`);
    await sharp(tmpOut).resize(1792, 1024, { fit: "cover" }).png().toFile(finalPath);

    // Upload
    const storagePath = `thumbnails/${jobId}.png`;
    const publicUrl = await uploadToSupabase(finalPath, storagePath);

    // Insert metadata
    await supabase.from("thumbnails").insert({
      job_id: jobId,
      user_id: payload.userId || null,
      style,
      prompt,
      title: payload.title || null,
      storage_path: storagePath,
      width: 1792,
      height: 1024,
      status: "done"
    });

    // cleanup
    await fs.unlink(tmpOut).catch(() => {});
    await fs.unlink(finalPath).catch(() => {});

    return { publicUrl };
  },
  { connection, concurrency: 1 }
);

worker.on("completed", (job, result) => {
  console.log("Job completed:", job.id, result);
  });

worker.on("failed", (job, err) => {
  console.error("Job failed:", job?.id, err);
  // optionally update thumbnails table with status failed
});