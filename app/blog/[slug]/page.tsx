//blog/[slug]/page.tsx

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabaseServer
    .from("posts")
    .select("title, content")
    .eq("slug", slug)
    .single();

  return {
    title: post?.title || "Blog",
    description: post?.content?.slice(0, 150) || "",
  };
}

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post, error } = await supabaseServer
    .from("posts")
    .select("title, content, cover_url, created_at")
    .eq("slug", slug)
    .single();

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto py-32 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Post not found 😕
        </h1>
        <Link href="/blog" className="text-[#BFD62E] underline mt-20 block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-32 px-6">
      <Link href="/blog" className="text-[#BFD62E] underline">
        ← Back to Blog
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-8">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.cover_url && (
  <div className="flex justify-center mb-10">
    <Image
      src={post.cover_url}
      alt={post.title}
      width={400}   // عرض واقعی تصویر
      height={100}  // ارتفاع واقعی تصویر
      className="rounded-xl shadow"
    />
  </div>
)}

      <article className="max-w-none mx-auto space-y-6">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}