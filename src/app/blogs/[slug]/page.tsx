import { notFound } from "next/navigation";
import blogs from "@/static/blogData";
import Image from "next/image";

// ✅ Newer Next.js versions (14.2+ and 15) treat `params` as a Promise.
// So we make the page async and await it.
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 get the slug from the awaited params

  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="blog-date text-gray-600 mb-6">{blog.date}</p>

      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.imageAlt || blog.title}
          width={400}
          height={400}
          className="rounded-lg mb-8 mx-auto"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}

// ✅ Generates all blog slugs at build time for static generation
export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}
