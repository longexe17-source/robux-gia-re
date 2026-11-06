import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Eye, EyeOff, ShieldAlert, Sparkles, X, ArrowRight } from 'lucide-react';
import { PurchasedOrder } from '../types';

interface OrderSuccessModalProps {
  order: PurchasedOrder | null;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copied2FA, setCopied2FA] = useState(false);

  if (!order) return null;

  const copyToClipboard = (text: string, type: 'user' | 'pass' | '2fa') => {
    navigator.clipboard.writeText(text);
    if (type === 'user') {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    } else if (type === 'pass') {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    } else {
      setCopied2FA(true);
      setTimeout(() => setCopied2FA(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121721] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Celebration header */}
        <div className="p-6 bg-gradient-to-b from-amber-500/15 to-transparent text-center border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-extrabold text-white">
            Giao Dịch Thành Công!
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Đơn hàng <span className="font-mono text-amber-400 font-bold">{order.orderCode}</span> đã được bàn giao tự động.
          </p>
        </div>

        {/* Content depending on order type */}
        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-400 font-medium">
            Sản phẩm: <span className="text-white font-semibold">{order.title}</span>
          </div>

          {order.credentials ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#090c10] rounded-xl border border-white/10 space-y-3">
                {/* Username row */}
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    Tên đăng nhập (Username):
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-white/5">
                    <span className="font-mono text-sm font-bold text-white selection:bg-amber-400">
                      {order.credentials.username}
                    </span>
                    <button
                      onClick={() => copyToClipboard(order.credentials!.username, 'user')}
                      className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                    >
                      {copiedUser ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUser ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>

                {/* Password row */}
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">
                    Mật khẩu (Password):
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-white/5">
                    <span className="font-mono text-sm font-bold text-amber-400">
                      {showPassword ? order.credentials.passwordReal : '••••••••••••••••'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                        title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(order.credentials!.passwordReal, 'pass')}
                        className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        {copiedPass ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPass ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Backup 2FA code */}
                {order.credentials.backup2FA && (
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">
                      Mã dự phòng 2FA (Nếu yêu cầu):
                    </span>
                    <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-white/5">
                      <span className="font-mono text-xs text-slate-300">
                        {order.credentials.backup2FA}
                      </span>
                      <button
                        onClick={() => copyToClipboard(order.credentials!.backup2FA, '2fa')}
                        className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        {copied2FA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied2FA ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Safety notice */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Lưu ý bảo mật:</strong> Hãy đăng nhập ngay vào <em>roblox.com</em>, đổi mật khẩu mới và liên kết Email &amp; Số Điện Thoại của bạn để sở hữu tài khoản vĩnh viễn.
                </p>
              </div>
            </div>
          ) : (
            /* Robux delivery info */
            <div className="p-4 bg-[#090c10] rounded-xl border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Tài khoản nhận:</span>
                <span className="font-mono text-white font-bold">{order.robuxDetails?.robloxUsername}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số lượng Robux:</span>
                <span className="font-mono text-amber-400 font-bold">+{order.robuxDetails?.amount.toLocaleString('vi-VN')} R$</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trạng thái:</span>
                <span className="text-emerald-400 font-semibold">{order.robuxDetails?.status}</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                Roblox đang tiến hành xử lý chuyển giao Gamepass. Bạn có thể kiểm tra trực tiếp tại mục My Transactions trên Roblox.
              </p>
            </div>
          )}
        </div>

        {/* Action footer */}
        <div className="px-6 py-4 bg-[#090c10] border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={onViewOrders}
            className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
          >
            Mở Kho Đồ Để Xem Lại
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-xl hover:from-amber-300 hover:to-amber-400 transition-colors cursor-pointer"
          >
            Hoàn Tất
          </button>
        </div>
      </div>
    </div>
  );
};
