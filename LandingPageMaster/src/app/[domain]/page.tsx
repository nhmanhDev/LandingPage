import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/services/blogService';
import Link from 'next/link';

import { Metadata } from 'next';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const { domain } = await params;
  const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
  return {
    title: `${capitalizedDomain} - AI42E Ecosystem`,
    description: `Welcome to the ${domain} branch of AI42E.`,
  };
}

export default async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  
  const validDomains = ['ai', 'invest', 'studio', 'mmo'];
  
  if (!validDomains.includes(domain)) {
    return notFound();
  }

  const blogs = await BlogService.getBlogsByDomain(domain);

  // Render specific layout or components based on domain
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8]">
            {domain} Ecosystem
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-xl">Welcome to the {domain} branch of AI42E.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 border-b border-slate-200/50 dark:border-white/10 pb-4">Bài viết mới nhất</h2>
          {blogs.length === 0 ? (
            <p className="text-slate-400 dark:text-white/50 italic">Chưa có bài viết nào trên kênh {domain}.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {blogs.map(blog => (
                <Link 
                  href={`/blog/${blog.slug}`} 
                  key={blog.id} 
                  className="bg-slate-100/30 hover:bg-slate-100/60 dark:bg-white/5 p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 group cursor-pointer block"
                >
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-[#38BDF8] transition-colors">
                    {blog.title}
                  </h3>
                  <div className="text-slate-400 dark:text-white/40 text-sm mb-4">
                    {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  <p className="text-slate-600 dark:text-white/70 line-clamp-3 mb-4">
                    {blog.content.replace(/[#*`_]/g, "").substring(0, 150)}...
                  </p>
                  <div className="text-[#38BDF8] font-semibold text-sm">
                    Đọc tiếp →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
