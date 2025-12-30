import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const revalidate = 60;

/* ---------- Metadata ---------- */
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
    title: post?.title ?? "Blog",
    description: post?.content?.slice(0, 150) ?? "",
  };
}

/* ---------- Page ---------- */
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
        <Link
          href="/blog"
          className="text-[#5b65dc] underline mt-10 block"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-32 px-6">
      <Link href="/blog" className="text-[#5b65dc] underline">
        ← Back to Blog
      </Link>

      <h1 className="text-4xl font-bold mt-6 mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 text-sm mb-8">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      {post.cover_url && (
        <div className="flex justify-center mb-10">
          <Image
            src={post.cover_url}
            alt={post.title}
            width={600}
            height={200}
            className="rounded-xl shadow"
          />
        </div>
      )}

      <article className="prose max-w-none mx-auto">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}