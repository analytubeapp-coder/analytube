"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OnboardingPage() {
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [categories, setCategories] = useState<{ key: string; label: string; is_other: boolean }[]>([]);
  const [languages, setLanguages] = useState<{ code: string; label: string }[]>([]);

  /* =========================
     Check profile & fetch options
  ========================= */
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/signin");
        return;
      }

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, channel_name, channel_category, channel_language")
        .eq("id", user.id)
        .single();

      if (
        profile?.full_name &&
        profile?.channel_name &&
        profile?.channel_category &&
        profile?.channel_language
      ) {
        router.replace("/home");
        return;
      }

      // Fetch options from Supabase
      const { data: cats } = await supabase.from("channel_categories").select("*");
      const { data: langs } = await supabase.from("channel_languages").select("*");

      setCategories(cats || []);
      setLanguages(langs || []);
      setCheckingProfile(false);
    };

    init();
  }, [router]);

  if (checkingProfile) return null;

  /* =========================
     Submit
  ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalCategory = category === "other" ? otherCategory.trim() : category;

    if (!fullName || !channelName || !finalCategory || !language) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Authentication error.");
      setLoading(false);
      return;
    }

    let avatarUrl: string | null = null;

    if (avatarFile) {
      const ext = avatarFile.name.split(".").pop();
      const path = `avatars/${user.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, avatarFile, { upsert: true, cacheControl: "3600" });

      if (uploadError) {
        setError("Avatar upload failed.");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      avatarUrl = data.publicUrl;
    }

    const payload: any = {
      id: user.id,
      email: user.email,
      full_name: fullName,
      channel_name: channelName,
      channel_category: finalCategory,
      channel_language: language,
      updated_at: new Date().toISOString(),
    };

    if (avatarUrl) payload.avatar_url = avatarUrl;

    const { error: dbError } = await supabase.from("profiles").upsert(payload);

    if (dbError) {
      setError("Failed to save profile.");
    } else {
      router.replace("/home");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">Set up your channel</h1>

        {/* Avatar */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          className="w-full text-sm text-white/70"
        />

        {/* Full Name */}
        <input
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input"
        />

        {/* Channel Name */}
        <input
          placeholder="YouTube channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="input"
        />

        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Other Category Input */}
        {category === "other" && (
          <input
            placeholder="Enter your category"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
            className="input"
          />
        )}

        {/* Language Select */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="input"
        >
          <option value="">Select language</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          disabled={loading}
          className={`w-full py-3 rounded-full text-black font-semibold text-lg transition
            ${
              loading
                ? "bg-[#fcc978] opacity-70 cursor-not-allowed"
                : "bg-[#f9c03f] hover:bg-[#fcc978]"
            }`}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  );
}