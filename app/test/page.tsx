"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("Mina");
  const [channelName, setChannelName] = useState("My Channel");
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
  const [email, setEmail] = useState("mina47082@gmail.com");
  const [uploading, setUploading] = useState(false);

  // ✅ Upload avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `/avatars/${fileName}`;

      // Simulate file upload and get public URL
      const publicUrl = URL.createObjectURL(file); // Simulated URL
      setAvatarUrl(publicUrl);

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
    try {
      setAvatarUrl("/default-avatar.png");
      alert("🗑️ Avatar removed successfully!");
    } catch (error) {
      console.error("❌ Error removing avatar:", error);
    }
  };

  // ✅ Save profile info
  const handleSave = async () => {
    setLoading(true);
    alert("✅ Profile updated successfully!");
    setLoading(false);
  };

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
              className="absolute bottom-0 right-0 bg-[#f9c03f] text-[#000000] p-3 rounded-full cursor-pointer transition"
            >
              <Upload size={20} />
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
            <label className="block text-[16px] font-medium text-white/70 mb-2">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="w-full border rounded-md px-4 py-3 bg-white/5 backdrop-blur-xl text-white/70 cursor-not-allowed"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[16px] font-medium text-white/70 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f9c03f]"
            />
          </div>

          {/* Channel Name */}
          <div>
            <label className="block text-[16px] font-medium text-white/70 mb-2">
              Channel Name (optional)
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#f9c03f]"
            />
          </div>

          {/* Subscription */}
          <div className="bg-white/5 backdrop-blur-xl border rounded-[10px] p-5 flex items-center justify-between">
            <div>
              <p className="text-[16px] text-white/70 mb-3">Subscription Plan</p>
              <p className="text-[16px] font-semibold">Free Plan</p>
            </div>
            <button
              className="bg-[#f9c03f] text-[#000000] text-[16px] px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-[#f9c03f] text-[#000000] text-[18px] py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}