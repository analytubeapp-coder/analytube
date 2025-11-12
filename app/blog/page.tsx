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
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading posts...
      </p>
    );

  if (errorMsg)
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ Failed to load posts: {errorMsg}
      </p>
    );

  if (!posts.length)
    return <p className="text-center mt-10 text-gray-400">No posts found yet.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto py-32 px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Blogs</h1>

          <div className="grid md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col md:flex-row border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
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
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
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