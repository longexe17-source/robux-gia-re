import React from 'react';
import { ShieldCheck, MessageCircle, Phone, Headphones, Clock } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenDeposit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenDeposit }) => {
  return (
    <footer className="bg-[#090c10] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-sm">
                R
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                ROBUX PRIME
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hệ thống bán Account Roblox Blox Fruits, Acc Limited, và nạp Robux 120h tự động 24/7. Uy tín số 1 Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cam kết bảo hành vĩnh viễn 100%</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Danh Mục Tài Khoản
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('blox-fruits')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Acc Blox Fruits V4 Kitsune
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('limited-vip')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Acc Korblox &amp; Headless VIP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('anime-defenders')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Acc Anime Vanguards / Defenders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('budget-starter')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Acc Tân Thủ Giá Rẻ (Qua Sea 3)
                </button>
              </li>
            </ul>
          </div>

          {/* Policy & Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Chính Sách &amp; An Toàn
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Chính sách hoàn tiền 100% nếu có lỗi</li>
              <li>Hướng dẫn đổi mật khẩu &amp; bật 2FA</li>
              <li>Quy định bảo hành tài khoản sạch</li>
              <li>
                <button
                  onClick={onOpenDeposit}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Hướng dẫn nạp tiền tự động VietQR
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hỗ Trợ Trực Tuyến 24/7
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Headphones className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline / Zalo: 0988.77.66.55</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hệ thống tự động trực 24/24</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 transition-colors text-xs font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Chat Zalo Admin</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} ROBUX PRIME. Toàn bộ bản quyền được bảo hộ.
          </div>
          <div className="flex items-center gap-4">
            <span>Bảo mật giao dịch SSL 256-bit</span>
            <span aria-hidden="true">·</span>
            <span>Giao dịch tức thì</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
