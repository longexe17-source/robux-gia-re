import React from 'react';
import { ShieldCheck, Plus, PackageOpen, Sparkles } from 'lucide-react';
import { UserWallet, PurchasedOrder } from '../types';

interface NavbarProps {
  wallet: UserWallet;
  orders: PurchasedOrder[];
  onOpenDeposit: () => void;
  onOpenOrders: () => void;
  onSelectNav: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  orders,
  onOpenDeposit,
  onOpenOrders,
  onSelectNav,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090c10]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectNav('hero')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold text-lg shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
            R
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              ROBUX PRIME
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectNav('accounts-blox')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Acc Blox Fruits
          </button>
          <button
            onClick={() => onSelectNav('accounts-limited')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Acc Limited & Korblox
          </button>
          <button
            onClick={() => onSelectNav('robux-instant')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-amber-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Mua Robux 120h
          </button>
          <button
            onClick={onOpenDeposit}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Nạp Tiền VietQR
          </button>
          <button
            onClick={() => onSelectNav('reviews-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Đánh Giá Uy Tín
          </button>
        </nav>

        {/* Zone 3: 1 primary action & wallet status */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Inventory / Orders button */}
          <button
            onClick={onOpenOrders}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer"
            title="Kho tài khoản & đơn hàng đã mua"
          >
            <PackageOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Kho Đồ</span>
            {orders.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                {orders.length}
              </span>
            )}
          </button>

          {/* User balance & Deposit CTA */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[11px] text-slate-400">Số dư ví</span>
              <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">
                {wallet.balance.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <button
              onClick={onOpenDeposit}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Nạp Tiền</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
