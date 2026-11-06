import React, { useState } from 'react';
import { X, ShieldCheck, Zap, Lock, CheckCircle2, Copy, Check, ShoppingCart } from 'lucide-react';
import { AccountItem, UserWallet } from '../types';

interface AccountDetailModalProps {
  account: AccountItem | null;
  wallet: UserWallet;
  onClose: () => void;
  onConfirmBuy: (account: AccountItem) => void;
  onOpenDeposit: () => void;
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  account,
  wallet,
  onClose,
  onConfirmBuy,
  onOpenDeposit,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!account) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(account.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isAffordable = wallet.balance >= account.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121721] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090c10]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
              {account.code}
            </span>
            <span className="text-xs text-slate-400">{account.categoryName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
            <img
              src={account.image}
              alt={account.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/20">
                {account.securityStatus}
              </span>
              {account.robuxIncluded > 0 && (
                <span className="text-xs font-mono font-bold text-amber-300 bg-black/80 px-2.5 py-1 rounded border border-white/10">
                  +{account.robuxIncluded.toLocaleString('vi-VN')} Robux dư
                </span>
              )}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {account.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {account.description}
            </p>
          </div>

          {/* Account Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#090c10] rounded-xl border border-white/5 text-xs">
            {account.level && (
              <div>
                <span className="text-slate-500 block">Cấp độ (Level)</span>
                <span className="font-bold text-white font-mono">{account.level} (Max)</span>
              </div>
            )}
            {account.devilFruit && (
              <div className="col-span-2">
                <span className="text-slate-500 block">Trái Ác Quỷ</span>
                <span className="font-bold text-amber-300">{account.devilFruit}</span>
              </div>
            )}
            {account.fightingStyle && (
              <div>
                <span className="text-slate-500 block">Võ (Melee)</span>
                <span className="font-bold text-white">{account.fightingStyle}</span>
              </div>
            )}
            {account.race && (
              <div>
                <span className="text-slate-500 block">Tộc thức tỉnh</span>
                <span className="font-bold text-cyan-300">{account.race}</span>
              </div>
            )}
            {account.belly && (
              <div>
                <span className="text-slate-500 block">Tiền Beli / Frag</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {account.belly} B / {account.fragments} F
                </span>
              </div>
            )}
          </div>

          {/* Swords list */}
          {account.swords && account.swords.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Kho Vũ Khí &amp; Kiếm Huyền Thoại:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {account.swords.map((sword, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-slate-800 text-slate-200 rounded-md border border-white/5"
                  >
                    ⚔️ {sword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Security & Warranty Guarantee */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Chính sách Bảo Hành &amp; Bàn Giao Tức Thì</span>
            </div>
            <ul className="space-y-1 text-slate-300 pl-6 list-disc">
              <li>Tài khoản 100% chưa liên kết Email hay Số Điện Thoại (Trắng Thông Tin).</li>
              <li>Chưa cài mã PIN bảo mật, người mua nhận tài khoản được quyền đổi mật khẩu ngay lập tức.</li>
              <li>Bảo hành vĩnh viễn không bị back tài khoản (hoàn tiền hoặc 1 đổi 1 trong mọi trường hợp).</li>
            </ul>
          </div>
        </div>

        {/* Footer Checkout Bar */}
        <div className="px-6 py-4 bg-[#090c10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-slate-400">Giá thanh toán tự động:</div>
            <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
              {account.price.toLocaleString('vi-VN')} đ
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isAffordable ? (
              <button
                onClick={() => onConfirmBuy(account)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs sm:text-sm font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>Thanh Toán &amp; Nhận Acc Ngay</span>
              </button>
            ) : (
              <button
                onClick={onOpenDeposit}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs sm:text-sm font-bold rounded-xl border border-amber-400/40 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Nạp Thêm {(account.price - wallet.balance).toLocaleString('vi-VN')} đ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
