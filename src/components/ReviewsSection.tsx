import React from 'react';
import { Star, ShieldCheck, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-14 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-bold text-amber-400 tracking-wider uppercase">
            Uy Tín &amp; Chất Lượng
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Đánh Giá Từ Khách Hàng Thực Tế
          </h2>
          <p className="text-sm text-slate-400">
            Hơn 45.000 game thủ Roblox tại Việt Nam đã tin tưởng giao dịch trong suốt 4 năm qua.
          </p>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#121721] border border-white/10 mb-10 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              48.500+
            </div>
            <div className="text-xs text-slate-400 mt-1">Đơn hàng hoàn tất</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              99.8%
            </div>
            <div className="text-xs text-slate-400 mt-1">Phản hồi 5 sao</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              5 Giây
            </div>
            <div className="text-xs text-slate-400 mt-1">Bàn giao tự động</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1">Bảo hành vĩnh viễn</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-[#121721] rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center border border-white/10">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{review.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {review.date}
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Product purchased tag (clean unboxed) */}
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                Đã mua: <span className="text-amber-300 font-medium">{review.itemBought}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
