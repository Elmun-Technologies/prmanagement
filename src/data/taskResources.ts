import type { TaskResource } from './types';

/**
 * Muhim tasklarga bog'liq shablonlar (Google Sheets / Docs / Forms).
 * URL maydonlarini o'zingizning Google Drive havolalaringiz bilan almashtiring.
 * Foydalanuvchilar har bir taskda "Shablon ochish" tugmasini ko'radi.
 */
export const TASK_RESOURCES: Record<string, TaskResource[]> = {

  // ─── PHASE 1: Bozor Tahlili ──────────────────────────────────────────────

  'f1-t30-2': [
    {
      type: 'sheets',
      label: 'CRM Eksport Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'CRM dan mijozlar ro\'yxatini eksport qiling va ushbu jadvalga joylashtiring. Segment, aloqa, so\'nggi xarid ustunlarini to\'ldiring.',
      required: true,
    },
    {
      type: 'sheets',
      label: 'Segmentlash Jadvali (Garm/Iliq/Sovuq)',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Mijozlarni 3 guruhga bo\'ling: Garm (6 oy ichida sotib olgan), Iliq (1 yil), Sovuq (1 yildan ortiq yoki potensial). Ustunlar: Ism, Tel, Segment, Izoh.',
      required: true,
    },
  ],

  'f1-t29-1': [
    {
      type: 'forms',
      label: 'Intervyu Savollari Formasi',
      url: 'https://docs.google.com/forms/create',
      hint: '15-20 ta ochiq savoldan iborat Google Form yarating. Mijoz og\'riqlarini, xayollarini, hozirgi vaziyatini bilib oling.',
      required: true,
    },
    {
      type: 'docs',
      label: 'Intervyu Skript (Telefon uchun)',
      url: 'https://docs.google.com/document/create',
      hint: 'Qo\'ng\'iroq uchun tayyor skript. "Assalomu alaykum, men Hamid...", savollar ketma-ketligi, qo\'ng\'iroqni yakunlash skripti.',
      required: false,
    },
  ],

  'f1-t27-1': [
    {
      type: 'sheets',
      label: 'Intervyu Natijalari Tahlili',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Barcha intervyulardan yig\'ilgan og\'riqlarni ushbu jadvalga kiriting. Har bir og\'riqni qancha kishi aytganligini hisoblang. TOP-7 aniqlash uchun.',
      required: true,
    },
  ],

  'f1-t27-2': [
    {
      type: 'docs',
      label: 'ICP Kartochkasi Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: '3 ta ICP (Ideal Customer Profile) kartochkasi: 1) Chakana do\'kon egasi, 2) Marketplace sotuvchisi, 3) Optovoy savdo. Har biri uchun: demografi, og\'riqlar, maqsadlar, e\'tirozlar, motivatsiya.',
      required: true,
    },
  ],

  'f1-t26-1': [
    {
      type: 'docs',
      label: 'Value Stack va Offer Hujjati',
      url: 'https://docs.google.com/document/create',
      hint: 'Taklif tuzilmasi: Asosiy mahsulot + Bonuslar + Kafolat + Acil narx. Har bir element qiymati (so\'mda) va umumiy narx zinapoyasi.',
      required: true,
    },
    {
      type: 'sheets',
      label: 'Narx Zinapoyasi Kalkulyatori',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Seminar narxi (600k, 800k), Kurs narxi (Early Bird, Normal, VIP), Paket variantlari, chegirmalar va margin hisobi.',
      required: false,
    },
  ],

  'f1-t30-1': [
    {
      type: 'docs',
      label: 'Zal Ijarasi Shartnomasi Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: 'Standart ijara shartnomasi: sana, vaqt (09:00-18:00), manzil, narx, to\'lov sharti, bekor qilish qoidalari.',
      required: true,
    },
  ],

  'f1-t30-3': [
    {
      type: 'sheets',
      label: 'To\'lov Tizimi Sozlash Cheklisti',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'To\'lov usullari: Karta (Uzcard/Humo), Naqd, Click/Payme, Bo\'lib to\'lash. Har biri uchun: sozlash holati, test o\'tkazildi, mas\'ul shaxs.',
      required: true,
    },
  ],

  'f1-t25-1': [
    {
      type: 'sheets',
      label: 'Hamkorlar Ro\'yxati va Muzokaralar Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Ustunlar: Hamkor ismi/brendi, Auditoriya soni, Aloqa ma\'lumoti, Muzokaralar holati, Kelishilgan shartlar, Imzolash sanasi.',
      required: true,
    },
    {
      type: 'docs',
      label: 'Hamkorlik Shartnomasi Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: 'Hamkor uchun standart shartnoma: nima qiladi (post/story), qancha post, qachon, evaziga nima oladi (% yoki bepul kurs joyi).',
      required: true,
    },
  ],

  // ─── PHASE 2: Marketplays / Infra ──────────────────────────────────────

  'f2-t20-1': [
    {
      type: 'docs',
      label: 'Landing Sayt Kontent Hujjati',
      url: 'https://docs.google.com/document/create',
      hint: 'Tilda uchun barcha matnlar: Sarlavha, Qo\'shimcha sarlavha, 5 ta ustunlik, Kim uchun (ICP), Dastur, Natijalar, CTA tugma matnlari, FAQ.',
      required: true,
    },
  ],

  'f2-t15-1': [
    {
      type: 'sheets',
      label: 'Meta Ads Reklama Rejasi va Budget',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Kampaniyalar (TOP-of-Funnel, Retargeting, Lookalike), kunlik byudjet, auditoriya o\'lchamlari, kreativlar ro\'yxati, KPI (CPL maqsad < 15,000 so\'m).',
      required: true,
    },
    {
      type: 'sheets',
      label: 'Reklama Hisobot Jadvali (Kunlik)',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Kunlik: sarf xarajat, klikllar, CPL, leadlar soni, konversiya %. Haftalik yig\'ma. Optimizatsiya qaydlari ustuni.',
      required: true,
    },
  ],

  'f2-t14-1': [
    {
      type: 'sheets',
      label: 'Kunlik Reklama Monitoring Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Har kun to\'ldiriladigan jadval: Sana, Xarajat, Impressions, CTR, CPM, CPL, Leadlar, Eslatmalar. Grafiklar avtomatik chiziladi.',
      required: true,
    },
  ],

  // ─── PHASE 3: Lead Boshqaruv ────────────────────────────────────────────

  'f3-t10-2': [
    {
      type: 'sheets',
      label: 'Lead Tracking CRM Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Ustunlar: Ism, Tel, Manba (Instagram/Referral/Hamkor), Qo\'ng\'iroq sanasi, Holat (Yangi/Qo\'ng\'iroq qilindi/Tasdiqlangan/Rad etdi), Izoh.',
      required: true,
    },
    {
      type: 'forms',
      label: 'Ro\'yxatdan O\'tish Formasi',
      url: 'https://docs.google.com/forms/create',
      hint: 'Seminar uchun onlayn ro\'yxatdan o\'tish: Ism, Tel (majburiy), Do\'kon turi, Shahar, Qanday bilib oldingiz. Natijalar avtomatik Sheets ga tushadi.',
      required: true,
    },
  ],

  'f3-t7-2': [
    {
      type: 'sheets',
      label: 'Tasdiqlash Qo\'ng\'iroqlari Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Barcha ro\'yxatdan o\'tganlar. Har bir kishi uchun: 1-qo\'ng\'iroq sanasi, 2-qo\'ng\'iroq sanasi, Tasdiqlandi/Yo\'q, Izoh.',
      required: true,
    },
  ],

  'f3-t3-2': [
    {
      type: 'sheets',
      label: 'Yakuniy Ro\'yxat va Eslatmalar Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'T-3 kuni barcha tasdiqlangan ishtirokchilar ro\'yxati. Eslatma SMS/Telegram yuborish uchun telefon raqamlari. To\'lov holati (oldindan/eshikda).',
      required: true,
    },
  ],

  // ─── PHASE 3: PR / Hamkorlar ─────────────────────────────────────────────

  'f3-t10-PR': [
    {
      type: 'docs',
      label: 'Blogger Brief Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: 'Hamkor/blogger uchun brief: Seminar haqida qisqacha, maqsadli auditoriya, post/story talablari, matn shabloni, hashtag, link, e\'lon qilish vaqti.',
      required: true,
    },
    {
      type: 'sheets',
      label: 'Hamkor Kontent Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Ustunlar: Hamkor, Post turi (Reels/Story/Post), E\'lon sanasi va vaqti, Holat (Rejalashtirilgan/Yuborildi/Chiqdi), Natijalar (reach/kliklar).',
      required: true,
    },
  ],

  // ─── PHASE 4: Seminar ────────────────────────────────────────────────────

  'f4-master-schedule': [
    {
      type: 'sheets',
      label: 'Seminar Kun Jadvali (Master Schedule)',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Daqiqa-daqiqa jadval: 09:00 kirim, 09:30 boshlash, har bir blok (vaqt, nima bo\'ladi, kim javobgar, eslatma). Sotuvchi va assistent uchun alohida ustunlar.',
      required: true,
    },
  ],

  'f4-roles-detail': [
    {
      type: 'docs',
      label: 'Rol va Vazifalar Hujjati (Seminar kuni)',
      url: 'https://docs.google.com/document/create',
      hint: 'Har bir jamoa a\'zosi uchun seminar kuni vazifalari: Sotuvchi 1 (nima qiladi, qachon, kimga), Sotuvchi 2, Assistent, Mentor. Muloqot kanali (Telegram guruh).',
      required: true,
    },
  ],

  'f4-pre-roxyat': [
    {
      type: 'sheets',
      label: 'Seminar Ishtirokchilar Ro\'yxati',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Yakuniy ro\'yxat: Ism, Tel, Do\'kon turi, Shahar, To\'lov holati (Oldindan/Eshikda/To\'liq/Qisman). Seminar kuni ro\'yxatga olish uchun chop etish.',
      required: true,
    },
  ],

  'f4-pre-katering': [
    {
      type: 'sheets',
      label: 'Katering va Logistika Cheklisti',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Taom soni (ishtirokchilar + 10% zapas), tarqatiladigan materiallar (daftar, ruchka, broshur), zal jihozlari (proektor, mikrofon, stullar). Mas\'ul va holat ustunlari.',
      required: true,
    },
  ],

  'f4-pre-sotuvchi-brifing': [
    {
      type: 'docs',
      label: 'Sotuvchi Brifing Hujjati',
      url: 'https://docs.google.com/document/create',
      hint: 'Sotuvchilar uchun: Kurs haqida to\'liq ma\'lumot, narxlar (Early Bird, Normal, VIP), e\'tirozlarni yopish skriptlari, savol-javoblar, maqsad (nechta yopish kerak).',
      required: true,
    },
  ],

  'f4-pre-slides': [
    {
      type: 'slides',
      label: 'Seminar Prezentatsiyasi (Slides)',
      url: 'https://docs.google.com/presentation/create',
      hint: '38 slaydli sotuvchi prezentatsiya. Og\'riq → Vizyon → Demo → Offer → Garantiya → CTA ketma-ketligi. Mentor tasdiqlashi kerak T-1 kechqurun.',
      required: true,
    },
  ],

  'f4-sales-session': [
    {
      type: 'sheets',
      label: 'Sotuv Sessiyasi Real-Time Tracking',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Seminar kuni sotuv sessiyasida: Ism, Tel, Qaysi paket (Early Bird/Normal/VIP), To\'lov usuli, Izoh. Sotuvchilar telefonda to\'ldiradi.',
      required: true,
    },
  ],

  'f4-closing': [
    {
      type: 'sheets',
      label: 'Seminar Sotib Olganlar Ro\'yxati',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Kurs uchun to\'lov qilganlar: Ism, Tel, Paket, To\'lov miqdori, To\'lov usuli, Shartnoma raqami, Izoh. Keyingi bosqichga o\'tkazish uchun asos.',
      required: true,
    },
  ],

  'f4-post-b-segment': [
    {
      type: 'sheets',
      label: 'B-Segment Dojim Ro\'yxati',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Seminarda kelmagan yoki sotib olmagan B-segment (iliq): Ism, Tel, Sabab, Kelgusi qo\'ng\'iroq sanasi, Holat. 14 kun davomida ishlash uchun.',
      required: true,
    },
  ],

  'f4-post-debrief': [
    {
      type: 'docs',
      label: 'Seminar Yakuniy Hisobot Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: 'Jamoa debrifing uchun: Kelganlar/Kelmаganlar, Sotuvlar (reja vs haqiqat), Nima yaxshi bo\'ldi, Nima yaxshi bo\'lmadi, Keyingi marta nima o\'zgartiriladi.',
      required: true,
    },
  ],

  // ─── PHASE 5: Asosiy Kurs ────────────────────────────────────────────────

  'f5-contract': [
    {
      type: 'docs',
      label: 'Talaba Shartnomasi Shabloni',
      url: 'https://docs.google.com/document/create',
      hint: 'Kurs uchun rasmiy shartnoma: Ism, Kurs nomi, Sana, Narx, To\'lov rejasi, Kafolat shartlari, Imzo. Har bir talaba uchun alohida PDF chop etiladi.',
      required: true,
    },
  ],

  'f5-pay-system': [
    {
      type: 'sheets',
      label: 'Kurs To\'lovlari Tracking Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Har bir talaba to\'lovlari: Ism, Jami qarz, To\'langan, Qolgan, To\'lov sanasi, To\'lov usuli, Eslatma sanasi. Avtomatik qolgan summa hisobi.',
      required: true,
    },
  ],

  'f5-master': [
    {
      type: 'sheets',
      label: 'Kurs Master Jadvali (T+1 → T+21)',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Barcha kurs tadbirlari jadvali: Sana, Hafta, Mavzu, Vaqt, Format (Online/Offline), Mas\'ul, Holat. Talabalar uchun ham ulashiladi.',
      required: true,
    },
  ],

  'f5-onboarding': [
    {
      type: 'sheets',
      label: 'Talabalar Onboarding Jadvali',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Barcha talabalar: Ism, Tel, Telegram username, Do\'kon turi, Hozirgi savdo hajmi, Maqsad, Telegram guruhga qo\'shildi (ha/yo\'q), Platforma kirdi (ha/yo\'q).',
      required: true,
    },
    {
      type: 'forms',
      label: 'Talaba Anketasi (Onboarding)',
      url: 'https://docs.google.com/forms/create',
      hint: 'Kurs boshida to\'ldiriladigan anketa: Hozirgi vaziyat, Maqsad, Kutilmalar, Texnik imkoniyatlar. Natijalar Sheets ga tushadi va mentorga jo\'natiladi.',
      required: true,
    },
  ],

  'f5-curriculum': [
    {
      type: 'docs',
      label: 'Kurs Dasturi va Uy Ishlari Jadvali',
      url: 'https://docs.google.com/document/create',
      hint: '7 haftalik kurs dasturi: Har dars mavzusi, vazifalari, uy ishi, natija. Talabalar bu hujjatni ko\'radi va foydalanadigan asosiy manba.',
      required: true,
    },
  ],

  'f5-post-feedback': [
    {
      type: 'forms',
      label: 'Kurs Yakuniy Feedback Formasi',
      url: 'https://docs.google.com/forms/create',
      hint: 'Kurs tugagandan so\'ng to\'ldiriladigan forma: Umumiy baho (1-10), Nima yaxshi edi, Nima yaxshi bo\'lmadi, Tavsiya qilasizmi, Testimonial uchun ruxsat.',
      required: true,
    },
    {
      type: 'sheets',
      label: 'Feedback Natijalari va Tahlil',
      url: 'https://docs.google.com/spreadsheets/create',
      hint: 'Form natijalari avtomatik tushadi. NPS hisobi, umumiy baho o\'rtachasi, eng ko\'p tilga olingan ijobiy va salbiy tomonlar.',
      required: false,
    },
  ],

  'f5-post-sertifikat': [
    {
      type: 'slides',
      label: 'Sertifikat Shabloni',
      url: 'https://docs.google.com/presentation/create',
      hint: 'Kurs sertifikati dizayni. Ism maydonini har bir talaba uchun o\'zgartiring. PDF qilib chiqarish yoki Telegram orqali yuborish.',
      required: true,
    },
  ],

  'f5-lesson1-prep': [
    {
      type: 'slides',
      label: '1-Dars Prezentatsiyasi',
      url: 'https://docs.google.com/presentation/create',
      hint: 'Kursning 1-darsiga tayyor slaydlar. Tanishuv, kurs rejasi, birinchi hafta vazifasi, motivatsion qism.',
      required: true,
    },
    {
      type: 'docs',
      label: '1-Dars Uy Ishi Topshirig\'i',
      url: 'https://docs.google.com/document/create',
      hint: 'Talabalar o\'qiydigan uy ishi sharti: Nima qilish kerak, Natija qanday ko\'rinishi kerak, Topshirish muddati, Qaysi kanalda topshirish.',
      required: true,
    },
  ],

  'f5-progrev-plan': [
    {
      type: 'docs',
      label: 'Kurs Progrev Kontent Rejasi',
      url: 'https://docs.google.com/document/create',
      hint: '7 kunlik progrev: Har kun qanday kontent (stories/post/LIVE), mavzu, maqsad, CTA. T+7 dan T+14 gacha bo\'lgan kontent ketma-ketligi.',
      required: true,
    },
  ],

  'f5-course-pack': [
    {
      type: 'drive',
      label: 'Course Pack Materiallari (Drive Papkasi)',
      url: 'https://drive.google.com/drive/folders/create',
      hint: 'Kurs boshlanishidan oldin talablarga beriladigan paket: Kurs rejasi, 1-dars materiallari, Telegram guruh havolasi, Resurslar ro\'yxati.',
      required: true,
    },
  ],
};

