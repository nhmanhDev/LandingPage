import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { supabase } from "@/lib/supabase/client";
import { Blog } from "@/lib/services/blogService";
import Link from "next/link";

export const runtime = "edge";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ domain?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedDomain = resolvedParams.domain || "";

  let query = supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (selectedDomain) {
    query = query.eq("domain", selectedDomain);
  }

  const { data: blogs = [] } = await query;

  const domains = [
    { label: "Tất cả", value: "" },
    { label: "AI & Tech", value: "ai" },
    { label: "Invest", value: "invest" },
    { label: "Studio", value: "studio" },
    { label: "MMO", value: "mmo" },
  ];

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
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mt-8 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#38BDF8] font-bold">Blog & Updates</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-6 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 bg-clip-text text-transparent leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ecosystem Insights
          </h1>
          <p className="text-slate-500 dark:text-white/40 text-lg">
            Chia sẻ kiến thức, hướng dẫn, và cập nhật mới nhất về AI, Trading, Creator Economy & Automation.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-slate-200/50 dark:border-white/5 pb-8">
          {domains.map((dom) => {
            const isActive = selectedDomain === dom.value;
            return (
              <Link
                key={dom.label}
                href={dom.value ? `/blog?domain=${dom.value}` : "/blog"}
                className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-[#38BDF8] text-white border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                    : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:border-slate-400 dark:hover:border-white/20"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {dom.label}
              </Link>
            );
          })}
        </div>

        {/* Grid of blogs */}
        {blogs && blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(blogs as Blog[]).map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.id}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-100/30 hover:bg-slate-100/60 dark:bg-white/2 dark:hover:bg-white/4 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md dark:shadow-none hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold uppercase ${getDomainBadgeColor(blog.domain)}`}>
                      {blog.domain}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-white/30">
                      {new Date(blog.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white/90 mb-3 group-hover:text-[#38BDF8] transition-colors leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {blog.title}
                  </h3>
                  <p className="text-slate-600 dark:text-white/40 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {blog.content.replace(/[#*`_]/g, "").substring(0, 150)}...
                  </p>
                </div>
                <div className="text-[#38BDF8] font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc tiếp →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-white/30 italic text-lg">Chưa có bài viết nào thuộc chủ đề này.</p>
          </div>
        )}
      </main>
      <Contact />
    </div>
  );
}
