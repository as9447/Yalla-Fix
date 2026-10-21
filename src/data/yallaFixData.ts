export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  startingPrice: number;
}

export interface Technician {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  area: string;
  city: string;
  isAvailable: boolean;
  hourlyRate: number;
  completedOrders: number;
  earnings: number;
  avatarText: string;
  badge: string;
}

export interface MaintenanceOrder {
  id: string;
  code: string;
  customerName: string;
  technicianId: string;
  technicianName: string;
  specialty: string;
  description: string;
  address: string;
  area: string;
  status: 'pending' | 'on_the_way' | 'in_progress' | 'completed';
  statusText: string;
  timeLabel: string;
  etaMinutes: number;
  distanceKm: number;
  audioRecordingSeconds: number;
  isAudioRecordingActive: boolean;
  cost: number;
  createdAt: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'carpenter',
    name: 'نجار',
    iconName: 'Wrench',
    description: 'صيانة أبواب، مفصلات دواليب، مطابخ وغرف نوم',
    startingPrice: 150,
  },
  {
    id: 'plumber',
    name: 'سباك',
    iconName: 'Droplets',
    description: 'تسريب مياه، خلاطات، سيفونات، مواسير وأحواض',
    startingPrice: 150,
  },
  {
    id: 'electrician',
    name: 'كهربائي',
    iconName: 'Zap',
    description: 'لوحات قواطع، مفاتيح، سبوتات ليد، أسلاك وأجهزة',
    startingPrice: 150,
  },
  {
    id: 'ac',
    name: 'فني تكييف',
    iconName: 'Snowflake',
    description: 'شحن فريون، غسيل وصيانة تكييفات، نقل وفك',
    startingPrice: 250,
  },
  {
    id: 'painter',
    name: 'دهانات',
    iconName: 'Paintbrush',
    description: 'نقاشة، دهانات غرف، معالجة رطوبة وكرانيش',
    startingPrice: 300,
  },
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'أحمد عبد السلام',
    title: 'الأسطى أحمد عبد السلام',
    specialty: 'نجار',
    experienceYears: 8,
    rating: 4.8,
    reviewCount: 32,
    area: 'المعادي',
    city: 'القاهرة',
    isAvailable: true,
    hourlyRate: 150,
    completedOrders: 32,
    earnings: 3850.0,
    avatarText: 'أع',
    badge: 'فني نجار معتمد',
  },
  {
    id: 'tech-2',
    name: 'محمد فؤاد',
    title: 'الأسطى محمد فؤاد',
    specialty: 'سباك',
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 45,
    area: 'التجمع الخامس',
    city: 'القاهرة',
    isAvailable: true,
    hourlyRate: 180,
    completedOrders: 54,
    earnings: 6400.0,
    avatarText: 'مف',
    badge: 'سباك معتمد',
  },
  {
    id: 'tech-3',
    name: 'كريم السيد',
    title: 'الأسطى كريم السيد',
    specialty: 'كهربائي',
    experienceYears: 10,
    rating: 4.9,
    reviewCount: 41,
    area: 'مصر الجديدة',
    city: 'القاهرة',
    isAvailable: true,
    hourlyRate: 170,
    completedOrders: 48,
    earnings: 5200.0,
    avatarText: 'كس',
    badge: 'كهربائي معتمد',
  },
  {
    id: 'tech-4',
    name: 'محمود عاشور',
    title: 'الأسطى محمود عاشور',
    specialty: 'نجار',
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 53,
    area: 'شبرا',
    city: 'القاهرة',
    isAvailable: true,
    hourlyRate: 160,
    completedOrders: 61,
    earnings: 7100.0,
    avatarText: 'مع',
    badge: 'فني معتمد',
  },
  {
    id: 'tech-5',
    name: 'مصطفى إبراهيم',
    title: 'الأسطى مصطفى إبراهيم',
    specialty: 'فني تكييف',
    experienceYears: 7,
    rating: 4.7,
    reviewCount: 28,
    area: 'مدينة نصر',
    city: 'القاهرة',
    isAvailable: true,
    hourlyRate: 200,
    completedOrders: 35,
    earnings: 4900.0,
    avatarText: 'مإ',
    badge: 'فني تكييف معتمد',
  },
];

export const INITIAL_ORDERS: MaintenanceOrder[] = [
  {
    id: 'req-103',
    code: 'REQ-103',
    customerName: 'أحمد رضوان',
    technicianId: 'tech-2',
    technicianName: 'محمد فؤاد',
    specialty: 'سباك',
    description: 'تسريب في ماسورة حوض المطبخ أسفل الرخامة.',
    address: 'شارع التسعين الشمالي، التجمع الخامس',
    area: 'التجمع الخامس',
    status: 'on_the_way',
    statusText: 'في الطريق إليك 🛵',
    timeLabel: 'عاجل اليوم (اليوم، 5:00 م)',
    etaMinutes: 7,
    distanceKm: 1.2,
    audioRecordingSeconds: 0,
    isAudioRecordingActive: false,
    cost: 180,
    createdAt: 'منذ 15 دقيقة',
  },
  {
    id: 'req-101',
    code: 'REQ-101',
    customerName: 'أحمد رضوان',
    technicianId: 'tech-1',
    technicianName: 'أحمد عبد السلام',
    specialty: 'نجار',
    description: 'تصليح باب الشقة الرئيسي، المفصلات مفككة والباب يصعب إغلاقه.',
    address: 'شارع النصر، المعادي، عمارة 14، الدور الثالث',
    area: 'المعادي',
    status: 'in_progress',
    statusText: 'جاري التصليح 🛠️',
    timeLabel: 'عاجل اليوم (اليوم بين 2:00 م - 4:00 م)',
    etaMinutes: 0,
    distanceKm: 0,
    audioRecordingSeconds: 18,
    isAudioRecordingActive: true,
    cost: 220,
    createdAt: 'منذ 35 دقيقة',
  },
  {
    id: 'req-102',
    code: 'REQ-102',
    customerName: 'أحمد رضوان',
    technicianId: 'tech-1',
    technicianName: 'أحمد عبد السلام',
    specialty: 'نجار',
    description: 'صيانة وتثبيت مفصلات دولاب غرفة الأطفال.',
    address: 'شارع النزهة، مصر الجديدة',
    area: 'مصر القديمه',
    status: 'pending',
    statusText: 'قيد المراجعة',
    timeLabel: 'موعد محدد (غداً، 11:00 ص)',
    etaMinutes: 0,
    distanceKm: 4.5,
    audioRecordingSeconds: 0,
    isAudioRecordingActive: false,
    cost: 150,
    createdAt: 'منذ ساعة',
  },
  {
    id: 'req-104',
    code: 'REQ-104',
    customerName: 'أحمد رضوان',
    technicianId: 'tech-3',
    technicianName: 'كريم السيد',
    specialty: 'كهربائي',
    description: 'تغيير لوحة القواطع الرئيسية وتركيب سبوتات ليد.',
    address: 'شارع الثورة، مصر الجديدة',
    area: 'مصر الجديدة',
    status: 'completed',
    statusText: 'مكتمل ✅',
    timeLabel: 'موعد محدد (الأحد السابق، 1:00 م)',
    etaMinutes: 0,
    distanceKm: 0,
    audioRecordingSeconds: 75,
    isAudioRecordingActive: false,
    cost: 350,
    createdAt: 'الأحد السابق',
  },
];
