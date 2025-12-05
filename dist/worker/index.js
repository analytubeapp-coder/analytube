// dist/worker/index.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const supabase_js_1 = require("@supabase/supabase-js");
const openai_1 = __importDefault(require("openai"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const sharp_1 = __importDefault(require("sharp"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const uuid_1 = require("uuid");
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const connection = new ioredis_1.default(redisUrl);
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function downloadToTmp(url) {
    const res = await (0, node_fetch_1.default)(url);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tmpPath = path_1.default.join(os_1.default.tmpdir(), (0, uuid_1.v4)() + ".jpg");
    await promises_1.default.writeFile(tmpPath, buffer);
    return tmpPath;
}
async function uploadToSupabase(filePath, destPath) {
    const buf = await promises_1.default.readFile(filePath);
    const { error } = await supabase.storage.from("thumbnails").upload(destPath, buf, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/png"
    });
    if (error)
        throw error;
    const { data: publicData } = supabase.storage.from("thumbnails").getPublicUrl(destPath);
    return publicData.publicUrl;
}
const worker = new bullmq_1.Worker("thumbnails", async (job) => {
    var _a, _b;
    const payload = job.data;
    console.log("Worker: processing", payload.jobId);
    const jobId = payload.jobId || (0, uuid_1.v4)();
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
    const b64 = (_b = (_a = resp.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.b64_json;
    if (!b64)
        throw new Error("No image data from image generation provider");
    const buffer = Buffer.from(b64, "base64");
    const tmpOut = path_1.default.join(os_1.default.tmpdir(), `${jobId}.png`);
    await promises_1.default.writeFile(tmpOut, buffer);
    // If user provided image(s), attempt a simple composite using sharp
    if (images.length > 0) {
        try {
            const userTmp = await downloadToTmp(images[0]);
            const userBuf = await (0, sharp_1.default)(userTmp).resize(700, 700, { fit: "cover" }).png().toBuffer();
            const base = (0, sharp_1.default)(tmpOut);
            const baseMeta = await base.metadata();
            const composite = await base
                .composite([{ input: userBuf, left: 60, top: Math.floor((baseMeta.height - 700) / 2) }])
                .png()
                .toBuffer();
            await promises_1.default.writeFile(tmpOut, composite);
            await promises_1.default.unlink(userTmp).catch(() => { });
        }
        catch (err) {
            console.warn("Composite step failed, continuing:", err);
        }
    }
    // Ensure final PNG & size
    const finalPath = path_1.default.join(os_1.default.tmpdir(), `${jobId}-final.png`);
    await (0, sharp_1.default)(tmpOut).resize(1792, 1024, { fit: "cover" }).png().toFile(finalPath);
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
    await promises_1.default.unlink(tmpOut).catch(() => { });
    await promises_1.default.unlink(finalPath).catch(() => { });
    return { publicUrl };
}, { connection, concurrency: 1 });
worker.on("completed", (job, result) => {
    console.log("Job completed:", job.id, result);
});
worker.on("failed", (job, err) => {
    console.error("Job failed:", job === null || job === void 0 ? void 0 : job.id, err);
    // optionally update thumbnails table with status failed
});
