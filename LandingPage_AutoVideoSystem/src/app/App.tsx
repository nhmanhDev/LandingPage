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
  Mail,
  Sun,
  Moon,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 12, minutes: 34, seconds: 56 });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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
  const [currentPurchase, setCurrentPurchase] = useState(0);
  const [showPurchase, setShowPurchase] = useState(false);

  const fakePurchases = [
    { name: 'Nguyễn Văn Minh', time: '1 phút trước' },
    { name: 'Trần Minh Hoàng', time: '2 phút trước' },
    { name: 'Lê Thuỳ Linh', time: '3 phút trước' },
    { name: 'Phạm Quốc Bảo', time: '4 phút trước' },
    { name: 'Hoàng Thị Yến', time: '5 phút trước' },
    { name: 'Đặng Đức Minh', time: '1 phút trước' },
    { name: 'Vũ Minh Tuấn', time: '2 phút trước' },
    { name: 'Bùi Phương Nam', time: '3 phút trước' },
    { name: 'Lý Thanh Hà', time: '4 phút trước' },
    { name: 'Trương Ngọc Ánh', time: '5 phút trước' },
    { name: 'Đỗ Tiến Dũng', time: '1 phút trước' },
    { name: 'Nguyễn Kiều Trang', time: '2 phút trước' },
    { name: 'Lê Xuân Trường', time: '3 phút trước' },
    { name: 'Phan Anh Đào', time: '4 phút trước' },
    { name: 'Phạm Minh Quang', time: '5 phút trước' },
    { name: 'Trần Thu Hà', time: '1 phút trước' },
    { name: 'Lương Thế Thành', time: '2 phút trước' },
    { name: 'Võ Thị Sáu', time: '3 phút trước' },
    { name: 'Hồ Xuân Hương', time: '4 phút trước' },
    { name: 'Chu Mạnh Cường', time: '5 phút trước' },
  ];

  useEffect(() => {
    // Show faster initially
    const timeoutInitial = setTimeout(() => setShowPurchase(true), 2000);
    const timeoutHideInitial = setTimeout(() => setShowPurchase(false), 8000);

    const showInterval = setInterval(() => {
      setCurrentPurchase((prev) => (prev + 1) % fakePurchases.length);
      setShowPurchase(true);
      setTimeout(() => {
        setShowPurchase(false);
      }, 6000);
    }, 6500);

    return () => {
      clearTimeout(timeoutInitial);
      clearTimeout(timeoutHideInitial);
      clearInterval(showInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-[#DA251D] selection:text-white ${isDark ? 'bg-[#05060A] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 60s linear infinite;
        }
        @keyframes slideInUp {
          from { transform: translateY(100%) translateX(-20px); opacity: 0; }
          to { transform: translateY(0) translateX(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#05060A]/80 backdrop-blur-xl border-b border-[#DA251D]/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex-1 flex justify-start">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-[#DA251D] to-[#FF4444] rounded-lg flex items-center justify-center relative">
                  <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#05060A]'}`}>AI42E Studio</span>
              </div>
            </div>

            {/* Centered Menu */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
              {[
                { id: 'features', label: 'Giới thiệu' },
                { id: 'demo', label: 'Demo' },
                { id: 'use-cases', label: 'Tính năng' },
                { id: 'pricing', label: 'Giá' },
                { id: 'faq', label: 'FAQ' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-all duration-300 relative py-1 hover:scale-105 ${activeSection === item.id
                    ? 'text-[#38BDF8] font-bold'
                    : isDark ? 'text-white/60 hover:text-white' : 'text-[#05060A]/60 hover:text-[#05060A]'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Buttons */}
            <div className="flex-1 flex justify-end items-center gap-2 md:gap-3 flex-shrink-0">

              <button
                onClick={() => scrollToSection('pricing')}
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#DA251D] to-[#FF4444] hover:opacity-90 transition-all hover:scale-105 relative group shadow-lg shadow-[#DA251D]/20"
              >
                <span className="flex items-center gap-1 text-white font-bold">
                  <Gift className="w-4 h-4" />
                  Ưu đãi 30/4 - Chỉ 304K
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg border transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-[#05060A] hover:bg-black/10'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-8 px-6 relative" id="features">
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
            <h1 className={`text-2xl md:text-4xl font-bold leading-snug md:leading-tight drop-shadow-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI42E Studio tự động viết kịch bản, tạo video có phụ đề, nhạc nền và hỗ trợ nhiều ngôn ngữ.
            </h1>
          </div>

          <div className="mt-4 mb-4 text-center z-10">
            <p className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-[#A7F3D0]' : 'text-emerald-800'}`}>
              Có thể tạo hàng chục video mỗi ngày chỉ với <span className={`text-5xl md:text-5xl font-extrabold mx-1 drop-shadow-[0_0_15px_rgba(255,205,0,0.3)] transition-colors duration-300 ${isDark ? 'text-[#FFCD00]' : 'text-orange-600'}`}>0 VND</span>
            </p>
          </div>
        </div>
      </section>



      {/* Demo Section */}
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 px-6" id="demo">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8] font-bold leading-tight">
              Demo
            </h2>
            {/* <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Tất cả video dưới đây được tạo tự động từ chủ đề
            </p> */}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { title: 'Tin tức AI', duration: '60s', ratio: '9:16', src: '/videos/demo-1.mp4' },
              { title: 'Giáo dục', duration: '45s', ratio: '9:16', src: '/videos/demo-2.mp4' },
              { title: 'Crypto / Finance', duration: '90s', ratio: '16:9', src: '/videos/demo-3.mp4' },

            ].map((demo, i) => (
              <div key={i} className="group cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[320px]">
                <div
                  className={`aspect-[9/16] border rounded-xl overflow-hidden relative mb-3 group-hover:border-[#FFCD00]/50 transition shadow-lg ${isDark ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10' : 'bg-slate-200 border-slate-300'}`}
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
                    <div className={`w-16 h-16 backdrop-blur-sm rounded-full flex items-center justify-center border group-hover:bg-[#DA251D]/80 group-hover:border-[#FFCD00] transition ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-slate-300'}`}>
                      <Play className={`w-8 h-8 ml-1 transition-colors ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-white'}`} />
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
      <section className="pt-4 pb-12 md:pt-6 md:pb-16 px-6" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4 text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8] leading-tight">
              Cách sử dụng hệ thống
            </h2>

          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`aspect-video rounded-3xl border-2 border-[#FFCD00]/30 overflow-hidden shadow-2xl shadow-[#FFCD00]/10 flex items-center justify-center relative group transition-colors ${isDark ? 'bg-[#0B1320]' : 'bg-slate-200'}`}>
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
                <div key={i} className="text-center p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10">
                  <div className="text-[#FFCD00] font-bold text-lg">{stat.label}</div>
                  <div className="text-slate-500 dark:text-white/40 text-xs uppercase tracking-wider mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tính năng */}
      {/* Features Bento Grid */}
      <section className={`py-8 md:py-12 px-6 transition-colors duration-300 ${isDark ? 'bg-[#080A12]' : 'bg-slate-50'}`} id="use-cases" >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large card 1 */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DA251D]/20 rounded-full blur-[100px]" />
              <div className="relative">
                <Code className="w-10 h-10 mb-4 text-[#FFCD00]" />
                <h3 className={`text-2xl mb-3 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Scene HTML có animation</h3>
                <p className={`mb-6 italic ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                  Mỗi cảnh là HTML động với animation CSS/JS, không phải slideshow nhàm chán
                </p>
                <div className={`rounded-lg p-4 border border-[#FFCD00]/30 font-mono text-sm text-[#FFCD00] ${isDark ? 'bg-black/40' : 'bg-slate-900'}`}>
                  <div>{'<div class="scene animated">'}</div>
                  <div className="ml-4 text-white/50">{'<!-- AI generated -->'}</div>
                  <div>{'</div>'}</div>
                </div>
              </div>
            </div>

            {/* Small cards */}
            <div className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
              <Sparkles className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className="text-lg mb-2 text-slate-900 dark:text-white font-semibold">AI viết kịch bản nhiều cảnh</h3>
              <p className="text-sm text-slate-600 dark:text-white/60">
                Tự động chia thành storyboard logic
              </p>
            </div>

            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Mic className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className={`text-lg mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Giọng đọc tiếng Việt tự nhiên</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                AI voice chất lượng cao
              </p>
            </div>

            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Type className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className={`text-lg mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Phụ đề karaoke tự động</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                Sync chính xác từng từ
              </p>
            </div>

            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Layout className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className={`text-lg mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Đa tỉ lệ khung hình</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                9:16, 16:9, 1:1, 4:5
              </p>
            </div>

            {/* Large card 2 */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#DA251D]/10 to-[#FFCD00]/10 backdrop-blur-sm border border-[#FFCD00]/20 rounded-2xl p-6 relative overflow-hidden" >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFCD00]/20 rounded-full blur-[100px]" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-8 h-8 text-[#FFCD00]" />
                  <h3 className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Không chỉ render tự động — bạn kiểm soát từng cảnh</h3>
                </div>
                <p className={`mb-5 text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                  Xem trước từng cảnh, sửa lời dẫn, chỉnh prompt, regenerate HTML hoặc render lại riêng lẻ trước khi xuất video cuối
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className={`aspect-video rounded-lg border flex items-center justify-center text-[10px] uppercase tracking-widest font-medium ${isDark ? 'bg-white/5 border-white/10 text-white/30' : 'bg-slate-900/10 border-slate-200 text-slate-900/30'}`}>
                    Live preview
                  </div>
                  <div className={`aspect-video rounded-lg border flex items-center justify-center text-[10px] uppercase tracking-widest font-medium ${isDark ? 'bg-white/5 border-white/10 text-white/30' : 'bg-slate-900/10 border-slate-200 text-slate-900/30'}`}>
                    Quick Edit
                  </div>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Palette className="w-8 h-8 mb-3 text-[#FFCD00]" />
              <h3 className={`text-lg mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Tạo style video riêng</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                Custom logo, màu sắc, font chữ
              </p>
            </div>

            <div className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <Music className="w-8 h-8 mb-3 text-[#DA251D]" />
              <h3 className={`text-lg mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Nhạc nền & sound effect</h3>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                Tự động thêm background music
              </p>
            </div>


          </div>
        </div>
      </section>
      <section className={`py-12 md:py-16 px-6 transition-colors duration-300 ${isDark ? 'bg-[#080A12]' : 'bg-slate-50'}`} >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Nhà sáng tạo số',
                benefit: 'Xây dựng đế chế nội dung cá nhân với tần suất đăng bài vượt trội',
                example: 'Chỉ từ 1 ý tưởng gốc, tự động hóa chuỗi 30 video Reels/TikTok phủ sóng cả tháng',
              },
              {
                icon: Terminal,
                title: 'Giải pháp Công nghệ',
                benefit: 'Trực quan hóa các tính năng kỹ thuật và quy trình phần mềm phức tạp',
                example: 'Tự động tạo video giới thiệu tính năng (feature tour) hoặc hướng dẫn sử dụng từ documentation',
              },
              {
                icon: Shield,
                title: 'Tài chính & Đầu tư',
                benefit: 'Cập nhật biến động thị trường và phân tích dữ liệu theo thời gian thực',
                example: 'Tạo hàng loạt video tin tức thị trường, biểu đồ chứng khoán hoặc bản tin tài chính mỗi ngày',
              },
            ].map((useCase, i) => (
              <div key={i} className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:border-[#FFCD00]/30 ${isDark ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
                <useCase.icon className="w-10 h-10 mb-4 text-[#FFCD00]" />
                <h3 className={`text-xl mb-2 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{useCase.title}</h3>
                <p className={`mb-4 text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{useCase.benefit}</p>
                <div className={`border border-[#FFCD00]/20 rounded-lg p-3 text-sm ${isDark ? 'bg-[#DA251D]/10' : 'bg-[#DA251D]/5'}`}>
                  <span className={`${isDark ? 'text-white/50' : 'text-slate-500'}`}>Ví dụ:</span>
                  <p className={`mt-1 italic ${isDark ? 'text-white/80' : 'text-slate-700'}`}>{useCase.example}</p>
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
            <div className={`mx-auto max-w-3xl rounded-3xl border border-[#38BDF8]/20 p-6 shadow-xl shadow-[#38BDF8]/10 transition-colors duration-300 ${isDark ? 'bg-[#0B1320]/90 text-white' : 'bg-white text-slate-900'}`}>
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#A7F3D0] to-[#38BDF8] leading-snug py-1">
                Tại sao nên dùng AI42E Studio?
              </p>
              <p className={`mt-4 text-xl md:text-xl ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                Sản xuất video chất lượng cao hoàn toàn tự động, chi phí tiệm cận 0đ
              </p>
            </div>
          </div>

          <div className={`backdrop-blur-sm border rounded-2xl overflow-hidden transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <th className={`text-left p-6 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Tiêu chí</th>
                    <th className={`p-6 text-center font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Thuê editor</th>
                    <th className={`p-6 text-center font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dùng SaaS tạo video</th>
                    <th className="p-6 text-center bg-gradient-to-br from-[#DA251D]/20 to-[#FFCD00]/20 border-l-2 border-r-2 border-[#FFCD00]/30 transition-colors">
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
                    <tr key={i} className="border-b border-slate-100 dark:border-white/5 transition-colors">
                      <td className="p-6 text-slate-600 dark:text-white/70">{row.criteria}</td>
                      <td className="p-6 text-center text-slate-500 dark:text-white/60">{row.editor}</td>
                      <td className="p-6 text-center text-slate-500 dark:text-white/60">{row.saas}</td>
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
      <section className={`py-12 md:py-16 px-6 transition-colors duration-300 ${isDark ? 'bg-[#080A12]' : 'bg-slate-100'}`} id="pricing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl mb-4 font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Giá đặc biệt chỉ trong dịp lễ 30/4
            </h2>
            <p className={`text-xl md:text-xl font-medium ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Thanh toán một lần, sở hữu vĩnh viễn - <span className="text-[#DA251D] font-bold">Tiết kiệm 362K!</span>
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
                    <Clock className={`w-5 h-5 ${isDark ? 'text-[#FFCD00]' : 'text-orange-700'}`} />
                    <div className="flex items-center gap-2">
                      {[
                        { value: timeLeft.days, label: 'Ngày' },
                        { value: timeLeft.hours, label: 'Giờ' },
                        { value: timeLeft.minutes, label: 'Phút' },
                        { value: timeLeft.seconds, label: 'Giây' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {i > 0 && <span className={`font-bold ${isDark ? 'text-[#FFCD00]' : 'text-orange-700'}`}>:</span>}
                          <div className={`border rounded-xl px-3 py-2 min-w-[70px] text-center shadow-lg transition-all duration-300 ${isDark ? 'bg-[#DA251D]/40 border-[#FFCD00]/30 shadow-inner' : 'bg-white border-orange-200'}`}>
                            <div className={`text-2xl font-black ${isDark ? 'text-[#FFCD00]' : 'text-orange-700'}`}>{String(item.value).padStart(2, '0')}</div>
                            <div className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-white/60' : 'text-orange-900/60'}`}>{item.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price comparison */}
                <div className="mb-6">
                  <div className={`text-3xl line-through mb-2 italic font-medium transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                    666.000 VNĐ
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className={`w-10 h-10 fill-current animate-pulse transition-colors ${isDark ? 'text-[#FFCD00]' : 'text-orange-600'}`} />
                    <div>
                      <div className={`text-6xl md:text-7xl font-black bg-clip-text text-transparent transform scale-110 shadow-sm transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-[#FFCD00] via-[#FFE066] to-[#FFCD00]' : 'bg-gradient-to-r from-orange-600 via-red-600 to-orange-600'}`}>
                        304K
                      </div>
                    </div>
                    <Star className={`w-10 h-10 fill-current animate-pulse transition-colors ${isDark ? 'text-[#FFCD00]' : 'text-orange-600'}`} />
                  </div>
                  <div className={`inline-block px-8 py-3 border rounded-full shadow-xl transition-all duration-300 ${isDark ? 'bg-[#FFCD00]/20 border-[#FFCD00]/50 shadow-[#FFCD00]/10' : 'bg-white border-orange-200 shadow-orange-100'}`}>
                    <span className={`text-xl font-black ${isDark ? 'text-[#FFCD00]' : 'text-orange-700'}`}>💰 Tiết kiệm 362.000đ (54%)</span>
                  </div>
                </div>

                <div className={`text-2xl mb-1 font-black ${isDark ? 'text-white/90' : 'text-slate-900'}`}>Thanh toán một lần</div>
                <div className={`text-lg mb-8 font-bold ${isDark ? 'text-white/60' : 'text-slate-600'}`}>Sở hữu source code vĩnh viễn</div>

                <div className="flex justify-center flex-col px-4 md:px-0 auto-mx">
                  <button
                    onClick={() => setIsPaymentOpen(true)}
                    className="w-full md:w-3/4 mx-auto px-8 py-5 bg-gradient-to-r from-[#DA251D] to-[#FF4444] rounded-2xl text-2xl font-black text-white hover:opacity-90 transition shadow-2xl shadow-[#DA251D]/60 border-2 border-[#FFCD00]/50 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 ease-out duration-200"
                  >
                    <Gift className="w-8 h-8" />
                    🚀 THANH TOÁN MÃ QR
                  </button>
                  <p className={`text-sm mt-4 font-bold ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Nhận trọn bộ mã nguồn ngay lập tức</p>
                </div>
              </div>

              {/* Right Column: Features Checklist */}
              <div className="w-full lg:w-[380px] shrink-0 bg-white dark:bg-[#0B1320]/80 backdrop-blur-md border border-slate-200 dark:border-[#FFCD00]/30 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCD00]/10 rounded-full blur-[40px] pointer-events-none" />
                <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
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
                      <span className="text-slate-700 dark:text-white/80 font-medium text-base">{item}</span>
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
      <section className={`py-12 md:py-16 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#05060A]' : 'bg-slate-50'}`} id="trust">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 px-6">
            <h2 className={`text-3xl md:text-4xl mb-4 font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Đánh giá từ người dùng
            </h2>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Hàng trăm nhà sáng tạo đã tối ưu hoá quy trình với AI42E Studio
            </p>
          </div>

          {/* Infinite Marquee */}
          <div className="relative flex overflow-x-hidden group">
            <div className="py-12 flex animate-marquee whitespace-nowrap gap-6">
              {[
                { name: 'Anh Tuấn', role: 'Content Creator', text: 'Tool chạy cực mượt, mình tạo được 20 video short mỗi ngày mà không tốn xu nào cho editor.' },
                { name: 'Minh Hoàng', role: 'Kỹ sư phần mềm', text: 'Source code sạch, dễ customize. Mình đã tích hợp thành công vào hệ thống CMS của công ty.' },
                { name: 'Thùy Linh', role: 'Marketing Manager', text: 'Tiết kiệm được 80% thời gian làm video quảng cáo. Rất đáng đầu tư cho team mkt.' },
                { name: 'Quốc Bảo', role: 'Youtuber', text: 'Thích nhất là chạy local, không lo rò rỉ ý tưởng hay bị khóa tài khoản như dùng web SaaS.' },
                { name: 'Hoàng Yến', role: 'Giáo viên Digital', text: 'Chuyển giáo án thành video cực nhanh. Học sinh rất thích phong cách animation này.' },
                { name: 'Đức Minh', role: 'Tiktoker', text: 'Render video nhanh, phụ đề karaoke đồng bộ rất chuẩn. 10/10 điểm cho team phát triển.' },
                { name: 'Tùng Lâm', role: 'Video Editor', text: 'Thay vì edit chân tay 3 tiếng, giờ mình chỉ cần 1 click là xong clip Shorts xịn.' },
                { name: 'Bích Phương', role: 'KOL / Entrepreneur', text: 'Mình tự làm video review sản phẩm cực chuyên nghiệp mà không cần thuê team quay phim.' },
                { name: 'Gia Bách', role: 'Affiliate Marketer', text: 'Kênh của mình tăng trưởng 300% nhờ lượng video phủ đều đặn mỗi ngày từ tool.' },
                { name: 'Minh Thư', role: 'Agency Owner', text: 'Tool giúp scale dự án cho khách hàng nhanh chóng mà không cần tuyển thêm nhân sự.' },
              ].concat([
                { name: 'Anh Tuấn', role: 'Content Creator', text: 'Tool chạy cực mượt, mình tạo được 20 video short mỗi ngày mà không tốn xu nào cho editor.' },
                { name: 'Minh Hoàng', role: 'Kỹ sư phần mềm', text: 'Source code sạch, dễ customize. Mình đã tích hợp thành công vào hệ thống CMS của công ty.' },
                { name: 'Thùy Linh', role: 'Marketing Manager', text: 'Tiết kiệm được 80% thời gian làm video quảng cáo. Rất đáng đầu tư cho team mkt.' },
                { name: 'Quốc Bảo', role: 'Youtuber', text: 'Thích nhất là chạy local, không lo rò rỉ ý tưởng hay bị khóa tài khoản như dùng web SaaS.' },
                { name: 'Hoàng Yến', role: 'Giáo viên Digital', text: 'Chuyển giáo án thành video cực nhanh. Học sinh rất thích phong cách animation này.' },
                { name: 'Đức Minh', role: 'Tiktoker', text: 'Render video nhanh, phụ đề karaoke đồng bộ rất chuẩn. 10/10 điểm cho team phát triển.' },
                { name: 'Tùng Lâm', role: 'Video Editor', text: 'Thay vì edit chân tay 3 tiếng, giờ mình chỉ cần 1 click là xong clip Shorts xịn.' },
                { name: 'Bích Phương', role: 'KOL / Entrepreneur', text: 'Mình tự làm video review sản phẩm cực chuyên nghiệp mà không cần thuê team quay phim.' },
                { name: 'Gia Bách', role: 'Affiliate Marketer', text: 'Kênh của mình tăng trưởng 300% nhờ lượng video phủ đều đặn mỗi ngày từ tool.' },
                { name: 'Minh Thư', role: 'Agency Owner', text: 'Tool giúp scale dự án cho khách hàng nhanh chóng mà không cần tuyển thêm nhân sự.' },
              ]).map((review, i) => (
                <div key={i} className={`inline-block w-[350px] whitespace-normal backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#DA251D] to-[#FFCD00] flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{review.name}</div>
                      <div className="text-xs text-[#FFCD00] font-medium">{review.role}</div>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#FFCD00] fill-[#FFCD00]" />)}
                    </div>
                  </div>
                  <p className={`text-sm italic leading-relaxed ${isDark ? 'text-white/70' : 'text-slate-600'}`}>"{review.text}"</p>
                </div>
              ))}
            </div>

            {/* Fading gradients for edges */}
            <div className={`absolute inset-y-0 left-0 w-32 z-10 pointer-events-none transition-colors duration-300 ${isDark ? 'bg-gradient-to-r from-[#05060A] to-transparent' : 'bg-gradient-to-r from-slate-50 to-transparent'}`} />
            <div className={`absolute inset-y-0 right-0 w-32 z-10 pointer-events-none transition-colors duration-300 ${isDark ? 'bg-gradient-to-l from-[#05060A] to-transparent' : 'bg-gradient-to-l from-slate-50 to-transparent'}`} />
          </div>

          <div className="mt-12 px-6">
            <div className={`backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 ${isDark ? 'bg-white/5 border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-2xl'}`}>
              <div className="text-center mb-8">
                <h3 className={`text-xl font-black mb-2 uppercase tracking-widest ${isDark ? 'text-white/70' : 'text-slate-400'}`}>Technical Stack</h3>
                <div className="h-1 w-20 bg-[#FFCD00] mx-auto rounded-full" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { name: 'Node.js', color: 'text-green-500' },
                  { name: 'Python', color: 'text-blue-500' },
                  { name: 'FFmpeg', color: 'text-green-400' },
                  { name: 'Chrome', color: 'text-red-400' },
                  { name: 'HTML scenes', color: 'text-orange-500' },
                  { name: 'AI APIs', color: 'text-purple-500' }
                ].map((tech, i) => (
                  <div key={i} className={`flex items-center gap-2 px-6 py-3 border rounded-xl font-mono text-sm font-bold transition-all hover:scale-110 ${isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-slate-50 border-slate-200 text-slate-800 shadow-sm'}`}>
                    <div className={`w-2 h-2 rounded-full bg-current ${tech.color}`} />
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-12 md:py-16 px-6 transition-colors duration-300 ${isDark ? 'bg-[#080A12]' : 'bg-slate-50'}`} id="faq">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl md:text-4xl mb-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Câu hỏi thường gặp?
            </h2>
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
              <div key={i} className={`backdrop-blur-sm border rounded-2xl p-5 hover:border-[#FFCD00]/20 transition-colors group ${isDark ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className={`text-base font-bold mb-3 transition-colors group-hover:text-[#FFCD00] ${isDark ? 'text-white' : 'text-slate-900'}`}>{faq.q}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-slate-600'}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className={`py-12 px-6 border-t transition-colors duration-300 ${isDark ? 'bg-[#080A12] border-[#FFCD00]/10' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#DA251D] to-[#FF4444] rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#FFCD00] fill-[#FFCD00]" />
                </div>
                <span className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>AI42E Studio</span>
              </div>
              <p className={`max-w-md mb-4 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                Pipeline tự động tạo video AI với HTML animation, voice tiếng Việt, và phụ đề karaoke. Sở hữu source code, chạy local, không giới hạn.
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg ${isDark ? 'bg-[#DA251D]/20 border-[#FFCD00]/30' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Star className="w-4 h-4 text-[#FFCD00] fill-[#FFCD00]" />
                <span className={`text-sm font-bold ${isDark ? 'text-[#FFCD00]' : 'text-[#DA251D]'}`}>Khuyến mãi 30/4 - Giá chỉ 304K</span>
              </div>
            </div>

            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sản phẩm</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('features')} className={`block transition ${isDark ? 'text-white/60 hover:text-[#FFCD00]' : 'text-slate-600 hover:text-[#DA251D]'}`}>Giới thiệu</button>
                <button onClick={() => scrollToSection('demo')} className={`block transition ${isDark ? 'text-white/60 hover:text-[#FFCD00]' : 'text-slate-600 hover:text-[#DA251D]'}`}>Demo</button>
                <button onClick={() => scrollToSection('pricing')} className={`block transition ${isDark ? 'text-white/60 hover:text-[#FFCD00]' : 'text-slate-600 hover:text-[#DA251D]'}`}>Giá 30/4</button>
                <button onClick={() => scrollToSection('faq')} className={`block transition ${isDark ? 'text-white/60 hover:text-[#FFCD00]' : 'text-slate-600 hover:text-[#DA251D]'}`}>FAQ</button>
              </div>
            </div>

            <div>
              <h4 className={`font-bold mb-4 ${isDark ? 'text-[#FFCD00]' : 'text-[#DA251D]'}`}>Liên hệ & Hỗ trợ</h4>
              <div className="space-y-3">
                <div className="flex flex-col gap-3">
                  <a href="https://zalo.me/0392389623" target="_blank" rel="noreferrer" className={`flex items-center gap-2 transition hover:translate-x-1 duration-200 ${isDark ? 'text-white/70 hover:text-[#0068FF]' : 'text-slate-600 hover:text-[#0068FF]'}`}>
                    <MessageCircle className="w-5 h-5 text-[#0068FF]" />
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Zalo: 0392389623</span>
                  </a>
                  <a href="mailto:nhmanh.dev@gmail.com" className={`flex items-center gap-2 transition hover:translate-x-1 duration-200 ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                    <Mail className="w-5 h-5 text-red-500" />
                    <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-medium`}>Email: nhmanh.dev@gmail.com</span>
                  </a>
                  <a href="https://www.facebook.com/nhmanhAI4E/" target="_blank" rel="noreferrer" className={`flex items-center gap-2 transition hover:translate-x-1 duration-200 ${isDark ? 'text-white/70 hover:text-[#38BDF8]' : 'text-slate-600 hover:text-[#38BDF8]'}`}>
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                    <span className={`font-medium ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Facebook Nguyễn Hùng Mạnh</span>
                  </a>
                  <a href="https://github.com/nhmanhDev" target="_blank" rel="noreferrer" className={`flex items-center gap-2 transition hover:translate-x-1 duration-200 ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                    <Github className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-800'}`} />
                    <span className={`font-medium ${isDark ? 'text-white/70' : 'text-slate-600'}`}>Github: nhmanhDev</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={`pt-8 border-t text-center text-sm transition-colors duration-300 ${isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-500'}`}>
            <p>© 2026 AI42E Studio. All rights reserved. 🇻🇳</p>
          </div>
        </div>
      </footer>

      {/* FOMO Purchase Notification */}
      <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-700 pointer-events-none transform ${showPurchase ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
        <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 shadow-2xl backdrop-blur-xl transition-colors duration-300 pointer-events-auto ${isDark ? 'bg-[#0B1320]/90 border-[#FFCD00]/20 shadow-black' : 'bg-white/90 border-slate-200 shadow-slate-200/50'}`}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DA251D] to-[#FF4444] flex items-center justify-center shrink-0 relative overflow-hidden">
            <ShoppingBag className="w-6 h-6 text-white relative z-10" />
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
          <div className="flex flex-col pr-2">
            <div className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {fakePurchases[currentPurchase].name}
            </div>
            <div className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-500'}`}>
              vừa mua <span className="text-[#DA251D] font-black italic">AI42E Studio</span>
            </div>
            <div className={`text-[10px] mt-1 font-bold ${isDark ? 'text-[#FFCD00]' : 'text-orange-600'}`}>
              ⚡ {fakePurchases[currentPurchase].time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
