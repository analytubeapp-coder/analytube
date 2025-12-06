"use strict";
// worker/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const openai_1 = __importDefault(require("openai"));
const supabase_js_1 = require("@supabase/supabase-js");
const sharp_1 = __importDefault(require("sharp"));
const promises_1 = __importDefault(require("fs/promises"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
async function popJob() {
    const res = await (0, node_fetch_1.default)(`${redisUrl}/lpop/jobs`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${redisToken}`,
            "Content-Type": "application/json"
        }
    });
    const text = await res.text();
    if (!text)
        return null;
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
        }
        catch (err) {
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
async function processJob(job) {
    const jobId = job.jobId;
    const prompt = job.prompt ||
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
    const imageB64 = data[0].b64_json;
    const buffer = Buffer.from(imageB64, "base64");
    const tmpOutput = path_1.default.join(os_1.default.tmpdir(), jobId + ".png");
    await promises_1.default.writeFile(tmpOutput, buffer);
    // Resize final image to correct dimensions
    const finalPath = path_1.default.join(os_1.default.tmpdir(), jobId + "-final.png");
    await (0, sharp_1.default)(tmpOutput).resize(1792, 1024).png().toFile(finalPath);
    const storagePath = `thumbnails/${jobId}.png`;
    const fileBuffer = await promises_1.default.readFile(finalPath);
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
