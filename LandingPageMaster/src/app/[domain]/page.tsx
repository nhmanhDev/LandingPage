import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/services/blogService';
import Link from 'next/link';

export default async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  
  const validDomains = ['ai', 'invest', 'studio', 'mmo'];
  
  if (!validDomains.includes(domain)) {
    return notFound();
  }

  const blogs = await BlogService.getBlogsByDomain(domain);

  // Render specific layout or components based on domain
  return (
    <div className="min-h-screen bg-[#070710] text-white">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8]">
            {domain} Ecosystem
          </h1>
          <p className="text-gray-400 text-xl">Welcome to the {domain} branch of AI42E.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Bài viết mới nhất</h2>
          {blogs.length === 0 ? (
            <p className="text-white/50 italic">Chưa có bài viết nào trên kênh {domain}.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#38BDF8]/50 transition-colors group cursor-pointer">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#38BDF8] transition-colors">
                    {blog.title}
                  </h3>
                  <div className="text-white/40 text-sm mb-4">
                    {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                  </div>
                  <p className="text-white/70 line-clamp-3 mb-4">
                    {/* Just showing a snippet of content for now */}
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="text-[#38BDF8] font-semibold text-sm">
                    Đọc tiếp →
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
