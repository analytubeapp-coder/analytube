"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Upload, ChevronDown } from "lucide-react";

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

const [categories, setCategories] = useState<
{ key: string; label: string; is_other: boolean }[]
>([]);
const [languages, setLanguages] = useState<
{ code: string; label: string }[]
>([]);

// 🔹 Check profile & fetch options
useEffect(() => {
const init = async () => {
const {
data: { user },
} = await supabase.auth.getUser();

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

const { data: cats } = await supabase
.from("channel_categories")
.select("*");
const { data: langs } = await supabase
.from("channel_languages")
.select("*");

setCategories(cats || []);
setLanguages(langs || []);
setCheckingProfile(false);
};

init();
}, [router]);

if (checkingProfile) return null;

// 🔹 Submit (UNCHANGED)
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setError("");

const finalCategory =
category === "other" ? otherCategory.trim() : category;

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
const filePath = `${user.id}/${user.id}.${ext}`;

const { error: uploadError } = await supabase.storage
.from("avatars")
.upload(filePath, avatarFile, { upsert: true });

if (!uploadError) {
const { data } = supabase.storage
.from("avatars")
.getPublicUrl(filePath);
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
className="w-full max-w-lg backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 space-y-8"
>
{/* HEADER + AVATAR */}
<div className="flex justify-between items-start">
<h1 className="text-3xl font-bold mt-3">Set up your channel</h1>

<div className="relative w-[110px] h-[110px]">
<div className="w-full h-full rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center text-white/60 text-sm">
{avatarFile ? (
<img
src={URL.createObjectURL(avatarFile)}
alt="Avatar"
className="w-full h-full object-cover rounded-full"
/>
) : (
"Avatar"
)}
</div>

{/* UPLOAD BUTTON */}
<label
htmlFor="avatar-upload"
className="absolute -bottom-3 -right-3 bg-[#fcc978] text-black p-3 rounded-full cursor-pointer shadow-lg hover:scale-105 transition"
>
<Upload size={14} />
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

{/* FIELDS */}
<div className="space-y-6">
<input
placeholder="Your full name"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20"
/>

<input
placeholder="YouTube channel name"
value={channelName}
onChange={(e) => setChannelName(e.target.value)}
className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20"
/>

{/* CATEGORY */}
<div className="relative">
<select
value={category}
onChange={(e) => setCategory(e.target.value)}
className="w-full px-4 py-3 pr-12 rounded-xl bg-black/30 border border-white/20 appearance-none"
>
<option value="">Select category</option>
{categories.map((cat) => (
<option key={cat.key} value={cat.key}>
{cat.label}
</option>
))}
</select>
<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
</div>

{category === "other" && (
<input
placeholder="Enter your category"
value={otherCategory}
onChange={(e) => setOtherCategory(e.target.value)}
className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20"
/>
)}

{/* LANGUAGE */}
<div className="relative">
<select
value={language}
onChange={(e) => setLanguage(e.target.value)}
className="w-full px-4 py-3 pr-12 rounded-xl bg-black/30 border border-white/20 appearance-none"
>
<option value="">Select language</option>
{languages.map((lang) => (
<option key={lang.code} value={lang.code}>
{lang.label}
</option>
))}
</select>
<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
</div>

{error && <p className="text-red-400 text-sm">{error}</p>}

<button
disabled={loading}
className="w-full py-3 rounded-full text-black font-semibold bg-[#fcc978] hover:opacity-90 transition"
>
{loading ? "Saving..." : "Continue"}
</button>
</div>
</form>
</div>
);
}