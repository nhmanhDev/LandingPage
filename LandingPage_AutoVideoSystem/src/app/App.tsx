// GitHub: https://github.com/nhmanhDev
// Facebook: https://www.facebook.com/nhmanhAI4E/
import { useState, useEffect } from 'react';
import {
  Play,
  Sparkles,
  Video,
  Mic,
  Type,
  Code,
  Layout,
  Palette,
  Music,
  Eye,
  Download,
  Check,
  X,
  ChevronDown,
  Users,
  Briefcase,
  GraduationCap,
  Terminal,
  Rocket,
  Building,
  Clock,
  Zap,
  Shield,
  Infinity,
  Star,
  Gift,
  PartyPopper,
  Facebook,
  Github,
  MessageCircle,
  Mail
} from 'lucide-react';

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 34, seconds: 56 });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('features');

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll Spy Logic
  useEffect(() => {
    const sections = ['features', 'demo', 'how-it-works', 'use-cases', 'pricing', 'faq'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          clearInterval(interval);
          return prev;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05060A]/80 backdrop-blur-xl border-b border-[#DA251D]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#DA251D] to-[#FF4444] rounded-lg flex items-center justify-center relative">
                <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
              </div>
              <span className="font-semibold text-lg">AI42E Studio</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'features', label: 'Giới thiệu' },
                { id: 'demo', label: 'Demo' },
                { id: 'how-it-works', label: 'Cách dùng' },
                { id: 'use-cases', label: 'Tính năng' },
                { id: 'pricing', label: 'Giá' },
                { id: 'faq', label: 'FAQ' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-all duration-300 relative py-1 ${activeSection === item.id
                    ? 'text-[#FFCD00] font-bold'
                    : 'text-white/60 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => scrollToSection('demo')} className="hidden md:block px-4 py-2 text-sm rounded-lg border border-white/10 hover:border-white/20 transition">
                Xem Demo
              </button>
              <button onClick={() => scrollToSection('pricing')} className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#DA251D] to-[#FF4444] hover:opacity-90 transition relative">
                <span className="flex items-center gap-1">
                  <Gift className="w-4 h-4" />
                  Ưu đãi 30/4 - Chỉ 304K
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-8 px-6 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DA251D]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#FFCD00]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 right-1/4 w-96 h-96 bg-[#DA251D]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative flex flex-col items-center justify-center">
          {/* 30/4 Banner */}
          <div className="mb-6 w-full flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 md:py-4 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-full border border-[#FFCD00] shadow-[0_0_20px_rgba(218,37,29,0.4)] relative">
              <div className="absolute inset-0 bg-[#FFCD00]/20 blur-md rounded-full animate-pulse pointer-events-none" />
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFCD00] fill-[#FFCD00] shrink-0" />
              <span className="font-bold text-base md:text-xl text-white tracking-wide text-center uppercase drop-shadow-md">
                🇻🇳 CHÀO MỪNG 51 NĂM GIẢI PHÓNG MIỀN NAM (30/4/1975 - 30/4/2026) 🇻🇳
              </span>
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#FFCD00] fill-[#FFCD00] shrink-0" />
            </div>
          </div>

          <div className="max-w-5xl text-center z-10 px-4 mt-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug md:leading-tight drop-shadow-lg">
              AI42E Studio tự động viết kịch bản, tạo video có phụ đề, nhạc nền và hỗ trợ nhiều ngôn ngữ.
            </h1>
          </div>

          <div className="mt-4 mb-4 text-center z-10">
            <p className="text-xl md:text-1xl font-medium text-[#A7F3D0]">
              Có thể tạo hàng chục video mỗi ngày chỉ với <span className="text-[#FFCD00] text-5xl md:text-4xl font-extrabold mx-1 drop-shadow-[0_0_15px_rgba(255,205,0,0.3)]">0 VND</span>
            </p>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-8 md:py-12 px-6 bg-[#080A12]" >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large card 1 */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DA251D]/20 rounded-full blur-[100px]" />
              <div className="relative">
                <Code className="w-10 h-10 mb-4 text-[#FFCD00]" />
                <h3 className="text-2xl mb-3">Scene HTML có animation</h3>
                <p className="text-white/60 mb-6">
                  Mỗi cảnh là HTML động với animation CSS/JS, không phải slideshow nhàm chán
                </p>
                <div className="bg-black/40 rounded-lg p-4 border border-[#FFCD00]/30 font-mono text-sm text-[#FFCD00]">
                  <div>{'<div class="scene animated">'}</div>
                  <div className="ml-4 text-white/50">{'<!-- AI generated -->'}</div>
                  <div>{'</div>'}</div>
                </div>
              </div>
            </div>

            {/* Small cards */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Sparkles className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className="text-lg mb-2">AI viết kịch bản nhiều cảnh</h3>
              <p className="text-sm text-white/60">
                Tự động chia thành storyboard logic
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Mic className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className="text-lg mb-2">Giọng đọc tiếng Việt tự nhiên</h3>
              <p className="text-sm text-white/60">
                AI voice chất lượng cao
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Type className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className="text-lg mb-2">Phụ đề karaoke tự động</h3>
              <p className="text-sm text-white/60">
                Sync chính xác từng từ
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Layout className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className="text-lg mb-2">Đa tỉ lệ khung hình</h3>
              <p className="text-sm text-white/60">
                9:16, 16:9, 1:1, 4:5
              </p>
            </div>

            {/* Large card 2 */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFCD00]/20 rounded-full blur-[100px]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-8 h-8 text-[#FFCD00]" />
                  <h3 className="text-xl font-bold text-white leading-tight">Không chỉ render tự động — bạn kiểm soát từng cảnh</h3>
                </div>
                <p className="text-white/60 mb-5 text-sm leading-relaxed">
                  Xem trước từng cảnh, sửa lời dẫn, chỉnh prompt, regenerate HTML hoặc render lại riêng lẻ trước khi xuất video cuối
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[10px] text-white/30 uppercase tracking-widest font-medium">
                    Live preview
                  </div>
                  <div className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[10px] text-white/30 uppercase tracking-widest font-medium">
                    Quick Edit
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Palette className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className="text-lg mb-2">Tạo style video riêng</h3>
              <p className="text-sm text-white/60">
                Custom logo, màu sắc, font chữ
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Music className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className="text-lg mb-2">Nhạc nền & sound effect</h3>
              <p className="text-sm text-white/60">
                Tự động thêm background music
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12 md:py-16 px-6" id="demo">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8]">
              Video demo
            </h2>
            <p className="text-xl text-white/60">
              Tất cả video dưới đây được tạo tự động từ chủ đề
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { title: 'Tin tức AI', duration: '60s', ratio: '9:16', src: '/videos/demo-1.mp4' },
              { title: 'Giáo dục', duration: '45s', ratio: '9:16', src: '/videos/demo-2.mp4' },
              { title: 'Crypto / Finance', duration: '90s', ratio: '16:9', src: '/videos/demo-3.mp4' },

            ].map((demo, i) => (
              <div key={i} className="group cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[320px]">
                <div
                  className="aspect-[9/16] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl overflow-hidden relative mb-3 group-hover:border-[#FFCD00]/50 transition shadow-lg"
                  onMouseEnter={(e) => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) vid.play();
                  }}
                  onMouseLeave={(e) => {
                    const vid = e.currentTarget.querySelector('video');
                    if (vid) { vid.pause(); vid.currentTime = 0; }
                  }}
                >
                  <video src={demo.src} muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition duration-500">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[#DA251D]/80 group-hover:border-[#FFCD00] transition">
                      <Play className="w-8 h-8 ml-1 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] uppercase font-bold border border-white/20">
                        {demo.duration}
                      </span>
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] uppercase font-bold border border-white/20">
                        {demo.ratio}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-1 text-center">
                  <h3 className="font-bold text-lg mb-0.5 text-white">{demo.title}</h3>
                  <p className="text-xs text-white/40 uppercase tracking-tighter">AI42E Auto-Generated</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How it Works */}
      <section className="py-12 md:py-16 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-3xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8]">
              Cách sử dụng hệ thống
            </h2>

          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-[#0B1320] rounded-3xl border-2 border-[#FFCD00]/30 overflow-hidden shadow-2xl shadow-[#FFCD00]/10 flex items-center justify-center relative group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Thay link youtube của anh vào đây
                title="Hướng dẫn sử dụng AI42E Video Automation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '30 Giây', sub: 'Setup topic' },
                { label: 'Tự động', sub: 'AI soạn kịch bản' },
                { label: 'Live', sub: 'Preview scene' },
                { label: '1 Click', sub: 'Export MP4' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-[#FFCD00] font-bold text-lg">{stat.label}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tính năng */}
      <section className="py-12 md:py-16 px-6 bg-[#080A12]" id="use-cases">
        <div className="max-w-7xl mx-auto">
          {/* <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              Ai nên dùng AI42E Studio?
            </h2>
            <p className="text-xl text-white/60">
              Phù hợp cho mọi người cần tạo video scale
            </p>
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Content Creator',
                benefit: 'Tạo hàng loạt video Shorts/Reels mỗi ngày',
                example: 'Biến một bài blog thành 5 video Shorts trong cùng một style',
              },
              {
                icon: Briefcase,
                title: 'Marketing & Brand',
                benefit: 'Automation content cho nhiều kênh',
                example: 'Tạo video quảng cáo sản phẩm với nhiều variant khác nhau',
              },
              {
                icon: GraduationCap,
                title: 'Giáo dục & chia sẻ kiến thức',
                benefit: 'Chuyển tài liệu thành video giảng dạy',
                example: 'Tạo series video bài giảng tự động từ outline',
              },
              {
                icon: Terminal,
                title: 'Developer & Vibe Coder',
                benefit: 'Customize pipeline theo nhu cầu riêng',
                example: 'Tích hợp vào workflow automation, extend features',
              },
              {
                icon: Rocket,
                title: 'Freelancer / Agency nhỏ',
                benefit: 'Nhận nhiều project content mà không cần thuê team',
                example: 'Scale dịch vụ làm video cho khách hàng với chi phí thấp',
              },
              {
                icon: Building,
                title: 'Doanh nghiệp / cộng đồng',
                benefit: 'Tạo content đồng bộ cho internal training hoặc marketing',
                example: 'Video onboarding nhân viên, product updates tự động',
              },
            ].map((useCase, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-[#FFCD00]/30 transition">
                <useCase.icon className="w-10 h-10 mb-4 text-[#FFCD00]" />
                <h3 className="text-xl mb-2">{useCase.title}</h3>
                <p className="text-white/60 mb-4">{useCase.benefit}</p>
                <div className="bg-[#DA251D]/10 border border-[#FFCD00]/20 rounded-lg p-3 text-sm">
                  <span className="text-white/50">Ví dụ:</span>
                  <p className="text-white/80 mt-1">{useCase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 md:py-16 px-6" id="comparison">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            {/* <h2 className="text-3xl md:text-4xl mb-6">
              So với cách làm video truyền thống
            </h2> */}
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#38BDF8]/20 bg-[#0B1320]/90 p-6 shadow-xl shadow-[#38BDF8]/10">
              <p className="text-3xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8]">
                Tại sao nên dùng AI42E Studio?
              </p>
              <p className="mt-4 text-xl md:text-2xl text-white/70">
                Sản xuất video chất lượng cao hoàn toàn tự động, chi phí tiệm cận 0đ
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-white/50">Tiêu chí</th>
                    <th className="p-6 text-center">Thuê editor</th>
                    <th className="p-6 text-center">Dùng SaaS tạo video</th>
                    <th className="p-6 text-center bg-gradient-to-br from-[#DA251D]/20 to-[#FFCD00]/20 border-l-2 border-r-2 border-[#FFCD00]/30">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                        <div className="font-bold text-lg text-[#FFCD00]">AI42E Studio</div>
                        <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold mt-1 bg-white/10 rounded-full px-2 py-0.5 inline-block">Ưu đãi 30/4</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      criteria: 'Chi phí hàng tháng',
                      editor: '5-20 triệu+',
                      saas: '500K - 2 triệu',
                      ai42e: 'Từ 0đ (chỉ API)',
                    },
                    {
                      criteria: 'Khả năng tùy chỉnh',
                      editor: 'Cao nhưng chậm',
                      saas: 'Giới hạn template',
                      ai42e: 'Hoàn toàn tùy chỉnh',
                    },
                    {
                      criteria: 'Sở hữu source code',
                      editor: <X className="w-5 h-5 text-red-400 mx-auto" />,
                      saas: <X className="w-5 h-5 text-red-400 mx-auto" />,
                      ai42e: <Check className="w-5 h-5 text-[#22C55E] mx-auto" />,
                    },
                    {
                      criteria: 'Số lượng video',
                      editor: 'Giới hạn bởi thời gian',
                      saas: 'Giới hạn gói',
                      ai42e: 'Không giới hạn',
                    },
                    {
                      criteria: 'Chạy local',
                      editor: <X className="w-5 h-5 text-red-400 mx-auto" />,
                      saas: <X className="w-5 h-5 text-red-400 mx-auto" />,
                      ai42e: <Check className="w-5 h-5 text-[#22C55E] mx-auto" />,
                    },
                    {
                      criteria: 'Sửa từng scene',
                      editor: <Check className="w-5 h-5 text-[#22C55E] mx-auto" />,
                      saas: 'Giới hạn',
                      ai42e: <Check className="w-5 h-5 text-[#22C55E] mx-auto" />,
                    },
                    {
                      criteria: 'Tái sử dụng style',
                      editor: 'Khó',
                      saas: 'Template cố định',
                      ai42e: 'Dễ dàng',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-6 text-white/70">{row.criteria}</td>
                      <td className="p-6 text-center text-white/60">{row.editor}</td>
                      <td className="p-6 text-center text-white/60">{row.saas}</td>
                      <td className="p-6 text-center bg-gradient-to-br from-[#DA251D]/5 to-[#FFCD00]/5 border-l-2 border-r-2 border-[#FFCD00]/10 font-medium text-[#FFCD00]">
                        {row.ai42e}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16 px-6 bg-[#080A12]" id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            {/* <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-full border-2 border-[#FFCD00] mb-6 shadow-lg shadow-[#DA251D]/50">
              <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
              <span className="font-bold">Chào mừng Kỷ niệm 51 năm Ngày Giải phóng miền Nam, thống nhất đất nước (30/4/1975 – 30/4/2026)</span>
              <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
            </div> */}
            <h2 className="text-3xl md:text-4xl mb-4">
              Giá đặc biệt chỉ trong dịp lễ 30/4
            </h2>
            <p className="text-xl text-white/60">
              Thanh toán một lần, sở hữu vĩnh viễn - Tiết kiệm 362K!
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#DA251D]/20 to-[#FF4444]/20 backdrop-blur-sm border-2 border-[#FFCD00]/50 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-[#DA251D]/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFCD00]/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DA251D]/20 rounded-full blur-[100px]" />

            {/* Decorative stars */}
            <div className="absolute top-4 left-4">
              <Star className="w-8 h-8 text-[#FFCD00] fill-[#FFCD00] opacity-20" />
            </div>
            <div className="absolute top-4 right-4">
              <Star className="w-8 h-8 text-[#FFCD00] fill-[#FFCD00] opacity-20" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Star className="w-8 h-8 text-[#FFCD00] fill-[#FFCD00] opacity-20" />
            </div>
            <div className="absolute bottom-4 right-4">
              <Star className="w-8 h-8 text-[#FFCD00] fill-[#FFCD00] opacity-20" />
            </div>

            <div className="relative flex flex-col lg:flex-row gap-8 lg:items-center justify-between">

              {/* Left Column: Price & Buy Button */}
              <div className="flex-1 w-full text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#DA251D] to-[#FF4444] border border-[#FFCD00] rounded-full mb-4 animate-pulse">
                    <PartyPopper className="w-5 h-5 text-[#FFCD00]" />
                    <span className="text-sm font-semibold text-[#FFCD00]">Ưu đãi lớn nhân dịp 30/4</span>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-[#FFCD00]" />
                    <div className="flex items-center gap-2">
                      {[
                        { value: timeLeft.days, label: 'Ngày' },
                        { value: timeLeft.hours, label: 'Giờ' },
                        { value: timeLeft.minutes, label: 'Phút' },
                        { value: timeLeft.seconds, label: 'Giây' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {i > 0 && <span className="text-[#FFCD00]">:</span>}
                          <div className="bg-[#DA251D]/40 border border-[#FFCD00]/30 rounded-lg px-3 py-1 min-w-[60px] text-center shadow-inner">
                            <div className="text-2xl font-bold text-[#FFCD00]">{String(item.value).padStart(2, '0')}</div>
                            <div className="text-xs text-white/60">{item.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price comparison */}
                <div className="mb-6">
                  <div className="text-3xl text-white/40 line-through mb-2">
                    666.000 VNĐ
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="w-10 h-10 text-[#FFCD00] fill-[#FFCD00] animate-pulse" />
                    <div>
                      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FFCD00] via-[#FFE066] to-[#FFCD00] bg-clip-text text-transparent transform scale-110">
                        304K
                      </div>
                    </div>
                    <Star className="w-10 h-10 text-[#FFCD00] fill-[#FFCD00] animate-pulse" />
                  </div>
                  <div className="inline-block px-6 py-2 bg-[#FFCD00]/20 border border-[#FFCD00]/50 rounded-full shadow-lg shadow-[#FFCD00]/10">
                    <span className="text-lg font-bold text-[#FFCD00]">💰 Tiết kiệm 362.000đ (54%)</span>
                  </div>
                </div>

                <div className="text-xl text-white/90 mb-1 font-semibold">Thanh toán một lần</div>
                <div className="text-white/60 mb-6 font-medium">Sở hữu source code vĩnh viễn</div>

                <div className="flex justify-center flex-col px-4 md:px-0 auto-mx">
                  <button
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full md:w-3/4 mx-auto px-6 py-4 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-2xl text-xl font-bold hover:opacity-90 transition shadow-xl shadow-[#DA251D]/40 border-2 border-[#FFCD00]/50 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 ease-out duration-200"
                  >
                    <Gift className="w-6 h-6" />
                    🎉 Thanh toán mã QR
                  </button>
                  <p className="text-sm text-white/40 mt-3">Nhận trọn bộ mã nguồn ngay lập tức</p>
                </div>
              </div>

              {/* Right Column: Features Checklist */}
              <div className="w-full lg:w-[380px] shrink-0 bg-[#0B1320]/80 backdrop-blur-md border border-[#FFCD00]/30 rounded-3xl p-6 md:p-8 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCD00]/10 rounded-full blur-[40px] pointer-events-none" />
                <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                  Bạn sẽ nhận được:
                </h4>
                <div className="space-y-4">
                  {[
                    'Full source code hệ thống',
                    'Video hướng dẫn setup A-Z',
                    'Tài liệu sử dụng chi tiết',
                    'Group Zalo hỗ trợ kỹ thuật',
                    'Cập nhật bản mới nhất nếu có',
                    'Quyền tuỳ chỉnh theo nhu cầu',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 hover:translate-x-1 transition-transform duration-300">
                      <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0 border border-[#22C55E]/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" strokeWidth={3} />
                      </div>
                      <span className="text-white/80 font-medium text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {isPaymentOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsPaymentOpen(false)}>
            <div
              className="bg-[#0B1320] border border-[#FFCD00]/50 rounded-2xl w-full max-w-4xl p-6 md:p-10 relative shadow-2xl animate-in fade-in zoom-in-95"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPaymentOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-8 text-center text-[#FFCD00]">Thông tin thanh toán</h3>

              <div className="flex flex-col md:flex-row gap-6 items-center text-sm w-full">

                {/* Left: Info */}
                <div className="flex-1 w-full flex flex-col justify-center">
                  <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden divide-y divide-white/10 shadow-inner">
                    <div className="flex items-center p-4">
                      <span className="text-white/50 w-28 md:w-32 shrink-0 text-sm">Ngân hàng:</span>
                      <span className="font-semibold text-base text-white whitespace-nowrap">Vietcombank</span>
                    </div>
                    <div className="flex items-center p-4 bg-white/[0.02]">
                      <span className="text-white/50 w-28 md:w-32 shrink-0 text-sm">Số tài khoản:</span>
                      <span className="font-bold text-[#FFCD00] text-xl tracking-tight hover:underline cursor-pointer whitespace-nowrap" onClick={() => navigator.clipboard.writeText('9392389623')} title="Nhấn để copy">9392389623</span>
                    </div>
                    <div className="flex items-center p-4">
                      <span className="text-white/50 w-28 md:w-32 shrink-0 text-sm">Chủ tài khoản:</span>
                      <span className="font-semibold text-base text-white whitespace-nowrap">Nguyen Hung Manh</span>
                    </div>
                  </div>
                  <p className="text-sm text-center md:text-left text-white/50 mt-5 leading-relaxed">
                    Sau khi thanh toán, chụp màn hình và liên hệ Zalo: <span className="text-white font-bold">0392389623</span> để nhận source code ngay.
                  </p>
                </div>

                {/* Right: QR Code */}
                <div className="shrink-0 flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-72 bg-white rounded-2xl flex items-center justify-center border-4 border-white/20 shadow-inner overflow-hidden mb-3">
                    <img src="/qr_vietcombank.jpg" alt="QR Vietcombank" className="w-full h-auto object-contain" />
                  </div>
                  <span className="text-xs text-white/40 uppercase tracking-widest font-semibold">Quét mã thanh toán</span>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 px-6" id="trust">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              Được thiết kế cho người muốn tự động hoá thật sự
            </h2>
            <p className="text-xl text-white/60">
              Không phụ thuộc SaaS, hoàn toàn kiểm soát
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 mx-auto mb-4 text-[#FFCD00]" />
              <h3 className="text-xl mb-3">Chạy trên máy bạn</h3>
              <p className="text-white/60">
                Data không lên cloud, bảo mật tuyệt đối
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-xl p-6 text-center">
              <Code className="w-10 h-10 mx-auto mb-4 text-[#FFCD00]" />
              <h3 className="text-xl mb-3">Không bị khoá trong SaaS</h3>
              <p className="text-white/60">
                Sở hữu code, không lo bị giới hạn hoặc đóng dịch vụ
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-xl p-6 text-center">
              <Zap className="w-10 h-10 mx-auto mb-4 text-[#FFCD00]" />
              <h3 className="text-xl mb-3">Có thể mở rộng bằng code hoặc AI coding</h3>
              <p className="text-white/60">
                Customize không giới hạn, tích hợp workflow riêng
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg text-white/70 mb-4">Technical Stack</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {['Node.js', 'Python', 'FFmpeg', 'Chrome', 'HTML scenes', 'AI APIs'].map((tech, i) => (
                <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-mono">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-6 bg-[#080A12]" id="faq">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              Câu hỏi thường gặp?
            </h2>
            {/* <p className="text-xl text-white/60">
              Tất cả những gì bạn cần biết
            </p> */}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                q: 'Tool chạy trên hệ điều hành nào?',
                a: 'AI42E Studio chạy trên Windows, macOS và Linux. Yêu cầu Node.js, Python và Chrome/Chromium đã cài đặt.',
              },
              {
                q: 'Có cần biết lập trình không?',
                a: 'Không bắt buộc. Tool có UI đơn giản để sử dụng. Nếu bạn biết code, bạn có thể customize sâu hơn.',
              },
              {
                q: 'Chi phí tạo mỗi video là bao nhiêu?',
                a: 'Chi phí chỉ là API calls (AI text generation, voice synthesis). Phí có thể từ 0 đồng / video tùy độ dài vì API key Google hỗ trợ nhiều.',
              },
              {
                q: 'Sau khi order nhận được gì?',
                a: 'Bạn nhận full source code, video hướng dẫn setup chi tiết, tài liệu sử dụng, được thêm vào group Zalo hỗ trợ, và nhận update miễn phí.',
              },
              {
                q: 'Có được tuỳ chỉnh source không?',
                a: 'Hoàn toàn có thể! Source code là của bạn, bạn có quyền chỉnh sửa, mở rộng, tích hợp vào hệ thống khác theo nhu cầu.',
              },
              {
                q: 'Tool có tạo video bằng tiếng Anh được không?',
                a: 'Có, tool hỗ trợ đa ngôn ngữ. Bạn có thể tạo video tiếng Việt, tiếng Anh hoặc ngôn ngữ khác tùy theo AI API bạn sử dụng.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-[#FFCD00]/20 transition-colors group">
                <h3 className="text-base font-bold mb-3 text-white group-hover:text-[#FFCD00] transition-colors">{faq.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="py-12 md:py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#DA251D]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-full border-2 border-[#FFCD00] mb-6 shadow-lg shadow-[#DA251D]/50 animate-pulse">
            <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
            <span className="font-bold">🇻🇳 Ưu đãi 30/4 - Chỉ còn 304K 🇻🇳</span>
            <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
          </div>
          <h2 className="text-3xl md:text-4xl mb-6">
            Sẵn sàng biến ý tưởng thành video hàng loạt?
          </h2>
          <p className="text-xl text-white/60 mb-4">
            Bắt đầu với giá đặc biệt 30/4, nhận source code và tự xây pipeline video AI của riêng bạn
          </p>
          <div className="text-2xl mb-8">
            <span className="text-white/40 line-through mr-3">666K</span>
            <span className="text-4xl font-bold bg-gradient-to-r from-[#FFCD00] to-[#FFE066] bg-clip-text text-transparent">304K</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => scrollToSection('pricing')} className="px-8 py-4 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-xl text-lg font-medium hover:opacity-90 transition shadow-lg shadow-[#DA251D]/50 border-2 border-[#FFCD00]/50">
              🎉 Đặt mua ngay - 304K
            </button>
            <button onClick={() => scrollToSection('demo')} className="px-8 py-4 bg-white/5 border border-[#FFCD00]/30 rounded-xl text-lg hover:bg-white/10 transition">
              Xem demo
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#FFCD00]/10 bg-[#080A12]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#DA251D] to-[#FF4444] rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                </div>
                <span className="font-semibold text-lg">AI42E Studio</span>
              </div>
              <p className="text-white/60 max-w-md mb-4">
                Pipeline tự động tạo video AI với HTML animation, voice tiếng Việt, và phụ đề karaoke. Sở hữu source code, chạy local, không giới hạn.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DA251D]/20 border border-[#FFCD00]/30 rounded-lg">
                <Star className="w-4 h-4 text-[#FFCD00] fill-[#FFCD00]" />
                <span className="text-sm text-[#FFCD00]">Khuyến mãi 30/4 - Giá chỉ 304K</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('features')} className="block text-white/60 hover:text-[#FFCD00] transition">Giới thiệu</button>
                <button onClick={() => scrollToSection('demo')} className="block text-white/60 hover:text-[#FFCD00] transition">Demo</button>
                <button onClick={() => scrollToSection('pricing')} className="block text-white/60 hover:text-[#FFCD00] transition">Giá 30/4</button>
                <button onClick={() => scrollToSection('faq')} className="block text-white/60 hover:text-[#FFCD00] transition">FAQ</button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-[#FFCD00]">Liên hệ & Hỗ trợ</h4>
              <div className="space-y-3 text-white/70">
                <div className="flex flex-col gap-3">
                  <a href="https://zalo.me/0392389623" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#0068FF] transition">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold text-white">Zalo: 0392389623</span>
                  </a>
                  <a href="mailto:nhmanh.dev@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                    <Mail className="w-5 h-5" />
                    <span className="text-white">Email: nhmanh.dev@gmail.com</span>
                  </a>
                  <a href="https://www.facebook.com/nhmanhAI4E/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#38BDF8] transition">
                    <Facebook className="w-5 h-5" />
                    <span>Facebook Nguyễn Hùng Mạnh</span>
                  </a>
                  <a href="https://github.com/nhmanhDev" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition">
                    <Github className="w-5 h-5" />
                    <span>Github: nhmanhDev</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#FFCD00]/10 text-center text-white/50 text-sm">
            <p>© 2026 AI42E Studio. All rights reserved. 🇻🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
