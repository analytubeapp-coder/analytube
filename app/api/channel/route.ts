import { NextResponse } from "next/server";
import { Pool } from "pg";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env.local")) dotenv.config({ path: ".env.local" });
else dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing channel ID" }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `SELECT c.id, c.title, c.description, c.thumbnail,
              s.subscriber_count, s.view_count, s.video_count
       FROM channels c
       LEFT JOIN LATERAL (
         SELECT * FROM channel_snapshots s
         WHERE s.channel_id = c.id
         ORDER BY s.ts DESC
         LIMIT 1
       ) s ON true
       WHERE c.id = $1`,
      [id]
    );
    client.release();

    if (!rows.length)
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });

    return NextResponse.json({ channel: rows[0] });
  } catch (err: any) {
    console.error("❌ Error fetching channel:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
