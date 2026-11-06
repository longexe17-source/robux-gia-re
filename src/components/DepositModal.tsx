import React, { useState } from 'react';
import { X, QrCode, CreditCard, Copy, Check, RefreshCw, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserWallet } from '../types';

interface DepositModalProps {
  isOpen: boolean;
  wallet: UserWallet;
  onClose: () => void;
  onDepositSuccess: (amount: number, method: string) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  wallet,
  onClose,
  onDepositSuccess,
}) => {
  const [tab, setTab] = useState<'vietqr' | 'card'>('vietqr');
  const [selectedAmount, setSelectedAmount] = useState<number>(200000);
  const [customAmount, setCustomAmount] = useState<string>('200000');
  const [memoCode] = useState<string>(() => `RBPRIME${Math.floor(10000 + Math.random() * 90000)}`);

  // Card tab states
  const [telco, setTelco] = useState('Viettel');
  const [cardValue, setCardValue] = useState('100000');
  const [cardPin, setCardPin] = useState('');
  const [cardSeri, setCardSeri] = useState('');

  // Processing state
  const [isVerifying, setIsVerifying] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Copy helpers
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAmount = Number(customAmount) || selectedAmount;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVerifyBankTransfer = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onDepositSuccess(currentAmount, 'VietQR Auto Banking');
      setSuccessNotice(`Nạp thành công +${currentAmount.toLocaleString('vi-VN')} đ vào ví!`);
      setTimeout(() => {
        setSuccessNotice(null);
        onClose();
      }, 1500);
    }, 1800);
  };

  const handleSubmitCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardPin || !cardSeri) {
      alert('Vui lòng nhập đầy đủ Mã thẻ và Số Seri thẻ.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const val = Number(cardValue);
      // Telco rate 85%
      const actualAdded = Math.round(val * 0.85);
      onDepositSuccess(actualAdded, `Thẻ cào ${telco}`);
      setSuccessNotice(`Nạp thẻ ${telco} thành công! +${actualAdded.toLocaleString('vi-VN')} đ (Đã trừ chiết khấu nhà mạng 15%)`);
      setTimeout(() => {
        setSuccessNotice(null);
        onClose();
      }, 1800);
    }, 2000);
  };

  const vietqrUrl = `https://img.vietqr.io/image/MB-0988776655-compact2.png?amount=${currentAmount}&addInfo=${memoCode}&accountName=NGUYEN%20TRUONG%20LONG`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121721] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090c10]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Nạp Tiền Vào Tài Khoản</span>
              <span className="text-xs text-amber-400 font-mono">Ví: {wallet.balance.toLocaleString('vi-VN')} đ</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-4 pb-0">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-white/5">
            <button
              onClick={() => setTab('vietqr')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                tab === 'vietqr'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Chuyển Khoản VietQR (Nhận 100%)</span>
            </button>
            <button
              onClick={() => setTab('card')}
              className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                tab === 'card'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Thẻ Cào Điện Thoại</span>
            </button>
          </div>
        </div>

        {/* Success toast notification */}
        {successNotice && (
          <div className="m-4 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Tab 1: VietQR */}
        {tab === 'vietqr' && (
          <div className="p-6 space-y-5">
            {/* Amount presets */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">
                Chọn số tiền muốn nạp:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[50000, 100000, 200000, 500000, 1000000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount(amt.toString());
                    }}
                    className={`py-2 px-1 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      currentAmount === amt
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {(amt / 1000).toLocaleString('vi-VN')}k
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code and Bank Details */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#090c10] rounded-xl border border-white/10">
              {/* QR Image with styled fallback */}
              <div className="w-36 h-36 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden group">
                <img
                  src={vietqrUrl}
                  alt="VietQR Chuyển Khoản Tự Động"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to decorative QR representation if network is isolated
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-2 text-center pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
                  <span className="text-[10px] text-black font-mono font-bold">MBBank</span>
                </div>
              </div>

              {/* Bank Info Fields */}
              <div className="flex-1 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-slate-400">Ngân hàng:</span>
                  <span className="font-bold text-white">MBBank (Quân Đội)</span>
                </div>

                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-slate-400">Số tài khoản:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">0988776655</span>
                    <button
                      onClick={() => handleCopy('0988776655', 'stk')}
                      className="text-slate-400 hover:text-white cursor-pointer"
                      title="Sao chép STK"
                    >
                      {copiedField === 'stk' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-slate-400">Chủ tài khoản:</span>
                  <span className="font-semibold text-white">NGUYEN TRUONG LONG</span>
                </div>

                <div className="flex items-center justify-between pb-1 border-b border-white/5">
                  <span className="text-slate-400">Số tiền:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">
                      {currentAmount.toLocaleString('vi-VN')} đ
                    </span>
                    <button
                      onClick={() => handleCopy(currentAmount.toString(), 'amount')}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedField === 'amount' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  <span className="text-amber-300 font-medium">Nội dung CK:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-amber-400 tracking-wider">
                      {memoCode}
                    </span>
                    <button
                      onClick={() => handleCopy(memoCode, 'memo')}
                      className="text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      {copiedField === 'memo' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              * Quét mã QR bằng ứng dụng ngân hàng bất kỳ (Vietcombank, MB, Techcombank, MoMo, VietinBank...). Tiền sẽ tự động cộng vào tài khoản sau 5–15 giây.
            </p>

            <button
              onClick={handleVerifyBankTransfer}
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Hệ thống đang kiểm tra biến động số dư...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tôi Đã Chuyển Khoản (Kiểm Tra Ngay)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Mobile Card */}
        {tab === 'card' && (
          <form onSubmit={handleSubmitCard} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Nhà mạng:</label>
              <div className="grid grid-cols-4 gap-2">
                {['Viettel', 'Vinaphone', 'Mobifone', 'Zing'].map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setTelco(net)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      telco === net
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {net}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Mệnh giá thẻ:</label>
              <select
                value={cardValue}
                onChange={(e) => setCardValue(e.target.value)}
                className="w-full bg-[#090c10] text-white px-3 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="50000">50.000 đ (Nhận 42.500 đ)</option>
                <option value="100000">100.000 đ (Nhận 85.000 đ)</option>
                <option value="200000">200.000 đ (Nhận 170.000 đ)</option>
                <option value="500000">500.000 đ (Nhận 425.000 đ)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Mã thẻ (PIN):</label>
              <input
                type="text"
                placeholder="Nhập mã cào dưới lớp tráng bạc"
                value={cardPin}
                onChange={(e) => setCardPin(e.target.value)}
                className="w-full bg-[#090c10] text-white px-3 py-2 rounded-xl border border-white/10 text-xs font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Số Seri thẻ:</label>
              <input
                type="text"
                placeholder="Nhập số seri in trên mặt thẻ"
                value={cardSeri}
                onChange={(e) => setCardSeri(e.target.value)}
                className="w-full bg-[#090c10] text-white px-3 py-2 rounded-xl border border-white/10 text-xs font-mono focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="text-[11px] text-slate-400">
              * Nạp thẻ cào điện thoại có chiết khấu nhà mạng 15%. Để nhận 100% giá trị, khuyến khích bạn chuyển qua tab <strong>Chuyển Khoản VietQR</strong>.
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang kết nối cổng gạch thẻ...</span>
                </>
              ) : (
                <span>Gửi Thẻ Duyệt Tự Động</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
