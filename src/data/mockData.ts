import { AccountItem, RobuxPackage } from '../types';

export const INITIAL_ACCOUNTS: AccountItem[] = [
  {
    id: 'acc-01',
    code: 'RB-8921',
    title: 'Blox Fruits Max Lv 2550 · Cursed Dual Katana · Godhuman · V4 Cyborg Full Gear · Trái Kitsune',
    category: 'blox-fruits',
    categoryName: 'Blox Fruits VIP',
    price: 240000,
    originalPrice: 380000,
    image: '/src/assets/images/acc_blox_fruits_v4_1793967009402.jpg',
    robuxIncluded: 1200,
    level: 2550,
    belly: '65.000.000',
    fragments: '180.000',
    devilFruit: 'Kitsune Tỉnh Thức (Full 5 Skill)',
    fightingStyle: 'Godhuman (Mastery 600)',
    swords: ['Cursed Dual Katana (CDK)', 'Hallow Scythe', 'True Triple Katana (TTK)', 'Soul Guitar'],
    race: 'Tộc Cyborg V4 Full 5 Gear',
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Max Level', 'Cyborg V4', 'Kitsune', 'CDK', 'Soul Guitar'],
    featured: true,
    stock: 1,
    credentials: {
      username: 'ShadowLord_VN99',
      passwordMasked: '•••••••••••',
      passwordReal: 'RobuxPrime#Kitsune88x',
      backup2FA: '778921-992011'
    },
    description: 'Tài khoản tâm huyết max level Blox Fruits 2550, full meelee Godhuman 600 mastery, Cursed Dual Katana nâng cấp cấp độ cao nhất. Sở hữu trái ác quỷ Kitsune Mythical thức tỉnh toàn diện cùng Soul Guitar bắn sấm sét. Đã mở full 5 gear tộc Cyborg V4 đi raid cực nhàn.'
  },
  {
    id: 'acc-02',
    code: 'RB-9042',
    title: 'Acc Roblox Korblox Deathspeaker + Headless Horseman + 15.000 Robux Sạch VIP',
    category: 'limited-vip',
    categoryName: 'Limited & Korblox',
    price: 850000,
    originalPrice: 1250000,
    image: '/src/assets/images/acc_roblox_limiteds_1793967009979.jpg',
    robuxIncluded: 15400,
    securityStatus: 'Trắng Thông Tin 100% - Bảo Hành Trọn Đời',
    tags: ['Korblox Leg', 'Headless Head', '15k Robux Dư', 'Outfit VIP', 'Badge 2018'],
    featured: true,
    stock: 1,
    credentials: {
      username: 'Aesthetic_King2024',
      passwordMasked: '•••••••••••',
      passwordReal: 'Korblox#VipAura99',
      backup2FA: '891024-554210'
    },
    description: 'Account collector đẳng cấp sở hữu bộ combo triệu người mơ ước: Chân Korblox Deathspeaker (17.000 R$) và Đầu Headless Horseman (31.000 R$). Trong acc còn nguyên 15.400 Robux dư chưa tiêu. Hơn 50+ bộ đồ thời trang 3D cao cấp, thích hợp làm acc chính lâu dài.'
  },
  {
    id: 'acc-03',
    code: 'RB-7714',
    title: 'Anime Defenders / Vanguards Mythic Alucard + Sukuna EVO + Full Celestial Gear',
    category: 'anime-defenders',
    categoryName: 'Anime Games',
    price: 180000,
    originalPrice: 280000,
    image: '/src/assets/images/acc_anime_adventures_1793967010775.jpg',
    robuxIncluded: 850,
    level: 115,
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Alucard EVO', 'Sukuna Mythic', 'Top Tier Tower', '850 Robux'],
    featured: true,
    stock: 2,
    credentials: {
      username: 'AnimeSlayer_VNX',
      passwordMasked: '•••••••••••',
      passwordReal: 'AnimeEvo#987Celestial',
      backup2FA: '124982-887192'
    },
    description: 'Tài khoản chuyên trị các chế độ Infinite và Raid trong Anime Defenders / Vanguards. Sở hữu full dàn tướng Mythic đã tiến hóa (EVO) chỉ số thần thoại SSS, kèm theo gem và tài nguyên nâng cấp dồi dào.'
  },
  {
    id: 'acc-04',
    code: 'RB-6629',
    title: 'Blox Fruits Max Level + Trái T-Rex + Shark V4 + Hallow Scythe + Sangart Art',
    category: 'blox-fruits',
    categoryName: 'Blox Fruits VIP',
    price: 165000,
    originalPrice: 240000,
    image: '/src/assets/images/acc_blox_fruits_v4_1793967009402.jpg',
    robuxIncluded: 450,
    level: 2550,
    belly: '42.000.000',
    fragments: '95.000',
    devilFruit: 'T-Rex (Biến hình Khủng Long Vĩnh Viễn)',
    fightingStyle: 'Sanguine Art (Võ Hút Máu)',
    swords: ['Hallow Scythe', 'Yama', 'Tushita', 'Dark Dagger'],
    race: 'Tộc Shark (Cá Mập) V4 Bất Tử',
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['T-Rex', 'Shark V4', 'Sanguine Art', 'Max Lv'],
    featured: false,
    stock: 1,
    credentials: {
      username: 'Shark_Immortal_99',
      passwordMasked: '•••••••••••',
      passwordReal: 'SanguineRex#2026',
      backup2FA: '334901-762118'
    },
    description: 'Chuyên trị PvP biển và săn Boss Leviathan. Tộc Cá Mập V4 kết hợp võ Sanguine Art hút máu liên tục giúp bạn gần như bất tử trước mọi đối thủ. Đã sở hữu trái T-Rex khủng long cực ngầu.'
  },
  {
    id: 'acc-05',
    code: 'RB-5510',
    title: 'Acc Roblox Dominus Aureus Gold Avatar + 8.000 Robux + Badges Cổ 2019',
    category: 'limited-vip',
    categoryName: 'Limited & Korblox',
    price: 520000,
    originalPrice: 750000,
    image: '/src/assets/images/acc_roblox_limiteds_1793967009979.jpg',
    robuxIncluded: 8200,
    securityStatus: 'Trắng Thông Tin 100% - Bảo Hành Trọn Đời',
    tags: ['Dominus Gold', '8k Robux', 'Old Acc 2019', 'VIP Inventory'],
    featured: false,
    stock: 1,
    credentials: {
      username: 'Dominus_Legend_X',
      passwordMasked: '•••••••••••',
      passwordReal: 'Dominus#Aureus2026',
      backup2FA: '901238-112344'
    },
    description: 'Acc Roblox quý hiếm với set trang phục Hoàng Gia Dominus dát vàng lộng lẫy, tài khoản tạo từ năm 2019 với nhiều danh hiệu cổ. Số dư 8.200 Robux sẵn sàng cho bạn mua gamepass yêu thích.'
  },
  {
    id: 'acc-06',
    code: 'RB-3321',
    title: 'Acc Blox Fruits Tân Thủ Giá Rẻ · Level 1500+ (Qua Sea 3) · Trái Phật Tổ Buda Awakening',
    category: 'budget-starter',
    categoryName: 'Acc Tân Thủ Siêu Rẻ',
    price: 49000,
    originalPrice: 90000,
    image: '/src/assets/images/acc_blox_fruits_v4_1793967009402.jpg',
    robuxIncluded: 100,
    level: 1650,
    belly: '18.000.000',
    fragments: '35.000',
    devilFruit: 'Buddha (Phật Tổ Thức Tỉnh Z)',
    fightingStyle: 'Superhuman',
    swords: ['Rengoku', 'Saber V2'],
    race: 'Mink V3',
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Giá Sinh Viên', 'Sea 3', 'Buddha Awaken', 'Level 1650'],
    featured: false,
    stock: 5,
    credentials: {
      username: 'Starter_Pro_Sea3',
      passwordMasked: '•••••••••••',
      passwordReal: 'BuddhaFarm#2026Fast',
      backup2FA: '445129-992381'
    },
    description: 'Lựa chọn số 1 cho các bạn muốn bỏ qua giai đoạn cày cuốc Sea 1 & 2 nhọc nhằn! Đã qua thẳng Sea 3, sở hữu trái Phật Tổ khổng lồ thức tỉnh giúp bạn solo mọi bãi quái nhanh gấp 5 lần.'
  },
  {
    id: 'acc-07',
    code: 'RB-8812',
    title: 'Blox Fruits Leopard Vĩnh Viễn · Human V4 · True Triple Katana · Godhuman',
    category: 'blox-fruits',
    categoryName: 'Blox Fruits VIP',
    price: 290000,
    originalPrice: 450000,
    image: '/src/assets/images/acc_blox_fruits_v4_1793967009402.jpg',
    robuxIncluded: 1800,
    level: 2550,
    belly: '80.000.000',
    fragments: '210.000',
    devilFruit: 'Leopard Báo Đốm (Đã Mua Vĩnh Viễn)',
    fightingStyle: 'Godhuman (Mastery 600)',
    swords: ['True Triple Katana (TTK)', 'Cursed Dual Katana', 'Dark Blade V3'],
    race: 'Human V4 Sát Thương Cực Hạn',
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Leopard Perm', 'Human V4', 'Dark Blade V3', 'TTK'],
    featured: true,
    stock: 1,
    credentials: {
      username: 'Leopard_Beast_VN',
      passwordMasked: '•••••••••••',
      passwordReal: 'Leopard#PermKing77',
      backup2FA: '661298-442110'
    },
    description: 'Acc thần tài sở hữu TRÁI BÁO ĐỐM LEOPARD VĨNH VIỄN (trị giá hơn 3.000 Robux nạp thẳng). Kèm kiếm Hắc Kiếm Dark Blade V3 thức tỉnh ánh sáng trắng và tộc Human V4 bùng nổ sát thương sốc one-shot combo.'
  },
  {
    id: 'acc-08',
    code: 'RB-4419',
    title: 'Acc Anime Vanguards Mythic Sung Jin-Woo + Igris EVO + 1.200 Robux Sạch',
    category: 'anime-defenders',
    categoryName: 'Anime Games',
    price: 155000,
    originalPrice: 220000,
    image: '/src/assets/images/acc_anime_adventures_1793967010775.jpg',
    robuxIncluded: 1200,
    level: 95,
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Shadow Monarch', 'Igris EVO', '1.2k Robux', 'Solo Leveling'],
    featured: false,
    stock: 3,
    credentials: {
      username: 'Shadow_Monarch_99',
      passwordMasked: '•••••••••••',
      passwordReal: 'JinWoo#ShadowArmy99',
      backup2FA: '556102-334199'
    },
    description: 'Chủ nhân Đội Quân Bóng Tối với unit Thần Thoại Monarch of Shadows và chiến binh kỵ sĩ bóng đêm Igris thức tỉnh toàn phần. Hỗ trợ clear nhanh mọi ải Raid Địa Ngục.'
  },
  {
    id: 'acc-09',
    code: 'RB-2204',
    title: 'Acc Blox Fruits Giá Rẻ · Level 2000+ · Đã Có CDK Cơ Bản + Trái Trọng Lực Gravity',
    category: 'budget-starter',
    categoryName: 'Acc Tân Thủ Siêu Rẻ',
    price: 69000,
    originalPrice: 110000,
    image: '/src/assets/images/acc_blox_fruits_v4_1793967009402.jpg',
    robuxIncluded: 150,
    level: 2100,
    belly: '25.000.000',
    fragments: '45.000',
    devilFruit: 'Magma (Nham Thạch Thức Tỉnh Full ZXC)',
    fightingStyle: 'Electric Claw',
    swords: ['Cursed Dual Katana', 'Yama'],
    race: 'Angel V3 Bay Lượn',
    securityStatus: '100% Sạch - Trắng Thông Tin (Chưa ĐK Mail/SĐT)',
    tags: ['Giá Rẻ', 'Magma Awaken', 'Level 2100', 'CDK Sẵn'],
    featured: false,
    stock: 4,
    credentials: {
      username: 'Magma_Grinder_VN',
      passwordMasked: '•••••••••••',
      passwordReal: 'Magma#RaidClear2026',
      backup2FA: '771290-884102'
    },
    description: 'Cực thích hợp đi săn quái biển Sea Beast kiếm hàng chục triệu Belly mỗi ngày nhờ lượng sát thương đốt cháy diện rộng của Nham Thạch Magma Awakened. Giá học sinh cực mềm.'
  }
];

