// components/ThumbnailGenerator.tsx

"use client";

import { useState, useRef } from "react";
import { UploadCloud, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ThumbnailGenerator() {
  const [selectedCategory, setSelectedCategory] = useState("Gaming");
  const [images, setImages] = useState<string[]>([]);
  const [fileObjs, setFileObjs] = useState<File[]>([]); // REAL FILES
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const dragCounter = useRef(0);

  const categories = [
    "Gaming", "Vlog", "Tech Review", "Reaction", "Tutorial",
    "Study With Me", "Motivation", "Cooking", "Travel",
    "Fitness", "Lifestyle", "Music", "Podcast", "Unboxing",
    "News", "Educational", "Business", "Comedy", "Storytime", "Documentary"
  ];

  // ---------------------- FILE HANDLERS --------------------------

  const handleFiles = (files: FileList) => {
    const list = Array.from(files);

    if (fileObjs.length + list.length > 4) {
      alert("You can upload up to 4 images.");
      return;
    }

    // save originals
    setFileObjs((p) => [...p, ...list]);

    // save thumbnails
    const newPreviews = list.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  // ---------------------- DRAG & DROP --------------------------

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
    dragCounter.current++;
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.preventDefault();
    dragCounter.current = 0;
    setDragActive(false);

    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  // ---------------------- UPLOAD FUNCTION --------------------------

  async function uploadFilesToSupabase(files: File[]) {
    const urls: string[] = [];

    for (const file of files) {
      const id = crypto.randomUUID();
      const ext = file.name.split(".").pop() || "png";
      const path = `uploads/${id}.${ext}`;

      const { error } = await supabaseClient
        .storage
        .from("thumbnails")
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("thumbnails")
        .getPublicUrl(path);

      urls.push(data.publicUrl);
    }

    return urls;
  }

  // ---------------------- GENERATE ACTION --------------------------

  const handleGenerate = async () => {
    try {
      if (!prompt && fileObjs.length === 0) {
        alert("Enter a prompt or upload images.");
        return;
      }

      setLoading(true);

      // Upload images first
      let uploadedUrls: string[] = [];
      if (fileObjs.length > 0) {
        uploadedUrls = await uploadFilesToSupabase(fileObjs);
      }

      // enqueue job
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: prompt.slice(0, 80),
          style: selectedCategory,
          prompt,
          images: uploadedUrls,
          options: { variants: 1 },
          userId: null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data. error || "Queue failed");

      const jobId = data.jobId;

      // polling
      const poll = async () => {
        const r = await fetch(`/api/job-status?jobId=${jobId}`);
        const j = await r.json();

        if (j.status === "done") {
          setLoading(false);
          if (j.publicUrl) window.open(j.publicUrl, "_blank");
        } else if (j.status === "failed") {
          setLoading(false);
          alert("Generation failed: " + j.error);
        } else {
          setTimeout(poll, 2000);
        }
      };

      setTimeout(poll, 1500);
    } catch (err: any) {
      alert(err.message);
      setLoading(false);
    }
  };

  // ---------------------- UI --------------------------

  return (
    <div
      className="w-full flex flex-col items-center text-center mt-16 md:mt-24 mb-28 md:mb-32 relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >

      {/* DRAG OVERLAY */}
      {dragActive && !isMobile && (
        <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-md flex items-center justify-center">
          <div className="text-white text-[34px] md:text-[50px] font-bold">
            Drop image anywhere
          </div>
        </div>
      )}

      {/* CATEGORY SELECTOR */}
      <div className="max-w-full overflow-x-auto flex gap-3 px-3 py-2 scrollbar-hide mb-10 whitespace-nowrap md:flex-wrap md:justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 md:px-4 py-1 rounded-full text-xs md:text-[17px] transition ${
              selectedCategory === c
                ? "bg-[#f9c03f] text-black"
                : "bg-white/10 text-white/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center gap-2 md:gap-3 w-[92%] md:w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur-xl rounded-full px-4 md:px-6 py-3 md:py-4 shadow-lg">
        <label className="cursor-pointer flex items-center gap-2 text-white/80 hover:text-white">
          <UploadCloud size={20} />
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>

        <input
          type="text"
          placeholder="Describe your thumbnail..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white text-sm md:text-lg placeholder-white/50"
        />

        <button
          onClick={handleGenerate}
          className="bg-[#f9c03f] hover:bg-[#ffd873] text-black px-4 md:px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Generate</span><ArrowRight size={16} /></>}
        </button>
      </div>

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="flex gap-4 mt-10 md:mt-14 justify-center flex-wrap">
          {images.map((src, i) => (
            <img key={i} src={src} className="w-20 h-20 rounded-xl object-cover shadow-lg" />
          ))}
        </div>
      )}
    </div>
  );
}