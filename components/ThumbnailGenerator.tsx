"use client";
import React, { useState, useRef } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function ThumbnailGenerator() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [warning, setWarning] = useState("");

  // عکس موقتی داخل کارت اصلی
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const styles = [
    "Gaming", "Vlog", "Tech Review", "Reaction", "Tutorial", "Study With Me",
    "Motivation", "Cooking", "Travel", "Fitness", "Lifestyle", "Music",
    "Podcast", "Unboxing", "News", "Educational", "Business", "Comedy",
    "Storytime", "Documentary",
  ];

  /**  نسخه نهایی handleImageFile **/
  const handleImageFile = (file: File) => {
    if (!file) return;
    if (images.length >= 3) {
  setWarning("You can upload up to 3 images only!");

  // پیام بعد 3 ثانیه محو شود
  setTimeout(() => setWarning(""), 3000);

  return;
}

    const previewURL = URL.createObjectURL(file);

    // مرحله ۱ → نمایش داخل کارت
    setPreviewImage(previewURL);

    // مرحله ۲ → انتقال بعد از ۲.۵ ثانیه
    setTimeout(() => {
      setImages((prev) => [...prev, previewURL]);
      setPreviewImage(null);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="relative"
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleImageFile(file);
      }}
    >

      {/* FULLSCREEN DROP OVERLAY */}
      {dragActive && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 text-white text-5xl font-bold">
          Drop Image Anywhere
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="w-full flex flex-col items-center px-6 py-10">
        <div className="flex flex-col md:flex-row gap-20 w-full max-w-5xl">

          {/* ========== LEFT SIDE ========== */}
          <div className="w-full md:w-[40%] flex flex-col self-stretch">

            {/* UPLOAD CARD (ثابت + پر شدن کامل با عکس) */}
            <label
              className="
                bg-white/40 rounded-3xl flex flex-col justify-center items-center cursor-pointer 
                backdrop-blur-xl shadow-2xl
                shadow-[0_0_40px_rgba(0,0,0,0.15)]
                w-full h-[285px] relative overflow-hidden
              "
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleImageFile(file);
              }}
            >
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleImageUpload} />

              {/* دکمه آپلود */}
              <div className="bg-[#E94C88] text-white text-[22px] font-semibold px-6 py-4 rounded-full hover:bg-[#f0689d] transition w-[60%] text-center z-10">
                Upload Image
              </div>

              <p className="text-gray-500 mt-6 font-medium text-[20px] z-10">or drop a file</p>

              {/* پیش‌نمایش داخل کارت */}
              {previewImage && (
                <img
                  src={previewImage}
                  className="absolute inset-0 w-full h-full object-contain bg-black"
                />
              )}
            </label>

            {warning && (
  <p className="text-red-500 text-md font-semibold mt-4 text-center">
    {warning}
  </p>
)}

            {/* THUMBNAILS */}
            <div className="flex items-center gap-4 mt-8">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative w-15 h-15 rounded-[10px] overflow-hidden border border-gray-300 bg-white"
                >
                  <img src={src} className="w-full h-full object-cover" />

                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}

              {images.length < 3 && (
                <label className="w-15 h-15 bg-[#E9ECEF] hover:bg-[#DEE2E6] rounded-[10px] flex items-center justify-center text-gray-500 text-3xl cursor-pointer">
                  +
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {/* Terms */}
            <p className="text-gray-500 text-sm mt-4 leading-5">
              By uploading an image, you agree to our{" "}
              <a href="/terms" className="text-blue-600 underline">Terms of Service</a>{" "}
              and confirm you’ve read our{" "}
              <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
            </p>
          </div>

          {/* ========== RIGHT SIDE ========== */}
          <div className="flex flex-col w-full md:w-[58%]">

            {/* Style */}
            <label className="text-lg font-semibold mb-1">Style</label>

            <div className="relative mb-6">
              <select
                className="
                  border border-gray-300 bg-white rounded-[10px] 
                  px-4 py-3 w-full outline-none 
                  pr-10 appearance-none
                "
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="">Select a style</option>
                {styles.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />
            </div>

            {/* Title */}
            <label className="text-lg font-semibold mb-1">Title</label>
            <input
              className="border border-gray-300 rounded-[10px] px-4 py-3 mb-6 outline-none"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description */}
            <label className="text-lg font-semibold mb-1">Description</label>
            <textarea
              className="border border-gray-300 rounded-[10px] px-4 py-3 h-48 outline-none resize-none"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Create Thumbnail Button */}
            <button className="mt-8 bg-[#E94C88] hover:bg-[#f0689d] text-white text-[20px] font-semibold px-6 py-4 rounded-full transition w-[50%] text-center self-center">
              Create Thumbnail
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}