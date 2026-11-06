import React, { useState, useEffect } from 'react';
import { Search, Shield, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { LIVE_ACTIVITY_STREAM } from '../data/mockData';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onQuickCategory: (cat: string) => void;
  onScrollToRobux: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onQuickCategory,
  onScrollToRobux,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_ACTIVITY_STREAM.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Instant Search */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Live purchase ticker (clean inline text, no cheesy pills) */}
            <div className="flex items-center gap-2.5 text-xs text-amber-300/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="truncate transition-opacity duration-300">
                {LIVE_ACTIVITY_STREAM[tickerIndex]}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Shop Acc Roblox &amp; Robux <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Giao Tự Động 5 Giây
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Hệ thống cung cấp Account Blox Fruits Max Level V4, Acc Korblox Headless Limited, Anime Defenders và Robux 120h chính hãng. 100% tài khoản trắng thông tin, bảo hành đổi trả trọn đời.
              </p>
            </div>

            {/* Claim-to-proof trust points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Trắng Thông Tin 100%</span>
              </div>
              <span className="text-white/20" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Nhận Tài Khoản Trong 5s</span>
              </div>
              <span className="text-white/20" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bảo Hành Vĩnh Viễn</span>
              </div>
            </div>

            {/* Search Box & Quick Tags */}
            <div className="space-y-3 pt-2">
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm acc theo từ khóa: Kitsune, CDK, Godhuman, Korblox, V4..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-[#121721] text-white pl-11 pr-24 py-3 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80 placeholder:text-slate-500 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Quick filter tabs */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Gợi ý tìm kiếm:</span>
                {['Kitsune', 'Cyborg V4', 'Korblox', 'Buddha', 'CDK'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onSearchChange(tag)}
                    className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 hover:text-amber-300 text-slate-300 rounded-md border border-white/5 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121721] group">
              <img
                src="/src/assets/images/hero_roblox_universe_1793967009747.jpg"
                alt="Roblox Universe Prime Gaming"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-black/30 to-transparent" />

              {/* In-hero quick banner */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#090c10]/85 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                      Chính Sách Cam Kết
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Đổi Mới 1:1 Nếu Có Bất Kỳ Lỗi Nào
                    </div>
                  </div>
                  <button
                    onClick={onScrollToRobux}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    Bảng Giá Robux
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
