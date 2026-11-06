import React, { useState } from 'react';
import { X, PackageOpen, Copy, Check, Eye, EyeOff, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { PurchasedOrder } from '../types';

interface MyOrdersModalProps {
  isOpen: boolean;
  orders: PurchasedOrder[];
  onClose: () => void;
  onBrowseAccounts: () => void;
}

export const MyOrdersModal: React.FC<MyOrdersModalProps> = ({
  isOpen,
  orders,
  onClose,
  onBrowseAccounts,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revealedPassMap, setRevealedPassMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePassword = (orderId: string) => {
    setRevealedPassMap((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121721] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090c10]">
          <div className="flex items-center gap-2.5">
            <PackageOpen className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Kho Đồ &amp; Đơn Hàng Của Bạn ({orders.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <PackageOpen className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-400">
                Bạn chưa có đơn hàng nào trong kho.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseAccounts();
                }}
                className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Khám Phá Acc Hot Ngay
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-[#090c10] rounded-xl border border-white/10 space-y-3 hover:border-amber-400/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {order.orderCode}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      · {order.purchaseDate}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {order.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                <div className="text-sm font-semibold text-white">
                  {order.title}
                </div>

                {order.credentials ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900/80 p-3 rounded-lg border border-white/5">
                    {/* User */}
                    <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded">
                      <span className="text-slate-400 text-[11px]">User:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-white font-bold">{order.credentials.username}</span>
                        <button
                          onClick={() => handleCopy(order.credentials!.username, `user-${order.id}`)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {copiedId === `user-${order.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Pass */}
                    <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded">
                      <span className="text-slate-400 text-[11px]">Pass:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-amber-400 font-bold">
                          {revealedPassMap[order.id] ? order.credentials.passwordReal : '••••••••••'}
                        </span>
                        <button
                          onClick={() => togglePassword(order.id)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {revealedPassMap[order.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleCopy(order.credentials!.passwordReal, `pass-${order.id}`)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {copiedId === `pass-${order.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* 2FA if exists */}
                    {order.credentials.backup2FA && (
                      <div className="sm:col-span-2 flex items-center justify-between bg-black/40 px-3 py-1.5 rounded">
                        <span className="text-slate-400 text-[11px]">Mã dự phòng 2FA:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-300">{order.credentials.backup2FA}</span>
                          <button
                            onClick={() => handleCopy(order.credentials!.backup2FA, `2fa-${order.id}`)}
                            className="text-slate-400 hover:text-white cursor-pointer"
                          >
                            {copiedId === `2fa-${order.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-lg flex items-center justify-between">
                    <span>
                      Roblox ID: <strong>{order.robuxDetails?.robloxUsername}</strong> (+{order.robuxDetails?.amount.toLocaleString('vi-VN')} R$)
                    </span>
                    <span className="text-emerald-400 font-medium">
                      {order.robuxDetails?.status}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#090c10] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
