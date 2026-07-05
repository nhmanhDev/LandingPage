import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { BlogService } from "@/lib/services/blogService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await BlogService.getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: `${blog.title} - AI42E Blog`,
    description: blog.content.substring(0, 150),
  };
}

const components = {
  h1: (props: any) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-slate-800 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }} {...props} />,
  h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 text-slate-800 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }} {...props} />,
  h3: (props: any) => <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-slate-800 dark:text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }} {...props} />,
  p: (props: any) => <p className="text-slate-650 dark:text-white/70 leading-relaxed mb-6 text-base" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 text-slate-650 dark:text-white/70" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 text-slate-650 dark:text-white/70" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  code: (props: any) => <code className="bg-slate-200/50 dark:bg-white/5 rounded px-1.5 py-0.5 font-mono text-sm text-[#FFCD00] dark:text-[#FFCD00]" {...props} />,
  pre: (props: any) => <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto font-mono text-sm mb-6 border border-white/10" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-[#38BDF8] pl-4 italic text-slate-500 dark:text-white/40 my-6 bg-slate-100/50 dark:bg-white/2 py-2 pr-2 rounded-r-lg" {...props} />,
  a: (props: any) => <a className="text-[#38BDF8] hover:underline" {...props} />,
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await BlogService.getBlogBySlug(slug);

  if (!blog) {
    return notFound();
  }

  const getDomainBadgeColor = (dom: string) => {
    switch (dom) {
      case "ai":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "invest":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "studio":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "mmo":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-white/50 dark:hover:text-white/80 transition-colors mb-8 text-sm"
        >
          ← Quay lại danh sách bài viết
        </Link>

        {/* Article Meta */}
        <article className="border-b border-slate-200/50 dark:border-white/5 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase ${getDomainBadgeColor(blog.domain)}`}>
              {blog.domain}
            </span>
            <span className="text-sm text-slate-400 dark:text-white/30">
              {new Date(blog.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {blog.title}
          </h1>
        </article>

        {/* MDX Content Rendering */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <MDXRemote source={blog.content} components={components} />
        </div>
      </main>
      <Contact />
    </div>
  );
}
