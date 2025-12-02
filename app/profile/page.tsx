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

  // 🔹 Load profile data
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, channel_name, avatar_url, plan")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("❌ Error loading profile:", error);
      } else {
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

  // ✅ Upload avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file || !user) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;
      setAvatarUrl(publicUrl);

      await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      alert("✅ Avatar updated successfully!");
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
      alert("❌ Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Remove avatar
  const handleRemoveAvatar = async () => {
    if (!user) return;
    try {
      const filePath = `${user.id}/${user.id}.jpg`;
      await supabase.storage.from("avatars").remove([filePath]);

      await supabase.from("profiles").update({ avatar_url: null }).eq("id", user.id);
      setAvatarUrl("");
      alert("🗑️ Avatar removed successfully!");
    } catch (error) {
      console.error("❌ Error removing avatar:", error);
    }
  };

  // ✅ Save profile info
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        channel_name: channelName,
      })
      .eq("id", user.id);

    if (error) console.error("❌ Error saving profile:", error);
    else {
      alert("✅ Profile updated successfully!");
      router.push("/"); // ✅ برگشت به صفحه اصلی
    }

    setLoading(false);
  };

  // ✅ Upgrade button → redirect to pricing
  const handleUpgrade = () => {
    router.push("/pricing");
  };

  if (!user)
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">You’re not signed in</h2>
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="relative min-h-screen w-full text-white">

      {/* 🌈 AURORA FIXED BACKGROUND */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        {/* Purple Glow */}
        <div
          className="
            absolute top-[35%] left-[55%]
            w-[900px] h-[450px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[25deg]
            rounded-[9999px] blur-[160px] opacity-100
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(170,110,255,0.55), transparent 90%)",
          }}
        ></div>

        {/* Gold Glow */}
        <div
          className="
            absolute top-[60%] left-[40%]
            w-[1000px] h-[550px]
            -translate-x-1/2 -translate-y-1/2
            rotate-[-30deg]
            rounded-[9999px] blur-[100px] opacity-100
          "
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,180,100,0.55), transparent 90%)",
          }}
        ></div>
      </div>

      {/* Dark Overlay */}
      <div className="fixed inset-0 z-[-1] bg-black/50"></div>

      <div className="max-w-2xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <Image
              src={avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              width={130}
              height={130}
              className="rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-[#fcc978] text-[#FFFFFF] p-3 rounded-full cursor-pointer hover:opacity-80 transition"
            >
              <Upload size={18} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={uploading}
            />
          </div>

          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
          {avatarUrl && (
            <button
              onClick={handleRemoveAvatar}
              className="mt-3 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition"
            >
              <Trash2 size={16} /> Remove Avatar
            </button>
          )}
        </div>

        {/* Profile Fields */}
        <div className="space-y-8">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="w-full border rounded-md px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcc978]"
            />
          </div>

          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel Name (optional)
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcc978]"
            />
          </div>

          {/* Subscription */}
          <div className="bg-gray-50 border rounded-lg p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subscription Plan</p>
              <p className="font-semibold">
                {profile?.
                plan === "pro" ? "Pro Plan ✅" : "Free Plan"}
              </p>
            </div>
            {profile?.plan !== "pro" && (
              <button
                onClick={handleUpgrade}
                className="bg-[#fcc978] text-[#FFFFFF] px-6 py-3 rounded-full font-semibold hover:opacity-80 transition"
              >
                Upgrade to Pro
              </button>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#000000] text-white py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}