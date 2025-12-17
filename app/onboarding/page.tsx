"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Upload } from "lucide-react";

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

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/signin");
        return;
      }

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
        router.replace("/dashboard");
        return;
      }

      const { data: cats } = await supabase.from("channel_categories").select("*");
      const { data: langs } = await supabase.from("channel_languages").select("*");

      setCategories(cats || []);
      setLanguages(langs || []);
      setCheckingProfile(false);
    };

    init();
  }, [router]);

  if (checkingProfile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalCategory = category === "other" ? otherCategory.trim() : category;

    if (!fullName || !channelName || !finalCategory || !language) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Authentication error.");
      setLoading(false);
      return;
    }

    let avatarUrl: string | null = null;
    if (avatarFile) {
      const ext = avatarFile.name.split(".").pop();
      const filePath = `${user.id}/${user.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
        avatarUrl = data.publicUrl;
      }
    }

    const payload: any = {
      full_name: fullName,
      channel_name: channelName,
      channel_category: finalCategory,
      channel_language: language,
      updated_at: new Date().toISOString(),
    };

    if (avatarUrl) payload.avatar_url = avatarUrl;

    const { error: dbError } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", user.id);

    if (dbError) {
      console.error(dbError);
      setError("Failed to save profile.");
    } else {
      router.replace("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/25 rounded-3xl p-10 space-y-6 shadow-2xl relative"
      >
        {/* HEADER + AVATAR */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold mt-2">Set up your channel</h1>

          <div className="flex flex-col items-center gap-3">
            {/* AVATAR CIRCLE */}
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-white/30">
            {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-white/20 flex items-center justify-center rounded-full text-black text-sm">
                  Avatar
                </div>
              )}

              {/* UPLOAD BUTTON */}
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 bg-[#fcc978] text-black p-2 rounded-full cursor-pointer shadow-lg hover:scale-105 transition"
              >
                <Upload size={15} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>

        {/* INPUT FIELDS */}
        <div className="space-y-5">
          <input
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:ring-[#fcc978]"
          />
          <input
            placeholder="YouTube channel name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:ring-[#fcc978]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:ring-[#fcc978]"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
          {category === "other" && (
            <input
              placeholder="Enter your category"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:ring-[#fcc978]"
            />
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white focus:ring-[#fcc978]"
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
            className={`w-full py-3 rounded-full text-black font-semibold transition ${
              loading ? "bg-[#fcc978] opacity-70 cursor-not-allowed" : "bg-[#fcc978] hover:bg-[#f9c03f]"
            }`}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}