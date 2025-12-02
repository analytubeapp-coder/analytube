"use client";

import { useState, useRef } from "react";
import { UploadCloud, ArrowRight, Loader2 } from "lucide-react";

export default function ThumbnailGenerator() {
  const [selectedCategory, setSelectedCategory] = useState("Gaming");
  const [images, setImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const dragCounter = useRef(0);

  const categories = [
    "Gaming", "Vlog", "Tech Review", "Reaction",
    "Tutorial", "Study With Me", "Motivation",
    "Cooking", "Travel", "Fitness", "Lifestyle",
    "Music", "Podcast", "Unboxing", "News",
    "Educational", "Business", "Comedy",
    "Storytime", "Documentary"
  ];

  // ---------------------- HANDLE FILES ----------------------
  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);

    if (images.length + fileArray.length > 4) {
      alert("You can upload up to 4 images.");
      return;
    }

    const newImgs = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImgs]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  // ---------------------- DRAG EVENTS (NO MORE FLICKER) ----------------------
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current++;
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragActive(false);

    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  // ---------------------- GENERATE ----------------------
  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Generated! (fake for now)");
    }, 2000);
  };

  return (
    <div
      className="w-full flex flex-col items-center text-center mt-24 mb-32 relative"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >

      {/* ---------------------- DRAG OVERLAY ---------------------- */}
      {dragActive && (
        <div className="
          fixed inset-0 z-[999] 
          bg-black/30 backdrop-blur-md 
          flex items-center justify-center
          animate-fadeIn
        ">
          {/* Corners */}
          <div className="absolute top-8 left-8 w-20 h-20 border-t-10 border-l-10 border-white rounded-tl-4xl"></div>
          <div className="absolute top-8 right-8 w-20 h-20 border-t-10 border-r-10 border-white rounded-tr-4xl"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 border-b-10 border-l-10 border-white rounded-bl-4xl"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 border-b-10 border-r-10 border-white rounded-br-4xl"></div>

          <div className="text-center text-white drop-shadow-xl">
            <div className="text-[50px] font-bold tracking-wide">
              Drop image anywhere
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- CATEGORY SELECTOR ---------------------- */}
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`
              px-4 py-1 rounded-full text-sm border transition
              ${selectedCategory === c
                ? "bg-[#f9c03f] text-black border-[#f9c03f]"
                : "bg-white/10 text-white/80 border-white/10 hover:bg-white/20"}
            `}
          >
            {c}
          </button>
          ))}
      </div>

      {/* ---------------------- INPUT BOX ---------------------- */}
      <div
        className="
          flex items-center gap-3 w-full max-w-2xl 
          bg-white/10 border border-white/20 backdrop-blur-xl
          rounded-full px-6 py-4 shadow-lg
        "
      >
        {/* Upload */}
        <label className="cursor-pointer flex items-center gap-2 text-white/80 hover:text-white">
          <UploadCloud size={22} />
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>

        {/* Prompt */}
        <input
          type="text"
          placeholder="Describe your thumbnail..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white text-lg placeholder-white/50"
        />

        {/* Generate */}
        <button
          onClick={handleGenerate}
          className="
            bg-[#f9c03f] hover:bg-[#ffd873]
            text-black px-6 py-2 rounded-full font-semibold
            flex items-center gap-2 transition
          "
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Generate <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      {/* ---------------------- IMAGE PREVIEWS ---------------------- */}
      {images.length > 0 && (
        <div className="flex gap-4 mt-14 justify-center flex-wrap">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="w-20 h-20 rounded-xl object-cover shadow-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}