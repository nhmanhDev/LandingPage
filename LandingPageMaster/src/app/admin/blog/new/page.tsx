"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBlog() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [domain, setDomain] = useState('ai');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('blogs').insert([
      { title, slug, domain, content }
    ]);

    setLoading(false);
    if (!error) {
      router.push('/admin/dashboard');
    } else {
      alert('Lỗi: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#070710] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/dashboard" className="text-white/50 hover:text-white">← Quay lại</Link>
          <h1 className="text-3xl font-bold">Viết Blog mới</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                }}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#38BDF8]"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Đường dẫn (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white/50 cursor-not-allowed"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Đăng lên Sub-domain nào?</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#38BDF8] appearance-none"
            >
              <option value="ai">AI (ai.ai42e.com)</option>
              <option value="invest">Invest (invest.ai42e.com)</option>
              <option value="studio">Studio (studio.ai42e.com)</option>
              <option value="mmo">MMO (mmo.ai42e.com)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Nội dung (Hỗ trợ Markdown / MDX)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-[#38BDF8] font-mono text-sm leading-relaxed"
              placeholder="# Tiêu đề lớn&#10;&#10;Nội dung viết ở đây..."
              required
            ></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-[#38BDF8] to-blue-600 rounded-lg font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Xuất bản bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
