"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, cover_url, excerpt, created_at")
        .order("created_at", { ascending: false });

      if (error) setErrorMsg(error.message);
      else setPosts(data || []);

      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-white animate-pulse">Loading posts...</p>
    );

  if (errorMsg)
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ Failed to load posts: {errorMsg}
      </p>
    );

  if (!posts.length)
    return <p className="text-center mt-10 text-white/75">No posts found yet.</p>;

  return (
    <div className="flex flex-col min-h-screen text-white relative">
      {/* AURORA FIXED BACKGROUND */}
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      
              {/* هاله بنفش — کشیده، انتزاعی، قابل‌تشخیص */}
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
                    "radial-gradient(ellipse at center, rgba(170,110,255,0.55), transparent 90%)",
                }}
              ></div>
      
              {/* هاله برنزی — بزرگ‌تر، نزدیک‌تر، واضح‌تر */}
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
              ></div>
      
            </div>
      
        <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold text-center mb-12">Blogs</h1>

          <div className="grid md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col md:flex-row bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {post.cover_url && (
                  <div className="relative w-full md:w-1/2 h-48 md:h-auto">
                    <Image
                      src={post.cover_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-sm text-white/70 mb-3">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#BFD62E] hover:text-[#9bb325] font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}