/**
 * Resurs turini ikonkasiga aylantiradi.
 */
export function getResourceIcon(type: string): string {
  const icons: Record<string, string> = {
    sheets: '📊',
    forms:  '📋',
    docs:   '📝',
    slides: '🎞️',
    drive:  '📁',
    link:   '🔗',
  };
  return icons[type] || '🔗';
}

/**
 * Resurs turini rangiga aylantiradi (Tailwind class).
 */
export function getResourceColor(type: string): { bg: string; text: string; border: string } {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    sheets: { bg: 'bg-green-500/15',  text: 'text-green-300',  border: 'border-green-500/30' },
    forms:  { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/30' },
    docs:   { bg: 'bg-blue-500/15',   text: 'text-blue-300',   border: 'border-blue-500/30' },
    slides: { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-500/30' },
    drive:  { bg: 'bg-yellow-500/15', text: 'text-yellow-300', border: 'border-yellow-500/30' },
    link:   { bg: 'bg-gray-500/15',   text: 'text-gray-300',   border: 'border-gray-500/30' },
  };
  return colors[type] || colors.link;
}

/**
 * Resurs turini o'qiladigan nomiga aylantiradi.
 */
export function getResourceTypeName(type: string): string {
  const names: Record<string, string> = {
    sheets: 'Google Sheets',
    forms:  'Google Forms',
    docs:   'Google Docs',
    slides: 'Google Slides',
    drive:  'Google Drive',
    link:   'Havola',
  };
  return names[type] || 'Havola';
}
