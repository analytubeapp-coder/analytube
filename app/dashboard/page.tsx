"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Channel {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  published_at: string | null;
  country: string | null;
  custom_url: string | null;
}

export default function Dashboard() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      if (!url) {
        console.error("❌ No URL found in query params");
        setLoading(false);
        return;
      }

      try {
        // مرحله ۱️⃣ بررسی اینکه کانال از قبل در دیتابیس هست یا نه
        console.log("🔍 Checking if channel exists in DB...");
        const { data: existing, error: checkError } = await supabase
          .from("channels")
          .select("*")
          .ilike("custom_url", `%${url}%`)
          .maybeSingle();

        if (checkError) {
          console.error("❌ Error checking channel:", checkError);
        }

        if (existing) {
          console.log("✅ Channel found in DB:", existing.title);
          setChannel(existing);
          setLoading(false);
          return;
        }

        // مرحله ۲️⃣ اگر نبود، از /api/search اطلاعات بگیر
        console.log("📡 Channel not found — fetching from API...");
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: url }),
        });

        const data = await res.json();

        if (!res.ok || !data.channelId) {
          throw new Error(data.error || "Failed to fetch channel info");
        }

        // مرحله ۳️⃣ ذخیره در دیتابیس
        console.log("💾 Saving channel to DB...");
        const { error: insertError } = await supabase.from("channels").upsert({
          id: data.channelId,
          title: data.title,
          description: data.description,
          thumbnail: data.thumbnail,
          published_at: data.publishedAt,
          country: data.country || null,
          custom_url: data.customUrl || url,
        });

        if (insertError) {
          console.error("❌ Error saving channel:", insertError);
          throw insertError;
        }

        // مرحله ۴️⃣ حالا مجدداً از دیتابیس بخون تا state آپدیت شه
        const { data: saved } = await supabase
          .from("channels")
          .select("*")
          .eq("id", data.channelId)
          .single();

        setChannel(saved);
        console.log("✅ Channel saved and loaded successfully:", saved.title);
      } catch (err: any) {
        console.error("❌ Unexpected error in fetchChannel:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [url, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Loading channel data...</p>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No channel data found.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-6">{channel.title}</h1>
        <div className="flex items-center gap-6 mb-6">
          {channel.thumbnail && (
            <img
              src={channel.thumbnail}
              alt={channel.title}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div>
            <p className="text-gray-700">{channel.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Country: {channel.country || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Created:{" "}
              {channel.published_at
                ? new Date(channel.published_at).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <h2 className="text-xl font-semibold mb-4">Channel Insights</h2>
          <p className="text-gray-600">
            (Coming soon — analytics, growth charts, and more!)
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
