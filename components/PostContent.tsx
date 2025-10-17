// components/PostContent.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function PostContent({ mdxSource }: Props) {
  return (
    <div
      className="
        prose prose-lg max-w-none text-gray-800
        prose-headings:font-extrabold prose-headings:text-gray-900
        prose-headings:mt-6 prose-headings:mb-6
        prose-h1:text-5xl prose-h2:text-3xl prose-h3:text-2xl
        prose-strong:text-gray-900
        prose-a:text-brand prose-a:no-underline
        prose-hr:hidden
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300
        prose-blockquote:bg-gray-50 prose-blockquote:px-4 prose-blockquote:py-2
        prose-ul:list-disc prose-ul:ml-6 prose-ul:my-4
        prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-4
        prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
      "
    >
      <MDXRemote {...mdxSource} />
    </div>
  );
}
