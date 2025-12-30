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
      <p className="text-center mt-10 text-black animate-pulse">
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
    return (
      <p className="text-center mt-10 text-black">
        No posts found yet.
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <h1 className="text-4xl font-extrabold text-center mb-12">
            Blogs
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
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
                    <h2 className="text-2xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="mt-4 text-[#5b65dc] font-medium">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}