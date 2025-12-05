import { Redis } from "@upstash/redis";
import OpenAI from "openai";
import fetch from "node-fetch";
import sharp from "sharp";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

async function processJob(job: any) {
  console.log("Processing job:", job.jobId);

  const jobId = job.jobId;

  const superPrompt = `
Create a high-quality YT thumbnail:
STYLE: ${job.style}
TITLE: ${job.title}
PROMPT: ${job.prompt}
No watermark. 1792x1024 PNG.
`.trim();

  const resp = await openai.images.generate({
    model: "gpt-image-1",
    prompt: superPrompt,
    size: "1792x1024",
    n: 1
  });

  const b64 = resp.data?.[0]?.b64_json!;
  const png = Buffer.from(b64, "base64");

  const tmp = path.join(os.tmpdir(), `${jobId}.png`);
  await fs.writeFile(tmp, png);

  const final = path.join(os.tmpdir(), `${jobId}-final.png`);
  await sharp(tmp).png().toFile(final);

  const storagePath = `thumbnails/${jobId}.png`;
  const fileBuf = await fs.readFile(final);

  const { error } = await supabase.storage
    .from("thumbnails")
    .upload(storagePath, fileBuf, { upsert: true });

  if (error) throw error;

  await supabase.from("thumbnails").insert({
    job_id: jobId,
    prompt: job.prompt,
    title: job.title,
    style: job.style,
    storage_path: storagePath,
    status: "done"
  });

  console.log("Job finished:", jobId);
}

async function loop() {
  while (true) {
    const job = await redis.rpop("queue:thumbnails");

    if (job) {
      try {
        await processJob(job);
      } catch (err) {
        console.error("Job failed:", err);
      }
    }

    // prevent CPU spam
    await new Promise(r => setTimeout(r, 300));
  }
}

loop();