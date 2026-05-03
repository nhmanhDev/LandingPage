"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Blog, BlogService } from '@/lib/services/blogService';

export default function Dashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    loadBlogs();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  };

  const loadBlogs = async () => {
    // Fetch all blogs for dashboard
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data as Blog[]);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#070710] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Quản trị Blog</h1>
          <div className="flex gap-4">
            <Link 
              href="/admin/blog/new" 
              className="px-4 py-2 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-lg font-bold shadow-[0_0_15px_rgba(218,37,29,0.3)] hover:scale-105 transition-transform"
            >
              + Viết bài mới
            </Link>
            <button onClick={handleLogout} className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
              Đăng xuất
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold mb-4">Danh sách bài viết</h2>
          {loading ? (
            <p className="text-white/50">Đang tải...</p>
          ) : blogs.length === 0 ? (
            <p className="text-white/50 text-center py-8">Chưa có bài viết nào.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {blogs.map(blog => (
                <div key={blog.id} className="flex justify-between items-center p-4 bg-black/20 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                  <div>
                    <h3 className="font-bold text-lg text-[#38BDF8]">{blog.title}</h3>
                    <p className="text-sm text-white/50">{new Date(blog.created_at).toLocaleDateString('vi-VN')} • Subdomain: <span className="text-[#FFCD00]">{blog.domain}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20">Sửa</button>
                    <button className="text-sm px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">Xóa</button>
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
