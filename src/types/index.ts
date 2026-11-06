export type AccountCategory = 'blox-fruits' | 'limited-vip' | 'anime-defenders' | 'budget-starter';

export interface AccountItem {
  id: string;
  code: string;
  title: string;
  category: AccountCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  image: string;
  robuxIncluded: number;
  level?: number;
  belly?: string;
  fragments?: string;
  devilFruit?: string;
  fightingStyle?: string;
  swords?: string[];
  race?: string;
  securityStatus: string;
  tags: string[];
  featured?: boolean;
  stock: number;
  credentials: {
    username: string;
    passwordMasked: string;
    passwordReal: string;
    backup2FA: string;
  };
  description: string;
}

export interface RobuxPackage {
  id: string;
  robuxAmount: number;
  priceVND: number;
  method: string;
  processingTime: string;
  popular?: boolean;
  bonusRate?: string;
}

export interface PurchasedOrder {
  id: string;
  orderCode: string;
  type: 'account' | 'robux';
  title: string;
  price: number;
  purchaseDate: string;
  credentials?: {
    username: string;
    passwordReal: string;
    backup2FA: string;
    notes: string;
  };
  robuxDetails?: {
    amount: number;
    robloxUsername: string;
    status: 'Chờ nhận 120h' | 'Đã hoàn tất';
  };
}

export interface UserWallet {
  balance: number;
  username: string;
  vipLevel: string;
}
