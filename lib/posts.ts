import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "posts");

// Type definitions 👇
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
}

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    slug: realSlug,
    frontmatter: data as Omit<PostMeta, "slug">,
    mdxSource,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: slug.replace(/\.mdx$/, ""),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      image: data.image,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
