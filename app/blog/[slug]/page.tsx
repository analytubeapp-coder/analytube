// blog/[slug]/page.tsx

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("title, content")
    .eq("slug", slug)
    .single();

  return {
    title: post?.title ? `${post.title} | AnalyTube Blog` : "AnalyTube Blog",
    description: post?.content?.slice(0, 150) || "Read the latest from AnalyTube.",
  };
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from("posts")
    .select("title, content, cover_url, created_at")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto py-32 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">Post not found 😕</h1>
          <Link href="/blog" className="text-[#BFD62E] underline mt-20 block">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-32 px-6">
        <Link href="/blog" className="text-[#BFD62E] underline">
          ← Back to Blog
        </Link>

        <h1 className="text-4xl font-bold mt-6 mb-8">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        {post.cover_url && (
          <div className="relative w-full h-80 mb-10">
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              className="object-cover rounded-xl shadow"
            />
          </div>
        )}

        {/* محتوای HTML وبلاگ با استایل Typography */}
        <article className="max-w-none mx-auto space-y-6">
  <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-4" />
</article>
      </div>
      <Footer />
    </>
  );
}