export const ROBUX_PACKAGES: RobuxPackage[] = [
  {
    id: 'rb-pkg-100',
    robuxAmount: 500,
    priceVND: 48000,
    method: '120h Gamepass',
    processingTime: 'Tự động 120h (Roblox xét duyệt)',
    bonusRate: 'Tỉ giá 1:10.5'
  },
  {
    id: 'rb-pkg-200',
    robuxAmount: 1100,
    priceVND: 99000,
    method: '120h Gamepass',
    processingTime: 'Tự động 120h (Roblox xét duyệt)',
    popular: true,
    bonusRate: 'Tỉ giá 1:11.1 (+10% Bonus)'
  },
  {
    id: 'rb-pkg-500',
    robuxAmount: 2400,
    priceVND: 198000,
    method: '120h Gamepass',
    processingTime: 'Tự động 120h (Roblox xét duyệt)',
    popular: true,
    bonusRate: 'Tỉ giá 1:12.1 (+15% Bonus)'
  },
  {
    id: 'rb-pkg-1000',
    robuxAmount: 6500,
    priceVND: 490000,
    method: '120h Gamepass',
    processingTime: 'Tự động 120h (Roblox xét duyệt)',
    bonusRate: 'Tỉ giá 1:13.2 (+20% Bonus)'
  },
  {
    id: 'rb-pkg-instant-1',
    robuxAmount: 1000,
    priceVND: 120000,
    method: 'Rút Group Trực Tiếp',
    processingTime: 'Nhận ngay sau 1-5 phút (Vào Group trước 14 ngày)',
    bonusRate: 'Giao ngay tức thì'
  },
  {
    id: 'rb-pkg-instant-2',
    robuxAmount: 3000,
    priceVND: 350000,
    method: 'Rút Group Trực Tiếp',
    processingTime: 'Nhận ngay sau 1-5 phút (Vào Group trước 14 ngày)',
    popular: true,
    bonusRate: 'Giao ngay tức thì'
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Nguyễn Hải Đăng',
    avatar: 'Đ',
    rating: 5,
    date: 'Hôm nay, 11:42',
    itemBought: 'Blox Fruits Max Lv 2550 + CDK + Kitsune',
    comment: 'Acc chuẩn 100% trắng thông tin, chưa link email hay sđt nào cả. Đăng nhập đổi pass với bật mã 2FA tài khoản của mình chỉ mất đúng 30 giây. Rất uy tín!'
  },
  {
    id: 'rev-2',
    name: 'Trần Gia Bảo',
    avatar: 'B',
    rating: 5,
    date: 'Hôm qua, 20:15',
    itemBought: 'Gói 2.400 Robux 120h Gamepass',
    comment: 'Check thấy có pending robux trong mục Transaction của Roblox ngay sau khi đặt hàng 2 phút. Tỉ giá ở đây rẻ hơn nạp thẻ cào trực tiếp rất nhiều.'
  },
  {
    id: 'rev-3',
    name: 'Lê Minh Khang',
    avatar: 'K',
    rating: 5,
    date: '05/11/2026',
    itemBought: 'Acc Roblox Korblox + Headless VIP',
    comment: 'Lúc đầu phân vân vì số tiền lớn, nhưng sau khi quét QR banking 5s web tự động cộng tiền và giao mật khẩu acc chuẩn đét. Acc nhiều đồ limited xịn sò thực sự.'
  },
  {
    id: 'rev-4',
    name: 'Phạm Tuấn Anh',
    avatar: 'A',
    rating: 5,
    date: '04/11/2026',
    itemBought: 'Blox Fruits Phật Tổ Buddha Qua Sea 3',
    comment: 'Acc giá rẻ mà cày quái nhanh dã man, vừa vào là đã có sẵn Superhuman và kiếm Saber V2. Vote 5 sao cho shop!'
  }
];

export const LIVE_ACTIVITY_STREAM = [
  'quang*** vừa mua thành công Acc Blox Fruits Kitsune · 1 phút trước',
  'hoang*** vừa nạp thành công 200.000đ qua VietQR · 2 phút trước',
  'minh*** vừa rút 1.100 Robux qua Gamepass · 3 phút trước',
  'duc*** vừa mua thành công Acc Korblox Limited VIP · 6 phút trước',
  'anh*** vừa nạp 100.000đ qua thẻ Viettel · 8 phút trước'
];
