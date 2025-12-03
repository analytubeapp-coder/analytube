"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useSupabaseAuth } from "@/lib/SupabaseProvider";
import { Upload, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useSupabaseAuth();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);

  // 🔹 Load profile
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("full_name, channel_name, avatar_url, plan")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setChannelName(data.channel_name || "");
        setAvatarUrl(data.avatar_url || "");
        setEmail(user.email || "");
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  // Upload avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file || !user) return;

      const ext = file.name.split(".").pop();
      const fileName = `${user.id}.${ext}`;
      const filePath = `${user.id}/${fileName}`;

      await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const url = publicData.publicUrl;

      setAvatarUrl(url);

      await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);

      alert("Avatar updated!");
    } catch (e) {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Remove avatar
  const handleRemoveAvatar = async () => {
    if (!user) return;
    try {
      const filePath = `${user.id}/${user.id}.jpg`;
      await supabase.storage.from("avatars").remove([filePath]);

      await supabase.from("profiles").update({ avatar_url: null }).eq("id", user.id);
      setAvatarUrl("");

      alert("Avatar removed.");
    } catch (e) {
      console.error(e);
    }
  };

  // Save
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    await supabase
      .from("profiles")
      .update({ full_name: fullName, channel_name: channelName })
      .eq("id", user.id);

    alert("Saved!");
    router.push("/");
    setLoading(false);
  };

  // Upgrade
  const handleUpgrade = () => router.push("/pricing");

  if (!user)
    return (
      <div className="text-center py-20 text-white">Please sign in.</div>
    );

  if (loading)
    return <div className="text-center py-20 text-gray-400">Loading…</div>;

  return (
    <div className="relative min-h-screen w-full text-white">

      {/* AURORA BACKGROUND */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div
          className="
            absolute top-[35%] left-[55%]
            w-[2000px] h-[650px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[25deg]
            rounded-[9999px] blur-[150px] opacity-60
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(170,110,255,0.55), transparent 80%)",
          }}
        />

        <div
          className="
            absolute top-[60%] left-[40%]
            w-[1200px] h-[650px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[-30deg]
            rounded-[9999px] blur-[150px] opacity-60
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,180,100,0.55), transparent 90%)",
              }}
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/50 z-[-1]"></div>

      {/* 🌟 GLASS CONTAINER WRAPPER */}
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/25 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <Image
                src={avatarUrl || "/default-avatar.png"}
                alt="Avatar"
                width={130}
                height={130}
                className="rounded-full object-cover border-2 border-white/30"
              />

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#fcc978] text-black p-3 rounded-full cursor-pointer"
              >
                <Upload size={20} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {avatarUrl && (
              <button
                onClick={handleRemoveAvatar}
                className="mt-3 flex items-center gap-1 text-red-400 hover:text-red-500"
              >
                <Trash2 size={16} /> Remove Avatar
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-8">

            <div>
              <label className="text-white/70 text-sm">Email</label>
              <input
                value={email}
                disabled
                className="w-full mt-1 px-4 py-3 bg-white/10 border border-white/20 text-white/70 rounded-xl"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl focus:ring-[#fcc978]"
              />
            </div>

            <div>
              <label className="text-white/70 text-sm">Channel Name</label>
              <input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-black/20 border border-white/20 rounded-xl focus:ring-[#fcc978]"
              />
            </div>

            {/* Subscription */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-white/70 text-sm">Subscription Plan</p>
                <p className="font-semibold text-white">
                  {profile?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </p>
              </div>

              {profile?.plan !== "pro" && (
                <button
                  onClick={handleUpgrade}
                  className="bg-[#fcc978] px-6 py-3 rounded-full text-black font-semibold"
                >
                  Upgrade
                </button>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full bg-[#fcc978] text-black py-3 rounded-full font-semibold"
            >
              {loading ? "Saving…" : "Save Changes"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}