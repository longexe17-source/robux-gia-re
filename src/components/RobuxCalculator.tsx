import React, { useState } from 'react';
import { Sparkles, ArrowRightLeft, ShieldAlert, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { RobuxPackage, UserWallet } from '../types';
import { ROBUX_PACKAGES } from '../data/mockData';

interface RobuxCalculatorProps {
  wallet: UserWallet;
  onBuyRobux: (packageItem: RobuxPackage, robloxUsername: string) => void;
  onOpenDeposit: () => void;
}

export const RobuxCalculator: React.FC<RobuxCalculatorProps> = ({
  wallet,
  onBuyRobux,
  onOpenDeposit,
}) => {
  const [selectedPkg, setSelectedPkg] = useState<RobuxPackage>(ROBUX_PACKAGES[1]);
  const [customRobux, setCustomRobux] = useState<number>(1000);
  const [robloxUsername, setRobloxUsername] = useState<string>('');
  const [method, setMethod] = useState<'120h' | 'group'>('120h');
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Rate: 1.000 Robux = 90.000 VND (1:11.1)
  const calculatedVND = Math.round((customRobux * 90000) / 1000);

  const handleCustomOrder = () => {
    if (!robloxUsername.trim()) {
      alert('Vui lòng nhập tên tài khoản (Username) Roblox của bạn để nhận Robux.');
      return;
    }
    const pkg: RobuxPackage = {
      id: `custom-${Date.now()}`,
      robuxAmount: customRobux,
      priceVND: calculatedVND,
      method: method === '120h' ? '120h Gamepass Tự Động' : 'Rút Group Trực Tiếp',
      processingTime: method === '120h' ? 'Roblox duyệt 120h (5 ngày)' : 'Ngay sau 1-5 phút',
    };
    onBuyRobux(pkg, robloxUsername);
  };

  const handlePkgOrder = (pkg: RobuxPackage) => {
    if (!robloxUsername.trim()) {
      alert('Vui lòng nhập tên tài khoản (Username) Roblox của bạn trước khi bấm mua.');
      return;
    }
    onBuyRobux(pkg, robloxUsername);
  };

  return (
    <section id="robux-instant" className="py-12 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Nạp Robux Chính Hãng</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bảng Giá &amp; Công Cụ Tính Tỉ Giá Robux 120h
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Robux sạch nguồn Premium/Group Funds 100%, bảo đảm không âm Robux hay khoá tài khoản.
            </p>
          </div>

          <button
            onClick={() => setShowGuide(!showGuide)}
            className="self-start md:self-auto flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 rounded-lg border border-amber-500/20 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cách tạo Gamepass nhận Robux 120h</span>
          </button>
        </div>

        {/* Guide Accordion */}
        {showGuide && (
          <div className="mb-8 p-5 bg-slate-900/90 rounded-2xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-amber-400 text-sm">
              Hướng dẫn 3 bước cài Gamepass nhận Robux 120h:
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              <li>
                Vào mục <strong>Create (create.roblox.com)</strong> &rarr; Chọn Experience của bạn &rarr; Chọn tab <strong>Associated Items</strong> &rarr; <strong>Passes</strong>.
              </li>
              <li>
                Tạo 1 Gamepass mới và đặt giá bán bằng đúng số Robux hệ thống yêu cầu (Roblox thu 30% thuế nên bạn đặt giá đúng để nhận đủ số Robux).
              </li>
              <li>
                Hệ thống tự động mua gamepass sau 1 phút, Robux sẽ hiển thị ở trạng thái <em>Pending (Robux Chờ Về)</em> trong 120 giờ (5 ngày) theo quy định của Roblox.
              </li>
            </ol>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Banner & Package Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Visual Promo Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121721] flex flex-col sm:flex-row items-center">
              <div className="w-full sm:w-1/2 p-6 space-y-3 z-10">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                  Ưu Đãi Tỉ Giá Đặc Biệt
                </span>
                <h3 className="text-xl font-extrabold text-white leading-snug">
                  100.000đ = 1.100+ Robux Sạch
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bảo hành nguồn Robux 100% trọn đời. Tự động kiểm tra trạng thái thanh toán và mua pass tức thì.
                </p>
                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 pt-1">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Cam kết không bao giờ bị âm Robux</span>
                </div>
              </div>
              <div className="w-full sm:w-1/2 h-48 sm:h-auto sm:self-stretch relative overflow-hidden">
                <img
                  src="/src/assets/images/banner_robux_instant_1793967011541.jpg"
                  alt="Robux Tokens"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#121721] via-transparent to-transparent" />
              </div>
            </div>

            {/* Quick Packages Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ROBUX_PACKAGES.slice(0, 6).map((pkg) => {
                const isSelected = selectedPkg.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPkg(pkg);
                      setCustomRobux(pkg.robuxAmount);
                    }}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-[#121721] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2 right-3 text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.2 rounded">
                        HOT
                      </span>
                    )}
                    <div>
                      <div className="text-lg font-black text-white font-mono tabular-nums">
                        {pkg.robuxAmount.toLocaleString('vi-VN')} R$
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {pkg.method}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">
                        {pkg.priceVND.toLocaleString('vi-VN')} đ
                      </span>
                      {pkg.bonusRate && (
                        <span className="text-[10px] text-emerald-400">
                          {pkg.bonusRate}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Calculator Box */}
          <div className="lg:col-span-5 bg-[#121721] rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">Máy Tính &amp; Đặt Đơn</span>
                <span className="text-xs font-mono text-slate-400">
                  Ví: <strong className="text-amber-400">{wallet.balance.toLocaleString('vi-VN')} đ</strong>
                </span>
              </div>

              {/* Method switch */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setMethod('120h')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    method === '120h'
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Robux 120h (Rẻ Nhất)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('group')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    method === 'group'
                      ? 'bg-amber-500 text-black shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rút Group (Cần Join 14d)
                </button>
              </div>

              {/* Roblox Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Tên tài khoản Roblox (Username)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: RobloxPro_VN, Gamer2026..."
                  value={robloxUsername}
                  onChange={(e) => setRobloxUsername(e.target.value)}
                  className="w-full bg-[#090c10] text-white px-3.5 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>

              {/* Custom Robux slider or input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-300">Số lượng Robux muốn mua</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {customRobux.toLocaleString('vi-VN')} Robux
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="100"
                  value={customRobux}
                  onChange={(e) => setCustomRobux(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>500 R$</span>
                  <span>5.000 R$</span>
                  <span>10.000 R$</span>
                  <span>15.000 R$</span>
                </div>
              </div>

              {/* Calculation Result Box */}
              <div className="p-4 rounded-xl bg-[#090c10] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Giá thanh toán:</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono tabular-nums">
                    {calculatedVND.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Thời gian nhận:</span>
                  <span className="text-slate-200">
                    {method === '120h' ? '120h (Theo cơ chế Roblox)' : '1 - 5 phút'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-2">
              <button
                onClick={handleCustomOrder}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-sm font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Xác Nhận Đặt Mua {customRobux.toLocaleString('vi-VN')} Robux</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {wallet.balance < calculatedVND && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Số dư hiện tại không đủ?</span>
                  <button
                    onClick={onOpenDeposit}
                    className="text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    Nạp thêm { (calculatedVND - wallet.balance).toLocaleString('vi-VN') } đ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
