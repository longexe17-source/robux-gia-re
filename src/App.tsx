import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AccountCard } from './components/AccountCard';
import { RobuxCalculator } from './components/RobuxCalculator';
import { AccountDetailModal } from './components/AccountDetailModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DepositModal } from './components/DepositModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { INITIAL_ACCOUNTS } from './data/mockData';
import { AccountItem, AccountCategory, PurchasedOrder, UserWallet, RobuxPackage } from './types';
import { Filter, SlidersHorizontal, Sparkles, Check, ArrowUpDown } from 'lucide-react';

const WALLET_STORAGE_KEY = 'robux_prime_wallet_v1';
const ORDERS_STORAGE_KEY = 'robux_prime_orders_v1';

export default function App() {
  // 1. Wallet state with default 500.000đ test balance
  const [wallet, setWallet] = useState<UserWallet>(() => {
    const saved = localStorage.getItem(WALLET_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      balance: 500000,
      username: 'GamerVIP_VN',
      vipLevel: 'VIP Đồng',
    };
  });

  // Save wallet changes
  useEffect(() => {
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallet));
  }, [wallet]);

  // 2. Orders state
  const [orders, setOrders] = useState<PurchasedOrder[]>(() => {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Save orders changes
  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // 3. Accounts catalog
  const [accounts, setAccounts] = useState<AccountItem[]>(INITIAL_ACCOUNTS);

  // 4. Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // 5. Modals
  const [inspectAccount, setInspectAccount] = useState<AccountItem | null>(null);
  const [deliveryOrder, setDeliveryOrder] = useState<PurchasedOrder | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // 6. Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Deposit handler
  const handleDepositSuccess = (amount: number, method: string) => {
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    showToast(`Đã nạp thành công +${amount.toLocaleString('vi-VN')} đ (${method})`);
  };

  // Buy account handler
  const handleBuyAccount = (account: AccountItem) => {
    if (wallet.balance < account.price) {
      setInspectAccount(null);
      setIsDepositOpen(true);
      showToast('Số dư không đủ! Vui lòng nạp thêm để thanh toán.');
      return;
    }

    // Deduct balance
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance - account.price,
    }));

    // Generate new order
    const newOrder: PurchasedOrder = {
      id: `order-${Date.now()}`,
      orderCode: `ORD-${account.code}-${Math.floor(100 + Math.random() * 900)}`,
      type: 'account',
      title: account.title,
      price: account.price,
      purchaseDate: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      credentials: {
        username: account.credentials.username,
        passwordReal: account.credentials.passwordReal,
        backup2FA: account.credentials.backup2FA,
        notes: account.securityStatus,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Close inspect modal if open & show delivery modal
    setInspectAccount(null);
    setDeliveryOrder(newOrder);
    showToast(`Mua thành công tài khoản mã ${account.code}!`);
  };

  // Buy Robux handler
  const handleBuyRobux = (pkg: RobuxPackage, robloxUsername: string) => {
    if (wallet.balance < pkg.priceVND) {
      setIsDepositOpen(true);
      showToast('Số dư không đủ để mua gói Robux này! Vui lòng nạp thêm.');
      return;
    }

    // Deduct balance
    setWallet((prev) => ({
      ...prev,
      balance: prev.balance - pkg.priceVND,
    }));

    // Create Robux order
    const newOrder: PurchasedOrder = {
      id: `order-rbx-${Date.now()}`,
      orderCode: `RBX-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'robux',
      title: `Gói ${pkg.robuxAmount.toLocaleString('vi-VN')} Robux (${pkg.method})`,
      price: pkg.priceVND,
      purchaseDate: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      robuxDetails: {
        amount: pkg.robuxAmount,
        robloxUsername: robloxUsername,
        status: pkg.method.includes('120h') ? 'Chờ nhận 120h' : 'Đã hoàn tất',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setDeliveryOrder(newOrder);
    showToast(`Đặt mua thành công ${pkg.robuxAmount.toLocaleString('vi-VN')} Robux!`);
  };

  // Filtering logic
  const filteredAccounts = accounts
    .filter((acc) => {
      // Category filter
      if (selectedCategory !== 'all' && acc.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = acc.title.toLowerCase().includes(query);
        const inCode = acc.code.toLowerCase().includes(query);
        const inCategory = acc.categoryName.toLowerCase().includes(query);
        const inTags = acc.tags.some((t) => t.toLowerCase().includes(query));
        const inFruit = acc.devilFruit?.toLowerCase().includes(query);
        const inRace = acc.race?.toLowerCase().includes(query);
        return inTitle || inCode || inCategory || inTags || inFruit || inRace;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  // Navigation click handler
  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'accounts-blox') {
      setSelectedCategory('blox-fruits');
      document.getElementById('accounts-catalog')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'accounts-limited') {
      setSelectedCategory('limited-vip');
      document.getElementById('accounts-catalog')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'robux-instant') {
      document.getElementById('robux-instant')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'reviews-section') {
      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090c10] text-[#e6edf3] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-amber-400 border border-amber-500/40 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        wallet={wallet}
        orders={orders}
        onOpenDeposit={() => setIsDepositOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onSelectNav={handleNavClick}
      />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onQuickCategory={(cat) => {
          setSelectedCategory(cat);
          document.getElementById('accounts-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToRobux={() => {
          document.getElementById('robux-instant')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Account Catalog Section */}
      <section id="accounts-catalog" className="py-12 border-b border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header & Interactive Filter Bar */}
          <div className="space-y-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Danh Mục Account Roblox Đang Bán
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Hiển thị <span className="text-amber-400 font-mono font-bold">{filteredAccounts.length}</span> tài khoản trắng thông tin 100%, sẵn sàng bàn giao tự động.
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sắp xếp:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#121721] text-xs text-white px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="default">Mặc định (Nổi bật nhất)</option>
                  <option value="price-asc">Giá từ thấp đến cao</option>
                  <option value="price-desc">Giá từ cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Interactive Category Tabs (Segmented control) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'Tất Cả Acc' },
                { id: 'blox-fruits', label: 'Blox Fruits Max V4' },
                { id: 'limited-vip', label: 'Acc Korblox & Headless VIP' },
                { id: 'anime-defenders', label: 'Anime Defenders / Vanguards' },
                { id: 'budget-starter', label: 'Acc Tân Thủ Giá Rẻ' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                        : 'bg-[#121721] text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Cards Grid */}
          {filteredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onViewDetails={(acc) => setInspectAccount(acc)}
                  onQuickBuy={(acc) => handleBuyAccount(acc)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#121721] rounded-2xl border border-white/5 space-y-3">
              <p className="text-base text-slate-300 font-semibold">
                Không tìm thấy tài khoản phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="text-xs text-slate-500">
                Hãy thử tìm kiếm với các từ khóa phổ biến: Kitsune, CDK, Godhuman, Cyborg, Korblox...
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                Đặt Lại Bộ Lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Robux Conversion Calculator & Instant Packages */}
      <RobuxCalculator
        wallet={wallet}
        onBuyRobux={handleBuyRobux}
        onOpenDeposit={() => setIsDepositOpen(true)}
      />

      {/* Customer Reviews & Proof */}
      <ReviewsSection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          document.getElementById('accounts-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDeposit={() => setIsDepositOpen(true)}
      />

      {/* Modals */}
      <AccountDetailModal
        account={inspectAccount}
        wallet={wallet}
        onClose={() => setInspectAccount(null)}
        onConfirmBuy={handleBuyAccount}
        onOpenDeposit={() => {
          setInspectAccount(null);
          setIsDepositOpen(true);
        }}
      />

      <OrderSuccessModal
        order={deliveryOrder}
        onClose={() => setDeliveryOrder(null)}
        onViewOrders={() => {
          setDeliveryOrder(null);
          setIsOrdersOpen(true);
        }}
      />

      <DepositModal
        isOpen={isDepositOpen}
        wallet={wallet}
        onClose={() => setIsDepositOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <MyOrdersModal
        isOpen={isOrdersOpen}
        orders={orders}
        onClose={() => setIsOrdersOpen(false)}
        onBrowseAccounts={() => {
          document.getElementById('accounts-catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
