import React, { useState } from 'react';
import { ShieldCheck, Eye, ShoppingCart, Coins, UserCheck } from 'lucide-react';
import { AccountItem } from '../types';

interface AccountCardProps {
  account: AccountItem;
  onViewDetails: (account: AccountItem) => void;
  onQuickBuy: (account: AccountItem) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  onViewDetails,
  onQuickBuy,
}) => {
  const [imageError, setImageError] = useState(false);
  const discount = Math.round(
    ((account.originalPrice - account.price) / account.originalPrice) * 100
  );

  return (
    <article className="group relative flex flex-col bg-[#121721] rounded-2xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 overflow-hidden">
      {/* Visual Asset Container (4:3 aspect ratio) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={account.image}
            alt={account.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400">
            <Coins className="w-8 h-8 text-amber-400/60 mb-2" />
            <span className="text-xs font-mono">{account.code}</span>
          </div>
        )}

        {/* Ambient top scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121721] via-transparent to-black/20" />

        {/* Code badge top left */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-md text-[11px] font-mono text-amber-300 rounded border border-white/10">
          Mã: {account.code}
        </div>

        {/* Discount tag top right */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-rose-500/90 text-white text-[11px] font-bold rounded">
            -{discount}%
          </div>
        )}

        {/* Robux inside indicator (bottom left of image) */}
        {account.robuxIncluded > 0 && (
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1 px-2 py-0.5 bg-amber-500/90 text-black text-[11px] font-bold rounded shadow-sm">
            <span>+{account.robuxIncluded.toLocaleString('vi-VN')} Robux dư</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
        {/* Unboxed clean metadata with · separators */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span>{account.categoryName}</span>
          <span aria-hidden="true">·</span>
          <span>{account.level ? `Lv ${account.level}` : 'Trắng TT'}</span>
          {account.race && (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{account.race}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
          {account.title}
        </h3>

        {/* Key Feature tags (unboxed subtle tags) */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {account.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Security badge line */}
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 pt-1 border-t border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span className="truncate">{account.securityStatus}</span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-extrabold text-amber-400 font-mono tabular-nums leading-none">
              {account.price.toLocaleString('vi-VN')} đ
            </div>
            {account.originalPrice > account.price && (
              <div className="text-[11px] text-slate-400 line-through font-mono tabular-nums mt-0.5">
                {account.originalPrice.toLocaleString('vi-VN')} đ
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onViewDetails(account)}
              className="p-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-white/10 transition-colors cursor-pointer"
              title="Xem thông tin chi tiết acc"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onQuickBuy(account)}
              className="px-3.5 py-1.5 text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-sm shadow-amber-500/10 flex items-center gap-1"
            >
              <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Mua Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
