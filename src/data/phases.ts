import type { Phase, SubModule, Task, TeamMember, Badge, KPI, LaunchStageInfo } from './types';

// ─────────────────────────────────────────────
// ZAPUSK BOSQICHLARI (3 ta katta bosqich)
// ─────────────────────────────────────────────
export const LAUNCH_STAGES: LaunchStageInfo[] = [
  {
    id: 'pre-seminar',
    order: 1,
    label: 'Seminargacha',
    subtitle: '30 kun oldin → 1 kun oldin · Tayyorgarlik',
    description: 'CustDev, Offer Stack, Traffic Engine (Landing + Paid + Organic), Progrev — seminar uchun barcha tayyorgarlik.',
    emoji: '🏗️',
    phaseIds: [1, 2, 3],
  },
  {
    id: 'seminar',
    order: 2,
    label: 'Seminar',
    subtitle: 'Seminar kuni · Live Event · Closing',
    description: '90 daqiqa seminar, Live Demo, Case Study, Sales Session — zalda 20 ta Closing.',
    emoji: '🎯',
    phaseIds: [4],
  },
  {
    id: 'main-course',
    order: 3,
    label: 'Asosiy Kurs',
    subtitle: '1 kun keyin → 21 kun keyin · Onboarding + Darslar',
    description: 'Follow-up closing, Onboarding, Course Pack, LMS, 6 hafta darslar, Retention.',
    emoji: '🚀',
    phaseIds: [5],
  },
];

// ─────────────────────────────────────────────
// MODULLAR (Bo'limlar / Fazalar)
// ─────────────────────────────────────────────
export const PHASES: Phase[] = [
  {
    id: 1,
    name: 'Tayyorgarlik',
    shortName: 'CustDev & Offer',
    goal: 'CustDev intervyular → TOP-7 og\'riqlar → ICP Persona → Offer Stack → Ops Setup',
    color: 'phase1',
    stage: 'pre-seminar',
    dayStart: -30,
    dayEnd: -21,
    emoji: '🏗️',
  },
  {
    id: 2,
    name: 'Trafik Tizimi',
    shortName: 'Traffic & Automation',
    goal: 'Landing Page + Reels Content Production + ManyChat Bot + Meta Ads (Paid Traffic) + Collab Content',
    color: 'phase2',
    stage: 'pre-seminar',
    dayStart: -20,
    dayEnd: -11,
    emoji: '⚙️',
  },
  {
    id: 3,
    name: 'Progrev',
    shortName: 'Isitish & Nurturing',
    goal: '300+ Ro\'yxatdan o\'tish: Organic Content, Lead Nurturing, PR Collab, Event Setup — auditoriyani qizdirish',
    color: 'phase3',
    stage: 'pre-seminar',
    dayStart: -10,
    dayEnd: -1,
    emoji: '🔥',
  },
  {
    id: 4,
    name: 'Seminar Kuni',
    shortName: 'Live Seminar',
    goal: 'Live Seminar — Case Study, Live Demo, Sales Session, Closing: 20 ta × $1,500 = $30,000',
    color: 'phase4',
    stage: 'seminar',
    dayStart: 0,
    dayEnd: 0,
    emoji: '🎯',
  },
  {
    id: 5,
    name: 'Asosiy Kurs',
    shortName: 'Kurs Delivery',
    goal: 'Follow-up → Onboarding (20–27 talaba) → LMS + Course Pack → 6 hafta darslar → Retention',
    color: 'phase5',
    stage: 'main-course',
    dayStart: 1,
    dayEnd: 21,
    emoji: '🚀',
  },
];

// ─────────────────────────────────────────────
// BO'LIMCHALAR (Sub-modules)
// ─────────────────────────────────────────────
export const SUB_MODULES: SubModule[] = [
  // Phase 1 — Foundation (CustDev & Offer)
  { id: '1.1', phaseId: 1, order: 1, icon: '🔍', name: 'CustDev',           description: 'Customer interviews — TOP-7 Pain Points, Jobs-to-be-Done aniqlash' },
  { id: '1.2', phaseId: 1, order: 2, icon: '👤', name: 'ICP / Persona',     description: '3 ta Ideal Customer Profile — chakana, marketplace, optovik' },
  { id: '1.3', phaseId: 1, order: 3, icon: '💎', name: 'Offer Stack',       description: 'Irresistible Offer, narx zinapoyasi (Price Ladder), Value Stack' },
  { id: '1.4', phaseId: 1, order: 4, icon: '📦', name: 'Ops Setup',         description: 'Venue, Payment Gateway, Contract, Legal — operatsion tayyorgarlik' },
  { id: '1.5', phaseId: 1, order: 5, icon: '🤝', name: 'BD / Partners',     description: 'Business Development — potensial partnyorlarni topish va NDA/MOU imzolash' },

  // Phase 2 — Traffic Engine
  { id: '2.1', phaseId: 2, order: 1, icon: '🌐', name: 'Landing Page',      description: 'Conversion-optimized LP (Tilda), Lead Form, Telegram Community setup' },
  { id: '2.2', phaseId: 2, order: 2, icon: '🎬', name: 'Content Production', description: '18× Reels — Script → Shoot → Edit; Hook, Body, CTA formatida' },
  { id: '2.3', phaseId: 2, order: 3, icon: '🤖', name: 'Automation / Bot',  description: 'ManyChat Flow (DM → Lead → Qualifier), WhatsApp quick replies' },
  { id: '2.4', phaseId: 2, order: 4, icon: '📈', name: 'Paid Traffic',      description: 'Meta Ads: 3 campaigns, Lookalike + Interest audiences, Creatives A/B, Pixel' },
  { id: '2.5', phaseId: 2, order: 5, icon: '🤝', name: 'Collab Content',    description: 'Partner content brief, approval, post schedule, performance tracking' },

  // Phase 3 — Nurturing / Progrev
  { id: '3.1', phaseId: 3, order: 1, icon: '📱', name: 'Organic Content',   description: '18× Reels + Stories — daily posting, engagement, Reach & CTR kuzatuvi' },
  { id: '3.2', phaseId: 3, order: 2, icon: '📞', name: 'Lead Nurturing',    description: 'Cold/Warm calls, Telegram group activation, Registration confirmation' },
  { id: '3.3', phaseId: 3, order: 3, icon: '🤝', name: 'PR / Collab',      description: 'Partner requirements, Brief, post calendar, ROI measurement' },
  { id: '3.4', phaseId: 3, order: 4, icon: '🏛️', name: 'Event Setup',      description: 'Venue staging, Seminar Pack design, Emotion Script, Tech & Sales briefing' },

  // Phase 4 — D-Day / Launch
  { id: '4.1', phaseId: 4, order: 1, icon: '📋', name: 'Pre-Event',        description: 'T-7 → T-1 — Venue booking, Pack prep, Attendee confirmation, Catering, Case Study client, Producer prep, Reminders' },
  { id: '4.2', phaseId: 4, order: 2, icon: '🎤', name: 'LIVE Event',       description: 'T0 — Networking open, 3 Stories (hook/proof/offer), Live Demo, Case Study, Sales Session, Q&A, 20 Closings' },
  { id: '4.3', phaseId: 4, order: 3, icon: '📊', name: 'Post-Event',       description: 'T0 evening + T+1 — Revenue report, Follow-up list, 600k no-show call, Social Proof content, Debrief' },

  // Phase 5 — Course Delivery
  { id: '5.1', phaseId: 5, order: 1, icon: '🔧', name: 'Onboarding',       description: 'T+1 → T+14 — Follow-up close, Payment, Contract, LMS access, Course Pack, Progrev, Materials' },
  { id: '5.2', phaseId: 5, order: 2, icon: '🎓', name: 'Delivery',         description: 'T+14 → T+21 — Lesson 1, Weekly classes, LIVE Q&A sessions, Homework tracking' },
  { id: '5.3', phaseId: 5, order: 3, icon: '⭐', name: 'Retention / NPS',  description: 'T+22+ — Testimonials, NPS survey, Certificate, Partner revenue share, Next cohort prep' },
];

// ─────────────────────────────────────────────
// ISHLAR (Tasks)
// ─────────────────────────────────────────────
export const INITIAL_TASKS: Task[] = [

  // ══════════════════════════════════════════
  // FAZA 1 — POYDEVOR
  // ══════════════════════════════════════════

  // 1.1 Bozor Tahlili
  {
    id: 'f1-t30-2', phaseId: 1, subModuleId: '1.1', day: -30,
    title: 'CRM dan 30 ta mijozni export qilish',
    description: `## Maqsad
Bozor tahlili uchun haqiqiy mijozlar bazasini tayyorlash.

## Qadamlar
1. Moysklad → Kontragentlar bo'limiga kiring
2. Filtr: Oxirgi xarid sanasi — so'nggi 12 oy ichida
3. Eksport → CSV formatda yuklab oling
4. Google Sheets yangi fayl oching: "T-30 Bozor Tahlili"

## Google Sheets ustunlari (A-H):
| A: № | B: Ism Familiya | C: Telefon | D: Biznes turi | E: Shahar | F: Oxirgi xarid | G: ICP guruh | H: Intervyu holati

## Biznes turlari (D ustun uchun):
→ Chakana — 3-10 do'kon tarmog'i egasi
→ Marketplace — WB / Ozon / Uzum sotuvchisi
→ Optovik — 5+ xodim, ulgurji distribyutor
→ Boshqa — to'g'ri kategoriyaga kirmaydi

💡 Maslahat: H ustuniga "Kutilmoqda / Qo'ng'iroq qilindi / Bajarildi" yozing`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'bozor',
  },
  {
    id: 'f1-t29-1', phaseId: 1, subModuleId: '1.1', day: -29,
    title: 'Mijozlarni 3 guruhga bo\'lish',
    description: `## Maqsad
30 ta mijozni 3 ICP guruhga ajratish — har guruh uchun alohida intervyu savollari bo'ladi.

## Guruhlar ta'rifi:
📋 GURUH A — Chakana tarmoq egasi
→ Belgilari: 3-10 do'kon, 5-30 xodim, kunlik kassir jarayoni bor
→ Asosiy og'rig'i: Har do'kon qoldig'ini kuzatish qiyin, o'g'irlik topilmaydi

📋 GURUH B — Marketplace sotuvchisi
→ Belgilari: WB / Ozon / Uzum da faol, qoldiq sinxronizatsiyasi muammo
→ Asosiy og'rig'i: Oversell jarimalari, qo'lda yuklamalar, FBO/FBS farqlari

📋 GURUH C — Optoviy distribyutor
→ Belgilari: 500+ SKU, B2B mijozlar, murakkab soliq hisoboti
→ Asosiy og'rig'i: Inventarizatsiya muddat va farqlari, debitor nazorati

## Qadamlar
1. Google Sheets dagi G ustunini to'ldiring (A/B/C)
2. Har guruhda kamida 8-10 ta mijoz bo'lsin
3. "Boshqa" guruhidagilarni ro'yxatdan chiqaring

⚠️ Muhim: Bir guruhda 8dan kam bo'lsa, CRM filtrini kengaytiring (24 oy)`,
    assignee: 'assistent', status: 'pending', xpReward: 20, category: 'bozor',
  },
  {
    id: 'f1-t29-2', phaseId: 1, subModuleId: '1.1', day: -29,
    title: 'Har guruhdan 5 ta intervyu uchun mijoz tanlash',
    description: `## Maqsad
Jami 15 ta mijoz tanlash — ular bilan 10-15 daqiqalik intervyu o'tkaziladi.

## Tanlash mezonlari (ball tizimi):
1. Moyskladdan 6+ oy foydalanmoqda → +3 ball
2. WhatsApp yoki Telegram orqali muloqot qilgan → +2 ball
3. 500,000+ so'mlik xarid qilgan → +2 ball
4. So'nggi 30 kunda aktiv → +2 ball
5. Xodimi 5+ ta → +1 ball

## Qadamlar
1. Google Sheets ga yangi "Ball" ustuni (I) qo'shing
2. Har mijozga ball hisoblang
3. Har guruhdan TOP 5 ni tanlang (eng yuqori ball)
4. Tanlangan 15 ta yashil rang bilan belgilang
5. H ustuniga "Tanlangan" yozing

💡 Agar yetarli ball yo'q bo'lsa — tanish yoki referral orqali ham to'ldirishingiz mumkin`,
    assignee: 'assistent', status: 'pending', xpReward: 20, category: 'bozor',
  },
  {
    id: 'f1-t29-3', phaseId: 1, subModuleId: '1.1', day: -29,
    title: 'To\'liq intervyu skriptini yozish',
    description: `## Maqsad
Har 3 guruh uchun maxsus savollar skripti — nima so'rashni, qanday yozishni, qanday tugatishni bilish.

## KIRISH (1 daqiqa — xuddi shu so'zlar bilan):
"[Ism aka/opa], salom! Men MoySklad Pro Akademiya dan murojaat qilyapman. Bizning yangi kursimizni tayyorlaymiz va siz kabi tajribali mijozlarimizning fikrini olmoqchimiz. Atigi 10-12 daqiqa vaqtingizni oladi — siz uchun ham foydali bo'ladi, chunki eng ko'p so'ralgan muammolarga yechim tayyorlaymiz. Qulayingizmi?"

## ASOSIY SAVOLLAR (guruhga qarab tanlang):

📋 CHAKANA TARMOQ (A guruh):
1. "Hozir nechta do'koningiz bor va har birida inventarizatsiyani qanday qilyapsiz?"
→ Tinglang. Keyin: "Bu jarayon oyiga taxminan necha soat oladi?"
2. "Do'konlar o'rtasida tovar ko'chirish paytida nima muammo chiqadi?"
→ Tinglang. Keyin: "Bu muammo sababli qancha pul yo'qotgansiz, taxminan?"
3. "Kassirlar hisobotini tekshirganda qanday xatoliklar chiqadi?"
→ Tinglang. Keyin: "Buni avtomatlashtirsangiz, nima qilardingiz o'sha vaqt bilan?"

📋 MARKETPLACE (B guruh):
1. "WB/Ozon da oversell bo'lganmi? Birinchi marta qanday topgansiz?"
→ Tinglang. Keyin: "U yerda jarima qancha bo'ldi taxminan?"
2. "Har kuni FBO/FBS qoldiqlarini sinxronlashni qanday qilyapsiz, qo'lda?"
→ Tinglang. Keyin: "Kuniga qancha vaqt ketadi bunga?"
3. "Yangi tovar qo'shganda barcha platformaga yuklash necha kun oladi?"
→ Tinglang. Keyin: "Bu avtomatlashsa, yana qancha tovar qo'shardingiz?"

📋 OPTOVIK (C guruh):
1. "Yiliga necha marta inventarizatsiya o'tkazasiz? Bitta inventarizatsiya necha kun?"
→ Tinglang. Keyin: "Omborda topilgan farqlar — yo'qolgan tovar yoki hujjat xatosimi?"
2. "B2B mijozlarga qarz (debitor) nazoratini qanday qilyapsiz?"
→ Tinglang. Keyin: "Muddati o'tgan qarz bo'lganmi? Qancha miqdorda?"
3. "Soliq hisoboti vaqtida buxgalterga ma'lumot berishda qanday qiyinchilik?"
→ Tinglang. Keyin: "Bu avtomatlashsa, buxgalter yana nima qila olardi?"

## YAKUNLASH (30 soniya):
"Rahmat, [Ism aka/opa]! Siz aytgan [ENG MUHIM MUAMMO] — biz yangi kursimizda bunga alohida modul ajratdik. Kurs haqida eshitmoqchimisiz yaqinda?"
→ "Ha" desa — [KUTILMOQDA] deb yozing va keyingi hafta yana murojaat qiling

## Google Sheets da qanday yozish:
| J: Savol 1 javobi | K: Savol 2 javobi | L: Savol 3 javobi | M: Kalit ibora | N: Kursga qiziqish

⚠️ Ovozini yozib olishni so'rang: "Yozib olsam maylimi, keyinroq o'zimga eslash uchun?"`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'bozor',
  },
  {
    id: 'f1-t28-1', phaseId: 1, subModuleId: '1.1', day: -28,
    title: 'Chakana segment: 5 ta intervyu o\'tkazish',
    description: `## Maqsad
A guruhdagi 5 chakana do'kon egasi bilan intervyu — ularning kassir va qoldiq muammolarini chuqur tushunish.

## Tayyorgarlik (har intervyu oldidan):
1. Google Sheets dan ushbu mijoz ma'lumotini ko'ring
2. Ularning so'nggi xaridi va muloqot tarixini eslang
3. WhatsApp da avvalroq xabar yuboring:
→ "Salom [Ism aka]! Ertaga soat [VAQT]da 10 daqiqa suhbat uchun qulayingizmi? Moysklad kurs haqida fikringizni bilmoqchiman — siz uchun ham foydali"

## Intervyu o'tkazish qoidalari:
1. Soat — qattiy 10-12 daqiqa. Ko'proq cho'zilsa to'xtating
2. Ovozini yozing (Telegram "Ovozli xabar" yoki telefon diktofoni)
3. Gapirayotganda so'z to'xtatmang, tinglang
4. Har savol so'ng: "Yana biror narsa?" deb so'rang
5. Raqam aytsa (pul, vaqt) — takrorlang: "Ya'ni oyiga 5 soatmi, to'g'ri tushundimmi?"

## Intervyudan keyin (10 daqiqa ichida):
1. Google Sheets ga J, K, L ustunlarini to'ldiring
2. M ustuniga — ular ishlatgan HAQIQIY SO'ZLAR (tirnoq ichida)
3. N ustuniga — kursga qiziqishi (1-5 ball)
4. H ustuniga "Bajarildi [sana]" yozing

## Muvaffaqiyat belgisi:
☐ 5 ta intervyu — hammasi bajarildi
☐ Har birida kamida 1 ta "haqiqiy ibora" yozildi
☐ Eng ko'p takrorlangan muammo aniqlandi`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'bozor',
  },
  {
    id: 'f1-t28-2', phaseId: 1, subModuleId: '1.1', day: -28,
    title: 'Marketplace segment: 5 ta intervyu o\'tkazish',
    description: `## Maqsad
B guruhdagi 5 Marketplace sotuvchi bilan intervyu — WB/Ozon/Uzum da qoldiq, jarima va sinxronizatsiya muammolarini tushunish.

## Ushbu guruhga xos muammolar (tinglashga tayyor bo'ling):
→ "Oversell bo'ldi, WB 3,000 rubldan jarima soldi"
→ "Har kuni 2 soat qo'lda FBO/FBS da yangilash"
→ "Yangi tovar qo'shsam, har platformaga alohida yuklash kerak"
→ "Qaytgan tovar (vozvrat) hisobi Moyskladga tushmaydigan marta bo'ldi"

## Savol skripti (Marketplace uchun):
1. "[Qaysi] platformada sotasiz — WB, Ozon yoki Uzum da?"
→ "Barchasida birga qoldiqni qanday boshqarasiz?"
2. "Eng oxirgi oversell qachon bo'ldi? Jarima qancha bo'ldi?"
→ "Bu muammoni oldini olish uchun hozir nima qilyapsiz?"
3. "Yangi tovar qo'shganda barchaga yuklash necha kun oladi?"
→ "Agar bu avtomatlashsa, necha turdagi tovar qo'shardingiz?"
4. "Oyiga necha soat qoldiq sinxronizatsiyasiga sarflaysiz?"
→ Bu RAQAMNI yozing — kursda "Siz oyiga X soat tejaysiz" deyamiz

## Intervyudan keyin:
1. Google Sheets ga to'ldiring
2. J ustuni: Platforma va tovar turi
3. K ustuni: Eng katta muammo + raqam (pul yoki vaqt)
4. L ustuni: Hozir qo'lda qilayotgan yechimi
5. M ustuni: Kalit ibora — ularning so'zlari bilan

☐ 5 ta intervyu bajarildi
☐ Har birida jarima summasi yoki vaqt yo'qotish raqami bor`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'bozor',
  },
  {
    id: 'f1-t28-3', phaseId: 1, subModuleId: '1.1', day: -28,
    title: 'Optovik segment: 5 ta intervyu o\'tkazish',
    description: `## Maqsad
C guruhdagi 5 optoviy distribyutor bilan intervyu — 500+ SKU, inventarizatsiya va debitor nazorati muammolarini tushunish.

## Ushbu guruhga xos muammolar:
→ "Inventarizatsiya 3 kun — do'kon to'xtab turadi"
→ "Excel da debitor nazorat, ba'zida 2-3 oylik qarzni unutib qo'yamiz"
→ "Buxgaltergа ma'lumot berishda har oyda 1 kun ketadi"
→ "Tovar keldi, lekin hujjat 3 kundan keyin keladi — ikki yoqlama yozib qo'yamiz"

## Savol skripti (Optovik uchun):
1. "Ombordagi tovarni necha oyda bir inventarizatsiya qilasiz?"
→ "Bitta inventarizatsiya necha kun davom etadi?"
→ "Topilgan farqlar odatda qancha — foiz hisobida?"
2. "B2B mijozlaringizning qarzini qanday kuzatasiz? Excel, telefon yoki boshqami?"
→ "Muddati o'tgan qarz holatiga qancha marta tushgansiz?"
→ "Eng katta yo'qotilgan qarz qancha edi?"
3. "Buxgalteringizga oylik hisobot berishda qanday muammo?"
→ "Necha soat ketadi bu jarayon?"
→ "Soliq tekshiruvida qiynalganmisiz hujjat bilan?"
4. "Hozir Moyskladdan tashqari yana qanday dastur ishlatayapsiz?"
→ Bu "muqobil" ekanini tushunish uchun muhim

## Google Sheets da:
| J: Inventarizatsiya chastotasi va davomiyligi
| K: Debitor muammo tarixi (raqam bilan)
| L: Buxgalteria vaqt xarajati
| M: Parallel dasturlar ro'yxati

☐ 5 ta intervyu bajarildi
☐ Har birida inventarizatsiya davomiyligi va debitor raqami bor`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'bozor',
  },
  {
    id: 'f1-t27-1', phaseId: 1, subModuleId: '1.1', day: -27,
    title: 'Natijalarni tahlil qilib TOP-7 og\'riqni aniqlash',
    description: `## Maqsad
15 ta intervyudan olingan ma'lumotlarni bir joyga to'plash va eng muhim 7 ta muammoni aniqlash.

## Google Sheets — yangi "Tahlil" tab:

📋 TAB 1: Muammo matritsasi
| A: Muammo nomi | B: Chakana (A) nechta aytdi | C: Marketplace (B) | D: Optovik (C) | E: Jami | F: Reyting

Misol to'ldirish:
| Qoldiq sinxronizatsiya | 3 | 5 | 1 | 9 | #1
| Inventarizatsiya vaqti | 2 | 1 | 5 | 8 | #2
| Kassir xatolari | 4 | 0 | 2 | 6 | #3

📋 TAB 2: Kalit iboralar
| A: Muammo | B: Eng yaxshi ibora (qo'shtirnoq ichida) | C: Kim aytdi | D: Reklama uchun ishlatish

Misol:
| Oversell | "WB dan 3 million jarima yedim, bilib ham qolmadim" | [Ism] | ✅ Ha

## Tahlil qadamlari:
1. Har intervyuning M ustunidagi iboralarni TAB 2 ga ko'chiring
2. TAB 1 da har muammoni qancha kishi aytganini hisoblang
3. E ustunini saralang (katta → kichik)
4. TOP 7 ni reyting bering (#1 — #7)
5. Mentorhga: "TOP 7 og'riq tayyor, ko'rib chiqing" xabar yuboring

## Natija qanday ko'rinishi kerak:
#1. Qoldiq sinxronizatsiya (9/15 ta aytdi) — "WB dan jarima yedim"
#2. Inventarizatsiya davomiyligi (8/15) — "3 kun do'kon yopiq turadi"
#3. Kassir xatolari (6/15) — "Oyiga 2-3 marta farq chiqadi"
...va hokazo

⚠️ Muhim: Bu 7 ta muammo — kurs nomida, reklamada, seminar kontentida ishlatiladi!`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'bozor',
  },

  // 1.2 Mijoz Portreti
  {
    id: 'f1-t27-2', phaseId: 1, subModuleId: '1.2', day: -27,
    title: '3 ta ICP kartochkasini to\'liq yozish',
    description: `## Maqsad
Har bir ICP (Ideal Customer Profile) kartochkasi — reklama, kontent va seminar skriptida foydalanish uchun.

## Google Slides yoki Notion da 3 ta kartochka:

📋 KARTOCHKA #1 — Chakana tarmoq egasi
Ism (xayoliy): Jasur aka
Yoshi va joylashuvi: 35 yosh, Toshkent
Biznes: 5 ta do'kon, elektronika, 15 xodim
Oylik aylanma: 150-200 million so'm
Hozirgi dastur: Excel + Moysklad (1 yildan beri)
Asosiy og'rig'i (intervyudan): "Har do'kondagi qoldiq boshqa ko'rsatadi — nima bo'lyapti bilmadim"
Eng katta qo'rquvi: "Kassir o'g'irlab ketayaptimikin deb o'ylayapman, lekin isbotlay olmayapman"
Kursni olishga sabab: "Do'konlarni real vaqtda ko'rmoqchiman"
Reels uchun kalit ibora: "5 ta do'konim bor, lekin bittasida nima sotyapti bilmayman"
Haqiqiy iqtibos: "Inventarizatsiyani o'tkazganda farq chiqadi, lekin qayerdan — topib bo'lmaydi"

📋 KARTOCHKA #2 — Marketplace sotuvchisi
Ism (xayoliy): Nilufar opa
Yoshi va joylashuvi: 28 yosh, Samarqand
Biznes: WB + Uzum, kosmetika, 3 xodim
Oylik aylanma: 80-120 million so'm
Hozirgi dastur: WB seller cabinet + qo'lda Excel
Asosiy og'rig'i: "Bir platforma 50 ta qoldiq ko'rsatsa, ikkinchisi 40 — biri noto'g'ri"
Eng katta qo'rquvi: "Oversell bo'lib jarima yeb qolishim"
Kursni olishga sabab: "Barcha platformani bir joydan boshqarmoqchiman"
Reels uchun kalit ibora: "WB qoldiq 50 ko'rsatdi, Uzum 40 — biri yolg'on"
Haqiqiy iqtibos: "Jarima keldi, 3 million so'm — qachon oversell bo'lganini ham bilmadim"

📋 KARTOCHKA #3 — Optoviy distribyutor
Ism (xayoliy): Bobur aka
Yoshi va joylashuvi: 42 yosh, Toshkent
Biznes: Oziq-ovqat ulgurji, 12 xodim, 800+ SKU
Oylik aylanma: 500+ million so'm
Hozirgi dastur: 1C (eski) + Moysklad (muqobil sifatida)
Asosiy og'rig'i: "Inventarizatsiya 4 kun — o'sha vaqt sotish to'xtaydi"
Eng katta qo'rquvi: "Soliq tekshiruvida hujjat topilmay qolishi"
Kursni olishga sabab: "Inventarizatsiyani 1 kunga tushirmoqchiman"
Reels uchun kalit ibora: "Inventarizatsiya 4 kun — har yili 4 kun pul ishlamaydi"
Haqiqiy iqtibos: "Buxgalterga ma'lumot berishga oyiga butun bir kun ketadi"

## Kartochkalar tayyor bo'lganda:
☐ Mentorga ko'rsating → tasdiqlash
☐ Google Drive papkasiga "ICP Kartochkalar" deb saqlang
☐ Kontent yoziladigan joyda ko'rinadigan bo'lsin (ekranda ochiq tursin)`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'bozor',
  },

  // 1.3 Taklif Yasash
  {
    id: 'f1-t26-1', phaseId: 1, subModuleId: '1.3', day: -26,
    title: 'Seminar nomini finalizatsiya qilish',
    description: `## Maqsad
Potensial mijozni "Bepul emas — 600,000 so'm to'lab keladi" qiluvchi nom va tavsif.

## Variantlar (mentor 1 tasini tanlaydi):
1. "MoySklad Diagnostika: Biznesingizdagi 3 ta pul oqishini 90 daqiqada toping"
2. "MoySklad PRO: Telefonda qoldiq, kassir, pul — barchasini jonli ko'ring"
3. "Omboringiz Sizga Yolg'on Aytayaptimi? MoySklad bilan haqiqatni bilib oling"

## Tavsif (landing va postlarda):
"90 daqiqalik amaliy seminar — laptop olmang, telefon yetarli. Jonli demo da o'z biznesingizni ko'rasiz: qayerda tovar yo'qolmoqda, kassir to'g'ri hisoblaydimi, ombor va kassа mos kelmoqdami. Kirish: 600,000 so'm — bu siz uchun filtr, jiddiy odamlar uchun."

## Nima uchun 600,000 so'm:
→ Bepul seminar = motivatsiyasiz keladi, ketadi
→ Pul to'lagan = diqqat bilan tinglaydi, savollar beradi
→ 600,000 = kurs narxining 40% — kimdir allaqachon jiddiy

## Qadam:
1. 3 ta variantni chiqaring
2. Mentorga yuboring — 1 soat ichida tanlaydi
3. Final nomni Google Sheets "Offer" tab ga yozing
4. Barcha joyda bu nomdan foydalaning (postlar, ads, stories)`,
    assignee: 'mentor', status: 'pending', xpReward: 20, category: 'kontent',
  },
  {
    id: 'f1-t26-2', phaseId: 1, subModuleId: '1.3', day: -26,
    title: 'Akademiya kurs tarkibini 6 modulga bo\'lish',
    description: `## Maqsad
Kurs tarkibini shunday tuzingki, har bir modul 1 ta aniq natija bersin.

## 6 MODUL TARKIBI:

📋 M1 — MoySklad Poydevor (Hafta 1)
Nima o'rganadi: Mahsulot, ombor, kontragent sozlash
Natija: Tizim to'liq sozlangan, hamma narsa o'z joyida
Og'riq: "Moyskladni oldim, lekin to'liq ishga tushirmadim"

📋 M2 — Qoldiq va Inventarizatsiya (Hafta 2)
Nima o'rganadi: Tovar qabul, ko'chirish, inventarizatsiya
Natija: Har do'konda real qoldiq, farq 0 ga yaqin
Og'riq: "Omborda nima bor — aniq bilmayman"

📋 M3 — Kassir va To'lov Nazorati (Hafta 3)
Nima o'rganadi: Smena ochish/yopish, qaytarish, naqd/karta
Natija: Kassir xatolari yo'q, oylik farq aniqlangan
Og'riq: "Kassir hisobi va bank hisobi mos kelmaydi"

📋 M4 — Marketplace Integratsiya (Hafta 4)
Nima o'rganadi: WB/Ozon/Uzum sinxronizatsiya, FBO/FBS
Natija: Barcha platforma qoldig'i avtomatik yangilanadi
Og'riq: "Har platformani alohida yangilayman — vaqt yo'q"

📋 M5 — Hisobot va Soliq (Hafta 5)
Nima o'rganadi: P&L, debitor, soliq uchun hisobot
Natija: Buxgalterga tayyor hisobot — 10 daqiqada
Og'riq: "Buxgalterga ma'lumot berishga 2 kun ketadi"

📋 M6 — Avtomat Boshqaruv (Hafta 6)
Nima o'rganadi: Avtobuyurtma, minimum qoldiq alert, API
Natija: Omborni "o'zi" boshqaradi, siz faqat qaror qilasiz
Og'riq: "Tovar tugab qolganini kassada bilib qolamiz"

## Google Docs "Kurs Tarkibi" hujjat:
Har modul uchun: Sarlavha | Hafta | Natija | Og'riq | Format (video/live)`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f1-t26-3', phaseId: 1, subModuleId: '1.3', day: -26,
    title: 'Value stack va narx zinapoyasini hujjatlashtirish',
    description: `## Maqsad
Mijoz "$1,500 qimmat" demasdan oldin u "$2,870 ga arziydi, $1,500 ga olayapman" deb his qilsin.

## VALUE STACK (Google Slides "Offer" prezentatsiyada):

| Nima berasan | Real narxi | Tavsif
| 6 haftalik Akademiya | $1,200 | 18 ta video dars + 6 ta LIVE session
| 1:1 Audit sessiyasi | $300 | Mentorla 60 daqiqa — sizning biznesingiz
| 10 ta shablon paketi | $150 | Tayyor sozlamalar, hisobot shablonlari
| Marketplace integratsiya | $200 | WB/Ozon/Uzum ulanish yordam
| 3 oy premium support | $170 | Telegram guruh, 48 soat javob kafolati
| Bonus: Hamkorlik sertifikati | $50 | LinkedIn va CV uchun
| JAMI REAL QIYMAT: | $2,070 | ────────────────────
| SEMINAR NARXI: | $1,500 | Faqat bugun va ertaga

## NARX ZINAPOYASI:
→ To'liq to'lov: $1,500 (eng foydali)
→ 2 qismda: $800 + $800 (1 oy ichida)
→ 3 qismda: $600 + $600 + $600 (2 oy ichida)

## Qachon narx aytiladi?
→ Faqat seminar oxirida, tanaffusdan keyin
→ Birinchi value stack ko'rsatiladi, KEYIN narx
→ "Hozir $1,500 — ertadan $2,000" — urgency

## Offer One Pager (1 sahifali PDF):
1. Seminar nomi va sana
2. Kim uchun (3 ICP)
3. Nima olasiz (value stack)
4. Narx va muddatlar
5. Kafolat: "14 kun ichida natija bo'lmasa — to'liq qaytaramiz"
6. Hozir ro'yxatdan o'tish linki`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'sotuv',
  },

  // 1.4 Logistika
  {
    id: 'f1-t30-1', phaseId: 1, subModuleId: '1.4', day: -30,
    title: 'Zalni bron qilish',
    description: `## Maqsad
Seminar kuni uchun professional zal — mijoz kelganidan ishonchini oshirsin.

## Zal mezonlari (barchasi bo'lishi shart):
☐ Sig'imi: 100-120 kishi (stullar teatr usulida)
☐ Joylashuv: Toshkent markazi (Yunusobod, Mirzo Ulug'bek, Chilonzor)
☐ Proyektor: Full HD, 100+ dyuym ekran
☐ Mikrofon: Simsiz (lapel yoki qo'l)
☐ Wi-Fi: Kamida 50 Mbit/s, parol bo'lmasin
☐ Konditsioner: Ishlayotgan holda
☐ Kofe-pauza: 30 daqiqa uchun joy
☐ Parking: Kamida 20 mashina uchun

## Tavsiya etilgan zallar (qo'ng'iroq qiling):
1. GroundZero (Yunusobod) — +998 71 200-09-00
2. Business Tour (Mirzo Ulug'bek) — Instagram @businesstour.uz
3. Hilton Tashkent konferens zal — +998 71 203-77-77
4. Regus Tashkent — +998 71 140-07-77

## Qo'ng'iroqda so'rashlar:
"100 kishilik zal bor? [SANA] uchun 9:00-14:00 bo'sh? Narxi necha? Wi-Fi va proyektor bormi? Kofe-pauza xizmati bormi?"

## Bron qilgandan keyin:
1. Shartnoma yoki tasdiqlash xati oling (WhatsApp skrinshot yetarli)
2. Google Sheets "Logistika" tab ga yozing:
| Zal nomi | Manzil | Telefon | Narx | Bron sanasi | Shartnoma holati
3. To'lov: Avans 50% hozir, 50% seminar kuni
4. Kira oldidan 2 kun tekshirish uchun tashrif buyuring

⚠️ MUHIM: Bron qilmaganingizcha boshqa narsani boshlamang — zalsiz seminar bo'lmaydi!`,
    assignee: 'assistent', status: 'pending', xpReward: 80, category: 'logistika',
  },
  {
    id: 'f1-t30-3', phaseId: 1, subModuleId: '1.4', day: -30,
    title: 'Click va Payme to\'lov linklarini ochish',
    description: `## Maqsad
Har ikkala to'lov usulini ochish — Uzb da aksariyat Click, ba'zilari Payme ishlatadi.

## Click orqali to'lov linki:
1. click.uz → Biznes → Arizа
2. Hujjatlar: Passport + STIR + bank rekvizitlari
3. Tekshirish muddati: 2-3 kun ish kuni
4. Merchant kategoriya: "Ta'lim va kurslar"

## Payme orqali:
1. payme.uz → Business → Ro'yxatdan o'tish
2. Xuddi shu hujjatlar
3. Tekshirish: 1-2 kun

## Yaratish kerak bo'lgan linklar (har biri alohida):
| To'lov | Summa | Izoh | Platform
| Seminar kirish | 600,000 so'm | "MoySklad seminar [SANA]" | Click + Payme
| Kurs to'liq | $1,500 ekvivalent so'mda | "MoySklad PRO Akademiya to'liq" | Click + Payme
| Kurs 1-qism | $800 ekvivalent | "MoySklad PRO — 1-to'lov" | Click + Payme
| Kurs 2-qism | $700 ekvivalent | "MoySklad PRO — 2-to'lov" | Click + Payme

## Dollar kursini qanday hisoblash:
→ Rasmiy kurs + 2-3% ustama (kurs farqi uchun)
→ Har hafta kursni tekshiring, linkni yangilang
→ Misol: $1,500 × 12,800 so'm = 19,200,000 so'm

## Tayyor bo'lgach:
☐ Har linkni test to'lov bilan sinang (1,000 so'm yuborib qaytib oling)
☐ QR kod yarating (Google Chart yoki qr-code-generator.com)
☐ Linklar va QR kodlarni Google Drive ga yuklang`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'logistika',
  },
  {
    id: 'f1-t30-4', phaseId: 1, subModuleId: '1.4', day: -30,
    title: 'Shartnoma shablonini tayyorlash',
    description: `## Maqsad
Har ikkala formatga tayyor shartnoma — seminar kuni imzolashga 2 daqiqa ketsin.

## SHABLON 1 — Seminar shartnomasi (oddiy):
Mazmun:
- Taraf 1: [Kompaniya] MoySklad PRO Akademiya
- Taraf 2: [Mijoz ismi va pasporti]
- Predmet: "MoySklad Diagnostika" seminariga kirish huquqi
- Narx: 600,000 so'm (to'liq oldindan)
- Sana: [SANA], 10:00 — 13:30
- Manzil: [ZAL MANZILI]
- Qaytarish: Seminar boshlanishidan 48 soat oldin 100% qaytariladi

## SHABLON 2 — Akademiya shartnomasi (to'liq):
Majburiy bandlar:
1. Predmet: 6 haftalik "MoySklad PRO Akademiya" onlayn kursi
2. Narx va to'lov: $1,500 (yoki 2 qismda: $800 + $700)
3. Kurs davomiyligi: 6 hafta, har hafta 1 LIVE session
4. Kafolat: 14 kun ichida natija ko'rmasa — to'liq qaytarish
5. Darslar: Yozilgan video + LIVE Zoom, 6 oy davomida kirish
6. Sertifikat: Kurs tugagach raqamli sertifikat
7. Texnik yordam: Telegram guruh, 48 soat ichida javob
8. Konfidensiallik: Kurs materiallari tarqatilmaydi

## Qayerda tayyorlash:
→ Google Docs — 2 ta alohida hujjat
→ PDF ga export qiling (File → Download as PDF)
→ E-imzo uchun: DocuSign yoki IMZO.uz
→ Chop etish uchun: A4, 2 nusxa (har toraf 1 tadan)

☐ Shablon 1 (seminar) tayyor va PDF da
☐ Shablon 2 (akademiya) tayyor va PDF da
☐ Yurist ko'rib chiqdi yoki ingliz tili biluvchi ko'rdi`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f1-t21-1', phaseId: 1, subModuleId: '1.4', day: -21,
    title: 'Faza 1 yakunlash — barcha natijalarni tekshirish',
    description: `## Maqsad
Faza 1 (Poydevor) ning barcha natijalari tayyor ekanligini tasdiqlash. Hech narsa yetishmasa — bu erda to'xtang, keyingi fazaga o'tmang.

## TEKSHIRISH RO'YXATI:

📋 1.1 Bozor Tahlili:
☐ 15 ta intervyu o'tkazildi va yozildi
☐ Google Sheets da TOP-7 og'riq aniqlangan
☐ Har og'riq uchun kamida 1 ta haqiqiy iqtibos bor
☐ Reyting 1-dan 7-gacha belgilangan

📋 1.2 Mijoz Portreti:
☐ 3 ta ICP kartochkasi yozildi (Chakana, Marketplace, Optovik)
☐ Har kartochkada haqiqiy iqtibos va kalit ibora bor
☐ Mentordan tasdiqlash olindi

📋 1.3 Taklif:
☐ Seminar nomi finallashdi
☐ Kurs 6 ta modulga bo'lindi
☐ Value stack hujjatlashtirildi ($2,070 → $1,500)
☐ Offer One Pager PDF tayyorlandi

📋 1.4 Logistika:
☐ Zal bron qilindi (shartnoma/tasdiqlash bor)
☐ Click va Payme to'lov linklari test qilindi
☐ 2 ta shartnoma shabloni PDF da tayyor

📋 1.5 Hamkorlar:
☐ Kamida 2 ta hamkor bilan shartnoma imzolandi
☐ Har hamkor postlash jadvalidagi sanalar kelishildi

## Yig'ilish formati:
→ Butun jamoa 30 daqiqa yig'ilish
→ Har bo'lim o'z natijasini taqdim etadi
→ Muammolar aniqlansa — 24 soat ichida hal qilish
→ Mentor "Faza 2 ga o'tamiz" deb ruxsat beradi`,
    assignee: 'jamoa', status: 'pending', xpReward: 100, category: 'logistika',
  },

  // 1.5 Hamkorlar
  {
    id: 'f1-t25-1', phaseId: 1, subModuleId: '1.5', day: -25,
    title: '5 ta potensial hamkorni aniqlash',
    description: `## Maqsad
Auditoriyasi bizning ICP bilan mos keladigan 5 ta kanal/blogger/biznes topish.

## Hamkor turlari (har kategoriyadan tanlang):

📋 Kategoriya 1 — Moliya va Buxgalteria:
→ Buxgalter.uz Instagram — @buxgalter_uz
→ "Soliq va biznes" Telegram kanali
→ Mahalliy buxgalter blogger (5,000+ obunachi)
Moslik: Ularning auditoriyasi — biznes egasi, hisobot muammosi bor

📋 Kategoriya 2 — Marketplace:
→ WB/Uzum sellers Telegram chat adminlari
→ "@wb_sellers_uz" tipidagi kanallar
→ E-commerce konsultant (yuqori ishonch)
Moslik: Ularning auditoriyasi — aynan B guruhi

📋 Kategoriya 3 — Biznes klubi / voqealar:
→ GroundZero Coworking — @groundzero.uz
→ Business Tour — @businesstour_uz
→ YEI (Yosh Tadbirkorlar) — @yei_uz
Moslik: Ular tadbirkor auditoriyasiga ega

📋 Kategoriya 4 — Bank / Moliya xizmatlari:
→ Kapitalbank SMB bo'limi
→ Hamkorbank
→ Infin.uz fintech
Moslik: Ularning klientlari — kichik biznes egasi

📋 Kategoriya 5 — Kassa / POS tizim:
→ H-print kassalar — @hprint_uz
→ iiko yoki Evotor partnerlari
Moslik: Ularning klientlari — do'kon egasi

## Google Sheets "Hamkorlar" tab:
| A: Nomi | B: Kategoriya | C: Instagram/Telegram | D: Obunachi soni | E: Telefon/DM | F: Status | G: Kelishuv turi`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f1-t25-2', phaseId: 1, subModuleId: '1.5', day: -25,
    title: 'Hamkorlik taklifini (1 sahifa) yozish',
    description: `## Maqsad
Hamkorga yuboriladigan aniq, qisqa va jozibali taklif — u o'qib 1 daqiqada "ha" deyishi kerak.

## TAKLIF TUZILMASI (Google Docs, 1 sahifa):

SARLAVHA: "MoySklad PRO Akademiya — Hamkorlik Taklifi"

1. KIM BIZ:
"Biz MoySklad PRO Akademiya — O'zbekistondagi birinchi MoySklad maxsus kurs. 90 daqiqalik bepul diagnostika seminarimiz [SANA] da bo'ladi."

2. SIZNING AUDITORIYANGIZ UCHUN NIMA BOR:
"Sizning obunachilangiz — biznes egasi. Ular har kuni ombor, kassir, qoldiq muammosi bilan kurashadi. Biz aynan shu muammoni hal qilamiz."

3. BIZ SIZGA NIMA TAKLIF QILAMIZ:
Variant A (Komissiya modeli):
→ Siz seminar haqida post qilasiz (1-2 stories va 1 post)
→ Sizning linkingiz orqali kelgan har bir kurs sotuvidan 20% (≈ $300) olasiz
→ Tracking: Maxsus promo-kod yoki link

Variant B (Barter modeli):
→ Siz seminar haqida post qilasiz
→ Biz sizning auditoriyangizga bepul 30 daqiqalik vebinar o'tkazamiz
→ Mavzu: "Buxgalteriyani soddalashtirish" yoki siz tanlagan mavzu

4. NIMA KERAK:
→ 1 ta Instagram post (sana: [T-15])
→ 2-3 ta stories [T-10 dan T-1 gacha]
→ Telegram kanalga 1 ta post (agar bo'lsa)

5. ALOQA:
[Mentor ismi va telefoni]

## PDF formatda saqlang va ikkala variantni ko'rsating`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'hamkor',
  },
  {
    id: 'f1-t24-1', phaseId: 1, subModuleId: '1.5', day: -24,
    title: 'Hamkorlarga taklif yuborish (DM skript)',
    description: `## Maqsad
5 ta hamkorgа birinchi aloqa o'rnatish — qo'ng'iroq vaqtini belgilash.

## BIRINCHI XABAR SKRIPTI (WhatsApp/DM):
"Salom [Ism aka/opa]! Men [Sizning ismingiz], MoySklad PRO Akademiya. Sizning [KANAL/BLOG] auditoriyangiz bilan hamkorlik qilmoqchi edim — bizneslar uchun MoySklad kursi haqida. Bepul seminarimiz [SANA] da bo'ladi. 5 daqiqa qo'ng'iroq qilishim mumkinmi bugun yoki ertaga?"

## Yuborishdan oldin:
1. Ularning oxirgi 3-5 postini o'qing — mavzusini bilib oling
2. Xabarda ularning kontentiga mos reference qiling
3. Taklif PDF ni biriktirib yuboring

## Kuzatish (Follow-up) jadval:
| Kun | Kim | Xabar holati | Javob | Qo'ng'iroq vaqti
| T-24 | Hamkor 1 | Yuborildi | — | —
| T-24 | Hamkor 2 | Yuborildi | — | —
...

## Agar javob yo'q bo'lsa (2 kun o'tsa):
"Salom! Avvalgi xabarimni ko'rdingizmi? Qisqacha aytganda — sizning auditoriyangizga foydali hamkorlik taklifi bor. Qulayingizmi?"

⚠️ Bir vaqtda barchaga yubormang — 2 ta yuboring, javob kuting, keyin davom eting`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f1-t23-1', phaseId: 1, subModuleId: '1.5', day: -23,
    title: 'Hamkorlar bilan qo\'ng\'iroq o\'tkazish',
    description: `## Maqsad
Kamida 3 ta hamkor bilan 10 daqiqalik qo'ng'iroq — kelishuv tafsilotlarini aniqlash.

## QO'NG'IROQ SKRIPTI (10 daqiqa):

KIRISH (1 daqiqa):
"Salom [Ism]! Taklifni ko'rdingizmi? Qisqacha tushuntirsam — [30 soniyada seminar haqida]. Sizning [KANAL/BLOG] bilan bu hamkorlik har ikki tomonga foydali bo'ladi deb o'ylayman."

SAVOL (2 daqiqa):
"Sizning auditoriyangiz asosan qaysi biznes turi? Do'kon egalari ko'pmi yoki marketplace?"
→ Javobga qarab qaysi ICP bilan mos ekanligini ayting

TAKLIF TANLASH (3 daqiqa):
"Ikki variant bor — komissiya yoki barter. Qaysi biri sizga qulayroq?"
→ Agar komissiya: "Har kurs sotuvidan $300 — o'tgan oyda X ta kurs sotganmiz"
→ Agar barter: "Biz sizga [MAVZU] vebinar o'tkazamiz, siz postlarni chiqarasiz"

TAFSILOTLAR (3 daqiqa):
"Kelishilsa — bizdan 3 ta tayyor post matni va rasm beramiz, siz faqat chiqarasiz."
"Post sanalar: [T-15], stories [T-10 dan T-3]"
"Promo-kod: Sizning ismingiz — masalan KANAL20"

YAKUNLASH (1 daqiqa):
"Shartnomani WhatsApp orqali yuborsam imzolaysizmi?"

## Kuzatish Google Sheets da:
| F ustun: Status | G ustun: Kelishuv turi | H ustun: Post sanalar | I ustun: Promo-kod`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'hamkor',
  },
  {
    id: 'f1-t22-1', phaseId: 1, subModuleId: '1.5', day: -22,
    title: '2 ta hamkor bilan shartnoma imzolash',
    description: `## Maqsad
Og'zaki kelishuvni rasmiylashtirish — "Ha" degan hamkorlar endi "yo'q" deya olmaydi.

## Hamkor shartnomasi (oddiy, 1 sahifa):

TARKIB:
1. Taraflar: [Kompaniya] va [Hamkor ismi/kanali]
2. Predmet: "[SANA] seminar uchun reklama hamkorligi"
3. Hamkor majburiyatlari:
   → [SANA] gacha 1 ta Instagram post (matn va rasmni biz beramiz)
   → [T-10] dan [T-3] gacha 2-3 ta stories
   → Telegram kanalga 1 ta post (agar mavjud bo'lsa)
4. Bizning majburiyatimiz:
   → Komissiya modeli: Promo-kod orqali kelgan har kurs sotuvidan 20%
   → Barter modeli: [SANA] gacha [MAVZU] vebinar
5. To'lov: Kurs sotuvlari tugagandan 7 kun ichida (agar komissiya)
6. Imzo: Ikki taraf

## Imzolash usullari:
→ Telefon: Hujjatni PDF da yuboring, screenshot + "Ha" xabari yetarli
→ E-imzo: IMZO.uz orqali rasmiy
→ Yuzma-yuz: Zalda seminar kuni oldidan ham bo'ladi

## Imzolangandan keyin:
☐ Google Sheets F ustun: "Shartnoma imzolandi [sana]"
☐ Har hamkorga tayyor post matn va rasmlarni yuboring
☐ Promo-kod yarating va yuboring (misol: HAMKOR20)
☐ Post chiqarish sanalarini eslatma qo'ying (telefon kalendariga)

💡 Maqsad: Kamida 2 hamkor — agar 3 ta bo'lsa, bu bonus!`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'hamkor',
  },

  // ══════════════════════════════════════════
  // FAZA 2 — MASHINA YIG'ISH (T-20 dan T-11)
  // Maqsad: 200 lid to'plash mashinalari tayyor bo'lsin
  // ══════════════════════════════════════════

  // 2.1 Landing Sayt + Besplatnik funnel
  {
    id: 'f2-t20-1', phaseId: 2, subModuleId: '2.1', day: -20,
    title: 'Besplatnik lead magnet tayyorlash (200 lid uchun yem)',
    description: `## Maqsad
200 lead to'plash uchun birinchi qadam — bepul qiymat bering, aloqa oling. Besplatnik = tripwire seminar oldidan qiziqishni aniqlash filtri.

## BESPLATNIK NIMA BO'LADI:
Variant 1 (eng yaxshi): Bepul Telegram mini-vebinar
→ Mavzu: "MoySklad: 30 daqiqada 3 ta pul oqishini toping"
→ Vaqt: [SANA] 19:00 — T-15 da (seminardan 15 kun oldin)
→ Format: Telegram Live yoki Zoom, yozib olinadi
→ Natija: 300+ kishi yoziladi → 200 si to'lab seminar boradi

Variant 2: Bepul PDF checklist
→ Nom: "27 ta halokatli MoySklad xato — va ularni 5 daqiqada qanday aniqlash"
→ 7-10 sahifa, professional dizayn Canva da
→ Har sahifada 1 xato + tekshirish usuli + Moysklad screenshot

## BESPLATNIK uchun LANDING tuzilmasi (Tilda da):
1. Hook sarlavha: "MoySklad ishlatayotganmisiz? Bu 27 xato sizning pulingizni yebyapti"
2. Nima olasiz: 3 ta bullet (har biri 1 qator)
3. Forma: Ism + Telefon + "Biznes turi" (dropdown: Chakana/Marketplace/Optovik)
4. Tugma: "Bepul olish →"
5. Rahmat sahifasi: "WhatsApp ga [link] — shu yerda bekiting"

## Google Sheets bilan ulash:
1. Tilda → Settings → Integrations → Google Sheets
2. Yangi sheet: "Leads T-20" ochish
3. Ustunlar: A=Ism, B=Telefon, C=Biznes turi, D=Sana, E=Manba, F=Status

## Status mezonlari (F ustun):
→ Yangi — hali murojaat qilinmadi
→ Murojaat qilindi — qo'ng'iroq/xabar yuborildi
→ Tasdiqlandi — seminar uchun 600k to'ladi
→ Rad etdi — sababni yozing`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'trafik',
  },
  {
    id: 'f2-t20-2', phaseId: 2, subModuleId: '2.1', day: -20,
    title: 'Seminar landing sahifasini qurish (Tripwire)',
    description: `## Maqsad
600,000 so'm to'lov = tripwire. Bepul lead magnit (besplatnik) dan keyin bu sahifaga yo'naltiriladi. Faqat jiddiy odamlar qoladi.

## URL: moysklad-seminar.uz yoki moyskladpro.uz/seminar

## LANDING TUZILMASI (Tilda, 7 blok):

BLOK 1 — HERO (birinchi ekran):
Sarlavha: "MoySklad PRO Akademiya: Biznesingizdagi 3 ta pul oqishini 90 daqiqada toping"
Subtitr: "[SANA], soat 10:30, [ZAL MANZILI] — faqat 200 joy"
Tugma: "Joyni band qilish — 600,000 so'm →"
Rasm: Mentorning professional portret + Moysklad logo

BLOK 2 — KIM UCHUN (3 ta ICP):
"Bu seminar siz uchun agar..."
→ 🏪 3+ do'koningiz bor va har birining qoldig'i boshqa ko'rsatadi
→ 📦 Marketplace da sotasiz va oversell jarima yeb qolgansiz
→ 📊 Omborda 500+ SKU bor va inventarizatsiya haftalar davom etadi

BLOK 3 — NIMA OLASIZ:
90 daqiqada:
→ Jonli DEMO — mentorning telefonida 4 ta do'kon real vaqt
→ 3 ta real keys — kimlar qancha pul yo'qotdi va qanday topdi
→ TOP-7 og'riq yechimi — sizning biznesingizga mos

BLOK 4 — TRIPWIRE NARX BLOK:
"Kirish: 600,000 so'm — bu qaytarilmaydi, lekin..."
→ Kurs olsangiz: 600,000 so'm kurs narxidan ayriladi
→ Bepul emas, chunki: pul to'lagan kishi e'tibor bilan tinglaydi
→ Faqat [SANA] uchun — keyingi seminar 3 oydan keyin

BLOK 5 — MENTOR HAQIDA:
Foto + 3 ta fakt:
→ X yil MoySklad implementatsiya tajribasi
→ Y ta mijozga MoySklad yo'lga qo'yildi
→ KASBURG rasmiy sherik/sertifikat

BLOK 6 — KAFOLAT:
"48 soatgacha to'liq qaytarish — hech qanday savol yo'q"

BLOK 7 — TO'LOV FORMA:
Ism + Telefon + Click/Payme to'lov tugmasi
Rahmat sahifasi: Telegram guruhga link + eslatma

## MUHIM: Forma → Google Sheets avtomatik ulash!`,
    assignee: 'assistent', status: 'pending', xpReward: 100, category: 'trafik',
  },
  {
    id: 'f2-t20-3', phaseId: 2, subModuleId: '2.1', day: -20,
    title: 'Telegram isitish kanali va bot sozlash',
    description: `## Maqsad
Leads landing dan keyin Telegram ga o'tadi — bu erda 20 kun davomida isitish (progrev) bo'ladi. Bot = avtomatik javoblar.

## TELEGRAM KANALI:
Nomi: "MoySklad PRO Akademiya" yoki "MoySklad Diagnostika"
Tavsif: "Biznes egalar uchun — har kuni 1 ta foydali MoySklad hiyla"
Kanal turi: Ommaviy (public) — kanalga obuna bo'lish mumkin
Qoida xabari (pin): "Bu kanalda hар kuni MoySklad bo'yicha amaliy maslahat. Seminar haqida @[bot_username] ga yozing"

## TELEGRAM BOT (@BotFather orqali):
1. @BotFather ga /newbot yozing
2. Nom: "MoySkladPRO Bot"
3. Username: @moyskladpro_bot (yoki shunga o'xshash)
4. Token oling — saqlang

## BOT AVTOMATIK XABARLAR (n8n yoki @Botmother orqali):

Trigger 1: Yangi obunachilar
→ Darhol: "Salom [Ism]! Kanalga xush kelibsiz. Sizning biznesingiz qaysi turga kiradi? 1) Do'kon tarmog'i 2) Marketplace 3) Optoviy"
→ Javobga qarab: segment tag qo'ying (A/B/C)

Trigger 2: Har kuni 09:00 (avtomatik):
T-20: "Hush kelibsiz! 27 ta xato PDF: [link]"
T-18: "Savol: Qoldiqni qanday kuzatayapsiz? 1)Excel 2)Moysklad 3)Boshqa"
T-15: "[BESPLATNIK VEBINAR] bugun 19:00 — link shu yerda: [link]"
T-10: "Seminar [SANA] — 200 joy. Joyni band qiling: [link]"
T-7: "Faqat 80 joy qoldi — [link]"
T-3: "3 kun qoldi — Ism va telefon yozing, biz qo'ng'iroq qilamiz"
T-1: "ERTAGA! [Manzil]. Siz ro'yxatdamisiz?"

## Qayerda sozlash:
→ @Botmother — kodssiz bot yaratish (rekomendasiya)
→ n8n.io — murakkab avtomatsiya (agar developer bo'lsa)
→ ManyChat — Instagram + Telegram bir joyda`,
    assignee: 'assistent', status: 'pending', xpReward: 60, category: 'trafik',
  },

  // 2.2 Kontent S'yomka
  {
    id: 'f2-t19-1', phaseId: 2, subModuleId: '2.2', day: -19,
    title: '18 ta Reels skriptini yozish (3 seriya)',
    description: `## Maqsad
18 ta tayyor skript — s'yomka kuni faqat o'qib aytiladi. Har biri 30-60 soniya.

## FORMAT (har Reels uchun):
Hook (0-3s) → Muammo/fakt (3-20s) → Yechim/demo (20-50s) → CTA (50-60s)
CTA: "DIAGNOSTIKA deb yozing — link olasiz" (ManyChat trigger)

## SERIYA 1 — OG'RIQ (Reels 1-6):

Reels 1: "3 mln yo'qoldi"
Hook: "Do'koningizda 3 mln so'mlik tovar yo'qolishi mumkin — siz bilmasdan"
Mazmun: Inventarizatsiyasiz ishlash → tovar yo'qoladi → bilib bo'lmaydi
CTA: "Sizning do'kongizda qancha yo'qolgan? DIAGNOSTIKA deb yozing"

Reels 2: "Kassir o'g'irligi 3 sxema"
Hook: "Kassir sizdan pul o'g'irlayapti — lekin qanday?"
Mazmun: Sxema 1: Smena yopilganda 50k qo'shish. Sxema 2: Qaytarishda naqd olish. Sxema 3: Do'sti kelsa chegirma qilish
CTA: "Moysklad bularni qanday ushlaydi? KASSIR deb yozing"

Reels 3: "Excel = qul"
Hook: "Exceldа hisob yuritayotgan bo'lsangiz — bu kо'ring"
Mazmun: Excel: 2 soat kiritish → xato → qayta kiritish / Moysklad: telefon skan → 2 soniya
CTA: "Necha soat tejaysiz? HISOB deb yozing"

Reels 4: "WB to'lovni blokladi"
Hook: "Wildberries 14 kunlik to'lovingizni blokladi — bilasizmi nima uchun?"
Mazmun: Oversell → WB jarima → to'lov bloklanadi → qo'lda sinxron yo'q edi
CTA: "Bu bo'lmasligi uchun — WILDBERRIES deb yozing"

Reels 5: "Inventarizatsiya 3 kun → 47 daqiqa"
Hook: "Inventarizatsiya 3 kun davom etadi — 47 daqiqaga tushirish mumkin"
Mazmun: Eski usul: barcha narsa qo'lda → yangi usul: barcode skan + Moysklad
CTA: "Qanday qilishni ko'rsataymi? INVENTAR deb yozing"

Reels 6: "Soliqchi keldi — chek yo'q"
Hook: "Soliq inspektori keldi. Kassа cheklari yo'q. 17 mln jarima."
Mazmun: Real keys → Moysklad avtomatik chek generatsiyasi
CTA: "Bundan himoyalanish — SOLIQ deb yozing"

## SERIYA 2 — DEMO (Reels 7-12):

Reels 7: "4 ta do'kon 1 telefondan"
Hook: "Mana mening telefonim — 4 ta do'kon qoldig'i jonli"
Format: Ekran yozuvi — Moysklad app → har do'kon → real raqamlar

Reels 8: "WB zakaz 14 soniyada"
Hook: "Ozon zakaz keldi — Moyskladga tushdi — Telegram ga keldi — 14 soniya"
Format: Real-time demo, stopwatch ko'rinadi

Reels 9: "Kassir nazorat jonli"
Hook: "Kassir hozir pul olayaptimi? Telefonda ko'raylik"
Format: Kassа monitoring — real tranzaksiyalar

Reels 10: "Inventarizatsiya telefon bilan"
Hook: "Barcode skan → qoldiq yangilandi → 2 soniya"
Format: Hands-on demo omborda

Reels 11: "Buxgalter hisoboti 1 bosish"
Hook: "Buxgalterga oylik hisobot — 1 ta tugma"
Format: Excel export demo — 30 soniyada tayyor

Reels 12: "Marketplace sinxron avtomatik"
Hook: "WB + Ozon + Uzum — hammasi 1 ta qoldiqdan"
Format: Sinxronizatsiya demo

## SERIYA 3 — ISHONCH (Reels 13-18):

Reels 13-15: Mijoz otzivlari (3 ta segment uchun 1 tadan)
Format: Suhbat uslubi — "Oldin nima edi? → Hozir nima?"

Reels 16: Mentorning tajribasi
"X yil, Y ta mijoz, Z ta implementatsiya"

Reels 17: Seminar haqida anons
"[SANA] — 200 joy — 600,000 so'm — nima bo'ladi"

Reels 18: Urgency
"Faqat [X] joy qoldi — keyingi seminar 3 oydan keyin"

## CTA TEKSTI (ManyChat trigger so'zlari):
DIAGNOSTIKA → besplatnik link
KASSIR → kassir nazorat bo'yicha PDF
INVENTAR → inventar checklist
WILDBERRIES → marketplace guide
SOLIQ → soliq tekshirish guide
SEMINAR → seminar ro'yxatdan o'tish linki`,
    assignee: 'mentor', status: 'pending', xpReward: 120, category: 'kontent',
  },
  {
    id: 'f2-t18-1', phaseId: 2, subModuleId: '2.2', day: -18,
    title: 'S\'yomka muhiti va Stories shablonlarini tayyorlash',
    description: `## S'yomka muhiti:
☐ Fon: Oq devor yoki ofis (kitob/laptop ko'rinishi yaxshi)
☐ Yorug'lik: Ring light (ikkita bo'lsa eng yaxshi — old va yon)
☐ Kamera: Telefon (iPhone 12+ yoki Samsung S21+) horizontal 9:16
☐ Tripod yoki telefon tutgich (qo'l titramaydi)
☐ Kiyim: 2 ta professional ko'ylak (rang: qora, ko'k, yashil — oq EMAS)
☐ Ilovalar: CapCut (montaj) + Teleprompter Pro (skript o'qish)

## Ekran yozuvi uchun:
☐ Moysklad ilovasi loginga kirilgan va real ma'lumotlar bor
☐ Telefon ekranini boshqa telefondan yozib olish yoki DU Recorder

## STORIES SHABLONLARI (30 ta Canva da):
Hajm: 1080x1920 px

Shablon 1-5: SAVOL stories (polling)
→ "Qoldiqni qayerda yuritasiz?" [Excel ● Moysklad ● Boshqa]
→ "Inventarizatsiya necha kun oladi?" [1 kun ● 3 kun ● 1 hafta]
→ "Kassirga ishonasizmi?" [Ha ● Yo'q ● Bilmayman]
→ "Marketplace jarimasi bo'lganmi?" [Ha ● Yo'q]
→ "Oyiga qancha vaqt hisob-kitobga sarflaysiz?" [1-5s ● 5-10s ● 10s+]

Shablon 6-10: COUNTDOWN stories
→ "[X] kun qoldi — fon: qora, matn: oltin"
→ Countdown stiker + "Joyni band qil" tugmasi
→ Real registratsiya soni ko'rsatish: "147 kishi allaqachon"

Shablon 11-15: SOCIAL PROOF stories
→ Screenshot mijoz xabarlari (ruxsat bilan)
→ "Bu haftada X ta yangi ro'yxatdan o'tdi"
→ Zal fotosi (oldingi seminar bo'lsa)

Shablon 16-20: FOYDA stories (1 foyda = 1 story)
→ "Qoldiq nazorati — real vaqt"
→ "Kassir monitoring — 24/7"
→ "Marketplace sinxron — avtomatik"

Shablon 21-25: MENTOR stories
→ Ish jarayonidan foto/video
→ Mijoz bilan suhbat kadrlar
→ "Bugungi maslahat" series

Shablon 26-30: URGENCY stories (isitish oxirida)
→ "Faqat X joy qoldi"
→ "Oxirgi 48 soat"
→ "Guruh to'ldi — keyingi [SANA]"`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f2-t18-2', phaseId: 2, subModuleId: '2.2', day: -18,
    title: 'S\'yomka Kun 1: Reels 1-9 (Og\'riq + Demo)',
    description: `## Reja (8 soat):

09:00-10:00 — Muhit tayyorlash
☐ Ring light yoqildi, devor foni tozalandi
☐ Kiyim tayyorlandi (2 ta variant)
☐ Teleprompter ilova ochildi, skriptlar kiritildi
☐ Moysklad ilovasi loginlangan

10:00-13:00 — Reels 1-6 s'yomka (Og'riq seriyasi)
→ Har reels uchun: skriptni bir marta o'qish → yozish → ko'rish → qabul yoki qayta
→ Har reels 3-5 ta urinish normaldir
→ Yaxshi kadrlarni "SAQLANGAN" papkaga ko'chiring

13:00-14:00 — Tushlik tanaffus

14:00-17:00 — Reels 7-9 s'yomka (Demo seriyasi)
→ Ekran yozuvi boshqacha — boshqa telefon kerak
→ Real-time demo: Moysklad app ochiq, haqiqiy raqamlar ko'rinadi
→ "Stop motion" emas — haqiqiy jarayon ko'rsatiladi

17:00-18:00 — Ko'rib chiqish
☐ Har 9 videoni bir marta ko'rish
☐ Qayta olish kerak bo'lganlarni belgilash
☐ Asistent: fayllarni laptop ga ko'chirish

## Muvaffaqiyat mezoni:
☐ 9 ta video yozib olindi
☐ Har bir hook 3 soniya ichida e'tiborni tortadi
☐ Ovoz aniq eshitiladi, fon shovqini yo'q`,
    assignee: 'mentor', status: 'pending', xpReward: 100, category: 'kontent',
  },
  {
    id: 'f2-t17-1', phaseId: 2, subModuleId: '2.2', day: -17,
    title: 'S\'yomka Kun 2: Reels 10-18 + Montaj hammasi',
    description: `## Reja (8 soat):

09:00-12:00 — Reels 10-18 s'yomka (Demo + Ishonch seriyasi)
→ Reels 10-12: Ekran yozuvli demolar (Faza 1 da yig'ilgan real ma'lumotlar)
→ Reels 13-15: Mijoz otzivlari (oldindan kelishilgan 3 ta mijoz bilan)
→ Reels 16-18: Mentor + seminar anons

12:00-13:00 — Tushlik

13:00-17:00 — Montaj: CapCut bilan

MONTAJ QOIDALARI (har Reels):
1. Intro: Ism yoki branding yo'q — to'g'ridan-to'g'ri hook dan
2. Subtitr: Avtomatik CapCut subtitr → har so'z ustida tekshirish
3. Hook overlay: 1-soniyada sariq yoki qizil rang bilan asosiy so'z
4. Musiqa: Background -20dB (ovoz ustun bo'lsin)
5. Branding: Oxirgi 3 soniyada logo + "DIAGNOSTIKA deb yozing"
6. Eksport: 1080x1920, 30fps, MP4

STORIES MONTAJ:
→ Canva shablonlarga matn va stiker qo'yish
→ 30 ta stories → Google Drive "Stories" papkasiga saqlash

17:00-18:00 — Yakunlash
☐ Barcha 18 ta Reels eksport qilindi
☐ Har biri Google Drive "Reels" papkasiga nomi bilan saqlandi
☐ Caption va teglar yozildi (har Reels uchun alohida Google Doc)

## Caption tuzilmasi (har Reels uchun):
1-qator: HOOK so'zi katta harflarda
2-5 qator: Mazmun + foydali ma'lumot
6-qator: CTA — "DIAGNOSTIKA deb yozing 👇"
Teglar (5-7 ta): #moysklad #biznes #tadbirkor #do'kon #warehouse`,
    assignee: 'assistent', status: 'pending', xpReward: 150, category: 'kontent',
  },

  // 2.3 Avtomatika — ManyChat + Telegram Bot + WhatsApp
  {
    id: 'f2-t16-2', phaseId: 2, subModuleId: '2.3', day: -16,
    title: 'ManyChat Instagram avtomatsiyasini sozlash',
    description: `## Maqsad
Instagram comment va DM ga "DIAGNOSTIKA" yozgan har kim avtomatik link oladi — hech kim qo'ldan tushib qolmaydi.

## MANYCHAT KETMA-KETLIGI:

TRIGGER 1: "DIAGNOSTIKA" so'zi (comment yoki DM)
→ Darhol DM: "Salom! Besplatnik linkingiz: [BESPLATNIK LANDING]
Shu joydan ro'yxatdan o'tib, Telegram guruhimizga qo'shiling 👇"
→ 5 daqiqadan keyin: "Ro'yxatdan o'tdingizmi? Ha / Yo'q"
→ "Ha" → "Ajoyib! [SANA] da seminar haqida xabar beramiz"
→ "Yo'q" → "Muammo bo'ldimi? Link: [BESPLATNIK LANDING]"
→ 1 kundan keyin: "Seminar [SANA] da — 600,000 so'm — joy qoldi. Qiziqasizmi?"

TRIGGER 2: "KASSIR" so'zi
→ Darhol: "Kassir nazorat PDF: [LINK]. 3 ta sxemani o'z ichiga oladi"

TRIGGER 3: "WILDBERRIES" yoki "WB" so'zi
→ Darhol: "Marketplace jarima oldinlash guide: [LINK]"

TRIGGER 4: "SEMINAR" so'zi
→ Darhol: "Seminar [SANA] — 600,000 so'm. Ro'yxat: [SEMINAR LANDING]"

## BROADCAST xabarlari (ManyChat Broadcasts):
T-15 kuni barcha leadlarga: "Bugun 19:00 bepul vebinar! Link: [link]"
T-10 kuni: "10 kun qoldi! Faqat [X] joy: [link]"
T-5 kuni: "5 kun qoldi — [X] joy"
T-2 kuni: "48 soat qoldi. Ertaga oxirgi kun"

## Sozlash qadamlari:
1. manychat.com → Instagram akkauntni ulash
2. Automation → Keywords → "DIAGNOSTIKA" qo'shing
3. Har trigger uchun oqim (flow) yarating
4. Test: o'z telefoningizdan "DIAGNOSTIKA" deb yozing
5. Broadcast jadvalini sozlang`,
    assignee: 'assistent', status: 'pending', xpReward: 80, category: 'trafik',
  },
  {
    id: 'f2-t16-3', phaseId: 2, subModuleId: '2.3', day: -16,
    title: 'WhatsApp Business + SMS broadcast sozlash',
    description: `## WHATSAPP BUSINESS SOZLASH:

TIZ JAVOBLAR (3 ta):
1. "Joy bormi?" →
"Ha, [SANA] uchun joylar bor! 200 kishilik seminar — 600,000 so'm.
Ro'yxat: [SEMINAR LANDING LINK]
Savollar bo'lsa shu yerda yozing 👇"

2. "Manzil?" →
"📍 [ZAL NOMI], [TO'LIQ MANZIL]
Yaqin metro: [METRO NOMI]
Google Maps: [LINK]
Parking: bepul"

3. "Narx?" yoki "Qancha?" →
"Seminar kirish: 600,000 so'm (qaytariladi agar kurs olsangiz)
Akademiya kursi: $1,500 — faqat seminar kuni
To'lov: Click yoki Payme: [LINK]"

## WHATSAPP STATUS (har kuni yangilang):
T-20: "200 joy ochildi — [SANA] seminar"
T-15: "[X] joy qoldi"
T-10: "Faqat 100 joy!"
T-5: "50 joy! Tez bo'ling"
T-1: "ERTAGA! Oxirgi soatlar"

## SMS broadcast (Eskiz.uz yoki UniSender):
Kimga: besplatnik formani to'ldirganlar + eski bazadan biznes egalar
Matn (SMS 160 belgi):
"[Ism], MoySklad seminar [SANA] Toshkentda. 600,000so'm. Joy: [link] yoki 90-XXX-XX-XX"
Budget: 500 ta SMS × 250 so'm = 125,000 so'm`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'trafik',
  },

  // 2.4 Target Reklama
  {
    id: 'f2-t15-1', phaseId: 2, subModuleId: '2.4', day: -15,
    title: 'Meta Ads: 3 kampaniya va Pixel sozlash',
    description: `## Maqsad
Reklama orqali kamida 100 ta lead topish. Jami budget: $600 (20 kun × $30/kun)

## META PIXEL:
1. Meta Business Suite → Events Manager → Create Pixel
2. Tilda saytga pixel kodini qo'yish (Header section)
3. Pixel test: Chrome extension "Meta Pixel Helper" bilan tekshirish
4. Quyidagi eventlar aktiv bo'lishi kerak:
→ PageView (har sahifa ochilganda)
→ Lead (forma to'ldinganda)
→ Purchase (600k to'langanda)

## KAMPANIYA 1 — BESPLATNIK uchun Lead Gen:
Maqsad: Conversions → Lead
Auditoriya: Maxsus (sozlash quyida)
Kreativ: Reels 1 (Og'riq seriyasi — "3 mln yo'qoldi")
Budget: $15/kun
Maqsad: CPL < $5 (har lead 5 dollardan arzon)

## KAMPANIYA 2 — RETARGET (isiq auditoriya):
Maqsad: Conversions → Lead
Auditoriya: Sahifamizni ko'rganlar (30 kun) + Reels 3+ son ko'rganlar
Kreativ: Reels 7 (Demo) yoki testimonial
Budget: $10/kun
Maqsad: CPL < $3

## KAMPANIYA 3 — LOOKALIKE:
Maqsad: Conversions → Lead
Auditoriya: Pixel Lead eventidan lookalike 1-3%
Kreativ: Reels 5 (Inventarizatsiya)
Budget: $15/kun

## AUDITORIYA SOZLASH (Kampaniya 1 uchun):
→ Joylashuv: O'zbekiston (barcha shaharlar)
→ Yosh: 25-50
→ Jinsi: Hammasi
→ Qiziqishlar (hech bo'lmaganda 5 ta):
   - "1C: Buxgalteriya"
   - "Wildberries seller"
   - "Uzum Market"
   - "Tadbirkorlik"
   - "Inventarizatsiya"
   - "Kichik biznes"
   - "Savdo boshqaruvi"
→ Xulq: Biznes sahifasi egalari

## KREATIVLAR:
Kreativ A: Reels 1 video (og'riq) → shu Reels ni to'g'ridan-to'g'ri boost qilish
Kreativ B: Karusel (5 rasm): "5 ta sabab Moysklad zarur" — har rasmda 1 sabab
Kreativ C: Stories: "DIAGNOSTIKA deb yozing" — 15 soniya

## Monitoring (har 2 kunda tekshirish):
| Kampaniya | Xarajat | Lead soni | CPL | Status
| Lead Gen | — | — | — | Aktiv
| Retarget | — | — | — | Aktiv
| Lookalike | — | — | — | Aktiv`,
    assignee: 'targetolog', status: 'pending', xpReward: 100, category: 'trafik',
  },
  {
    id: 'f2-t14-1', phaseId: 2, subModuleId: '2.4', day: -14,
    title: 'Reklama kreativlarini test qilib eng yaxshisini aniqlash',
    description: `## A/B Test qoidalari:
1. Bir vaqtda faqat 1 ta o'zgaruvchi test (hook YOKI thumbnail YOKI matn)
2. Har kreativ kamida 1,000 ta reach va 2 kun ishlashi kerak
3. Qaror qilish: CPL eng past va CTR eng yuqori kreativ g'alaba

## TEST 1: Hook (birinchi 3 soniya):
Hook A: "Do'koningizda 3 mln yo'qolishi mumkin" → [kutish]
Hook B: "Kassir sizdan pul olayaptimi?" → [kutish]
Hook C: "Excelda hisob = pul yo'qotish" → [kutish]
→ Eng yaxshi CTR aniqlash → shu hook bilan davom

## TEST 2: Thumbnail (Reels muqovasi):
Thumbnail A: Mentorning yuzini ko'rsatuvchi
Thumbnail B: Moysklad ekranining yiriklashtirilgan skrini
Thumbnail C: Raqamlar: "3,000,000 so'm yo'qoldi"

## MONITORING GOOGLE SHEETS da:
| A | B | C | D | E | F | G
| Kreativ nomi | Reach | Click | CTR% | Lead | CPL | Qaror

## Byudjetni optimallashtirish (T-14 dan):
→ Eng yaxshi kreativ: 60% budget
→ Ikkinchi yaxshi: 30% budget
→ Eng yomon: o'chirish

## Maqsad raqamlar (T-11 gacha):
☐ Jami lead: 50+
☐ CPL o'rtacha: < $6
☐ Eng yaxshi kreativ aniqlangan
☐ Retarget auditoriyasi 500+ kishi to'plangan`,
    assignee: 'targetolog', status: 'pending', xpReward: 70, category: 'trafik',
  },

  // 2.5 Hamkor Kontent + Funnel Test
  {
    id: 'f2-t13-1', phaseId: 2, subModuleId: '2.5', day: -13,
    title: 'To\'liq funnel testlash (A dan Z gacha)',
    description: `## Maqsad
Hamma avtomatsiya va linklar ishlashini tasdiqlash. Bir xato — 200 lead yo'qoladi.

## FUNNEL ZANJIRI:
Instagram Reels → Comment "DIAGNOSTIKA" → ManyChat DM → Besplatnik landing → Forma → Google Sheets ✓ → Rahmat sahifa → Telegram guruh link → Bot xabar

## TEST QADAMLARI (o'z telefoningizdan):
1. Instagram → Reels 1 ni oching → "DIAGNOSTIKA" deb comment yozing
→ Natija: DM kelishi kerak (max 30 soniya)

2. DM dagi linkni bosing
→ Natija: Besplatnik landing ochilishi kerak

3. Formani to'ldiring (test ma'lumotlar bilan)
→ Natija: Google Sheets ga tushishi kerak (F2 katakka qarang)

4. Rahmat sahifasidagi Telegram linkni bosing
→ Natija: Telegram kanalga olib borishi kerak

5. Telegram kanalga qo'shilganingizdan keyin
→ Natija: Bot darhol salom xabari yuborishi kerak

6. Seminar landing tekshirish:
→ To'lov tugmasini bosing (Click/Payme)
→ 1,000 so'm test to'lov qiling
→ Google Sheets "Tasdiqlangan" tab ga tushishi kerak

## Muammolar va yechimlar:
| Muammo | Sabab | Yechim
| DM kelmadi | ManyChat o'chirilgan | Recheck ManyChat dashboard
| Sheets ga tushmadi | Integration uzilgan | Tilda → re-connect Google Sheets
| Bot xabar bermadi | Trigger xato | @BotFather → webhook tekshirish
| To'lov ishlamadi | Link xato | Click dashboard → test payment

## Tekshirish natijasi:
☐ Barcha 6 qadam to'g'ri ishladi
☐ Google Sheets real-time yangilanmoqda
☐ Bot xabarlar kelyapti
☐ To'lov tizimi ishlayapti`,
    assignee: 'jamoa', status: 'pending', xpReward: 60, category: 'trafik',
  },
  {
    id: 'f2-t12-1', phaseId: 2, subModuleId: '2.5', day: -12,
    title: 'Hamkorlar uchun tayyor post paketini tayyorlash',
    description: `## Maqsad
Har hamkorga "tayyor paket" berish — ular faqat "Publish" tugmasini bosadi.

## HAR HAMKOR UCHUN PAKET TARKIBI:

📦 1. Instagram POST MATNI (ular uslubida, biz tayyorlaymiz):
Hajm: 150-200 so'z
Tuzilma: Muammo → Siz ham shunday → Yechim → Link

Namuna (Buxgalter blogger uchun):
"Do'konida 5 yillik ish tajribam bor, lekin bir narsani kech bilib oldim...
Moysklad to'g'ri sozlanmasa — inventarizatsiya, kassir, soliq — hammasi qo'lda.
Men tanishimning seminari borligini bilganimda bir darhol ro'yxatdan o'tdim.
[SANA], Toshkentda. 600,000 so'm. 200 joy.
Link bio da 👆 yoki: [SEMINAR LINK]
P.S. Men ham bo'laman — ko'rishguncha!"

📦 2. STORIES MATNLARI (5 ta):
Story 1: "Kim Moyskladni noto'g'ri ishlatmoqda — bu qo'lini ko'tarsin 🙋"
Story 2: Swipe up yoki link stiker: "[SANA] seminar — [LINK]"
Story 3: Countdown stiker + "Faqat X joy qoldi"
Story 4: Poll: "Inventarizatsiya muammo bormi? Ha/Yo'q"
Story 5: Oxirgi kun: "Bu link bugun kechgacha ishlaydi 🔥"

📦 3. TELEGRAM POST:
200 so'z, rasmiy uslub, havolasi bilan

📦 4. PROMO KOD:
Har hamkorning individual kodi (masalan: BUXGALTER20)
→ Bu kod orqali to'lovda 5% chegirma (hamkorga ishonch uchun)
→ Tracking: Google Sheets "Hamkorlar" tab

📦 5. RASM/VIDEO:
→ Seminar flyeri (Canva da mentor foto + sana + manzil)
→ Hamkorlar uchun maxsus "kollab" variant

## Chiqarish jadvali:
| Hamkor | Instagram post | Stories | Telegram | Promo kod
| Hamkor 1 | T-15 | T-12 dan T-5 | T-14 | HAMKOR1-20
| Hamkor 2 | T-12 | T-9 dan T-3 | T-11 | HAMKOR2-20`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'hamkor',
  },
  {
    id: 'f2-t11-1', phaseId: 2, subModuleId: '2.5', day: -11,
    title: 'Faza 2 yakunlash — 50+ lead va mashina tayyor',
    description: `## Maqsad
Faza 2 ning barcha mashinalari ishga tushdi va birinchi natijalar keldi.

## TEKSHIRISH RO'YXATI:

📋 2.1 Landing:
☐ Besplatnik landing ishlaydi (test qilingan)
☐ Seminar landing ishlaydi (to'lov qabul qiladi)
☐ Google Sheets real-time yangilanmoqda
☐ Telegram kanal + bot ishlaydi

📋 2.2 Kontent:
☐ 18 ta Reels tayyor (Google Drive da)
☐ 30 ta Stories shablon tayyor
☐ Caption va teglar yozilgan
☐ Chiqarish jadvali tayyor (qaysi kuni qaysi Reels)

📋 2.3 Avtomatika:
☐ ManyChat: DIAGNOSTIKA triggeri ishlaydi
☐ ManyChat: 5+ kalit so'z triggerlari sozlangan
☐ Telegram bot: xabar bermoqda
☐ WhatsApp: 3 ta tez javob sozlangan
☐ Broadcast jadvali sozlangan

📋 2.4 Target:
☐ Meta Pixel saytda ishlaydi
☐ 3 ta kampaniya aktiv
☐ Kunlik byudjet: $40+
☐ Hozirgi CPL raqami: [___]

📋 2.5 Hamkorlar:
☐ Hamkor 1 paket oldi va tasdiqadi
☐ Hamkor 2 paket oldi va tasdiqladi
☐ Promo kodlar berildi

## KPI HISOBOT:
| Ko'rsatkich | Maqsad | Hozir
| Jami lead | 50+ | [___]
| CPL | < $6 | [___]
| Telegram obunachi | 30+ | [___]
| Seminar to'lovi | 5+ | [___]

⚠️ Agar lead 20 dan kam bo'lsa — reklama byudjetini $20 ga oshiring va eng yaxshi kreativni repeat qiling`,
    assignee: 'jamoa', status: 'pending', xpReward: 100, category: 'trafik',
  },

  // ══════════════════════════════════════════
  // FAZA 3 — ISITISH / PROGREV (T-10 dan T-1)
  // Maqsad: 200 ta ro'yxatdan o'tish, 200 tasdiqlash
  // ══════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // 3.1 KUNLIK KONTENT — Har kun alohida task (T-10 → T-1)
  // Jamoa bu tasklar bo'yicha harakat qiladi, boshqa narsa kerak emas
  // ══════════════════════════════════════════════════════════

  // ──────────────── T-10 (DUSHANBA) ────────────────
  {
    id: 'f3-t10-reels1', phaseId: 3, subModuleId: '3.1', day: -10,
    title: '🎬 T-10 | REELS 1 — "Do\'koningizda 3 mln yo\'qolyapti" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 45–60 soniya
👤 Kim suratga oladi: Assistent kamera ushlab turadi, Mentor gapiradio
🎯 Seriya: OG'RIQ SERIYASI — Reels 1/9

## TAYYORGARLIK (1 soat oldin — 08:00 da)
→ Telefon zaryadlangan (min 80%)
→ Fon: Do'kon yoki ofis — toza, yorqin, ortda tovar ko'rinib tursin
→ Kiyim: Biznes-casual (kok yoki qora ko'ylak, toza)
→ Yorug'lik: Derazaga yuzingizni qarating, ko'lanka bo'lmasin
→ Stabilizator yoki tripod ishlatilsa yaxshi
→ Shovqin yo'q joyda yozing

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya) — telefon ekraniga yaqin, jiddiy yuz:
"Agar do'koningizda inventarizatsiya qilmasangiz — siz har oyda 3 millionni yo'qotasiz."

🎬 MUAMMO (5–25 soniya):
"Kassir chiqib ketdi — pulni olib ketdi. Tovar yozilmadi — farq yo'q.
Yetkazib beruvchi 10 ta olib keldi, siz 8 ta deb bilasiz.
Bu nafaqat pul — bu sizning vaqtingiz, asabingiz."

🎬 YECHIМ (25–40 soniya):
"Men 5 yil MoySklad bilan ishladim. Bitta do'kon egasi 2 million so'm topib oldi — faqat 1 soat ichida.
Boshqasi kassir o'g'irligini 3 kundan keyin emas, real vaqtda ko'rdi."

🎬 CTA (40–55 soniya) — kameraga to'g'ri qara:
"[SANA] kuni bepul 90 daqiqalik seminar o'tkazaman. Faqat 200 joy. Link bioda."

## CAPTION (izoh matni):
"Do'koningizda 3 mln yo'qolyaptimi? 👇
[SANA] — bepul 90 daqiqa, 200 joy
→ Link bioda

#moysklad #dokon #inventarizatsiya #biznes #uzbekiston"

## STORY REMINDER (Reels chiqqandan 2 soat keyin — 11:00):
→ Storiesga Reels ni ulash (Share to Story)
→ Ustiga yozing: "Yangi video — ko'rdingizmi? 👆"
→ Stiker: @username ni tag qiling`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t10-story1', phaseId: 3, subModuleId: '3.1', day: -10,
    title: '📲 T-10 | STORY — Poll: "Qoldiqni qanday yuritasiz?" (13:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 13:00 (tushlik vaqti — odamlar telefonda)
📱 Format: Stories (3 ta ketma-ket story)
⏱ Tayyorlash vaqti: 10 daqiqa (Canva yoki Instagram ichida)
👤 Kim qiladi: Assistent

## STORY 1 — SAVOL (13:00):
→ Fon: Qizil gradient yoki do'kon rasmi
→ Matn (katta, oq): "Do'koningizda qoldiqni qanday yuritasiz?"
→ Pastga Poll stikeri qo'ying:
   [Excel / Google Sheets] vs [Dastur bor] vs [Qo'lda daftar]
→ Kichik matn: "Javob bering — muhim!"

## STORY 2 — INTRIGUE (13:05):
→ Fon: To'q ko'k
→ Matn: "Kecha videoni ko'rdingizmi? 👀"
→ Link stiker: Reels ga (Share → Copy link → Link stiker)
→ Matn pastda: "Ko'rmagan bo'lsangiz — profilda"

## STORY 3 — COUNTDOWN (13:10):
→ Instagram Countdown stikeri qo'ying (seminar sanasiga)
→ Matn: "Seminar [SANA] — [X] kun qoldi"
→ "Eslatma yuboring" tugmasi — followers bosganda eslatma oladi

## TEKSHIRISH (18:00 da):
→ Necha kishi Poll ga javob berdi? (min 30 kishi kerak)
→ Javoblarni screenshot qiling — ertaga story uchun kerak bo'ladi`,
    assignee: 'assistent', status: 'pending', xpReward: 20, category: 'kontent',
  },
  {
    id: 'f3-t10-tg1', phaseId: 3, subModuleId: '3.1', day: -10,
    title: '📢 T-10 | TELEGRAM — PDF besplatnik tarqatish (19:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 19:00
📱 Format: Telegram kanal posti (matn + fayl)
⏱ Tayyorlash vaqti: 15 daqiqa
👤 Kim qiladi: Assistent

## POST MATNI (to'liq nusxa):

"📊 BEPUL: Do'kon egalariga — 'MoySklad boshlanish qo'llanmasi'

Ichida:
✅ 5 ta eng ko'p uchraydigan muammo + yechim
✅ Kassir nazorat checklist (10 ta savol)
✅ Inventarizatsiya rejasi (shablon)
✅ Moysklad sozlash — 1-kun nima qilish kerak

👇 Yuklab oling (bepul, 14 sahifa)"

→ PDF faylni biriktirib yuboring (fayl nomi: moysklad-boshlash.pdf)

## PDF YARATISH (agar hali yo'q bo'lsa — 1 soat kerak):
Canva → A4 → 14 sahifa:
1. Muqova: "MoySklad Boshlash Qo'llanmasi"
2. Sahifa 2-6: 5 ta muammo va yechim
3. Sahifa 7-10: Kassir checklist
4. Sahifa 11-13: Inventarizatsiya rejasi
5. Sahifa 14: CTA — "Seminar [SANA] → [LINK]"

## MAQSAD:
→ Min 50 ta yuklab olish
→ Bu 50 kishi = isiq lead, seminar uchun alohida kuzatilsin`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'kontent',
  },

  // ──────────────── T-9 (SESHANBA) ────────────────
  {
    id: 'f3-t9-reels2', phaseId: 3, subModuleId: '3.1', day: -9,
    title: '🎬 T-9 | REELS 2 — "Kassir 3 ta sxema bilan o\'g\'irlaydi" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 50–60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: OG'RIQ SERIYASI — Reels 2/9

## TAYYORGARLIK (08:30 da):
→ Prop: Kassa apparati yoki telefon (POS terminal) ko'rsin
→ Fon: Do'kon kassa yoki ofis stoli
→ Kiyim: Kecha bilan bir xil bo'lmasin

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya) — jiddiy, to'g'ri kameraga:
"Kassir sizdan pul o'g'irlashi mumkin — 3 ta yo'l bilan. Va siz bilmaysiz."

🎬 MUAMMO — 3 sxema (5–35 soniya):
"Sxema 1: Chek bermaydi. Mijoz pul to'laydi — kassir kassaga urmaydio. Pul cho'ntagiga.
Sxema 2: Qaytim. Mijoz 100 ming berdi, narx 80 ming. Kassir 30 ming qaytarib beradi.
Sxema 3: Tovar chiqimlaydio — lekin savdosiz. 'Qaytim' deb yozadio. Tovar yo'q, pul yo'q."

🎬 YECHIM (35–48 soniya):
"MoySkladda har bir sotuv — real vaqtda. Kassir o'z nomidan kiradi.
Siz uydan ko'rasiz: hozir qancha sotildi, qancha pul kassa da."

🎬 CTA (48–58 soniya):
"Seminar [SANA] — bu narsalar hammasi jonli ko'rsatiladi. 200 joy. Link bioda."

## CAPTION:
"Kassir sxemalari — bilasizmi? 😨
Bu 3 ta sxema eng ko'p uchraydi 👇
[SANA] seminar — 200 joy bepul
→ Bioda link

#kassir #dokon #moysklad #nazorat #biznes"

## STORY (11:00 — Reels share):
→ Reels ni Storiesga ulash
→ Ustiga: "Bu video kassir sxemalari haqida 😱"
→ Poll: "Sizda shu muammo bo'lganmi?" [Ha ● Yo'q ● Bilmayman]`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t9-story2', phaseId: 3, subModuleId: '3.1', day: -9,
    title: '📲 T-9 | STORY — Kecha poll javoblari + isitish (13:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 13:00
📱 Format: Stories (3 ta ketma-ket)
⏱ Tayyorlash: 15 daqiqa
👤 Kim qiladi: Assistent

## STORY 1 — KECHA POLL NATIJALARI (13:00):
→ Kechagi poll natijalarini ko'rsating (screenshot)
→ Matn: "Kecha [X] kishi javob berdi — [82%] Excel ishlatadi 😅"
→ Kichik: "Bu raqam meni hayratga soldi"

## STORY 2 — MUAMMO KUCHAYTIRISH (13:05):
→ Fon: To'q qizil
→ Katta matn: "Excel da inventarizatsiya = 3 soat ish"
→ Kichik matn: "MoySkladda = 47 daqiqa"
→ Pastda: "Farq: 2 soat 13 daqiqa. Haftalik: 15 soat. Oylik: 60 soat"

## STORY 3 — KUZATIB BORING (13:10):
→ Matn: "Seminar da bu narsalarni jonli ko'ramiz"
→ Countdown stikeri (seminar sanasiga)
→ Link stiker: "Joy bor — band qil → [LINK]"

## TELEGRAM (20:00 — alohida post):
"💡 Mini-maslahat: Excel vs MoySklad
Excel:
❌ Xato kiritish — topilmaydi
❌ Bir vaqtda faqat 1 kishi
❌ Telefonda to'liq ishlamaydi

MoySklad:
✅ Barcha xatolar journal da
✅ 10 kishi bir vaqtda
✅ Telefon + tablet + kompyuter

👉 [SANA] seminar — ko'ramiz: [LINK]"`,
    assignee: 'assistent', status: 'pending', xpReward: 25, category: 'kontent',
  },

  // ──────────────── T-8 (CHORSHANBA) ────────────────
  {
    id: 'f3-t8-reels3', phaseId: 3, subModuleId: '3.1', day: -8,
    title: '🎬 T-8 | REELS 3 — "Excel sizni qulga aylantirdi" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 45–55 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: OG'RIQ SERIYASI — Reels 3/9

## TAYYORGARLIK (08:30 da):
→ Prop: Laptop ochiq, Excel ko'rinib tursin
→ Fon: Ofis stoli yoki uyda ish joyi
→ Ekran: katta Excel jadval ochiq (200+ satr ko'rinsin)

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya) — Excel ko'rsatib:
"Bu faylda 3,000 ta satr bor. Har birini qo'lda kiritdi. Bu — sizning hayotingizmi?"

🎬 MUAMMO (5–30 soniya):
"Do'kon egasi kechasi 23:00 gacha Excel da yozyapti.
Xodimlari uyquda. U hisob qilyapti.
Ertaga yana 07:00 da ishda.
Bu — qullik. Excel siznidan ko'proq biladi deb o'ylaysiz.
Aslida siz Excel ga xizmat qilyapsiz."

🎬 HAYOT BOSHQACHA BO'LISHI KERAK (30–43 soniya):
"Do'kon egasi pul ishlash uchun do'kon ochdi — Excel to'ldirish uchun emas.
Hisob avtomatik — hisobot 1 bosmada — kassir nazorat real vaqtda.
Bu — MoySklad."

🎬 CTA (43–53 soniya):
"[SANA] seminar. Jonli ko'ramiz. 200 joy. Link bioda."

## CAPTION:
"Excel sizni ozod etmaydi — qulga aylantiradi 😤
[SANA] — qutulish yo'li ko'rsatiladi
→ Bioda link

#excel #moysklad #dokonegasi #avtomatlashtirish"

## STORY (12:00):
→ Countdown stikeri: "[X] kun qoldi!"
→ Matn: "T-8: Sekin isitish boshlanmoqda 🔥"
→ Reels ga link stiker`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t8-story-tripwire', phaseId: 3, subModuleId: '3.1', day: -8,
    title: '📲 T-8 | STORY — Tripwire boshlash: "Ertaga katta narsa" (19:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 19:00
📱 Format: Stories (5 ta ketma-ket — tripwire boshlash)
⏱ Tayyorlash: 20 daqiqa
👤 Kim qiladi: Assistent (mentor ovozli video ham bo'lsa yanada yaxshi)

## STORIES (5 ta, ketma-ket):

STORY 1 (19:00) — INTRIGUE:
→ Qora fon, katta sariq matn: "Ertaga 19:00 da — katta anons."
→ Kichik: "3 kun davom etadi. Tayyor bo'ling 👀"
→ Emoji stiker: ⏳

STORY 2 (19:01) — SAVOL:
→ Poll stikeri: "Qoldiq muammoingiz bormi?"
   [Ha, doim! ● Yo'q, hammasi joyida]
→ Matn yuqorida: "Rost javob bering 🙏"

STORY 3 (19:02) — TEASING:
→ Matn: "82% do'kon egasi Excel yoki daftar ishlatadi"
→ Kichik: "Siz qanaqasiz? Ovoz bering 👆"

STORY 4 (19:03) — DM INVITATION:
→ Matn: "Qoldiq muammo bo'lsa — menga DM yozing"
→ Tugma: [DM Yozing] — Quick Reply stikeri ishlatsa bo'ladi
→ Pastda: "Shaxsiy javob beraman"

STORY 5 (19:04) — HOOK for tomorrow:
→ Matn: "Ertaga 19:00 — seminar haqida aytaman. Bu narsa ko'pchilikni hayratda qoldiradi."
→ Countdown stikeri ertangi 19:00 ga

## TELEGRAM (19:30 da):
"Savol: Do'koningizda inventarizatsiya necha kunda bir marta?
🅰 Har kuni
🅱 Haftada bir
🅲 Oyda bir
🅳 Umuman yo'q

Javob bering — bugun yoki ertaga sizga statistika yuboraman."`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'kontent',
  },

  // ──────────────── T-7 (PAYSHANBA) ────────────────
  {
    id: 'f3-t7-reels4', phaseId: 3, subModuleId: '3.1', day: -7,
    title: '🎬 T-7 | REELS 4 — "WB to\'lovni blokladi: 23 mln qaytmadi" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 50–60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: OG'RIQ SERIYASI — Reels 4/9
🎯 Maqsad auditoriya: Wildberries/Ozon sotuvchilar

## TAYYORGARLIK (08:30 da):
→ Fon: Ofis yoki uy, toza
→ Prop: WB personal kabinet ochiq (telefon yoki laptop)
→ Kiyim: Kecha bilan farqli

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya):
"Wildberries 23 million so'mingizni blokladi. Nima qilasiz?"

🎬 KEYS (5–35 soniya):
"Bu mening mijozim bilan bo'ldi. 23 mln blokda.
Sabab: balans to'g'ri hisoblanganda emas.
Tovar chiqdi — lekin MoySkladda qayd etilmadi.
WB da farq bo'ldi — ular bloklaadio.

Boshqa misol: Sotuvchi 10 ta joyladi — 7 ta qaytib keldi.
3 ta qaerda? Hech kim bilmaydi. 3 million — havoda."

🎬 YECHIM (35–48 soniya):
"MoySkladda WB bilan sinxronizatsiya bor.
Har bir mahsulot — real vaqtda kuzatiladi.
Qaytib kelganda — avtomatik kiritiladi.
Blok bo'lmaydi, chunki hamma raqam to'g'ri."

🎬 CTA (48–58 soniya):
"Bu jonli ko'rsataman — [SANA] seminar da. 200 joy. Link bioda."

## CAPTION:
"WB 23 mln ni bloklasa nima qilasiz? 😰
Bu real hodisa — mening mijozim bilan bo'ldi
[SANA] — yechimni jonli ko'ramiz
→ Bioda link

#wildberries #wb #marketplace #moysklad #blokirovka"

## STORY (13:00 — Social Proof):
→ Matn: "Bu haftada [X] kishi ro'yxatdan o'tdi 👏"
→ Screenshot (ismlarsiz) Google Sheets dan
→ Kichik: "Siz ham bormi? → Link bioda"
→ TELEGRAM (20:00): "Marketplace sotuvchilar — bu post sizga. WB, Ozon, Uzum — muammo bir xil..."`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t7-story-tripwire2', phaseId: 3, subModuleId: '3.1', day: -7,
    title: '📲 T-7 | STORY — Tripwire kun 2: Seminar anons + "nima uchun 600k?" (19:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 19:00
📱 Format: Stories (5 ta ketma-ket — tripwire 2-kuni)
⏱ Tayyorlash: 25 daqiqa
👤 Kim qiladi: Assistent (mentor ovozli 15 soniyalik video ham bo'lsa yaxshi)

## STORIES (5 ta):

STORY 1 (19:00) — KATTA ANONS:
→ Sariq fon, qora matn, katta:
"SEMINAR — [SANA KUNI], [SOAT]"
→ Kichik: "90 daqiqa. Moysklad. Jonli demo."

STORY 2 (19:01) — NARX SAVOLI:
→ Matn: "Nima uchun 600,000 so'm?"
→ Kichik: "Bepul seminar bo'lsa odamlar kelmaydi. 30 daqiqadan ketadi."

STORY 3 (19:02) — MANTIQ:
→ Matn: "600k = siz jiddiy qarasiz"
→ Qo'shimcha: "600k = siz savol berasiz"
→ Qo'shimcha: "600k = kurs narxidan ayriladi. Ya'ni haqiqatda BEPUL"

STORY 4 (19:03) — NIMA BOR SEMINAR DA:
→ Matn ro'yxat:
"✅ Kassir nazorat — jonli demo
✅ WB sinxron — jonli
✅ Inventarizatsiya 47 daqiqa — jonli
✅ Hisobot 1 bosmada — jonli"

STORY 5 (19:04) — CTA:
→ Link stiker: "Joyni band qilish → [LINK]"
→ Matn: "200 joy. Hozircha [X] ta bor."
→ Countdown stikeri (seminar gacha)`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'kontent',
  },

  // ──────────────── T-6 (JUMA) ────────────────
  {
    id: 'f3-t6-reels5', phaseId: 3, subModuleId: '3.1', day: -6,
    title: '🎬 T-6 | REELS 5 — "Soliqchi keldi: 47 ta chek yo\'q" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 50–60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: OG'RIQ SERIYASI — Reels 5/9

## TAYYORGARLIK (08:30 da):
→ Fon: Ofis, stol, hujjatlar ko'rinsin (real yoki dekoratsiya)
→ Prop: Papka yoki bir necha varaq qog'oz (soliq hujjat kabi)
→ Kiyim: Rasmiy — galov, ko'ylak

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya) — jiddiy, qo'rquv ifodasi bilan:
"Soliqchi keldi. 47 ta chek yo'q. Jarima: 15 million so'm. Bu real."

🎬 KEYS (5–35 soniya):
"Mijozim uchun bu ssenario haqiqiy bo'ldi.
Kassir cheklarni bermagan. Mijozlar olmasdan ketgan.
Soliqchi tekshiruv qildi — 3 oylik cheklar yo'q.
47 ta sotuv — hujjatsiz. 15 mln jarima.

Bundan oldini olish mumkin edi.
MoySkladda har bir sotuv — chek avtomatik.
Elektron chek — mijoz telefoniga. Arxiv — doim mavjud."

🎬 YECHIM (35–48 soniya):
"Mening boshqa mijozim: Soliqchi keldi.
Ular 30 daqiqada 3 yillik hisobotni chiqardilar.
Soliqchi qaytib ketdi — muammo yo'q."

🎬 CTA (48–58 soniya):
"[SANA] seminar da bu sistemani ko'ramiz. 200 joy. Link bioda."

## CAPTION:
"Soliqchi kelganda — siz tayyormisiz? 📋
47 chek yo'q = 15 mln jarima (real kays)
[SANA] — soliq muammosidan chiqish yo'li
→ Bioda link

#soliq #chek #moysklad #dokon #jarima"

## STORY (12:00 — Urgency):
→ Matn: "⚠️ Faqat [X] joy qoldi — juma kuni odatda ko'p olishadi"
→ Countdown stikeri
→ Link stiker: "Joy band qilish →"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t6-story-tripwire3', phaseId: 3, subModuleId: '3.1', day: -6,
    title: '📲 T-6 | STORY — Tripwire kun 3: "Nima to\'xtatyapti?" Poll + DM (15:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 15:00 (juma — odamlar aktiv)
📱 Format: Stories (5 ta ketma-ket — tripwire 3-kuni)
⏱ Tayyorlash: 25 daqiqa
👤 Kim qiladi: Assistent

## STORIES (5 ta):

STORY 1 (15:00) — SOCIAL PROOF:
→ Matn: "[X] kishi allaqachon joyni band qildi ✅"
→ Screenshot Google Sheets (ismlarsiz, faqat 'Tasdiqlandi' ustuni)
→ Kichik: "Bu haftada to'g'ri qaror qilganlar"

STORY 2 (15:01) — OCHIQ SAVOL:
→ Poll stikeri: "Nima to'xtatyapti sizni?"
   [Narx: 600k ko'p ● Vaqt yo'q ● Kerakmi bilmayman ● Boshqa]
→ Matn: "Rost javob bering — muhim"

STORY 3 (15:02) — NARX HAQIDA:
→ Matn: "600k ko'p deb o'ylasangiz — hisoblaylik"
→ Kichik ro'yxat:
"1 oy Excel xato → 500k yo'qoladi
1 kassir 'noto'g'ri' qaytim → 200k
1 inventarizatsiya xato → 1.5 mln
Seminar: 600k = bu xatalardan bitta oldini oladi"

STORY 4 (15:03) — INVITATION:
→ Matn: "Kimda savol bor — DM yozing. Hozir javob beraman."
→ Quick Reply: [DM Yozing]
→ Kichik: "Bugun 20:00 gacha javob berib chiqaman"

STORY 5 (15:04) — FINAL CTA:
→ Link stiker: "Joyni band qilish → [LINK]"
→ Matn: "200 joy — [X] ta qoldi"
→ Countdown (seminar gacha)

## HAMKOR POST (19:00):
→ Hamkor 1 o'z akkauntidan post chiqaradi
→ Matn: "[Mentor ismi] seminari haqida eshitdingizmi? Men boraman. Link →"
→ Assistent hamkorga matn yuborsin — ular o'zlari joylashtiradi`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'kontent',
  },

  // ──────────────── T-5 (SHANBA) ────────────────
  {
    id: 'f3-t5-reels6', phaseId: 3, subModuleId: '3.1', day: -5,
    title: '🎬 T-5 | REELS 6 — "DEMO: 4 ta do\'kon — jonli ko\'ramiz" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 55–65 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: DEMO SERIYASI — Reels 6/9 (birinchi demo)

## TAYYORGARLIK (08:00 da — 1 soat oldin):
→ MoySklad hisobga kiring — real ma'lumotlar bor do'kon
→ Ekran yozuvchi tayyorlang (agar ekran ko'rsatsangiz)
→ Telefon uchun: telefon + yon kamera yoki ekran yozuv

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya):
"Mana mening MoySkladim. 4 ta do'kon — hozir ko'rasiz."

🎬 DEMO 1 — QOLDIQ (5–20 soniya):
(Ekranda MoySklad dashboard)
"Bu — qoldiq hisoboti. 3 ta do'kon, 1 marta bosish.
Qaysi tovar qolayotgan — ko'rinadi. Qaysi tugayotgan — ogohlantirish bor."

🎬 DEMO 2 — KASSIR (20–35 soniya):
"Bu — kassir monitoring. Kim qancha sotdi, hozir.
Men uydan ko'ryapman — kassir nima qilyapti."

🎬 DEMO 3 — HISOBOT (35–48 soniya):
"Hisobot. Bir oy. Bir bosmada.
Savdo, xarajat, foyda — hammasi tayyor."

🎬 CTA (48–60 soniya):
"Buni to'liq ko'rmoqchi bo'lsangiz — [SANA] seminar.
Men sizning do'koningiz uchun ko'rsataman. 200 joy. Link bioda."

## CAPTION:
"4 ta do'kon — 1 ekranda 📱
Jonli demo — real raqamlar [SANA] seminar da
→ Bioda link

#moyskladdemo #dokon #nazorat #avtomatlashtirish"

## STORY (13:00 — Otziv Social Proof):
→ Mijozdan olingan screenshot/otziv ko'rsating
→ Matn: "Bu kishi seminar dan keyin shu natijaga erishdi ✅"
→ Kichik: "Sizda ham shunday bo'ladi"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f3-t5-tg2', phaseId: 3, subModuleId: '3.1', day: -5,
    title: '📢 T-5 | TELEGRAM — Seminar dasturi: nima bo\'ladi? (20:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 20:00
📱 Format: Telegram kanal post (matn, to'liq dastur)
⏱ Tayyorlash: 10 daqiqa
👤 Kim qiladi: Assistent

## POST MATNI:

"📋 SEMINAR DASTURI — [SANA], [SOAT]

🕐 [SOAT] — Kirish va tanishish
🕑 [SOAT+30] — Kassir nazorat + jonli demo
🕒 [SOAT+60] — Inventarizatsiya + WB sinxron
🕓 [SOAT+90] — Savol-javob + BONUS

✅ Barchasi jonli ko'rsatiladi — real do'kon ma'lumotlari bilan
✅ Savollaringizni hoziroq yozing — seminar da javob beraman

📍 Manzil: [MANZIL]
🎟 Narx: 600,000 so'm (kurs narxidan ayriladi)

👇 Joy band qilish: [LINK]
Qolgan joy: [X] ta"

## DM REPLY SCRIPT (shanba kechasi DM larga javob):
→ Kim savol berdi — ertaga javob bering
→ Standart javob: "Salom! Seminar [SANA] da, [SOAT] dan. Manzil: [MANZIL]. Joy band qilish: [LINK]. Savolingiz bo'lsa — yozing!"`,
    assignee: 'assistent', status: 'pending', xpReward: 25, category: 'kontent',
  },

  // ──────────────── T-4 (YAKSHANBA) ────────────────
  {
    id: 'f3-t4-reels7', phaseId: 3, subModuleId: '3.1', day: -4,
    title: '🎬 T-4 | REELS 7 — "Inventarizatsiya: 3 kun emas, 47 daqiqa" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 50–60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: DEMO SERIYASI — Reels 7/9

## TAYYORGARLIK (08:30 da):
→ MoySkladda inventarizatsiya bo'limini oching
→ Prop: Barkod skaneri (yoki telefon kamera)
→ Fon: Tovar taxtalar yoki omborxona

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya):
"Inventarizatsiya — 3 kun emas. 47 daqiqa. Hozir ko'rsataman."

🎬 MUAMMO (5–20 soniya):
"Odatda qanday: Do'kon yopiladi. 3 kishi 2 kun hisoblaydi. Xato bo'ladi. Qayta hisoblaydi.
Savdo to'xtaydi. 3 kun pul yo'q."

🎬 DEMO (20–42 soniya):
(Ekranda MoySklad yoki jonli harakat)
"MoySkladda: Telefon bilan barkodni skanerlaymiz.
Dastur avtomatik hisoblab chiqadi — qancha bor, qancha bo'lishi kerak.
Farqlar darhol chiqadi. Hisobot tayyor. 47 daqiqa."

🎬 CTA (42–55 soniya):
"Bu jonli seminar da bo'ladi — [SANA]. Siz o'zingiz ko'rasiz.
200 joy. Link bioda."

## CAPTION:
"Inventarizatsiya 47 daqiqada — ishonasizdami? 🤔
Jonli ko'ramiz [SANA] seminar da
→ Bioda link

#inventarizatsiya #moysklad #dokon #tezkor"

## STORY (12:00 — Poll):
→ Poll: "Inventarizatsiya muammo bormi sizda?"
   [Ha, doim! ● Ba'zan ● Yo'q, joyida]
→ Matn: "Javob bering — kechqurun javob beraman"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },

  // ──────────────── T-3 (DUSHANBA) ────────────────
  {
    id: 'f3-t3-reels8', phaseId: 3, subModuleId: '3.1', day: -3,
    title: '🎬 T-3 | REELS 8 — "WB zakaz: 14 soniyada" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 50–60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: DEMO SERIYASI — Reels 8/9

## TAYYORGARLIK (08:30 da):
→ MoySklad WB integratsiya bo'limini oching
→ Ekranda yangi zakaz kelib turgan bo'lsin (yoki yozuv)
→ Telefon + ikki kamera: yuz va ekran

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya) — telefon ushlab:
"WB yangi zakaz. 14 soniya. Ko'ramiz."

🎬 DEMO (5–40 soniya) — real yoki screen record:
"Zakaz keldi — MoySkladda avtomatik paydo bo'ldi.
[saniya hisoblagich ko'rsatiladi]
1 — zakaz qabul qilindi.
4 — qoldiqdan ayirildi.
8 — markirovka tayyor.
14 — stiker chiqdi. Yuboriladio."

🎬 MUAMMO TAQQOSLASH (40–50 soniya):
"Excel da bu necha daqiqa?
Qo'lda yozib, taqqoslab, keyin ayirib... 15 daqiqa.
Kuniga 20 zakaz: 5 soat faqat WB ga."

🎬 CTA (50–60 soniya):
"[SANA] seminar — bu jonli ko'rsataman. 200 joy. 3 kun qoldi. Link bioda."

## CAPTION:
"WB zakaz — 14 soniyada ✅ (timer bilan)
[SANA] seminar da jonli ko'ramiz
→ Bioda link

#wildberries #zakaz #moysklad #tezkor #marketplace"

## STORY (14:00 — Urgency):
→ Matn: "⚠️ 3 kun qoldi! Joy band qiling."
→ Screenshot: Nechta joy qolgan (Google Sheets dan)
→ Link stiker: "Band qilish →"

## HAMKOR POST (12:00 — Hamkor 2):
→ Hamkor 2 o'z akkauntidan post chiqaradi
→ Matn: "Men [Mentor] seminar da bo'laman. [SANA]. Siz ham boring — qiziqarli."

## SMS BROADCAST (19:00 — barcha leadlarga):
→ Matn: "Salom, [Ism]! MoySklad seminar — [SANA], [SOAT]. Joy: [MANZIL]. Band qilgan bo'lsangiz — tasdiqlash kerak: [LINK] yoki [TELEFON]"
→ Min 100 ta SMS yuborilsin`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },

  // ──────────────── T-2 (SESHANBA) ────────────────
  {
    id: 'f3-t2-reels9', phaseId: 3, subModuleId: '3.1', day: -2,
    title: '🎬 T-2 | REELS 9 — "Buxgalter hisoboti: 1 bosmada" (09:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 09:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 45–55 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: DEMO SERIYASI — Reels 9/9 (oxirgi demo reels)

## TAYYORGARLIK (08:30 da):
→ MoySkladda hisobot bo'limi ochiq
→ "1 oy hisobot" tayyor tursin
→ Ekran yozuv yoki ikkinchi kamera

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya):
"Buxgalter har oy 3 kun hisobot tayyorlaydi. Bu 3 kun sizga kerak emas."

🎬 DEMO (5–38 soniya):
(Ekran ko'rsating)
"Mana MoySklad. Hisobotlar bo'limi.
Savdo hisoboti — bir bosing.
Xarajat hisoboti — bir bosing.
Foyda/zarar — bir bosing.
Tovar aylanmasi — bir bosing.
Hammasi tayyor. PDF qilib yuklab oling. Buxgalterga yuboring."

🎬 TAQQOSLASH (38–48 soniya):
"Oldin: 3 kun, Excel, xatolar, tuzatish.
Endi: 30 soniya. Bir bosma."

🎬 CTA (48–55 soniya):
"[SANA] seminar — 2 kun qoldi. 200 joy. Link bioda."

## CAPTION:
"Buxgalter hisoboti: 1 bosma ✅
Ertaga emas — hozir: [LINK]
[SANA] seminar

#buxgalteria #hisobot #moysklad #avtomatlashtirish"

## STORY (11:00 — Countdown):
→ Countdown stikeri: "2 kun qoldi!"
→ Matn: "Joy olganlar — tasdiqlash SMS/WhatsApp yuboriladi"
→ Link stiker

## WHATSAPP BROADCAST (15:00):
→ Matn: "Salom! [Mentor ismi] seminar — ertaga! [SANA], [SOAT]. Manzil: [MANZIL]. Tasdiqlash: [LINK yoki TELEFON]"
→ Barcha leadlarga — min 150 kishi

## TELEGRAM (20:00):
→ Matn: "Ertaga OXIRGI KUN. Joy [X] ta qoldi. [LINK]"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'kontent',
  },

  // ──────────────── T-1 (CHORSHANBA — OXIRGI KUN) ────────────────
  {
    id: 'f3-t1-story-ertaga', phaseId: 3, subModuleId: '3.1', day: -1,
    title: '📲 T-1 | STORY — "ERTAGA!" Sabah urgency (08:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 08:00 (odamlar uyg'onayotgan vaqt)
📱 Format: Stories (3 ta)
⏱ Tayyorlash: 10 daqiqa
👤 Kim qiladi: Assistent

## STORY 1 (08:00):
→ Qizil fon, oq matn, katta: "ERTAGA! 🚨"
→ Kichik: "MoySklad seminar — [SANA], [SOAT]"
→ Countdown stikeri (seminar gacha)

## STORY 2 (08:02):
→ Matn: "Hali vaqt bor — faqat [X] joy qoldi"
→ Link stiker: "Joy band qilish →"
→ Kichik: "Bu kecha yopiladi"

## STORY 3 (08:04):
→ Matn: "[Mentor ismi] siz bilan uchrashadi ertaga 👋"
→ Mentor yuz rasmi yoki video (15 soniya)
→ "Tayyor bo'ling — qiziqarli bo'ladi"`,
    assignee: 'assistent', status: 'pending', xpReward: 20, category: 'kontent',
  },
  {
    id: 'f3-t1-reels10', phaseId: 3, subModuleId: '3.1', day: -1,
    title: '🎬 T-1 | REELS 10 — "4 ta do\'kon jonli — oxirgi demo" (12:00)',
    description: `## UMUMIY MA'LUMOT
⏰ Joylashtirish vaqti: 12:00
📱 Format: Reels (vertical, 9:16)
⏱ Davomiyligi: 60 soniya
👤 Kim suratga oladi: Assistent kamera, Mentor gapiradio
🎯 Seriya: ISHONCH SERIYASI — Reels 10/9+ (yakuniy)

## TAYYORGARLIK (11:00 da):
→ Real mijoz do'konlari ma'lumotlari tayyor
→ MoySklad 4 ta do'kon ekranda ochiq
→ Kiyim: Seminar kuni bilan bir xil (brand consistency)

## SKRIPT (so'zma-so'z):

🎬 HOOK (0–5 soniya):
"Ertaga seminar. Bugun oxirgi marta ko'rsataman — 4 ta do'kon, jonli."

🎬 DEMO (5–45 soniya) — tez montaj:
"Do'kon 1 — chakana: Kunlik savdo 3.2 mln. Kassir nazorat — yashil.
Do'kon 2 — WB: 47 ta aktiv zakaz. Avtomatik boshqaruv.
Do'kon 3 — optoviy: 12 ta yetkazib beruvchi. Hisob avtomatik.
Do'kon 4 — 3 filial: Hammasi 1 ekranda."

🎬 CTA (45–58 soniya) — to'g'ri kameraga, jiddiy:
"Ertaga — siz ham ko'rasiz. O'z biznesingiz uchun.
Oxirgi joy — [LINK]. Kechqurun 21:00 da yopiladi."

## CAPTION:
"4 ta do'kon — 1 ekranda 📊 Ertaga jonli!
OXIRGI JOY: [LINK]
Kechqurun 21:00 da yopiladi ⏰

#moysklad #seminar #oxirigun #dokon"

## STORY (17:00 — Countdown 1 kun):
→ Countdown stikeri (ertangi seminar gacha)
→ Matn: "1 kun qoldi! 🔥"
→ Screenshot qolgan joylar soni

## STORY (20:00 — Eshik yopilish):
→ Matn: "⏰ 1 soatdan keyin — joy yopiladi"
→ Link stiker — katta, ko'zga tashlanuvchi
→ Kichik: "21:00 da forma o'chiriladi"

## TELEGRAM (21:00 — FINAL):
→ Matn: "Siz ro'yxatdamisiz? Tekshiring: [LINK]
Tasdiqlash SMS yuborilgan.
Ertaga [SOAT] da ko'rishguncha! 👋"
→ Forma yopiladi — kechqurun 21:00`,
    assignee: 'assistent', status: 'pending', xpReward: 60, category: 'kontent',
  },

  // 3.2 Lead Boshqaruv — 200 ni tasdiqlash
  {
    id: 'f3-t10-2', phaseId: 3, subModuleId: '3.2', day: -10,
    title: 'Lead CRM: 200 ta maqsad uchun Google Sheets sozlash',
    description: `## Maqsad
Barcha lead bir joyda — kim qaysi bosqichda, kim qo'ng'iroq kutmoqda, kim tasdiqlagan.

## GOOGLE SHEETS TUZILMASI:
Fayl nomi: "MoySklad Seminar [SANA] — Lead CRM"

TAB 1: "Barcha Leadlar" (asosiy):
| A: № | B: Ism | C: Telefon | D: Biznes turi | E: Manba | F: Sana | G: Status | H: Izoh | I: Qo'ng'iroq 1 | J: Qo'ng'iroq 2 | K: To'lov

STATUS KODLARI (G ustun):
🔵 Yangi — hali murojaat qilinmadi
🟡 Murojaat — xabar/qo'ng'iroq yuborildi
🟢 Tasdiqlandi — seminar uchun 600k to'ladi
🔴 Rad etdi — sababi H ustunda
⚫ Reachable emas — 3 marta urinildi, javob yo'q

MANBA KODLARI (E ustun):
IG-REEL = Instagram Reels dan
IG-STORY = Instagram Stories dan
TG-BOT = Telegram bot dan
ADS = Reklama (Meta Ads)
HAMKOR1 = Hamkor 1 promo-kod
HAMKOR2 = Hamkor 2 promo-kod
WA = WhatsApp dan
REF = Do'sti yuborgan (referral)

TAB 2: "Tasdiqlangan 200" (filtr: status = Tasdiqlandi):
→ Bu tab seminar kuni registratsiya uchun ishlatiladi
→ Bej chop etish uchun tayyor ro'yxat

TAB 3: "Rad etganlar — sabab":
→ Narx qimmat: [son]
→ Vaqt mos emas: [son]
→ Qiziqmaydi: [son]
→ Keyingi seminar: [son]
→ Bu ma'lumot keyingi zapusk uchun zarur

TAB 4: "Manba tahlili":
Har manbadan nechta lead, nechta tasdiqladi, konversiya %

## Kunlik KPI monitoring:
Har kuni 18:00 da:
☐ Yangi leadlar soni: [___]
☐ Bugun murojaat qilinganlar: [___]
☐ Tasdiqlangan jami: [___]/200
☐ Rad etganlar bugun: [___]`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'trafik',
  },
  {
    id: 'f3-t8-2', phaseId: 3, subModuleId: '3.2', day: -8,
    title: 'Qo\'ng\'iroq raundi 1: barcha leadlarni filtr qilish',
    description: `## Maqsad
Barcha leadlarni qo'ng'iroq orqali 3 segmentga ajratish: Isiq (to'laydi) / Iliq (nurish kerak) / Sovuq (vaqt yo'qotma).

## QO'NG'IROQ SKRIPTI (3-5 daqiqa):

KIRISH:
"Salom, [Ism] aka/opa! Men MoySklad PRO Akademiyadan murojaat qilyapman. Siz [BESPLATNIK/LANDING] orqali ro'yxatdan o'tgansiz. 3 daqiqangiz bormi?"

FILTRLASH SAVOLLARI:
1. "Qaysi biznes yo'nalishida ishlaaysiz?" → ICP aniqlash
2. "Hozir Moyskladni ishlatayapsizmi?" → Tayyorgarlik darajasi
3. "Seminar [SANA] da — qulayingizmi?" → Asosiy filtr

AGAR QIZIQ:
"Zo'r! Seminar haqida qisqacha aytay — 90 daqiqa, jonli demo, 3 ta muammoni hal qilamiz. Kirish 600,000 so'm — to'siq, jiddiy odamlar uchun. Hozir joyni band qilmoqchimisiz?"
→ Ha → to'lov linki yuborish
→ O'ylayman → "Qachon hal qilasiz?" + eslatma kunini belgilash

AGAR QIZIQMASA:
"Tushunaman. Keyingi seminarimiz [taxminiy sana] da bo'lishi mumkin — eslatib turaylikmi?"
→ Ha → "Keyingi seminar" tab ga qo'shing
→ Yo'q → Rad statusiga o'tkazing

## QOIDA:
→ Bir kunda maksimal 40 ta qo'ng'iroq (aks holda charchasiz)
→ Sotuvchi 1: A-M harflar
→ Sotuvchi 2: N-Z harflar
→ Mentor: Oldingi mijozlar (isiq segment)

## KUNLIK HISOBOT (18:00):
| Qo'ng'iroq | Isiq | Iliq | Sovuq | To'ladi | Rad |
| --- | --- | --- | --- | --- | --- |
| [son] | [son] | [son] | [son] | [son] | [son] |`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 80, category: 'sotuv',
  },
  {
    id: 'f3-t7-2', phaseId: 3, subModuleId: '3.2', day: -7,
    title: 'WhatsApp + Telegram broadcast: isitish xabarlari',
    description: `## Maqsad
Hali to'lamagan "iliq" leadlarni isitish — ular o'z-o'zicha qaror qilsin.

## WHATSAPP BROADCAST (barcha leadlarga):
Matn 1 (T-7):
"Salom [Ism]! MoySklad seminar [SANA] da.
Bugun [X] kishi allaqachon joyni band qildi.
Sizning biznеsingizga eng mos qaysi muamlo:
1️⃣ Qoldiq nazorat
2️⃣ Kassir xatolari
3️⃣ Marketplace jarima
Javob yuboring — shu mavzuda videomi yuboraman"
→ Javob bo'yicha: tegishli Reels yo'llash

Matn 2 (T-5):
"[Ism], hali joy qoldi — lekin kamaymoqda.
Seminar haqida eng ko'p so'raladigan savol:
'Moyskladni bilmasam ham bolaveraman?'
Javob: Ha. Seminar — jonli demo. Nima qilish — ko'rasiz.
Joyingizni band qiling: [LINK]"

## TELEGRAM KANAL XABARLARI (har kuni 20:00):
T-7: "Bu hafta 3 ta MUHIM narsa ko'rsataman — to'g'ridan-to'g'ri seminardan oldin"
T-6: Mini-post: "Qoldiq nazorat — amaliy qo'llanma" (foydali mazmun)
T-5: "Seminar registratsiyasi: [X] ta / 200"
T-4: Real mijoz hikoyasi (3 abzats, anonymous)
T-3: "3 kun qoldi — [LINK]"

## REFERRAL KAMPANIYA (T-7 da):
Barcha tasdiqlanganlarga xabar:
"Salom! Do'stingizni olib keling — ikkalamiz uchun bonus:
Siz: 1 soatlik qo'shimcha mentoring
Do'stingiz: 100,000 so'm chegirma
Do'stingizning telefon raqamini yuboring — biz qo'ng'iroq qilamiz"
→ Maqsad: 200 → 220 ga yetkazish referral orqali`,
    assignee: 'assistent', status: 'pending', xpReward: 60, category: 'trafik',
  },
  {
    id: 'f3-t3-2', phaseId: 3, subModuleId: '3.2', day: -3,
    title: 'Yakuniy qo\'ng\'iroq raundi + tasdiqlash 200 ga yetkazish',
    description: `## Maqsad
T-3 ga kelib 150+ tasdiqlangan bo'lishi kerak. Qolgan 50 ni T-1 gacha yig'ish.

## QOIDA: Bu "oxirgi imkoniyat" qo'ng'iroqi

QO'NG'IROQ SKRIPTI — "Oxirgi imkoniyat" versiyasi:
"Salom [Ism]! Men [Ism], MoySklad Akademiyadan. Siz [X kun] oldin ro'yxatdan o'tgansiz. Seminar [SANA] — 3 kun qoldi.
Hali joy bor lekin — bugun kech joylar tugashi mumkin.
Bir savol: nima sababdan hali joyni band qilmadingiz? Vaqtmi, narxmi yoki boshqa sabab?"
→ Tinglang — haqiqiy sabab aytadi
→ Vaqt: "Seminar [VAQT] da boshlanadi, siz [SHAHAR] da ko'p emas masofada"
→ Narx: "600k — kurs olsangiz qaytariladi. Ya'ni haqiqatda yo'qotilmaydi"
→ Ishonmaslik: "Jonli ko'rish uchun kelinglar — hech narsa olmasangiz ham"

## SMS XABARI (T-3, barcha murojaat qilinmaganlarga):
"[Ism], MoySklad seminar [SANA]. 3 kun qoldi.
Hali _____ joy bor.
Joyni band qiling: [SHORT LINK]
Yoki: 90-XXX-XX-XX"

## TASDIQLASH JARAYONI:
1. To'lov kelib tushdi → Google Sheets "Tasdiqlandi" statusiga o'tkaz
2. Darhol xabar: "Tasdiqlandi! Seminar [SANA], [VAQT], [MANZIL]. Ertaga xabar beramiz"
3. Telegram guruhga qo'sh: "Siz rasman ro'yxatdasiz — guruhga xush kelibsiz!"

## MAQSAD HISOBOT (T-3 kechki):
☐ Jami tasdiqlangan: [___]/200
☐ Bugun qo'ng'iroq qilingan: [___]
☐ Bugun to'ladi: [___]
☐ T-2 gacha rejalashtirilgan: [___]

⚠️ Agar 120 dan kam bo'lsa: Reklama byudjetini 2 baravar oshiring + mentor jonli stories qiling`,
    assignee: 'sotuvchi2', status: 'pending', xpReward: 80, category: 'sotuv',
  },
  {
    id: 'f3-t2-1', phaseId: 3, subModuleId: '3.2', day: -2,
    title: 'Tasdiqlanganlarga yakuniy instruktaj paketi yuborish',
    description: `## Maqsad
200 ta tasdiqlanganning 90%+ seminar kuni KELISHI — bu eng muhim. To'lagan lekin kelmaganlar = yo'qotilgan sotuv.

## SEMINAR INSTRUKTAJ PAKETI (har tasdiqlanganga yuborish):

WhatsApp xabari:
"Salom [Ism]! Ertaga seminar.
📅 Sana: [SANA]
⏰ Vaqt: 10:30 (ANIQ! 10:45 da eshik yopiladi)
📍 Manzil: [TO'LIQ MANZIL + Google Maps link]
🚗 Parking: [parkovka]
☕ Kofe-pauza bor — no'shta iching, ovqat kechiktirsa ham bo'ladi
📱 Laptop kerak emas — telefon yetarli
🎯 Nima olib keling: Moysklad login/parolingiz (agar bo'lsa)"

## ESLATMALAR JADVALI (ertasi kuni):
T-1, 20:00: Yuqoridagi paket barcha 200 ga
T-1, 21:00: Telegram kanalga: "Ertaga ko'rishguncha!"
T0, 08:00 (seminar kuni ertalab): "BUGUN! 2.5 soatdan keyin uchrashAmiz [MANZIL]"

## KELMAY QOLISHI MUMKIN BO'LGANLARNI ANIQLASH:
T-2 kuni qo'ng'iroq → "Ertaga kelayapsizmi? Joy tayyor."
→ "Kelmayman" → sababni aniqlash → qayta ishlash
→ "Ha" → "Zo'r! Ertaga 10:15 da keling — eng yaxshi joy olasiz"

## BEJ CHOP ETISH:
Google Sheets "Tasdiqlangan 200" tab dan → CSV eksport
Canva yoki Word da bej: Ism + Biznes turi + № (bej raqami)
Chop: A6 format, laminatsiya (yoki oddiy qog'oz qog'ozga)
120 ta = tasdiqlangan + 20 qo'shimcha (kutilmagan keluvchilar)`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'logistika',
  },

  // ══════════════════════════════════════════════════════════
  // 3.3 PR KOLLABORATSIYA — Hamkorlar bilan to'liq ish jarayoni
  // ══════════════════════════════════════════════════════════
  {
    id: 'f3-pr-brief', phaseId: 3, subModuleId: '3.3', day: -9,
    title: '📋 T-9 | Hamkor Brief — Talablar va content package tayyorlash',
    description: `## MAQSAD
Har bir hamkorga aniq "xarita" berish: nima yozadi, qachon chiqaradi, qanday ko'rinadi, nima qilib bo'lmaydi. Hamkor sizdan qayta so'ramasin — hamma narsa briefda bo'lsin.

## HAMKORLARGA QO'YILADIGAN TALABLAR (screening):

MINIMAL TALABLAR:
✅ Instagram/Telegram: 2,000+ haqiqiy obunachilar
✅ Eng oxirgi 3 post engagement: min 3% (like+komment/obunachilar)
✅ Auditoriya: Biznes egalar, do'kon egalar, optoviklar, marketplace sotuvchilar
✅ Akkaunt 3+ oylik, faol
✅ Spam/like cheat belgisi yo'q

QABUL QILINMAYDI:
❌ Faqat reklama postu chiqaradigan akkaunlar
❌ Auditoriya mos kelmasa (masalan, kosmetika bloger)
❌ Hozir boshqa raqobatchi seminar reklama qilayotgan hamkor

## HAMKOR BRIEF HUJJATI (Word/Google Doc):

SARLAVHA: "MoySklad Seminar [SANA] — Hamkor Qo'llanmasi"

BLOK 1 — SEMINAR HAQIDA (hamkorga tushuntirish):
"Seminar — do'kon egalariga MoySklad dasturini jonli ko'rsatish. 90 daqiqa. 200 joy. Narx: 600,000 so'm. Sana: [SANA]. Manzil: [MANZIL]."

BLOK 2 — SIZNING ROLLINGIZ:
"Siz o'z auditoriyangizga bu imkoniyat haqida xabar berasiz. Maqsad: auditoriyangizdan bizga 20+ lead yuborish."

BLOK 3 — POSTI FORMATI (aniq ko'rsatmalar):
→ Format: Instagram Feed post YOKI Reels (60 soniya) YOKI Telegram post
→ Hajm: Minimum 150 ta so'z (yoki 45+ soniya video)
→ Vizual: Biriktirilgan rasm/banner ishlatilsin (biz tayyorlaymiz)
→ Majburiy: UTM link ([LINK]?utm=hamkor1)
→ Majburiy: "[Mentor ismi] seminari" yoki "@[profil]" mention
→ Chiqarish vaqti: [SANA KUNGI, SOAT 09:00-11:00 orasida]
→ Storiesga ham ulash: Ha, post chiqgandan 2 soat keyin

BLOK 4 — POST MATNI NAMUNASI (tayyor, faqat copy-paste):
---
"Salooooom! Biznes egalar — bu post siz uchun 👇

Men [Ism] — [sohangiz]. Bir necha yildan beri MoySklad ishlataman va xursandman.

[Mentor ismi] [SANA] da seminar o'tkazmoqda — do'koningizni qanday boshqarish haqida. Jonli demo. 90 daqiqa.

Men boraman. Siz ham boraveringlar.

👉 Joyni band qilish: [UTM LINK]
📍 Manzil: [MANZIL]
💰 Narx: 600,000 so'm (kurs narxidan ayriladi)
---

BLOK 5 — SIZGA KOMISSIYA:
→ Sizning UTM linkdan kelgan har bir to'lov uchun: 100,000 so'm (yoki $10)
→ To'lov seminar dan keyin 3 ish kuni ichida
→ Minimal to'lov chegarasi: 5 ta sotuv (agar kamroq — keyingi seminar ga ko'chiriladi)

BLOK 6 — TEXNIK:
→ UTM link: [MENTOR UTM GENERATOR DAN OLING]
→ Promo tracking: Har kunlik hisobot yuboriladi (nechta click, nechta lead)
→ Savollar uchun: [ASSISTENT TELEFON]

## HAMKOR TANLASH CHECKLIST:
☐ Hamkor 1 — Instagram [profil] — [X] obunachilar — tasdiqlandi
☐ Hamkor 2 — Telegram [kanal] — [X] a'zo — tasdiqlandi
☐ Hamkor 3 — Instagram [profil] — [X] obunachilar — tasdiqlanmoqda
☐ Zaxira hamkor — [profil]

## BRIEF YUBORISH (T-9 da):
1. Google Doc havolasini WhatsApp/Telegram orqali yuboring
2. Qo'ng'iroq qiling — "Brief yubordim, ko'rdingizmi?" — 10 daqiqa tushuntiring
3. Savol-javob bo'lsa — javob bering
4. Post matni tasdiq uchun qaytib yuborilsin — 24 soat ichida`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'hamkor',
  },
  {
    id: 'f3-pr-banner', phaseId: 3, subModuleId: '3.3', day: -9,
    title: '🎨 T-9 | Hamkor uchun vizual materiallar tayyorlash (Canva)',
    description: `## MAQSAD
Hamkor o'zi rasm qidirmasin — siz tayyor banner, stories template va caption bersangiz, u faqat chiqaradi.

## TAYYORLANADIGAN MATERIALLAR (Canva da):

1. INSTAGRAM POST BANNER (1080×1080px):
→ Fon: Qora yoki to'q ko'k
→ Katta matn: "MoySklad Seminar"
→ Kichik: "[SANA], [SOAT]"
→ Narx: "600,000 so'm"
→ Mentor rasmi: Yuqori o'ngda
→ Pastda: "[MANZIL]" va "[LINK]"
→ Logo: MoySklad + sizning logongiz
Canva → Share → Download PNG → WhatsApp/Telegram orqali yuboring

2. INSTAGRAM STORIES TEMPLATE (1080×1920px):
→ Vertikal format
→ Katta countdown: "[X] kun qoldi"
→ Mentor rasmi: Markazda
→ Link stikeri joy: Pastda (hamkor o'zi qo'shadi)
→ Rangi: Sariq-qora yoki qizil-oq

3. TELEGRAM POST RASMI (1280×640px):
→ Gorizontal format
→ "MoySklad Seminar | [SANA]"
→ Mentor rasmi chapda, matn o'ngda

## JONATISH:
→ Google Drive papkaga yuklang: "Hamkorlar Materiallar [SANA]"
→ Link hamkorlarga yuboring — har biri o'zi yuklab olsin
→ WhatsApp: "Materiallar tayyor: [LINK]. PNG formati — to'g'ri o'lchamda."`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f3-pr-approve', phaseId: 3, subModuleId: '3.3', day: -7,
    title: '✅ T-7 | Hamkor post matnini tasdiqlash va UTM link berish',
    description: `## MAQSAD
Post chiqishidan oldin hamkor matnini tekshirish — xato bo'lmasin. Siz tasdiqlagan matn chiqadi.

## TASDIQLASH JARAYONI:

HAMKOR 1 MATN TEKSHIRISH (T-7):
Hamkorga eslatma yuboring (agar hali yuborilmasa):
"Salom [Ism]! T-9 post [SANA] da. Matningizni ertaga (T-8) gacha yuboringchi, ko'rib chiqay."

Kelgan matnni tekshirish ro'yxati:
☐ Seminar nomi to'g'rimi? "MoySklad Seminar"
☐ Sana to'g'rimi? [SANA]
☐ Soat to'g'rimi? [SOAT]
☐ Manzil to'g'rimi? [MANZIL]
☐ UTM link to'g'rimi? (test qiling — ochilsinmi)
☐ Hamkor o'zidan gapirganmi? (personal experience bo'lsa konversiya yuqori)
☐ Uzunligi yetarlimi? (min 100 so'z)
☐ CTA bormi? (link + band qilish)
☐ Rasm biriktirilganmi? (banner yuborilganmi?)

AGAR MATN YO'Q BO'LSA (hamkor yozmagan):
→ Tayyor matn namunasini yuboring (brief da bor)
→ "Shu matnni o'zingizcha biroz o'zgartiring — natural ko'rinsin"

## UTM LINK GENERATSIYA:
Google Analytics / UTM Builder (ga-dev.tools/campaign-url-builder):
→ Website URL: [LANDING SAYT]
→ Source: instagram (yoki telegram)
→ Medium: collab
→ Campaign: seminar-[SANA]
→ Content: hamkor1 (yoki hamkor ismi)

Hamkor 1 UTM: [TO'LIQ URL]
Hamkor 2 UTM: [TO'LIQ URL]
Hamkor 3 UTM: [TO'LIQ URL]

## GOOGLE SHEETS "PR KUZATUV" TAB:
| Hamkor | Platforma | Post sana | Matn tasdiqlandi | UTM link | Yuborildi |
| Hamkor 1 | Instagram | T-9 | ☐ | [link] | ☐ |
| Hamkor 2 | Telegram | T-6 | ☐ | [link] | ☐ |
| Hamkor 3 | Instagram | T-4 | ☐ | [link] | ☐ |`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f3-pr-hamkor1-post', phaseId: 3, subModuleId: '3.3', day: -6,
    title: '🚀 T-6 | HAMKOR 1 — Post kuni: kuzatuv va amplifikatsiya',
    description: `## KUNI JADVALI (HAMKOR 1 POST KUNI)

⏰ 09:00 — Hamkorga eslatma yuboring:
"Salom [Ism]! Bugun post kuni. 09-11 orasida chiqarsangiz yaxshi — odamlar aktiv. Rasm yuborilgan Google Drive da. Muvaffaqiyatlar! 🙌"

⏰ 11:00 — Tekshirish:
→ Post chiqdi? Profil ga kiring, ko'ring
→ Agar chiqmasa: "Bugun chiqadimi? Kerak bo'lsa yordam beraman"
→ Chiqdi → keyingi qadamlarga o'ting

⏰ 11:05 — REPOST (biz tomonidan, darhol):
→ Post linkni oling → Bizning Storiesga ulang
→ Story matni: "🙏 [Hamkor ismi] dan — rahmat! Ko'rganingizmi?"
→ Tag qo'ying: @hamkorprofil
→ Link stiker: seminar registratsiya

⏰ 11:10 — COMMENT FAOLLIGI:
→ Hamkor postiga kirish → Commentlar bo'limida:
Bizdan komment: "[Hamkor ismi], rahmat! Kim savol bersa — men javob beraman 👇"
→ Keyingi 2 soat kuzating — kommentlarga javob bering (mentor yoki assistent)

⏰ 12:00 — BOOST ADS (ixtiyoriy, agar byudjet bor):
→ Hamkor postini Meta Ads da "Boost" qiling
→ Budget: 300,000 so'm / 24 soat
→ Auditoriya: Hamkor profil obunachilari + lookalike (biznes egalar)
→ Maqsad: Reach

⏰ 18:00 — HAMKORGA STATISTIKA:
→ "Salom! Postingiz juda yaxshi bo'ldi. Hozircha [X] ta klik, [X] ta lead keldi. Rahmat!"

## KUZATUV GOOGLE SHEETS (real vaqt):
| Vaqt | Click (UTM) | Lead | Izoh |
| 11:00 | 0 | 0 | Post chiqqanida |
| 13:00 | [___] | [___] | |
| 18:00 | [___] | [___] | |
| 24:00 | [___] | [___] | Kun yakuni |

## MAQSAD KPI (24 soat):
→ Click: 50+
→ Lead (registratsiya): 10+
→ To'lov: 3+`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'hamkor',
  },
  {
    id: 'f3-pr-hamkor2-brief', phaseId: 3, subModuleId: '3.3', day: -5,
    title: '📞 T-5 | HAMKOR 2 — Qo\'ng\'iroq + post matni tasdiqlash',
    description: `## MAQSAD
Hamkor 2 post T-4 da chiqadi — T-5 da hamma narsa tayyor bo'lsin.

## T-5 QADAMLAR:

⏰ 10:00 — HAMKOR 2 QONGIROG:
Qo'ng'iroq skripti (3-5 daqiqa):
"Salom [Ism]! Ertaga post kuni. Matn yozib qo'ydingizmi? 
[Ha] → "Ajoyib! Yuboringchi, ko'rib chiqay"
[Yo'q] → "Muammo emas, tayyor matn bor, yuborganman. Shu asosida yozsangiz bo'ladi"

Tekshirilsin:
☐ Matn bor va tasdiqlangan
☐ UTM link yuborilgan va ishlayapti
☐ Banner/rasm olgan
☐ Qachon chiqaradi (ertaga 09-11 orasida)
☐ Stories ga ham ulaydi? (muhim)

⏰ 11:00 — TELEGRAM GURUHGA ESLATMA:
Agar hamkorlar uchun yopiq guruh bor bo'lsa:
"Ertaga Hamkor 2 — [SANA]. Kimki kuzatmoqchi bo'lsa — [profil] ni kuting!"

⏰ 14:00 — HAMKOR 1 KUZATUV (T-6 postining 24 soati yakuni):
→ Jami click va lead ni qayd eting
→ Agar 10 dan kam lead → Hamkor 1 dan stories ham so'rang

## HAMKOR 2 POST MATNI (tayyor namuna):
---
"Do'kon boshqaruvida muammo bormi? 🤔

Men [X] yildan beri [soha] da ishlayman. Va bir narsani aniq bilaman: nazorat bo'lmasa — pul yo'qoladi.

[Mentor ismi] — MoySklad bo'yicha eng yaxshi mutaxassis men bilgan. U [SANA] da seminar o'tkazadi.

Men o'zim bo'laman. Siz ham keling!

✅ Kassir nazorat — jonli
✅ Inventarizatsiya — jonli  
✅ WB/Ozon sinxron — jonli

📍 [MANZIL]
🎟 600,000 so'm
👇 Joy: [UTM LINK]"
---

## STORIES TALABI (Hamkor 2 dan):
Postdan tashqari 3 ta stories ham so'rang (ixtiyoriy, lekin samarali):
Story 1 (ertalab): "[Mentor ismi] seminari bugun/ertaga"
Story 2 (tushlik): Post repost + "Ko'rdingizmi?"
Story 3 (kechqurun): "Joy qoldi — band qiling"`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f3-pr-hamkor2-post', phaseId: 3, subModuleId: '3.3', day: -4,
    title: '🚀 T-4 | HAMKOR 2 — Post kuni: kuzatuv + amplifikatsiya',
    description: `## KUNI JADVALI (HAMKOR 2 POST KUNI)

⏰ 09:00 — Hamkorga eslatma:
"Salom! Bugun post kuni. Omad! 🔥 Natijalarni birgalikda kuzatamiz."

⏰ 11:00 — Post chiqdi? → Tekshirish:
☐ Post chiqqan
☐ UTM link to'g'ri
☐ Rasm bor
☐ Mention/@tag to'g'ri
→ Agar biror narsa noto'g'ri: Hamkorga yozing, tuzattirishini so'rang

⏰ 11:05 — DARHOL AMPLIFIKATSIYA:
1. Bizning Storiesga repost: "@hamkor2 — rahmat! 🙏"
2. Bizning Telegram kanalga: "Hamkor [Ism] dan post — ko'ring: [link]"
3. Bizning saytga yoki landing ga: testimonial sifatida qo'shing

⏰ 13:00 — COMMENT MONITORING:
→ Hamkor 2 postiga kirish
→ Kommentlarga javob bering (agar savol bo'lsa)
→ Mentor: eng muhim savollarga o'zi javob bersin

⏰ 16:00 — HAMKOR 2 GA STATISTIKA:
"[Ism], 5 soat o'tdi — [X] click, [X] lead. Juda yaxshi!"

## AGAR HAMKOR 3 REJALASHTIRILGAN BO'LSA (T-2 yoki T-3):
→ Hozir brief yuboring
→ Matnni tasdiqlashni so'rang
→ UTM link generatsiya qiling

## JAMI PR MONITORING JADVALI (T-4 kechqurun):
| Hamkor | Platform | Post sana | Click | Lead | To'lov | Komissiya |
| Hamkor 1 | Instagram | T-6 | [___] | [___] | [___] | [___] so'm |
| Hamkor 2 | Telegram | T-4 | [___] | [___] | [___] | [___] so'm |
| JAMI | | | [___] | [___] | [___] | [___] so'm |

## MAQSAD KPI (barcha hamkorlardan jami):
→ Jami click: 150+
→ Jami lead: 30+
→ Jami to'lov: 8+`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'hamkor',
  },
  {
    id: 'f3-pr-stories-req', phaseId: 3, subModuleId: '3.3', day: -3,
    title: '📲 T-3 | Hamkorlardan qo\'shimcha STORIES so\'rash (urgency)',
    description: `## MAQSAD
3 kun qoldi — hamkorlardan yana bir kontent "itarish" so'rang. Bu safar stories, urgency bilan.

## HAMKOR 1 GA XABAR (T-3, 10:00):
"Salom [Ism]! 3 kun qoldi. Auditoriyangizdan stories chiqarsangiz — hali vaqt bor. Tayyor matn/ko'rsatma yuboraymi?"

STORIES KO'RSATMASI (hamkorga yuboriladigan):
---
STORY 1:
Fon: qizil yoki sariq
Matn: "3 kun qoldi — [Mentor ismi] seminar!"
Countdown stikeri: [SANA] ga
Link stiker: [UTM LINK]

STORY 2:
Matn: "Men boraman. Siz ham boring 👇"
Link stiker

STORY 3 (ixtiyoriy):
"[X] kishi allaqachon band qildi — ular haqli!"
---

## HAMKOR 2 GA XABAR (T-3, 10:05):
Xuddi shu ko'rsatma — alohida UTM bilan

## YANGI HAMKOR IZLASH (agar jami lead 120 dan kam):
Telegram biznes guruhlarga murojaat (admin bilan gaplashing):
"Salom! [Mentor ismi] seminar — [SANA] da. Guruhingizga pin post qo'yishga ruxsat bersangiz — sotuvdan 10% komissiya. 3 kun qoldi. Qiziqasizmi?"

Izlanadigan guruhlar:
→ "Uzbekiston Biznes" tipdagi Telegram guruhlar
→ WB/Ozon sotuvchilar guruhlari
→ Mahalliy tadbirkorlar guruhlari

## KUZATUV YANGILASH (T-3, 18:00):
→ Google Sheets ni to'ldiring — barcha hamkorlar natijasi
→ Jami lead: [___] / Maqsad: 30
→ Kam bo'lsa: Erta kechqurun qo'ng'iroq + "Bugungi stories chiqarasizmi?"`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'hamkor',
  },
  {
    id: 'f3-pr-final-report', phaseId: 3, subModuleId: '3.3', day: -1,
    title: '📊 T-1 | PR Yakuniy hisobot + Hamkor komissiyasini hisoblash',
    description: `## MAQSAD
Seminar arafasida hamkorlik natijalarini to'liq hisoblang va har bir hamkorga so'nggi eslatma yuboring.

## YAKUNIY HISOBOT (T-1, 12:00):

Google Sheets "PR Yakuniy" tab:

| Hamkor | Platform | Jami Click | Jami Lead | To'lagan | Konversiya % | Komissiya |
| Hamkor 1 | Instagram | [___] | [___] | [___] | [___]% | [___] so'm |
| Hamkor 2 | Telegram | [___] | [___] | [___] | [___]% | [___] so'm |
| Hamkor 3 | [___] | [___] | [___] | [___] | [___]% | [___] so'm |
| JAMI | | [___] | [___] | [___] | [___]% | [___] so'm |

## HAMKORLARGA "RAHMAT" XABARI:
"Salom [Ism]! Sizning yordamingiz bilan [X] kishi qo'shildi. Rahmat! Ertaga seminar. Komissiya [X] so'm — seminar dan keyin 3 kun ichida yuboriladi. Sizni ham kutamiz seminar da — kelsangiz zo'r bo'lardi 🙌"

## HAMKORLARNI SEMINAR GA TAKLIF QILISH:
→ Hamkor bor bo'lsa, VIP joy band qiling (1. qator)
→ Seminar kuni ularni "Guest of honor" sifatida tanishtiring
→ Bu keyingi seminar uchun ham hamkorlikni davom ettiradi

## KEYINGI SEMINAR UCHUN TAKLIF:
Agar hamkor yaxshi natija bergan bo'lsa (5+ sotuv):
"[Ism], keyingi [OY] da yana seminar bo'ladi. Yangi shartnoma tuzamizmi? Komissiyani oshirishimiz mumkin."

## KOMISSIYA TO'LASH JADVALI:
→ Seminar kuni sotuv hisobi yopiladi
→ T+3 da komissiyalar to'lanadi (bank transfer yoki naqd)
→ Har bir hamkorga chek/kvitansiya bering

## MAQSAD TEKSHIRISH:
☐ Hamkorlardan jami: 30+ lead ✓/✗
☐ Komissiya hisoblangan ✓/✗
☐ Hamkorlarga rahmat xabari yuborilgan ✓/✗
☐ Keyingi seminar taklifoma yuborilgan ✓/✗`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'hamkor',
  },

  // ══════════════════════════════════════════════════════════
  // 3.4 ZAL & SEMINAR PACK — Emotsiya + premium tajriba
  // Maqsad: 600k to'lagan odam "bu pul arzon emas" deb his qilsin
  // ══════════════════════════════════════════════════════════
  {
    id: 'f3-zal-pack-design', phaseId: 3, subModuleId: '3.4', day: -5,
    title: '🎁 T-5 | Seminar Pack dizayn — ichida nima bo\'lishi (to\'liq ro\'yxat)',
    description: `## MAQSAD
Seminar Pack = pul to'lagan odamning birinchi "wow" momenti. Qop ochilganda: "Bu oddiy seminar emas — bu premium tajriba."

## SEMINAR PACK — ICHIDAGI NARSALAR (har bir qatnashchiga):

1. PREMIUM QOP (tashqi):
→ Qora yoki to'q ko'k qattiq qop (A4 o'lcham)
→ Oltin foil logo: "MOYSKLAD PRO"
→ Ichida: "Siz — bizning VIP mehmonimiz" yozuvi
→ Narx hissi: 50,000 so'm (lekin siz uchun bepul)

2. ISM BEJI (shaxsiy):
→ Oltin ramka, qora fon
→ Ism: KATTA harflar (chop etish — har bir ism alohida)
→ Pastda: "VIP Mehmon | MoySklad Seminar [SANA]"
→ Klips yoki magnit — ko'krakka osiladi

3. "BIZNES DIAGNOSTIKA" BLOKNOT (A5, 80 sahifa):
→ Muqova: qora, oltin yozuv "MoySklad Biznes Diagnostika"
→ Ichida tayyor shablonlar:
   • Sahifa 1-5: "Mening biznesim hozir" (savollar)
   • Sahifa 6-15: Inventarizatsiya hisoblash jadvali
   • Sahifa 16-25: Kassir nazorat checklist
   • Sahifa 26-35: WB/Ozon sinxron rejasi
   • Sahifa 36-45: Oylik foyda/zarar shabloni
   • Sahifa 46-50: Seminar da to'ldiriladi (bo'sh)
→ Seminar davomida mentor: "Bloknotingizni oching, 12-sahifaga o'ting"

4. RUCHKA (premium):
→ Qora metall ruchka, oltin yozuv "MoySklad PRO"
→ Yozish silliq — yaxshi his qiladi
→ Bloknot bilan bir juft

5. USB FLASH (yoki QR kodli kartochka):
→ 8 GB, qora, oltin logo
→ Ichida:
   • MoySklad demo video (5 daqiqa)
   • "Boshlash qo'llanmasi" PDF (14 sahifa)
   • Inventarizatsiya Excel shabloni
   • Kassir nazorat checklist PDF
   • Mentor shaxsiy kontakt (Telegram)
→ Yoki USB o'rniga: QR kod kartochka → Google Drive papka

6. "SHAXSIY DIAGNOSTIKA" KUPON (qimmat his qiladi):
→ A5 kartochka, qalin qog'oz, oltin chegara
→ Matn: "Sizga — shaxsiy 30 daqiqalik MoySklad audit (qiymati: 500,000 so'm)"
→ Faqat seminar kuni amal qiladi
→ Imzo joyi: Mentor
→ Bu = kurs sotuvida "bonus" sifatida ishlatiladi

7. MINI SOVG'A (kichik, lekin esda qoladi):
→ Tanlov: Premium qahva paketi (3 ta) YOKI biznes kitob xatcho'pi
→ Yoki: "Do'kon egasi" stiker to'plami (laptopga yopishtirish)
→ Narx hissi: 30,000 so'm, lekin siz uchun bepul

8. "VIP RO'YXAT" KARTOCHKASI:
→ Qalin kartochka: "Siz VIP ro'yxatdasiz — keyingi seminarlarga 20% chegirma"
→ QR kod: Telegram VIP guruhga qo'shilish
→ Bu = doimiy aloqa kanali

## PACK JAMI QIYMATI (hisoblash — sotuvda aytish uchun):
| Narsa | Bozor qiymati |
| Premium qop | 50,000 |
| Shaxsiy bej | 30,000 |
| Bloknot A5 | 80,000 |
| Ruchka | 25,000 |
| USB + materiallar | 100,000 |
| Diagnostika kupon | 500,000 |
| Mini sovg'a | 30,000 |
| VIP kartochka | — |
| JAMI | 815,000+ so'm |

→ Seminar narxi 600,000 — lekin Pack qiymati 815,000+
→ Bu raqamni mentor seminar da aytadi: "Siz allaqachon 815,000 so'mlik narsa oldingiz"

## BONUSLAR (seminar davomida — Pack dan tashqari):

BONUS 1 — "BEPUL AUDIT SOAT" (faqat bugun):
→ Seminar oxirida: "Bugun ro'yxatdan o'tganlarga — 1 soat shaxsiy audit BEPUL"
→ Qiymat: 500,000 so'm
→ Faqat 10 ta joy — "Kim birinchi — o'sha oladi"

BONUS 2 — "MOYSKLAD 14 KUN TRIAL" (kurs olmaganlarga ham):
→ Barcha qatnashchilarga: 14 kun to'liq trial
→ Login: seminar da beriladi
→ Bu = "sinab ko'ring, keyin qaror qiling"

BONUS 3 — "TELEGRAM VIP GURUH" (doimiy):
→ Faqat seminar qatnashchilari
→ Mentor haftada 1 marta savol-javob
→ Boshqa a'zolar yo'q — eksklyuziv

BONUS 4 — "KEYINGI SEMINAR 50% CHEGIRMA":
→ Keyingi oy seminar — faqat bugungi qatnashchilar
→ Chegirma kodi: SEMINAR-[SANA]
→ Bu = qaytish va do'st olib kelish motivatsiyasi

## PACK TAYYORLASH JADVALI:
| Narsa | Kim buyurtma | Qachon tayyor | Miqdor |
| Qop + logo | Chop etish xizmati | T-3 | 220 dona |
| Bej (ism) | Chop etish | T-1 (ro'yxatdan) | 200+20 zaxira |
| Bloknot | Chop etish / Canva | T-4 | 220 dona |
| Ruchka | Online / do'kon | T-3 | 220 dona |
| USB | Online | T-4 | 220 dona |
| Kupon | Chop etish | T-2 | 220 dona |
| Mini sovg'a | Do'kon | T-3 | 220 dona |
| VIP kartochka | Chop etish | T-2 | 220 dona |

## BUDJET (taxminiy, 220 dona):
→ Qop: 15,000 × 220 = 3,300,000
→ Bej: 5,000 × 220 = 1,100,000
→ Bloknot: 25,000 × 220 = 5,500,000
→ Ruchka: 12,000 × 220 = 2,640,000
→ USB: 20,000 × 220 = 4,400,000
→ Kupon: 3,000 × 220 = 660,000
→ Sovg'a: 15,000 × 220 = 3,300,000
→ VIP kartochka: 2,000 × 220 = 440,000
→ JAMI: ~21,340,000 so'm (220 kishi uchun)
→ 1 kishi uchun: ~97,000 so'm — lekin his qilinishi 815,000+`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'logistika',
  },
  {
    id: 'f3-zal-emotion-plan', phaseId: 3, subModuleId: '3.4', day: -4,
    title: '💫 T-4 | Emotsiya rejasi — kirishdan chiqishgacha har lahza',
    description: `## MAQSAD
600,000 so'm to'lagan odam seminar oxirida: "Bu pul arzon emas edi — men to'g'ri qaror qildim" deb his qilsin. Emotsiya = sotuvning 50%.

## EMOTSIYA XARITASI (seminar kuni, soatma-soat):

### KIRISH (09:30–10:00) — "Men maxsusman"
⏰ 09:30 — Ro'yxat stoli:
→ Assistent: "Xush kelibsiz, [Ism]! Sizning bejingiz tayyor." (ism bilan)
→ Pack qopni ikki qo'lda berish — "Sizning Seminar Pack"
→ Birinchi wow: qop ochilganda ichidagi narsalar
→ "VIP mehmon" — bu so'z 3 marta aytiladi

⏰ 09:45 — Zalga kirish:
→ Musiqa: tinch, motivatsion (fon) — Spotify playlist tayyor
→ Stullar: old qatorlar "VIP" belgisi
→ Ekranda: "Xush kelibsiz, [Ism]" — ism ko'rsatiladi (Google Slides, ro'yxatdan)
→ Kofe stoli: premium stakanlar, "MoySklad" stiker

### BOSHLASH (10:00–10:15) — "Bu men uchun"
⏰ 10:00 — Mentor chiqadi:
→ "Bugun 200 kishi keldi. Siz — ulardan biri. Siz to'g'ri qaror qildingiz."
→ "Bloknotingizni oching. Birinchi sahifa — 'Mening biznesim hozir'. Yozing."
→ 2 daqiqa jimlik — har kishi yozadi (participation = ownership)

⏰ 10:10 — Og'riq hikoyasi:
→ Mentor o'z hikoyasini aytadi — 1 ta real mijoz (ism, raqam, natija)
→ "U ham siz kabi edi — Excel, qo'lda, stress"

### DEMO (10:15–11:00) — "Bu ishlaydi"
→ Har demo dan keyin: "Bloknotingizda 12-sahifaga yozing — bu sizga qancha pul tejaydi?"
→ Real raqamlar — "3 mln yo'qolgan" → "47 daqiqa inventarizatsiya"
→ Mijoz otzivi video (30 soniya) — ekranda

### TANAFFUS (11:00–11:20) — "Men o'zimga tegishli joy topdim"
→ Kofe, non, meva — premium (pechene emas)
→ Sotuvchilar: faqat A segment — "Siz kecha gaplashgan edingiz — joyni band qilamizmi?"
→ Ekranda: "Tanaffus — 20 daqiqa. Keyin — maxsus taklif."

### TAKLIF (11:20–11:45) — "Bu imkoniyat faqat bugun"
⏰ 11:20 — Value stack (ekranda):
→ "Seminar Pack — allaqachon 815,000 so'm (siz oldingiz)"
→ "Kurs — 12 hafta, $1,500"
→ "Bugun: seminar 600k ayriladi = $900"
→ "Bonus: audit soat, trial, VIP guruh"
→ "Faqat bugun. Ertaga — $1,500."

⏰ 11:25 — Urgency:
→ "3 joy qoldi" (ekranda, katta)
→ Sotuvchilar darhol harakat

⏰ 11:35 — Social proof:
→ "Bugun [X] kishi allaqachon ro'yxatdan o'tdi"
→ Screenshot (ismlarsiz) — Google Sheets

### YAKUN (11:45–12:00) — "Men g'olibman"
⏰ 11:45 — Kurs olganlarga:
→ Qo'l berish, surat
→ "Tabriklaymiz! Siz endi MoySklad PRO oilasidasiz"
→ Telegram guruhga qo'shish — darhol
→ Shartnoma imzolash — 2 daqiqa

⏰ 11:50 — Kurs olmaganlarga:
→ "Siz ham g'olibsiz — Pack, trial, VIP guruh sizniki"
→ "Keyingi seminar — 50% chegirma. Do'stingizni olib keling."
→ Dojim ro'yxati — qo'ng'iroq T+1

⏰ 11:55 — Chiqish:
→ Har kishi eshikda: "Rahmat, [Ism]! Telegram guruhda ko'ramiz."
→ Pack qopni olib ketish — esda qoladi
→ Stories uchun: "Seminar Pack" surat so'rash — "Tag qiling @profil"

## QO'LLANMA: Assistent har bosqichda nima qiladi
| Vaqt | Assistent |
| 09:30 | Ro'yxat, Pack berish, bej |
| 10:00 | Zalda yurish, savol yozish |
| 11:00 | Kofe, tanaffus |
| 11:20 | Sotuv stoli yordam |
| 11:45 | Surat, Telegram qo'shish |
| 12:00 | Chiqish, eslatma SMS |`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'logistika',
  },
  {
    id: 'f3-zal-order', phaseId: 3, subModuleId: '3.4', day: -4,
    title: '🛒 T-4 | Seminar Pack buyurtma — chop etish va materiallar',
    description: `## MAQSAD
T-4 da barcha buyurtmalar berilsin — T-1 da hammasi tayyor bo'lsin.

## BUYURTMA RO'YXATI (har biri alohida):

### 1. PREMIUM QOP (220 dona)
→ Qayerda: Mahalliy chop etish (Toshkent: "Print" xizmatlari)
→ O'lcham: A4, qattiq qog'oz (300g/m²)
→ Dizayn: Canva da tayyor — PDF yuborish
→ Matn: "MOYSKLAD PRO | Seminar [SANA]"
→ Vaqt: 3 kun — T-1 da olish
→ Narx: ~15,000/dona

### 2. BLOKNOT (220 dona)
→ Qayerda: Chop etish yoki online (printio.uz, va hokazo)
→ A5, 80 sahifa, spiral yoki yopishqich
→ Ichidagi shablonlar: Google Doc → PDF → chop etishga yuborish
→ Vaqt: 4 kun
→ Narx: ~25,000/dona

### 3. RUCHKA (220 dona)
→ Qayerda: Optom do'kon (Metro, Chorsu) yoki online
→ Qora metall, logo bosish (agar mumkin)
→ Zaxira: 20 ta
→ Narx: ~12,000/dona

### 4. USB FLASH (220 dona)
→ Online: 8GB, qora
→ Materiallar: kompyuterga yuklash — har bir USB ga bir xil
→ Papka: "MoySklad Seminar Materiallar"
→ Vaqt: 2 kun (yuklash)
→ Narx: ~20,000/dona

### 5. DIAGNOSTIKA KUPON (220 dona)
→ Qalin qog'oz A5, oltin chegara
→ Canva dizayn → chop etish
→ Mentor imzosi: seminar kuni qo'lda
→ Narx: ~3,000/dona

### 6. MINI SOVG'A (220 dona)
→ Tanlov: Qahva 3 paket (Nescafe Gold) yoki stiker to'plami
→ Optom: 1 quti = 50-100 dona
→ Narx: ~15,000/dona

### 7. VIP KARTOCHKASI (220 dona)
→ Qalin kartochka, ikki tomon
→ QR kod: Telegram VIP guruh link
→ Chop etish: 2 kun
→ Narx: ~2,000/dona

## BEJ (T-1 da — ro'yxatdan keyin):
→ Ro'yxat kelganda: ismlar ro'yxati
→ T-1 kechqurun: 200 ta ism chop etish
→ Format: 9×6 sm, oltin ramka
→ Zaxira: 20 ta "Mehmon" bej

## TEKSHIRISH (T-2):
☐ Barcha materiallar keldi
☐ 1 ta "test Pack" yig'ish — ichidagi narsalar to'g'rimi?
☐ USB ichida fayllar ochiladimi?
☐ Bloknot sahifalari to'g'rimi?`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f3-zal-pack-assembly', phaseId: 3, subModuleId: '3.4', day: -2,
    title: '📦 T-2 | Seminar Pack yig\'ish — 220 ta qop tayyorlash',
    description: `## MAQSAD
T-2 da barcha Pack lar yig'iladi — T-1 da faqat bej (ism) qo'shiladi.

## YIG'ISH JADVALI (T-2, 4 soat):

⏰ 10:00 — Joy tayyorlash:
→ Katta stol, 3-4 kishi (Assistent + ixtiyoriy yordam)
→ Har narsa alohida qutilarda: qoplar, bloknotlar, ruchkalar, USB, kupon, sovg'a, VIP kartochka

⏰ 10:30 — YIG'ISH TARTIBI (har qop uchun):
1. Bloknot → qopga
2. Ruchka → qopga (yoki bloknot ustiga bog'lash)
3. USB → qopga (yoki alohida cho'ntak)
4. Diagnostika kupon → qopga (ko'rinadigan joyda)
5. Mini sovg'a → qopga
6. VIP kartochka → qopga
7. Qop yopish — "VIP Mehmon" yorlig'i tashqarida

⏰ 14:00 — 220 ta tayyor:
→ Har 50 tada: 1 ta ochib tekshirish (ichidagi narsalar to'g'rimi?)
→ Qoplar qutilarga: 50 tadan
→ Joy: zal yonidagi xona yoki ofis

## BEJ TAYYORLASH (T-1 kechqurun):
→ Ro'yxat: Google Sheets "Tasdiqlangan" ustuni
→ T-1 18:00: ismlar ro'yxati chop etishga yuborish
→ T-1 22:00: bejlar keladi
→ T-1 22:30: har Pack ga bej qo'shish (ism bilan)
→ Zaxira: 20 ta "Mehmon" bej — ismsiz kelganlar uchun

## RO'YXAT STOLI TAYYORLASH (T-2):
→ 1 stol kirish oldida
→ Ustida: Pack qutilari (alfavit bo'yicha: A, B, C...)
→ Ro'yxat chop etilgan (alfavit)
→ Ruchka, qo'shimcha bej zaxira
→ "Xush kelibsiz" banner (ixtiyoriy)

## ZAL TEXNIK (T-2, 2 soat — alohida):
☐ Proyektor, mikrofon, internet — test
☐ Stullar 200+20
☐ Sotuv stollari 2 ta
☐ Kafe buyurtma: 200 kofe + choy + meva (T-1 da tasdiqlash)`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'logistika',
  },
  {
    id: 'f3-zal-sales-brief', phaseId: 3, subModuleId: '3.4', day: -2,
    title: '💰 T-2 | Sotuvchilar brifing — Pack qiymatini sotishda ishlatish',
    description: `## MAQSAD
Sotuvchi "qimmat" deganda — Pack + bonuslar qiymatini aytadi. 815,000+ allaqachon berilgan.

## BRIFING (T-2 kechqurun, 1.5 soat):

### BLOK 1 — Pack qiymati (15 daqiqa):
"Har qatnashchi allaqachon 815,000 so'mlik Pack oldi:
→ Bloknot, ruchka, USB, diagnostika kupon, VIP guruh
→ Seminar narxi 600,000 — lekin ular allaqachon ko'p narsa oldi
→ Kurs sotuvida: 'Siz 815,000 oldingiz. Kurs — qo'shimcha. Bugun 600k ayriladi.'"

### BLOK 2 — Rad etishga javoblar (Pack bilan):
"Qimmat" → "Siz allaqachon 815,000 Pack oldingiz. Kurs bugun 900 dollar — ertaga 1500."
"O'ylayman" → "Audit soat faqat bugun 10 ta joy. Trial 14 kun — sinab ko'ring."
"Pul yo'q" → "Bo'lib to'lash: 800+700. Pack va trial — hoziroq sizniki."

### BLOK 3 — A/B/C segment (20 daqiqa):
A — oldin qo'ng'iroq "ha" → tanaffusda "Joyni band qilamizmi?"
B — shubhali → "3 joy qoldi" da darhol yoniga
C — yangi → vaqt yo'qotmang

### BLOK 4 — Rol o'ynash (30 daqiqa):
5 ta rad etish × 5 marta

### BLOK 5 — Texnik:
☐ iPad to'lov linki
☐ 30 ta shartnoma
☐ To'lovdan keyin Telegram guruh`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'sotuv',
  },
  {
    id: 'f3-zal-tech', phaseId: 3, subModuleId: '3.4', day: -2,
    title: '🔧 T-2 | Zal texnik tekshirish — proyektor, mikrofon, internet',
    description: `## ZAL TEXNIK (2 soat, T-2):

☐ Proyektor: Full HD, 100+ dyuym
☐ Mikrofon: lapel, zal orqasidan eshitiladi
☐ Internet: 20+ Mbit/s, MoySklad demo
☐ Laptop + telefon adaptor
☐ Zapas qurilmalar

## STULLAR:
→ 200 + 20 zaxira, teatr uslubi
→ VIP old qatorlar belgilangan

## SOTUV STOLLARI (2 ta):
→ iPad, shartnoma, ruchka, suv
→ "MoySklad PRO" banner

## KAFE:
→ 200 kofe + choy + meva
→ T-1 da buyurtma tasdiqlash
→ 11:00 da tayyor

## KIRISH:
→ Ro'yxat stoli, Pack qutilari alfavit bo'yicha
→ Musiqa playlist (tinch, motivatsion)`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f3-zal-rehearsal', phaseId: 3, subModuleId: '3.4', day: -1,
    title: '🎭 T-1 | Repetitsiya + Pack bej qo\'shish + oxirgi tekshiruv',
    description: `## T-1 KUNI JADVALI:

⏰ 18:00 — Jamoa yig'ilishi (zalda):
Mentor, Sotuvchi 1, Sotuvchi 2, Assistent

⏰ 18:00-18:30 — Texnik:
☐ Proyektor, mikrofon, internet
☐ "Xush kelibsiz [Ism]" slayd test
☐ Pack qutilari joyida

⏰ 18:30-19:00 — Pack bej qo'shish:
→ 200 ta ism beji Pack ga qo'shish
→ Alfavit bo'yicha qutilarga
→ 1 ta test: ochish, ichidagi narsalar

⏰ 19:00-19:45 — Mentor repetitsiya:
→ Intro, demo, offer slayd
→ "Bloknotingizni oching" — aytish
→ "815,000 Pack" — value stack da

⏰ 19:45-20:15 — Sotuvchi rol o'ynash:
→ "Qimmat" + Pack javobi
→ 5 marta

⏰ 20:00 — Stories: "Ertaga seminar! Pack tayyor 👇"

## ERTAGA CHEK-LIST (09:00 dan oldin):
☐ Pack qutilari kirishda
☐ Ro'yxat stoli, bej zaxira
☐ Sotuv stollari, iPad
☐ Kofe 11:00 da
☐ Laptop, telefon zaryad
☐ Musiqa yoqilgan`,
    assignee: 'jamoa', status: 'pending', xpReward: 60, category: 'logistika',
  },
  {
    id: 'f3-zal-day-checklist', phaseId: 3, subModuleId: '3.4', day: 0,
    title: '📋 SEMINAR KUNI | Zal & Pack — soatma-soat jamoa chek-listi',
    description: `## SEMINAR KUNI — JAMOA XARITASI

### 09:00 — JAMOA KELISH
☐ Hamma 5 daqiqa oldin
☐ Pack qutilari joyida
☐ Ro'yxat stoli tayyor

### 09:30–10:00 — KIRISH (Assistent)
⏰ 09:30: "Xush kelibsiz, [Ism]!"
→ Bej topish (alfavit)
→ Pack qop — ikki qo'lda: "Sizning Seminar Pack"
→ "VIP mehmon — zalga o'ting"
⏰ 09:45: Kofe stoli ochiq
⏰ 09:55: Zal to'ldi — eshik yopiladi

### 10:00–11:00 — SEMINAR (Assistent zalda)
→ Savollar yozish
→ Bloknot: "12-sahifa" eslatma
→ Demo paytida ekran

### 11:00–11:20 — TANAFFUS
→ Kofe, meva
→ Sotuvchilar: A segment

### 11:20–11:45 — TAKLIF
→ Sotuv stoli yordam
→ "3 joy qoldi" — ekran

### 11:45–12:00 — YAKUN
→ Kurs olgan: surat, Telegram
→ Chiqish: "Rahmat, [Ism]! Pack olib keting."
→ Stories: "Tag @profil"

### 12:00 — HISOBOT
→ Nechta Pack berildi
→ Nechta sotuv
→ Dojim ro'yxati`,
    assignee: 'jamoa', status: 'pending', xpReward: 50, category: 'logistika',
  },

  // ══════════════════════════════════════════
  // FAZA 4 — SEMINAR KUNI (T0)
  // Maqsad: 200 kelsin, 20 sotuv = $30,000
  // ══════════════════════════════════════════

  // ══════════════════════════════════════════════════════════
  // 4.0 MASTER JADVAL — Butun seminar kuni xaritasi
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-master-schedule', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '📋 MASTER JADVAL — Seminar kuni to\'liq vaqt rejasi',
    description: `## SEMINAR KUNI — TO'LIQ XARITA
📍 Boshlanish: **09:30** (mehmonlar keladi) | Kontent: **10:20** | Tugash: **~14:00**
⏱ Jami davomiylik: ~4.5 soat (kirish + seminar + sotuv)

## KIM MAS'UL (KASB BO'YICHA):

| Rol | Kim | Asosiy vazifa |
|-----|-----|---------------|
| 🎤 **Mentor** | Siz (asosiy spiker) | Sahna, hikoya, demo, jonli keys, taklif, Q&A |
| 📋 **Assistent** | Admin/loyiha menejeri | Ro'yxat, Pack, zal, ovqat, texnik yordam |
| 💰 **Sotuvchi 1** | Sales (kirish) | Eshik, to'lov, A-segment, sotuv stoli 1 |
| 💰 **Sotuvchi 2** | Sales (zal ichida) | Joylashtirish, B-segment, sotuv stoli 2 |
| 📱 **Targetolog** | SMM/marketing | Stories live, surat/video, ijtimoiy proof |
| 🔧 **Texnik** | Assistent yoki alohida | Proyektor, mikrofon, ekran, internet |

## TO'LIQ VAQT JADVALI:

| Vaqt | Etap | Kim | Nima bo'ladi |
|------|------|-----|--------------|
| **09:00** | Jamoa kelish | Hamma | Zal, Pack, texnik tekshiruv |
| **09:15** | Sabah brifing | Mentor + jamoa | Rollar, raqamlar, signal so'zlar |
| **09:30** | **KIRISH BOSHLANADI** | Assistent + S1 | Pack, bej, kofe zona |
| **09:30-10:15** | Networking + kofe | Assistent | Tanishuv, yengil ovqat |
| **10:15** | Eshik yopiladi | Assistent | Soni yoziladi |
| **10:20-10:35** | Salomlashish | Mentor | Xush kelibsiz, qoidalar, bloknot |
| **10:35-11:05** | 3 ta og'riq hikoya | Mentor | Real keyslar (qisqa) |
| **11:05-11:35** | Jonli DEMO | Mentor + Texnik | Telefon → proyektor |
| **11:35-12:05** | **JIVOY MIJOZ KEYS** | Mentor + Mijoz | Real biznes, real raqamlar |
| **12:05-12:15** | Video otzivlar | Mentor | 2-3 ta qisqa video |
| **12:15-12:35** | **TANAFFUS + OVQAT** | Assistent + Sotuvchilar | Issiq + sovuq, networking |
| **12:35-12:50** | **TAKLIF OCHILISHI** | Mentor | Value stack, narx, QR |
| **12:50-13:10** | **SOTUV SESSIYASI 1** | Sotuvchilar | Zal ichida yopish |
| **13:10-13:40** | Q&A + sotuv 2 | Mentor + Sotuvchilar | Savollar, oxirgi joylar |
| **13:40-14:00** | Yakun | Mentor + Assistent | Shartnoma, Telegram, Pack |

## SIGNAL SO'ZLAR (jamoa ichida):
→ Mentor: **"3 joy"** = sotuvchilar harakat
→ Mentor: **"Tanaffus"** = ovqat ochiladi
→ Assistent: **"Pack tugadi"** = zaxira Pack olib kelish
→ Sotuvchi: **"+1"** Telegram guruhga = yangi sotuv

## MAQSAD RAQAMLAR:
☐ Kelganlar: 180-200
☐ Jonli keys mijoz: 1 ta (tayyor, rozilik bilan)
☐ Sotuv: 20 ta × $1,500 = $30,000
☐ Tanaffusda: 12-15 ta | Q&A da: 5-8 ta`,
    assignee: 'jamoa', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f4-roles-detail', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '👥 Jamoa rollari — har kasb uchun aniq vazifalar (09:15 brifing)',
    description: `## 09:15 — 15 DAQIQALIK JAMOA BRIFING (zalda, doira)

### 🎤 MENTOR (Spiker / Biznes trener):
09:00 — Ovoz isitish, slayd oxirgi tekshiruv
09:15 — Jamoaga: "Bugun maqsad 20 sotuv. Men kontent, siz sotuv."
10:20-13:40 — Faqat sahnada (demo, keys, taklif)
Tanaffusda — faqat A-segment bilan qisqa gap (2 daqiqa max)
Q&A — barcha savollar, har savol = kursga yo'naltirish
❌ Qilmaslik: Ro'yxat, to'lov, texnik muammo — assistentga

### 📋 ASSISTENT (Loyiha menejeri / Logist):
09:00 — Pack qutilari, ro'yxat stoli, kofe zona
09:30-10:15 — Har kelgan: ism → bej → Pack → "Kofe o'ngda"
10:15 — Ro'yxat yopish, soni Mentor ga: "Kelgan: X"
12:15 — Ovqat chiqarish (katering bilan)
13:40 — Kurs olganlarga: Telegram guruh, shartnoma
Butun kun — Texnik birinchi yordam
📱 Telefonida: Google Sheets real vaqt

### 💰 SOTUVCHI 1 (Kirish / Front sales):
Joy: **Kirish eshigi + Sotuv stoli (chap)**
09:30-10:15 — Ro'yxatda yo'q → 600k to'lov → bej
10:15 dan — Eshik: "Joylar cheklangan"
12:50-13:10 — **Asosiy sotuv** — oldindan "ha" deganlar
iPad: to'lov linki ochiq, shartnoma tayyor
Maqsad: **10 ta sotuv**

### 💰 SOTUVCHI 2 (Zal ichida / Floor sales):
Joy: **Zal orqasi + Sotuv stoli (o'ng)**
09:30-10:15 — Joy ko'rsatish, savolga qisqa javob
10:20-12:15 — Kuzatish: kim faol, kim yozmoqda (bloknot)
12:50-13:10 — **Asosiy sotuv** — B-segment, QR oldida
13:10-13:40 — Q&A da yonida turish, "2 joy qoldi"
Maqsad: **10 ta sotuv**

### 📱 TARGETOLOG (SMM / Marketing):
Joy: **Zal cheti, telefon + kamera**
09:30 — Story: "Kelish boshlandi"
Har 15 daqiqa — Story yangilanish
11:35 — Jonli keys dan video (15 soniya)
12:50 — "X kishi band qildi" (ismlarsiz)
13:40 — Guruh surati, "Bugun X ta oila"
Kechqurun — Reels montaj

### 🔧 TEXNIK (Assistent yoki alohida odam):
09:00 — Proyektor, mikrofon, internet test
10:20 — Laptop + telefon ekran ulash tayyor
11:05 — Demo: ekran ko'rinsin, zaryad
11:35 — Mijoz telefoni ulash (agar kerak)
Butun seminar — fon musiqa (past)`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'logistika',
  },
  {
    id: 'f4-food-plan', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '🍽 Ovqatlanish rejasi — nima beramiz, qachon, qancha',
    description: `## OVQATLANISH — HA, BERAMIZ (2 marta)

Premium seminar = premium tajriba. Pechene emas — mehmon his qilishi kerak.

## 1-QABUL: KIRISH VAQTI (09:30-10:15) — "Welcome Coffee"

**Maqsad:** Networking, yengil, tez, qo'lida turib gaplashish mumkin.

| Narsa | Miqdor | Izoh |
|-------|--------|------|
| Qahva (premium) | 200 stakan + 30 zaxira | Arabica, sut ixtiyoriy |
| Choy (qora + ko'k) | 2 termos | Shakar, limon alohida |
| Suv (0.5L) | 250 ta | Stol ustida ham |
| Pechene / mini-kruasan | 300 dona | Premium qadoq |
| Mevalar (kesilgan) | 5 kg | Olma, uzum, mandarin |

**Joylashuv:** Zal **orqa** yoki **yon xona** — kofe stoli 2 ta
**Kim xizmat qiladi:** Assistent + (ixtiyoriy) katering 1 odam
**Budjet:** ~800,000 — 1,200,000 so'm

## 2-QABUL: TANAFFUS (12:15-12:35) — "Issiq tanaffus"

**Maqsad:** 20 daqiqa — odamlar o'tiradi, ovqatlanadi, sotuvchilar aylanadi.

| Narsa | Miqdor | Izoh |
|-------|--------|------|
| Issiq taom | 200 porsiya | **Tanlov A:** mini-lagmon quti YOKI **Tanlov B:** lavash/roll |
| Salat (yengil) | 1 katta idish | Pomidor, bodring — yengil |
| Non (tandir yoki baget) | 200 bo'lak | Issiq bo'lsin |
| Qahva + choy | Davom etadi | Termos to'ldirish |
| Suv | Davom | |
| Shirinlik | 200 dona | Pishiriq yoki halva bo'lak |

**MUHIM:** Issiq taom **12:10** da tayyor — 12:15 da ochiladi (kutmasin)
**Joy:** Stollar yonida yoki alohida xona — navbat tez bo'lsin
**Kim:** Katering xizmati buyurtma (T-2 da tasdiqlash)
**Budjet:** ~2,500,000 — 4,000,000 so'm (issiq taom qimmatroq)

## NIMALAR BERILMAYDI (budget + noaniqlik):
❌ Alkogol
❌ Og'ir tushlik (plov to'liq) — uxlatadi, sotuv pasayadi
❌ Shovqinli muzika ovqat vaqtida

## DIET / MAXSUS:
→ Vegetarian: salat + non + meva yetarli (alohida belgilash ro'yxatda)
→ Gluten-free: meva, choy, suv

## BUYURTMA (T-2):
☐ Katering kompaniya: [NOMI, TELEFON]
☐ Welcome: T-1 kechqurun yoki 09:00 yetkazish
☐ Issiq tanaffus: 12:00 da yetkazish (15 daqiqa oldin)
☐ Idishlar: bir martalik premium (qora/qo'ng'ir)
☐ Assistent: 12:10 da kelingini tekshirish`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'logistika',
  },

  // ══════════════════════════════════════════════════════════
  // 4.1 KIRISH & NETWORKING
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-t0-1', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '⏰ 09:00-09:30 | Jamoa kelish + oxirgi tekshiruv',
    description: `## 09:00 — JAMOA KELISH (5 kishi + texnik)

☐ Proyektor, mikrofon, internet — ishlaydi
☐ Pack qutilari kirishda (alfavit)
☐ Welcome kofe stoli tayyor
☐ Issiq tanaffus 12:00 da kelishi — kateringga qo'ng'iroq
☐ Jonli keys mijoz: yo'lda / keladi — telefon tasdiq
☐ Mentor: slayd "Xush kelibsiz [Ism]" test

## 09:15 — BRIFING (15 daqiqa):
Mentor raqamlar: "180+ kelish, 20 sotuv"
Signal so'zlar eslatiladi (Master Jadval taskida)
Har kishi o'z joyini biladi`,
    assignee: 'jamoa', status: 'pending', xpReward: 30, category: 'logistika',
  },
  {
    id: 'f4-entry-networking', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '🤝 09:30-10:15 | Kirish + Pack + NETWORKING (kofe zona)',
    description: `## MAQSAD
Odamlar bir-birini tanisin, "bu professional tadbir" deb his qilsin. Sotuv yo'q — faqat mehmon.

## 09:30 — KIRISH ALGORITMI (Assistent + Sotuvchi 1):

**Assistent (ro'yxat stoli):**
1. "Assalomu alaykum! Ismingiz?" → Ro'yxatdan topish
2. ✓ belgilash → Bej yopishtirish
3. Pack — **ikki qo'lda:** "Sizning Seminar Pack, [Ism]!"
4. "Kofe va tanishuv — o'ng tomonda. Zal 10:20 da ochiladi."
5. Ro'yxatda yo'q → "Sotuvchi kollegam yordam beradi" → Sotuvchi 1

**Sotuvchi 1 (eshik yonida):**
→ Ro'yxatda yo'q + to'lamagan: 600k to'lov → bej + Pack
→ Kechikkan: "Joy bor, lekin tezroq" — to'lov → ichkariga

## NETWORKING (09:35-10:15) — 40 DAQIQA:

**Zona:** Kofe stoli atrofida — stol yo'q, turib gaplashish
**Musiqa:** Past fon (jazz/lo-fi) — Targetolog yoqadi

**Assistent networking vazifasi:**
→ Yangi kelganlarni tanishtirish: "[Ali], bu [Vali] — ikkalasi ham do'kon egasi"
→ "Qaysi shahardan keldingiz?" — suhbat boshlash
→ Bloknot ochishni eslatish: "Ichida diagnostika jadvali bor — keyin to'ldirasiz"

**Sotuvchi 2 (zal ichida):**
→ Stul tanlashda yordam
→ "Old qator VIP — istagan joyingiz"
→ Suhbat: faqat biznes haqida, sotuv emas

**Targetolog — Stories (har 10 daqiqa):**
09:35: "Kelish boshlandi 🔥"
09:50: Zal to'lish videosi (10 soniya)
10:05: "100+ biznes egasi bir joyda"
10:10: Pack ko'rinishi (foto)

## NETWORKING SAVOLLARI (mehmonlar o'zaro):
Assistent lavha qo'yish (kofe stolida):
→ "Siz qaysi sohada ishlaysiz?"
→ "Eng katta muammo do'koningizda?"
→ "Inventarizatsiya necha kunda?"
(Bu savollar keyin Mentor hikoyaga bog'laydi)

## 10:10 — ESKATMA:
Assistent mikrofon (yoki Mentor chiqadi): "5 daqiqa — zalga o'tamiz. Kofeni olib keling."

## 10:15 — ESHIK YOPILADI:
☐ Ro'yxat yopiladi — son: [___]
☐ Assistent → Mentor: "Kelgan: X kishi"
☐ Sotuvchi 1 — eshik: "Ro'yxat yopildi"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f4-welcome', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '👋 10:20-10:35 | SALOMLASHISH — Mentor chiqadi, qoidalar, bloknot',
    description: `## MAQSAD (15 daqiqa)
Auditoriya o'tiradi, telefonlar jim, "bugun muhim kun" hissi.

## 10:20 — ZALGA KIRISH:
→ Musiqa to'xtaydi
→ Ekranda: "Xush kelibsiz" + mentor rasmi
→ Mentor sahna/markazga chiqadi — applaus kutish (5 soniya)

## SKRIPT — SALOMLASHISH (so'zma-so'z):

**1. Xush kelibsiz (2 daqiqa):**
"Assalomu alaykum! [X] kishi keldingiz — bu juda katta raqam.
Men [Ism]. Bugun siz 600,000 so'm to'lab keldingiz — va bu to'g'ri qaror.
Chunki to'lagan odam tinglaydi. Bepul kelgan odam 20 daqiqadan ketadi."

**2. Bugun nima bo'ladi (3 daqiqa):**
"Bugun rejamiz:
→ Bir-biringiz bilan tanishdingiz — networking ✅
→ 3 ta real biznes hikoyasi
→ Jonli demo — mening telefonimda
→ **Bitta haqiqiy mijoz — hozir bu yerda, o'z raqamlari bilan**
→ Va oxirida — siz uchun maxsus taklif"

**3. Qoidalar (2 daqiqa):**
"📱 Telefon jim — faqat surat uchun
📝 Bloknotingizni oching — 1-sahifa 'Mening biznesim hozir'
✋ Savol — qo'l ko'taring, keyin
☕ Tanaffus 12:15 — issiq ovqat bor
⏰ 14:00 gacha — vaqtingizni hurmat qilamiz"

**4. Bloknot ishlashi (3 daqiqa):**
"1-sahifani oching. 5 ta savol bor. 2 daqiqa yozing — hech kim ko'rmaydi."
→ JIMLIK 2 daqiqa (muhim — ownership)
→ "Kim yozdi? Qo'lingizni ko'taring." [80%+ ko'taradi]
→ "Ajoyib. Bugun shu muammolarga yechim ko'rasiz."

**5. Networking natijasi (2 daqiqa):**
"Kimdir yangi odam bilan tanishdimi? Qo'l silkitish 👏
Yonidagi odam bilan 10 soniya — ism va soha ayting."
→ 10 soniya shovqin — energiya

**6. O'tish (1 daqiqa):**
"Endi — haqiqiy hikoyalar. Birinchi muammo: inventarizatsiya."`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'sotuv',
  },

  // ══════════════════════════════════════════════════════════
  // 4.2 KONTENT & JONLI MIJOZ KEYS
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-stories', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '📖 10:35-11:05 | 3 ta og\'riq hikoyasi (qisqa, dramatik)',
    description: `## MAQSAD (30 daqiqa)
Har hikoya 8-10 daqiqa. Auditoriya bloknotida yozadi.

## HIKOYA 1 — INVENTAR (10:35-10:45):
"5 ta do'kon. Inventarizatsiya — 8 mln farq. Excel ko'rsatmadi. MoySklad — 2 soatda topildi."
→ Bloknot: "Sahifa 6 — inventarizatsiya hisoblash"

## HIKOYA 2 — KASSIR (10:45-10:55):
"Marketplace. Kassir 3 sxema. Real vaqtda ko'rdi — 1 oyda 0 farq."
→ Bloknot: "Sahifa 7 — kassir checklist"

## HIKOYA 3 — WB (10:55-11:05):
"WB jarima 2.7 mln. Sinxron yo'q edi. Endi 14 soniyada zakaz."
→ "Endi — jonli ko'ramiz. Telefonim."`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'sotuv',
  },
  {
    id: 'f4-demo', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '📱 11:05-11:35 | JONLI DEMO — telefon → proyektor (4 qism)',
    description: `## DEMO SKRIPTI (30 daqiqa, 4 ta qism):

KIRISH (1 daqiqa):
"Endi — mana mening telefoni. Bu real biznes. Hozir ko'ramiz."
→ Telefon ekranini proyektorga ulash (adapter)
→ Moysklad app ochiq, login qilingan

DEMO 1 — QOLDIQ NAZORAT (7 daqiqa):
Ko'rsatish:
→ Dashboard → 4 ta ombor qoldig'i
→ Har omborda real tovar ro'yxati
→ Tovar qidirish (barcode skan yoki nom)
→ "Bu mening telefonimda — siz ham shunday ko'rasiz"
Auditoriyaga: "Siz hozir qaysi tovaringiz qoldig'i necha ekanligini bilasizmi?" [savol]

DEMO 2 — KASSIR MONITORING (8 daqiqa):
Ko'rsatish:
→ Kassir moduli → bugungi tranzaksiyalar
→ Smena hisoboti → naqd vs karta
→ "Kassir hozir pul qabul qilsa — men bu yerda ko'raman"
→ Xodimlar bo'limida har kassirning kunlik ishlashi

DEMO 3 — MARKETPLACE SINXRON (8 daqiqa):
Ko'rsatish:
→ Integratsiya moduli → WB + Uzum ulangan
→ Zakaz keldi → avtomatik qoldiq tushdi
→ "Bu qo'lda emas — o'zi ishlaydi"
Raqam: "Kuniga 2 soat tejalishs = oyiga 60 soat = 2.5 kunlik ish"

DEMO 4 — HISOBOT (5 daqiqa):
Ko'rsatish:
→ Moliyaviy hisobot → 1 ta tugma → Excel eksport
→ "Buxgalterga shu faylni yuboring — tamom"
"Bu uchun men buxgalterdan 3 million so'mlik soat sarf qilmayman"

YAKUNLASH: "Kim bunday ko'rishni xohlaydi?" [qo'l ko'tarish]
→ "Keyingi — haqiqiy mijoz. U bu yerda."`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'sotuv',
  },

  // ══════════════════════════════════════════════════════════
  // 4.1 SEMINARDAN OLDIN — T-7 dan T-1 gacha (to'liq tayyorlik)
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-pre-presentation', phaseId: 4, subModuleId: '4.1', day: -7,
    title: '🎨 T-7 | Seminar presentatsiyasini tayyorlash — to\'liq SOP',
    description: `## MAQSAD
Seminar presentatsiyasi — faqat slayd emas. Bu 90 daqiqalik SOTUV SKRIPTI.
Har slayd bitta psixologik ishni qiladi: e'tibor → ishonch → istak → harakat.

## PRESENTATSIYA TUZILISHI (90 DAQIQA)

### BLOK 1 — KIRISH va NETWORKING (10 daqiqa | Slayd 1-5)
**Maqsad:** Zaldagi odamlarni "isitish", mentor bilan emotional bond

Slayd 1 — WELCOME:
☐ Brend rang (qorong'u fon + oltin yozuv yoki oq fon + rang)
☐ Matn: "Xush kelibsiz — MoySklad PRO Seminar"
☐ Sana, shahar, zal ismi
☐ Tagida: "📱 WiFi: [parol]"

Slayd 2 — MENTOR TANISHTIRUV:
☐ Faqat 1 ta raqam yozing (eng ta'sirli): masalan "127 ta biznes avtomatlashtirdik"
☐ Kichik foto (jiddiy, professional)
☐ 2-3 ta mavzu: kim, nima, nima uchun

Slayd 3 — AUDITORIYA BILAN O'YIN:
☐ "Qo'l ko'taring: Excelda yozasizmi? Google Sheetsda? MoySkladda?" — slide vizual
☐ Maqsad: zal jonlansin, mentor tushunib olsin kim bor

Slayd 4 — KUN REJASI:
☐ "Bugun 3 ta ish qilamiz" (vizual 3 blok)
   → 1. Muammo aniqlaymiz (40 daqiqa)
   → 2. Jonli demo (20 daqiqa)
   → 3. Haqiqiy mijoz (30 daqiqa)
☐ Tagida: "Savollar — oxirida 15 daqiqa"

Slayd 5 — QO'YIM (STAKE):
☐ "Bugun 200 kishi bor. 20 ta joy bor. Tanlov — sizda."
☐ Maqsad: FOMO erta o'rnatish

---

### BLOK 2 — MUAMMO (20 daqiqa | Slayd 6-14)
**Maqsad:** Zal "bu haqda menga" deysin

Slayd 6 — MUAMMO SAHNA (birinchi hikoya):
☐ Bitta kichik biznes egasi portreti (ism, shahar, soha — hayoliy yoki ruxsat bilan)
☐ Muammo: "Har oyda 2-3 mln yo'qolib ketadi. Sababi noma'lum"
☐ Minimal matn — faqat his uyg'otadigan raqam

Slayd 7 — STATISTIKA (milliy/global):
☐ "Kichik biznesning 68% omborni qo'lda boshqaradi" (yoki real stat)
☐ Bir katta raqam — ko'zga tashlanadigan

Slayd 8-10 — 3 ta MUAMMO BLOĞI (har biri alohida slayd):
☐ Muammo 1: Inventar nazorati (ortiqcha zakaz, yo'qolgan tovar)
☐ Muammo 2: Moliyaviy ko'rlik (pul bor, lekin qaerda noma'lum)
☐ Muammo 3: Xodim nazorati (kim nima qildi — yo'q)
→ Har slaydda: muammo nomi + vizual + "Bu sizda bormi?" tugma

Slayd 11 — "BU ECHIMI BOR" (pivot slayd):
☐ Katta, oddiy matn: "Bu muammolarning hammasi — YECHILADI"
☐ Pause. 3 soniya. Keyin keyingi slaydga o'tish.

Slayd 12-14 — YECHIM KONTURI:
☐ 3 qadamda tushuntirish (vizual flow):
   → Qadm 1: Hamma narsani bir joyga yig'ing (MoySklad)
   → Qadam 2: Avtomatik nazorat (hisobotlar)
   → Qadam 3: Real vaqtda qaror qilish

---

### BLOK 3 — MENTOR HIKOYASI (10 daqiqa | Slayd 15-18)
**Maqsad:** "Bu odam biz kabi bo'lgan, o'zi yechdi, endi o'rgatadi"

Slayd 15 — MENTOR "OLDIN":
☐ Haqiqiy: "Men ham shu muammoda edim — [yil]"
☐ Bitta og'riqli moment (real, hissiy)

Slayd 16 — BURILISH NUQTASI:
☐ "MoySkladni topganimda — birinchi hafta nima o'zgardi"
☐ Aniq raqam

Slayd 17 — NATIJA:
☐ "Hozir [N] ta biznesga yordam berdik"
☐ 2-3 ta mijoz logosi yoki ism+shahar

Slayd 18 — "ENDI SIZGA":
☐ "Buni 6 haftada o'rgatamanl"
☐ Kurs preview (faqat sarlavhalar)

---

### BLOK 4 — JONLI DEMO (20 daqiqa | Slayd 19-22)
**Maqsad:** Ko'rsatish — gapirish emas

Slayd 19 — "ENDI JONLI":
☐ Matn: "Laptop yoping. Ekranga qarang."
☐ Bu slayd faqat 10 soniya — keyin REAL demo boshlanadi

Slayd 20 — DEMO OQIMI (fon slayd — ekranda qoladi):
☐ "1. Tovar kiritish → 2. Sotish → 3. Hisobot" — 3 qadamli flow diagram
☐ Demo paytida fon sifatida ko'rinadi

Slayd 21 — WOW MOMENT:
☐ Demo tugagach: "Bu 3 daqiqada qildik. Siz bugun 1 soat qilasiz"
☐ Raqamli taqqoslash vizual

Slayd 22 — "SAVOL" (mini Q&A):
☐ 2 ta savolni oldindan tanlang: "Telefonda ishlaydi?" / "Narxi?"
☐ Javoblar slaydda — lekin GAPIRISH, o'qimaslik

---

### BLOK 5 — JONLI KEYS (30 daqiqa | Slayd 23-28)
**Maqsad:** Haqiqiy odam → haqiqiy natija → "men ham qila olaman"

Slayd 23 — MIJOZ TANISHTIRUV:
☐ Ism, biznes turi, shahar, necha yillik MoySklad foydalanuvchi
☐ Uning raqami: masalan "Inventarizatsiya 4 soatdan 20 daqiqaga tushdi"

Slayd 24-26 — INTERVYU (3 ta savol vizuali):
☐ Har slaydda savol katta yozuv — javob jonli
☐ Savol 1: "MoySkladdan OLDIN eng katta muammo?"
☐ Savol 2: "Boshlash qanday bo'ldi — qiyin bo'ldimi?"
☐ Savol 3: "Hozir raqamlar bilan aytib bering — nima o'zgardi?"

Slayd 27 — TELEFONDA DEMO (mijoz):
☐ "Endi o'z telefonida ko'rsating — real biznesingiz"
☐ Proyektorda mirror yoki kamera orqali

Slayd 28 — TASAKKUR + APPLAUS:
☐ "[Ism]ga katta rahmat! Sovg'a: [kurs PDF / kitob / boshqa]"

---

### BLOK 6 — TAKLIF va SOTUV (20 daqiqa | Slayd 29-38)
**Maqsad:** Shubhasiz xarid

Slayd 29 — KURS HAQIDA:
☐ "MoySklad PRO Akademiya — 6 haftalik intensiv"
☐ Boshlanish: [sana]
☐ Guruh: 20-25 ta (cheklangan)

Slayd 30 — DASTUR KONTURI:
☐ 6 modul — har biri 1 satorda (vizual ketma-ket)
☐ Bonus: mentorluk, community, sertifikat

Slayd 31 — VALUE STACK:
☐ Har element qiymati ro'yxat
|| Element | Qiymati |
||---------|---------|
|| 6 ta LIVE dars (12 soat) | $600 |
|| 18 ta video dars (kutubxona) | $300 |
|| 6 ta PDF qo'llanma | $120 |
|| 10 ta Excel shablon | $100 |
|| Shaxsiy mentorluk (2 oy) | $400 |
|| Mahsus Telegram community | $200 |
|| Sertifikat | $80 |
|| **JAMI QIYMATI** | **$1,800** |

Slayd 32 — NARX (katta, aniq):
☐ "Sizga: $1,500 (seminar 600k hisobga olinadi)"
☐ So'm ekvivalenti: [joriy kurs bo'yicha]
☐ Bo'lib to'lash variant (agar mavjud)

Slayd 33 — KAFOLAT:
☐ "14 kun — agar o'rganmasam, qaytaraman"
☐ Shartlar: darslarni ko'rish, uy ishini topshirish

Slayd 34 — QACHON:
☐ Countdown: "Bugun joy olish → [Tel / QR kod]"
☐ "Joylar: 20 ta. Hozir [N] ta band."

Slayd 35 — BONUSLAR (urgency uchun):
☐ "BUGUN joy olgan 10 ta kishi uchun:"
   → Bonus 1: "1-dars preview — ertaga"
   → Bonus 2: "[kurs materiali]"
   → Bonus 3: "Mentorluk — T+1 da individual qo'ng'iroq"

Slayd 36 — SOTUV BOSHLANADI (ACTION):
☐ "Endi — 10 daqiqa. Savol-javob va ariza."
☐ Sotuvchilar stoli — yon tomonda
☐ QR kod — ekranda katta

Slayd 37 — SOTUV PAYTIDA (fon slayd):
☐ Brend rang fon
☐ Tel/WhatsApp raqam katta
☐ "Joy olish: [sotuvchi] yoki [QR]"

Slayd 38 — YAKUN + ESLATMA:
☐ "Keyingi seminar — 3 oydan keyin. Hozir qiymati [N] pastroq."
☐ Ijtimoiy tarmoqlar
☐ Rahmat + foto uchun taklif

---

## DIZAYN TALABLARI:

### Shrift:
☐ Sarlavha: 40-60 px (proyektorda ko'rinsin)
☐ Tana: 28-36 px minimal
☐ ☐ Matn satri: 5-7 so'zdan oshmasin

### Rang:
☐ Asosiy: brend rangi (quyuq fon + och matn → yoki och fon + quyuq)
☐ Accent: oltin, qizil, yashil — faqat muhim joyda
☐ Har slaydda 2-3 ta rang — ortiq emas

### Slayd turi:
☐ Minimal matn — ko'proq vizual
☐ 1 slayd = 1 g'oya
☐ Jadval va raqamlar: katta, aniq

## VOSITALAR:
→ Canva (tayyor seminar template + brend kit)
→ Google Slides (real vaqtda tahrirlash)
→ PowerPoint (offline zaxira)
→ Teleprompter ilovasi (telefonda — faqat kalit so'zlar)

## TAYYORGARLIK JADVALI:
| Kun | Ish | Kim |
|-----|-----|-----|
| T-7 | Tuzilish + slayd soni kelishish | Mentor + Assistent |
| T-6 | Barcha slaydlar draft (Canva) | Assistent |
| T-5 | Mentor tekshiruvi + kontent to'g'irlash | Mentor |
| T-4 | Dizayn finish + brend | Assistent |
| T-3 | Mentor mashq: vaqt o'lchab | Mentor |
| T-2 | Sotuvchi brifing — slaydlar bilan | Jamoa |
| T-1 | Texnik test + offline versiya saqlash | Mentor + Assistent |`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'kontent',
  },
  {
    id: 'f4-pre-zal', phaseId: 4, subModuleId: '4.1', day: -7,
    title: '🏛 T-7 | Zal va texnik infratuzilma — to\'liq tekshiruv',
    description: `## ZAL TAYYOR BO'LISH TALABLARI (T-7)

## XONA TEKSHIRUV JADVALI:
| Parametr | Talab | ✓/✗ |
|----------|-------|-----|
| Sig'imi | 200-220 kishi | |
| Proyektor | FullHD, 3000+ lm, 2 adapter | |
| Mikrofon | 1 tor + 1 qo'l (zahira) | |
| Internet | 50+ Mbit, WiFi mesh | |
| Stol | Ro'yxat 3 ta, sotuv 2 ta | |
| Kofe zona | Yon xona (min 5 m²) | |
| Parking | Kamida 30 joy | |

## BRON SHARTNOMA:
☐ Yozma tasdiq: sana va vaqt [___]
☐ Avans to'langan: [___] so'm
☐ Kalit vaqti: 09:00 (jamoa ichkarida bo'lsin)
☐ Zal tozalash: T-1 kechqurun yoki T0 da 07:00-08:30

## ZAXIRA VARIANT:
→ Bron bekor bo'lsa: [Zaxira zal: ___, tel: ___]`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f4-pre-pack', phaseId: 4, subModuleId: '4.1', day: -5,
    title: '📦 T-5 | Seminar Pack yig\'ish — 220 ta to\'plam (815,000 so\'m qiymat)',
    description: `## SEMINAR PACK TARKIBI (har kishi uchun):
| # | Narsa | Maqsad |
|---|-------|--------|
| 1 | Qora A4 brendli qop | Taassurot |
| 2 | A5 diagnostika bloknot | Seminar kontenti |
| 3 | Brendli ruchka | Yozish |
| 4 | Mentor vizitka | Kontakt |
| 5 | MoySklad 14 kun trial kartochka | Trial |
| 6 | Kurs taklif varaqasi (T-3 da qo'shish) | Sotuv |
| 7 | QR to'lov kodi kartochka (T-3 da) | Sotuv |

Sotuvda aytish: **815,000 so'm qiymati** — auditoriyaga ta'sir uchun.

## YIG'ISH (T-5, Assistent):
☐ 220 ta qop — alfavit tartibida (bej bilan birga)
☐ Qo'shimcha 20 ta — ro'yxatsiz kelganlar uchun
☐ Joylashuv: kirish stoli yonida, tez olish uchun

## T-3 QO'SHIMCHA:
☐ Kurs taklif varaqasi — 220 ta chop
☐ QR kod stikeri — 220 ta`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f4-pre-roxyat', phaseId: 4, subModuleId: '4.1', day: -5,
    title: '📋 T-5 | Ro\'yxat tasdiq — 600k to\'lovlar va kelmagan xaridorlar',
    description: `## MAQSAD: Seminar kuni ro'yxat aniq — kutilmagan narsa yo'q

## T-5 TEKSHIRUV (Assistent):
☐ Google Sheets "Seminar ro'yxat" — barcha tasdiqlanganlar
☐ Har kishi: ism, telefon, to'lov holati ✓

## TO'LAMAGANLARGA QO'NG'IROQ SKRIPT (T-5):
"Salom [Ism]! [SANA] seminarimiz — siz ro'yxatdan o'tgansiz.
600,000 so'm to'lovni tasdiqladingizmi?"
→ Ha → ✓ belgilash
→ Yo'q → "Joy saqlaymizmi? Ertaga kechqurun gacha to'lang — [LINK]"
→ Bekor → B-segment ro'yxatiga (dojimda ishlash)

## T-2 YAKUNIY RO'YXAT:
☐ Jami tasdiqlangan: [___] kishi
☐ Kutilayotgan (to'lovsiz): [___] ta
☐ Zaxira joylar: 10-15 ta (ro'yxatsiz keluvchilar)

## SEMINAR KUNI STOL TUZILMASI:
☐ 3 ta stol: A-I | J-R | S-Z (alfavit)
☐ Har stolda: iPad/telefon + printer (bej uchun)`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'logistika',
  },
  {
    id: 'f4-pre-sotuvchi-brifing', phaseId: 4, subModuleId: '4.1', day: -3,
    title: '💰 T-3 | Sotuvchilar brifing — skriptlar, objections, stol pozitsiyasi (2 soat)',
    description: `## T-3 BRIFING AGENDA (2 soat, ofisda):

### 1. SEGMENTLAR (30 daqiqa):
Sotuvchi 1 va 2 ro'yxat ko'radi:
- A: "Ha, qiziqaman" degan → **birinchi yondashuv**
- B: Yangi, hali noma'lum → zal ichida kuzatish
- C: "Keyin ko'raman" → tanaffusda 1 marta

### 2. SOTUV SKRIPT (30 daqiqa — roleplay, mentor ko'rsatadi):
**Tanaffusda yondashuv:**
"Bugun nima eng foydali bo'ldi? [Tinglash]
Aynan shu uchun akademiyada [modul X] bor.
Hozir 3 joy — $1,500. Ertaga $2,000. Band qilamizmi?"

**QR oldida:**
"Siz uchun link ochib qo'yaymi? 2 daqiqa — tamom."

### 3. RAD ETISHGA JAVOB (30 daqiqa roleplay):
| Rad etish | Javob |
|-----------|-------|
| Qimmat | Pack 815k + 600k ayriladi = $900. Ertaga $2,000 |
| O'ylayman | Faqat bugun $1,500. Telefon berinsiz — ertaga qo'ng'iroq |
| Pul yo'q | $800 hozir + $700 bir oyda. Shartnoma bor |
| Sherik | Ikkalasi birga → 2 joy |
| Vaqt yo'q | Haftada 2 soat, 6 hafta |
| Ishonmayman | 14 kun kafolat — natija yo'q → qaytarish |

### 4. AMALIY JIHOZLAR (30 daqiqa):
☐ iPad — to'lov linki test (Click + Payme)
☐ Shartnoma blanki — 30 ta chop
☐ Sotuv stoli joyi — ko'rish, o'rganish
☐ "+1" signal Telegram guruh — testdan o'tkazish`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 50, category: 'sotuv',
  },
  {
    id: 'f4-pre-katering', phaseId: 4, subModuleId: '4.1', day: -2,
    title: '🍽 T-2 | Katering buyurtma — welcome kofe + issiq tanaffus',
    description: `## 2 TA QABUL BUYURTMA (T-2 kuni amalga oshirish)

### QABUL 1 — WELCOME KOFE (09:30-10:15):
| Narsa | Miqdor | Budjet |
|-------|--------|--------|
| Qahva (arabica) | 230 stakan | 400-600k |
| Choy | 2 termos | |
| Suv 0.5L | 250 ta | |
| Mini pechene/kruasan | 300 dona | 200-350k |
| Meva (kesilgan) | 5 kg | 200k |
| **Jami** | | **~800k-1.2 mln** |

### QABUL 2 — ISSIQ TANAFFUS (12:15-12:35):
| Narsa | Miqdor | Budjet |
|-------|--------|--------|
| Issiq taom (lagmon/roll) | 220 porsiya | 2-3 mln |
| Salat (yengil) | 1 katta idish | |
| Non (tandir) | 200 bo'lak | 100k |
| **Jami** | | **~2.5-4 mln** |

## BUYURTMA ALGORITMI:
☐ Katering: [Nomi: ___, Tel: ___]
☐ Welcome: T0 da 08:30 yetkazish
☐ Issiq tanaffus: T0 da 12:00 yetkazish (12:15 ochiladi)
☐ Idishlar: bir martalik premium (qora/ko'ng'ir)
☐ T0 ertalab 09:00: katering bilan tel tasdiq`,
    assignee: 'assistent', status: 'pending', xpReward: 35, category: 'logistika',
  },
  {
    id: 'f4-pre-slides', phaseId: 4, subModuleId: '4.1', day: -1,
    title: '🖥 T-1 | Slaydlar yakuniy versiya + zalda texnik test',
    description: `## T-1 SLAYDLAR TEKSHIRUVI (Mentor, 2 soat):
☐ Kirish: "Xush kelibsiz [Ism]" — brend rangda
☐ 3 ta hikoya (vizual, minimal matn)
☐ Demo bloği: "Endi jonli — telefonim" 1 slayd
☐ Jonli keys: "[Mijoz ismi] — real natijalar" + foto
☐ Value stack (katta, aniq raqamlar)
☐ QR KOD — katta, zaldan ko'rinsin
☐ Yakun: "Keyingi seminar — 3 oydan keyin"

## TEXNIK TEST (Assistent + Mentor, T-1 kechqurun):
☐ Proyektor → laptop (HDMI + adapter)
☐ Telefon → proyektor (mirrorcast) — DEMO uchun
☐ Mikrofon — orqa qatordan eshitilsin
☐ Internet speedtest: 20+ Mbit
☐ Slaydlar offline ham ishlaydi
☐ Demo MoySklad login: tekshirilgan
☐ Zaryad: laptop + telefon 100%

## T-1 KECHQURUN (Mentor, 30 daqiqa):
O'z-o'ziga mashq: "Hikoya 1 → Demo → Keys → Taklif" — xronometraj`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'kontent',
  },
  {
    id: 'f4-pre-eslatma', phaseId: 4, subModuleId: '4.1', day: -1,
    title: '📱 T-1 | Barcha ro\'yxatdan o\'tganlarga eslatma (SMS + WhatsApp)',
    description: `## T-1 KECHQURUN 18:00 — MASS ESLATMA

### SMS (160 belgi):
"[Ism], ertaga seminar 09:30. Joy: [Manzil]. 600k to'lovingiz qabul qilindi. Pack tayyorlandi. Savol: +998__"

### WHATSAPP (personal):
"Salom [Ism]! Ertaga [SANA] — MoySklad PRO seminar.
📍 [Manzil + xarita linki]
⏰ Kirish: 09:30 (o'z vaqtida — joy to'ladi!)
📦 Seminar Pack (815,000 so'm qiymati) tayyorlandi
☕ Welcome kofe: 09:30-10:20
🍽 Issiq tushlik: 12:15
❓ Savol: ushbu raqamga yozing
Ertaga ko'ramiz! 🎯"

### TO'LAMAGANLAR (alohida xabar):
"Salom [Ism]! Joy bron qilingan — 600k to'lov qilsangiz, kiring.
[TO'LOV LINKI] · Savol: [tel]"

## TEKSHIRUV:
☐ 200+ ga yetdi (delivery report)
☐ Javob beradiganlar → qo'ng'iroq
☐ Kelmaydi deganlar → B-segment ro'yxatiga`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'trafik',
  },
  {
    id: 'f4-live-client-prep', phaseId: 4, subModuleId: '4.1', day: -1,
    title: '🎯 T-1 | JIVOY MIJOZ tayyorlash — kim, qanday kelishadi, skript',
    description: `## MAQSAD
Seminarda **haqiqiy mijoz** chiqadi — o'z biznesi, o'z MoySklad, o'z raqamlari. Bu eng kuchli ishonch.

## MIJOZ TANLASH TALABLARI:
✅ MoySklad 3+ oy ishlatadi — natija bor
✅ Gapirishga tayyor (kam gapiradigan emas)
✅ Raqamlar bilan gapira oladi ("X mln tejadim")
✅ Turli soha (chakana / WB / optovik — auditoriyaga mos)
✅ Rozilik: video/surat, ism ochiq

## T-1 QO'NG'IROQ (15 daqiqa):
"Salom [Ism]! Ertaga seminarda 15 daqiqa siz kerak.
Format: men 3 ta savol, siz javob. Keyin telefoningizda MoySklad ko'rsatasiz.
Auditoriya [X] kishi. Siz VIP — old qator.
Tayyorlaning: eng yaxshi natija raqamingiz (masalan: inventarizatsiya necha soatdan nechaga tushdi)."

## SEMINAR KUNI ERTALAB:
☐ Mijoz 09:30 da keladi — alohida kutib olish (Assistent)
☐ Pack + VIP bej
☐ Mikrofon test (agar gapirsa)
☐ Telefon zaryad, MoySklad login, internet
☐ O'rindiq: 1-qator markaz

## JONLI KEYS SKRIPT (30 daqiqa — 11:35-12:05):

**BOSHLASH (2 daqiqa) — Mentor:**
"Endi — teatr emas. Haqiqiy odam. [Ism], [biznes turi], [shahar].
[Mijoz ismi], sahna markaziga keling. 👏"

**INTERVYU (10 daqiqa) — Mentor savol, mijoz javob:**
1. "Biznesingiz qanday? Necha filial/xodim?"
2. "MoySklad dan OLDIN eng katta muammo nima edi?"
3. "Aniq raqam bering — qancha pul yoki vaqt yo'qotardingiz?"
4. "MoySklad dan KEYIN — birinchi o'zgarish nima bo'ldi?"
5. "Hozir eng ko'p foydasi nima? (telefon, hisobot, WB...)"
→ Mentor: har javobni qayta aytadi — auditoriya eshitsin

**JONLI EKRAN (15 daqiqa) — Mijoz telefoni proyektorda:**
→ Mijoz o'zi ko'rsatadi (mentor yonida)
→ Dashboard — real qoldiq
→ 1 ta muammo hal qilingan joy (masalan: inventarizatsiya hisobot)
→ "Mana — men uyda shunday ko'raman"
→ Mentor: "Siz ham shunday ko'rmoqchimisiz?" [qo'l ko'tarish]

**YAKUN (3 daqiqa):**
Mentor: "Rahmat [Ism]! Siz bugun [X] kishiga ishonch berdingiz."
Mijoz: 1 jumla — "MoySklad menga [natija] berdi"
Applaus. Mijoz o'rindiqga.

## AGAR MIJOZ KELMASA (zaxira):
→ Video intervyu (5 daqiqa) oldindan yozilgan
→ Yoki Mentor: "Kecha telefon qildim — [Ism], 5 filial, 4 mln tejagan — audio eshiting"`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'sotuv',
  },
  {
    id: 'f4-live-client', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '⭐ 11:35-12:05 | JIVOY MIJOZ KEYS — sahna + jonli ekran',
    description: `## ⭐ ASOSIY BLOK — 30 DAQIQA

**Kim:** Mentor + Mijoz + Texnik (ekran ulash)
**Targetolog:** Video yozish (30-60 soniya — keyin Reels)

## KETMA-KETLIK:
11:35 — Mijozni tanishtirish, applaus
11:37 — 5 ta savol intervyu (mentor yozib oladi — keyin sotuvda ishlatadi)
11:47 — Telefon proyektorga, mijoz o'zi navigatsiya qiladi
11:57 — Mentor: "Ko'rdingizmi? Bu real. Savol bormi?" (2 ta qisqa)
12:02 — Mijoz minnatdorchilik, applaus, o'rindiq
12:05 — Video otzivlarga o'tish

## JAMOA:
→ Assistent: mijoz suv, qulay o'rindiq
→ Sotuvchilar: qaysi auditoriya reaksiya berdi — yozib olish (keyin A segment)
→ Sotuvchi: "Siz [mijoz] kabi bo'lishni xohlaysizmi?" — tanaffusda`,
    assignee: 'mentor', status: 'pending', xpReward: 100, category: 'sotuv',
  },
  {
    id: 'f4-videos', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '🎬 12:05-12:15 | Video otzivlar (3 ta, qisqa)',
    description: `## 10 DAQIQA — 3 ta video (har biri 60-90 soniy)

Video 1 — Chakana: inventarizatsiya vaqti oldin/keyin
Video 2 — WB: jarima yo'qoldi
Video 3 — Optovik: hisobot 1 kun → 2 soat

→ Ekranda, ovoz baland
→ Mentor: "Bu hammasi shu zaldagi odamlar kabi — siz ham keyingi safar shu videoda bo'lasiz"

Keyin: "12:15 — tanaffus. Issiq ovqat tayyor. Sotuvchilar tayyor."`,
    assignee: 'mentor', status: 'pending', xpReward: 30, category: 'sotuv',
  },
  {
    id: 'f4-break-food', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '🍽 12:15-12:35 | TANAFFUS + issiq ovqat + yengil sotuv',
    description: `## TANAFFUS — 20 DAQIQA

**12:15 — Mentor:**
"Tanaffus. Issiq ovqat — orqa tomonda. 20 daqiqa. Qaytganingizda — maxsus taklif."

**Assistent:**
→ Ovqat ochish 12:15 (kelinganini tekshir 12:10)
→ Navbat tez — 2 ta stol
→ Suv, qahva to'ldirish

**Sotuvchilar (yengil, bosim yo'q):**
→ Faqat A-segment: "Kecha gaplashgan edik — tanaffusdan keyin taklif bor"
→ Boshqalarga: "Yeyish — keyin gaplashamiz"
→ Vizitka/emotsional aloqa — sotuv emas

**Targetolog:** Surat — ovqat, networking, zal`,
    assignee: 'assistent', status: 'pending', xpReward: 30, category: 'logistika',
  },

  // ══════════════════════════════════════════════════════════
  // 4.3 SOTUV OCHILISHI
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-offer-open', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '💰 12:35-12:50 | SOTUV QANDAY OCHILADI — taklif + QR (15 daqiqa)',
    description: `## SOTUV OCHILISHI — 3 BOSQICH (mentor skripti)

**1. KO'PRIK (1 daqiqa):**
"Bugun ko'rdingiz: hikoyalar, demo, **[Mijoz ismi] — haqiqiy natija**.
Pack ichida 815,000 so'mlik narsa — allaqachon sizniki.
Endi — kim o'z biznesida shunday natija xohlaydi?"

**2. SAVOL (1 daqiqa):**
"Qo'lingizni ko'taring — kim yillik auditoriya qilmoqchi?" [ko'p qo'l]
"300 mln aylanma, 10% yashirish = 30 mln. Bugun yo'lni ko'rsataman."

**3. VALUE STACK (5 daqiqa) — ekranda:**
→ 6 hafta akademiya — $1,200
→ 1:1 audit — $300
→ Shablonlar — $150
→ WB/Ozon ulash — $200
→ 3 oy support — $170
→ **Jami $2,020 → Bugun $1,500**
→ "600k seminar ayriladi = **$900** haqiqiy to'lov"

**4. URGENCY (2 daqiqa):**
"**20 ta joy.** Faqat shu zal. Faqat bugun."
"Ertaga — $2,000. Keyingi seminar — 3 oy."
"Jonli mijoz [Ism] ham shu akademiyadan o'tgan — siz ham."

**5. SOTUV OCHILISH SIGNALI (1 daqiqa):**
"Endi — **3 joy qoldi** deb e'lon qilaman. Sotuvchilarim tayyor."
→ Ekranda **QR KOD KATTA**
→ "Chap va o'ng tomonda stollar. Telefon oling — 2 daqiqada band."

**6. JAMOA HARAKATI:**
→ Sotuvchi 1 + 2 — darhol stolga, zal ichida yurish
→ Mentor: "Savollar stolda — men Q&A da"`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'sotuv',
  },
  {
    id: 'f4-sales-session', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '🔥 12:50-13:10 | SOTUV SESSIYASI — 20 ta yopish (20 daqiqa)',
    description: `## MAQSAD: 12-15 ta sotuv (asosiy to'lq)

## MENTOR (sahnada yoki markazda):
Har 3 daqiqada: "Kolleglar, **[X] joy qoldi**" — raqam kamayadi (real yoki staged)
12:55 — "10 joy qoldi"
13:00 — "5 joy qoldi"
13:05 — "3 joy qoldi"

## SOTUVCHI 1 (chap stol):
→ A-segment ro'yxati (qo'ng'iroqda "ha" deganlar)
→ Oldiga borish: "Siz bilan kelishgan edik. Band qilamizmi?"
→ iPad: to'lov linki → Click/Payme
→ To'lovdan keyin: shartnoma → Telegram guruh → "+1" guruhga yozish

## SOTUVCHI 2 (o'ng stol + zal):
→ QR oldida turganlar
→ "Yordam kerakmi? Qaysi muammo — inventar, kassir, WB?"
→ Jonli mijozga ishora: "[Ism] ham shunday edi — siz ham xohlaysizmi?"
→ B-segment

## RAD ETISHGA JAVOB (ikkalasi bilishi kerak):
| Eitish | Javob |
| Qimmat | Pack 815k + bugun $900. Ertaga $2000 |
| O'ylayman | Faqat bugun $1500. Telefon bering — ertaga qo'ng'iroq |
| Pul yo'q | $800 hozir + $700 1 oy |
| Sherik | Ikkalangiz keling — 2 joy |
| Ishonmayman | 14 kun kafolat + [jonli mijoz] kabi natija |

## REAL VAQT (Telegram guruh — jamoa):
Sotuvchi 1: "+1 — [Ism], 14 qoldi"
Mentor ovozda: "14 joy qoldi!"

## MAQSAD: 12-15 ta / 20 daqiqa`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 150, category: 'sotuv',
  },
  {
    id: 'f4-qa-sales', phaseId: 4, subModuleId: '4.2', day: 0,
    title: '❓ 13:10-13:40 | Q&A + oxirgi sotuvlar (5-8 ta)',
    description: `## Q&A + SOTUV 2-TO'LQ (30 daqiqa)

**Mentor sahnada:**
"Savol-javob. Lekin avval: **[X] joy qoldi**. Sotuvchilar ishlayapti."

## SAVOL BOSHQARUVI:
Har savol → qisqa javob → akademiyaga bog'lash:
→ "WB qanday?" → "Akademiya 3-haftada WB moduli — to'liq"
→ "Qimmat?" → Value stack 30 soniya
→ "Vaqt bormi?" → "6 hafta, haftada 2 soat — sizning tezligingizda"

## FOMO (13:25):
"Yonidagi [Ism] hozir band qildi. **2 joy qoldi**. Men gapirishni to'xtataman — kim oxirgi?"

## SOTUVCHILAR:
→ Q&A davomida stollar ishlaydi
→ Qo'l ko'targan — "Savolingizdan keyin yon tomonda gaplashamiz"
→ 13:35 — oxirgi "1 joy" — drama

## MENTOR YAKUN (13:38):
"So'nggi joy. Kim? ... [Applaus yangi xaridorga]
Qolganlar — assistent bilan gaplashasiz. Dojim 7 kun."`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'sotuv',
  },
  {
    id: 'f4-closing', phaseId: 4, subModuleId: '4.3', day: 0,
    title: '🏁 13:40-14:00 | YAKUN — shartnoma, Telegram, hisobot',
    description: `## YAKUNLASH (20 daqiqa)

**13:40 — Mentor (3 daqiqa):**
"Bugun ko'rdingiz: networking, 3 hikoya, demo, **[Mijoz]** jonli keys, taklif.
Akademiya olganlar — chap stol. Pack olib keting. Telegram VIP guruh — 24 soat ichida link."

**13:45 — XARIDORLAR (Assistent + Sotuvchilar):**
☐ Shartnoma imzo
☐ Telegram: @moyskladpro_guruh
☐ "Ertaga 19:00 — 1-dars"
☐ Surat (ixtiyoriy)

**13:50 — DOJIM RO'YXATI (Sotuvchi 2):**
Olmaganlar — ism, telefon, segment (A/B/C)
Google Sheets "Dojim T+1"

**14:00 — JAMOA HISOBOT:**
| Ko'rsatkich | Maqsad | Haqiqat |
| Kelganlar | 200 | [___] |
| Sotuv 12:50-13:10 | 15 | [___] |
| Sotuv Q&A | 5 | [___] |
| Jami | 20 | [___] |
| $ | $30,000 | [___] |

**Targetolog 13:30:** Story — zal, "Bugun X ta oila"
**14:30:** Jamoa choyxona — natija muhokama`,
    assignee: 'jamoa', status: 'pending', xpReward: 60, category: 'sotuv',
  },
  // ══════════════════════════════════════════════════════════
  // 4.3 SEMINARDAN KEYIN — T0 kechqurun + T+1
  // ══════════════════════════════════════════════════════════
  {
    id: 'f4-post-debrief', phaseId: 4, subModuleId: '4.3', day: 0,
    title: '🏁 14:30 | Jamoa debriefing — nima ishladi, nima ishlamadi',
    description: `## 14:30 — JAMOA YIG'ILISH (1 soat, choyxona/ofis)

## HISOBOT BLANKASI:
| Ko'rsatkich | Maqsad | Haqiqat |
|-------------|--------|---------|
| Kelganlar | 200 | [___] |
| Sotuv tanaffus | 12-15 | [___] |
| Sotuv Q&A | 5-8 | [___] |
| **Jami sotuv** | **20** | **[___]** |
| Daromad | $30,000 | $[___] |

## TAHLIL SAVOLLARI:
**Mentor:** "Qaysi hikoya eng yaxshi ishladi? Qaysi moment energiya tushdi?"
**Sotuvchi 1:** "Qaysi segment tez yopdi? Qaysi objection eng ko'p keldi?"
**Sotuvchi 2:** "Zal ichida kim faol edi? Kim rad etdi — sabab?"
**Assistent:** "Logistikada nima muammo? Pack, kirish, ovqat?"
**Targetolog:** "Qaysi Story eng ko'p reaction oldi?"

## KEYINGI SEMINAR UCHUN YOZISH:
→ Nima o'zgartirish kerak (TOP 3)
→ Nima albatta qoldirish kerak (TOP 3)`,
    assignee: 'jamoa', status: 'pending', xpReward: 30, category: 'logistika',
  },
  {
    id: 'f4-post-600k', phaseId: 4, subModuleId: '4.3', day: 0,
    title: '📞 T0 kechqurun | To\'lab kelmaganlar — darhol muloqot (C-segment)',
    description: `## T0 KECHQURUN 16:00-18:00 — TO'LAB KELMAGANLAR (C-segment)

To'lagan (600k) lekin kelmagan → ular qaytarish so'rashi yoki kursga o'tishi mumkin.

## QONINGIROQ SKRIPT (Sotuvchi 1):
"Salom [Ism]! Bugun kela olmadingiz — tushunaman.
Bugun [X] ta kishi akademiyaga qo'shildi — ajoyib seminar bo'ldi.
Siz uchun 2 ta variant:
1. Keyingi seminar — [TAXMINIY SANA], 600k saqlanadi
2. Akademiya hozir — $1,500, 600k ayriladi = $900 haqiqiy to'lov
Qaysi variant qulay?"

→ Hozir → to'lov linki + shartnoma
→ Keyingi seminar → ro'yxatga yozish, eslatma
→ Qaytarish → shartnoma shartlariga ko'ra

## T0 KECHQURUN 20:00:
☐ Barcha C-segment bilan bog'landi
☐ Akademiyaga qo'shilganlar: [___]
☐ Keyingi seminarga: [___]`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 60, category: 'dojim',
  },
  {
    id: 'f4-post-telegram', phaseId: 4, subModuleId: '4.3', day: 0,
    title: '💬 T0 kechqurun | Xaridorlarni VIP Telegram guruhga qo\'shish',
    description: `## SEMINAR KUNI KECHQURUN (Assistent, 14:00-17:00):
☐ Har xaridorning telefonini guruhga qo'shish
☐ Welcome pin xabar:
"👋 Xush kelibsiz, MoySklad PRO Akademiya!
Siz [X] ta tadbirkorning kuchli guruhisiz.
📅 1-dars: [SANA 19:00]
📦 Course Pack: [SANA]da yetkaziladi
❓ Savol → @assistent
Ertaga boshlanadi! 💪"

☐ Har kishi "Kirdi" — tekshiruv ro'yxati
☐ Kirmagan → shaxsiy DM: "Guruh linki: [LINK]"

## T0 KECHQURUN TARGETOLOG (19:00 Stories):
→ "Bugun [X] ta tadbirkor akademiyaga qo'shildi"
→ Zal surati (ruxsatda)
→ "Dojim 3 kun — 3 joy qoldi"`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f4-post-content', phaseId: 4, subModuleId: '4.3', day: 0,
    title: '📲 T0 kechqurun | Kontent — Reels montaj, social proof, Stories',
    description: `## T0 KECHQURUN KONTENT (Targetolog, 14:00-22:00)

## DARHOL (14:00-15:00):
☐ Story 1: Zal surati — "Bugun [X] ta biznes egasi"
☐ Story 2: "Joylar shu kuniyoq band bo'ldi"
☐ Story 3: Xaridorlar guruh surati (ruxsat bilan)

## REELS MONTAJ (15:00-19:00) — 90 soniya highlights:
→ 0-10s: Zal to'lmoqda (kirish vaqti)
→ 10-25s: Mentor hikoya + auditoriya
→ 25-50s: Jonli DEMO — telefon ekrani
→ 50-70s: Jonli keys mijoz (15s klip)
→ 70-85s: Sotuv daqiqasi — qo'l ko'tarish
→ 85-90s: Logo + "Dojim 3 kun"

Caption: "[X] ta tadbirkor bugun hayotini o'zgartirishga qaror qildi.
3 joy qoldi — [LINK] ☝️"

## REELS CHIQARISH (20:00):
☐ Instagram + Telegram kanal
☐ Hamkorlarga ulashing so'rash`,
    assignee: 'targetolog', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f4-post-b-segment', phaseId: 4, subModuleId: '4.3', day: 1,
    title: '🎯 T+1 | B-segment — Keldi lekin olmadi (issiq dojim ro\'yxat)',
    description: `## T+1 ERTALAB — B SEGMENT TAHLIL (Sotuvchilar, 9:00-10:00)

B-segment = Keldi + Olmadi — bu eng kuchli dojim segmenti.

## SEGMENTLASH (seminar kuni yozilgan kuzatuv):
→ Kim faol yozdi → A+
→ Kim sotuv vaqtida qiziqdi lekin olmadi → A
→ Kim tingladi, reaktsiya yo'q → B
→ Kim erta ketdi → C

## QO'NG'IROQ SKRIPT (T+1, 14:00-18:00):
"Salom [Ism]! Kecha seminarda birga bo'ldik — ajoyib bo'ldi.
[Mentor] aytganlaridan qaysi biri sizga eng tegishli edi?
[Tinglash]
Aynan shu uchun akademiyada [modul X] bor — qadamlar aniq.
Bugun 3 joy — $1,500. Ertaga $2,000. Band qilamizmi?"

→ Ha → to'lov linki, shartnoma
→ Yo'q → "Nima to'xtatyapti?" → sabab → qayta ishlash

## MAQSAD T+1:
☐ Barcha B-segment bilan bog'landi
☐ 3 ta sotuv yopildi
☐ Natija → Sheets "Dojim T+1"`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 80, category: 'dojim',
  },

  // ══════════════════════════════════════════════════════════
  // FAZA 5 — ASOSIY KURS ($2,000) · T+1 dan T+21
  // ══════════════════════════════════════════════════════════

  // 5.0 MASTER REJA
  {
    id: 'f5-master', phaseId: 5, subModuleId: '5.1', day: 1,
    title: '📋 MASTER REJA — $2,000 kurs launch (T+1 → T+21)',
    description: `## NEGA BU FAZA MUHIM
Seminar — 600k, 90 daqiqa. **Kurs — $2,000, 6 hafta.** Xaridor "premium" kutadi: shartnoma, platforma, Pack, progrev, aniq jadval.

## 3 BOSQICH:

**BOSQICH 1 — DOJIM (T+1 → T+7):** Qolgan 5-7 sotuv + barcha to'lovlarni yig'ish
**BOSQICH 2 — TAYYORGARLIK (T+5 → T+14):** Shartnoma, joy, platforma, Pack, darslar yozish
**BOSQICH 3 — LAUNCH (T+14 → T+21):** Progrev, 1-dars, onboarding

## VAQT JADVALI (qisqa):

| Kun | Asosiy ish |
| T+1 | Dojim boshlash + to'lov linklari yuborish |
| T+2 | Loom video + highlights Reels |
| T+3 | "Guruh yopilmoqda" urgency |
| T+5 | Barcha shartnomalar imzo + to'lov 100% |
| T+7 | Platforma ochiq + progrev boshlash |
| T+10 | Course Pack buyurtma |
| T+12 | 6 hafta darslar rejasi tasdiq |
| T+14 | Progrev: "3 kun qoldi" |
| T+15 | **1-DARS LIVE** |
| T+21 | Zapusk hisobot |

## JAMOA ROLLARI:

| Rol | Mas'uliyat |
| Mentor | Darslar, Loom, live session, progrev postlari |
| Assistent | Platforma, Pack, shartnoma, guruh, tracking |
| Sotuvchi 1-2 | Dojim qo'ng'iroq, to'lov qildirish |
| Targetolog | Urgency kontent, retarget |

## MAQSAD RAQAMLAR:
☐ Jami talaba: 25-27 ($2,000)
☐ To'lov 100% yig'ilgan (T+7 gacha)
☐ Shartnoma imzolangan: 100%
☐ Platformaga kirgan: 90%+
☐ 1-dars ko'rgan: 80%+`,
    assignee: 'jamoa', status: 'pending', xpReward: 50, category: 'logistika',
  },

  // 5.1 KURS OLDI DOJIM
  {
    id: 'f5-t1-1', phaseId: 5, subModuleId: '5.1', day: 1,
    title: '📞 T+1 | Dojim boshlash — segmentlar va qo\'ng\'iroq skriptlari',
    description: `## MAQSAD: T+1-T+3 da qo'shimcha 5-7 ta sotuv

## SEGMENT TAHLILI (seminar kunidan ma'lumot):
A: Keldi + sotib oldi → Telegram guruhda, kuzatish kerak emas
B: Keldi + olmadi → ISIQ — sababini bilamiz, qo'ng'iroq kerak
C: Kelmadi + to'lagan (600k) → Qaytarish so'raydi yoki keyingi seminar
D: Kelmadi + to'lamagan → Reklama orqali ishlash

## B SEGMENT — KELDI LEKIN OLMADI (eng muhim):

QO'NG'IROQ SKRIPTI T+1 (kechqurun 15:00-18:00):
"Salom [Ism]! Bugungi seminar yaxshi o'tdi. Siz ham bo'ldingiz.
Sizning hissiyotingiz qanday — nima eng foydali bo'ldi?"
[Tinglang — ular aytadi]
"Aynan shu [MUAMLO] bo'yicha akademiya da [MODULE X] bor.
Bugun va ertaga 3 joy qoldi — $1,500. Keyin $2,000.
Hozir band qilasizmi?"

→ Ha → to'lov linki, shartnoma
→ Yo'q → "Nima to'xtatyapti?" → sababni eshiting → qayta ishlash

## C SEGMENT — KELMADI (600k to'lagan):

QO'NG'IROQ SKRIPTI:
"Salom [Ism]! Bugun kela olmadingiz — nima bo'ldi?"
[Tinglang]
"Tushunaman. Endi nima qilish mumkin:
1. Keyingi seminar — [taxminiy sana]
2. Yoki akademiyani hozir boshlaysiz — seminar 600k ayriladi
Qaysi biri qulayroq?"

## Loom SHAXSIY VIDEO (mentor, A+B segmentga):
60 soniya video, har kishi uchun alohida link (loom.com):
"Salom [Ism]! Kecha [siz aytgan narsa] — menga yoqdi.
Aynan shu muamlo uchun akademiya da 3-modul bor.
3 joy qoldi — [LINK]. Ertaga kech bo'lishi mumkin"

→ Loom video: o'qish darajasi 80%+ (oddiy matn: 20%)`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'dojim',
  },
  {
    id: 'f5-t1-loom', phaseId: 5, subModuleId: '5.1', day: 1,
    title: '🎥 T+1 | Loom shaxsiy video — har B-segmentga 60 soniya',
    description: `## MAQSAD
Shaxsiy video = 3-5x yuqori konversiya qo'ng'iroqdan.

## LOOM YOZISH (Mentor, T+1 ertalab — 2 soat):
Har B-segment uchun alohida (30-40 ta):
"Salom [Ism]! Kecha seminarda siz [MUAMLO] haqida gapirgansiz — eslayman.
Men [Mentor]. Akademiyada aynan shu modul bor — 6 hafta.
Bugun 3 joy qoldi — $1,500. Link: [LINK]
Savol bo'lsa — javob yozing."

## YUBORISH:
→ WhatsApp/Telegram: "Siz uchun 60 soniyalik video: [LOOM LINK]"
→ O'qilganini kuzatish (Loom analytics)
→ O'qimagan → T+2 qo'ng'iroq

## MAQSAD: 40% video ko'radi → 20% javob → 5-7 sotuv`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'dojim',
  },
  {
    id: 'f5-t1-2', phaseId: 5, subModuleId: '5.1', day: 1,
    title: '📞 T+1-T+2 | Sotuvchilar: dojim qo\'ng\'iroq raundi (40-50 ta)',
    description: `## QO'NG'IROQ JADVALI (T+1 va T+2):

SOTUVCHI 1 — B segment (keldi, olmadi):
Maqsad: 3-4 ta sotuv yopish
Qo'ng'iroq soni: 40-50 ta
Skript: "Kecha seminardan nima oldingiz? [Javob] — aynan shu uchun akademiya..."

SOTUVCHI 2 — D segment (kelmadi, to'lamadi):
Maqsad: 1-2 ta sotuv
Qo'ng'iroq soni: 30-40 ta
Skript: "Salom! Siz [SANA] seminarimizga ro'yxatdan o'tgandingiz. Kela olmadingiz — nima bo'ldi? Bizning akademiyamiz haqida qisqacha aytib bersakmi?"

## GOOGLE SHEETS — DOJIM TAB:
| A: Ism | B: Segment | C: Telefon | D: T+1 qo'ng'iroq | E: Javob | F: T+2 | G: T+3 | H: Sotuv

SKRIPT — RAD ETISHGA JAVOBLAR:
"Hozir pul yo'q" → "Bo'lib to'lash: bugun $800, bir oydan keyin $700"
"Uyda maslahatlashaman" → "Nima vaqtda javob olsam? Ertaga ertalab qo'ng'iroq qilayinmi?"
"Kurs foydali bo'ladimi?" → "14 kun kafolat — natija yo'q → to'liq qaytarish"
"Keyingi seminar bormi?" → "3 oydan keyin. Lekin narx $2,000 bo'ladi"

## MAQSAD:
☐ T+1: 3 ta sotuv
☐ T+2: 2 ta sotuv
☐ T+3: 1-2 ta sotuv
☐ Jami dojim sotuvlari: 5-7 ta + seminar kuni 20 ta = 25-27 ta JAMI`,
    assignee: 'sotuvchi1', status: 'pending', xpReward: 100, category: 'dojim',
  },
  {
    id: 'f5-t3-urgency', phaseId: 5, subModuleId: '5.1', day: 3,
    title: '⏰ T+3 | Oxirgi dojim — WhatsApp, Stories, retarget, hisobot',
    description: `## T+3 OXIRGI SOTUV KUNI

WhatsApp B+D segment, Telegram "Guruh YOPILMOQDA", 5 Stories, Meta $20 retarget.
Hisobot: seminar 20 + dojim 5-7 = 25-27 talaba.`,
    assignee: 'assistent', status: 'pending', xpReward: 60, category: 'dojim',
  },
  {
    id: 'f5-t2-highlights', phaseId: 5, subModuleId: '5.1', day: 2,
    title: '📣 T+2 | Seminar highlights Reels + social proof',
    description: `## REELS 90 soniy — zal, demo, otzivlar. Caption: NAVBAT trigger.
5 Stories: "20+ akademiyaga qo'shildi", "2 joy qoldi".`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'dojim',
  },

  // ══════════════════════════════════════════════════════════
  // 5.2 TO'LOV & SHARTNOMA
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-pay-system', phaseId: 5, subModuleId: '5.1', day: 1,
    title: '💳 T+1 | To\'lov tizimi — Click, Payme, bo\'lib to\'lash, invoice',
    description: `## MAQSAD
$2,000 to'lov — **oson, tez, ishonchli**. Har talaba T+3 gacha to'liq to'lagan.

## TO'LOV USULLARI:

| Usul | Qachon | Kim sozlaydi |
| Click/Payme | Darhol | Assistent |
| Naqd (ofis) | Kelganda | Sotuvchi + kassa |
| Bo'lib to'lash | Kelishuv | Mentor tasdiq |

## BO'LIB TO'LASH SHARTI ($1,500):
Variant A: $800 hozir + $700 30 kun ichida
Variant B: $500 + $500 + $500 (3 oy)
→ Shartnoma alohida ilova
→ Kechiksa: 3 kun eslatma → 7 kun to'xtatish

## INVOICE (har to'lovchi uchun):
Google Docs shablon:
→ "MoySklad PRO Akademiya — [Ism]"
→ Summa: $1,500 (yoki so'm ekvivalenti)
→ Seminar 600k ayrildi: -$X
→ Jami to'lanadi: $900
→ Rekvizitlar, INN

## TO'LOV QILDIRISH ALGORITMI (Sotuvchi):

1. "Band qilamizmi?" → Ha
2. iPad/telefon: link ochiq — **test qiling oldindan**
3. To'lov → screenshot/sms tasdiq
4. Google Sheets: ✓ To'landi | Sana | Usul
5. Assistentga xabar: "+1 to'lov — [Ism]"
6. Shartnoma yuborish (keyingi task)

## GOOGLE SHEETS "TALABALAR":
| Ism | Tel | Segment | Seminar | To'lov | Qoldiq | Shartnoma | Guruh |
| A1 | ... | B | ✓ | $1500 | 0 | ✓ | ✓ |

## MAQSAD T+7:
☐ 25+ talaba ro'yxatda
☐ 100% to'lov yig'ilgan yoki bo'lib-to'lash shartnomasi`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'sotuv',
  },
  {
    id: 'f5-contract', phaseId: 5, subModuleId: '5.1', day: 2,
    title: '📄 T+2 | Shartnoma — yuridik, oferta, imzo jarayoni',
    description: `## SHARTNOMA PAKETI (har $2,000 talaba uchun):

**1. OMMaviy OFERTA** (1 marta — sayt/Telegram):
→ Kurs narxi, muddati (6 hafta), kafolat (14 kun)
→ Qaytarish shartlari
→ Mentor javobgarligi chegarasi
→ Yurist tekshiruvi (T-10 dan oldin tayyor bo'lishi kerak — Faza 1.4)

**2. SHAXSIY SHARTNOMA** (har talaba):
→ Ism, pasport/INN (yuridik shaxs bo'lsa)
→ Summa, to'lov grafigi
→ Imzo: qo'lda + skan YOKI DocuSign/TrustContract
→ 2 nusxa: 1 talaba, 1 arxiv

## IMZO JARAYONI (T+1 dan boshlab):

Variant A — Zalda (seminar kuni + T+1):
☐ 2 nusxa chop
☐ Talaba imzo
☐ Siz imzo + pechat (agar bor)

Variant B — Onlayn (T+2-T+5):
→ PDF yuborish WhatsApp
→ "Imzo qo'ying, skan yuboring"
→ Assistent arxivga saqlash: Google Drive /Talabalar/[Ism]/

## KAFOLAT BANDI (shartnomada aniq):
"14 kun ichida Modul 1 ni tugatib, natija ko'rmagan talaba — to'liq qaytarish so'rovi (yozma)."

## TEKSHIRUV:
☐ Har to'lovchi = shartnoma bor
☐ Bo'lib to'lash = qo'shimcha grafik ilova`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  // ══════════════════════════════════════════════════════════
  // 5.3 KURS JOYI & FORMAT
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-venue', phaseId: 5, subModuleId: '5.1', day: 5,
    title: '🏫 T+5 | Kurs o\'tiladigan joy — online + offline format tanlash',
    description: `## FORMAT TANLASH ($2,000 uchun tavsiya: GIBRID)

**ASOSIY:** Online (video + haftalik LIVE)
**QO'SHIMCHA:** 2 ta offline uchrashuv (networking + qo'lda yordam)

## VARIANT A — 100% ONLINE:
→ Zoom/Telegram Live — har Juma 19:00
→ Afzallik: butun O'zbekiston, arzon
→ Kamchilik: kamroq "premium" his

## VARIANT B — GIBRID (TAVSIYA):
→ 4 hafta online
→ 2-hafta va 5-hafta: ofisda 3 soatlik workshop (Toshkent)
→ Afzallik: networking, yuqori retention

## OFFLINE JOY TALABLARI (agar workshop):
☐ 30-50 kishi sig'adi
☐ Proyektor + internet 20+ Mbit
☐ Har kishi uchun stol (laptop uchun)
☐ Kofe break zona
☐ Manzil: markaz, avtoturargoh yaqin
☐ Narx: kuniga 500k-1.5 mln

## JADVAL (6 hafta):
| Hafta | Online | Offline |
| 1 | Video 1-3 + LIVE Juma | — |
| 2 | Video 4-6 | Workshop #1 (Shanba 10:00) |
| 3-4 | Video 7-12 + LIVE | — |
| 5 | Video 13-15 | Workshop #2 |
| 6 | Yakun + sertifikat | — |

## QOIDALAR (talabalarga):
→ LIVE da kamera yoqish tavsiya
→ Savollar chat da — LIVE oxirida 20 daqiqa Q&A
→ Uy ishi: har hafta deadline — yakshanba 23:59
→ Kechiksa: 1 ogohlantirish → 2 kechikish = guruhdan chiqish (qoidalar shartnomada)`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'logistika',
  },

  // ══════════════════════════════════════════════════════════
  // 5.4 PROGREV AUDITORIYA
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-progrev-plan', phaseId: 5, subModuleId: '5.1', day: 7,
    title: '🔥 T+7 | Progrev boshlash — 7 kun talabalarni isitish',
    description: `## MAQSAD
To'lov qilgan odam **kutish davrida sovimasin**. T+7 dan T+14 — har kuni aloqa.

## 7 KUNLIK PROGREV JADVALI:

**T+7:** Yopiq guruhga qo'shish + "Xush kelibsiz" video (Mentor 2 daqiqa)
**T+8:** "Tanishing" — har kishi ism + biznes yozadi, Mentor javob
**T+9:** PDF: "MoySklad ochish — 1-kun checklist" (bepul)
**T+10:** Poll: "Qaysi modul sizga eng muhim?" (engagement)
**T+11:** Mini-LIVE 15 daqiqa: "Kursda nima bo'ladi — 6 hafta overview"
**T+12:** Mijoz video (seminardagi jonli keys) — repost
**T+13:** "Ertaga 1-dars! Tayyorlaning" + Course Pack yetkazish rejasi
**T+14:** "BUGUN 1-DARS" countdown

## KIM NIMA QILADI:
| Kun | Mentor | Assistent |
| T+7 | Welcome video | Guruhga qo'shish, ro'yxat |
| T+8 | 10 ta personal javob | Barcha a'zolarni tag |
| T+11 | Mini-LIVE | Texnik Zoom |
| T+13 | "Ertaga" post | Pack tracking |

## TELEGRAM GURUH QOIDALARI (pin post):
1. Savol — @assistent
2. Uy ishi — hafta oxirida
3. Reklama yo'q
4. O'zaro yordam — rag'batlantiriladi`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f5-progrev-live', phaseId: 5, subModuleId: '5.1', day: 11,
    title: '📡 T+11 | Mini-LIVE — "6 hafta nima o\'rganasiz" (15 daqiqa)',
    description: `## MINI-LIVE SKRIPT (T+11, 19:00, Telegram Live yoki Zoom):

0-2 min: "Salom, siz [X] kishi — kuchli guruh"
2-5 min: 6 hafta modullar (slayd)
5-10 min: 1 ta demo — 30 soniya
10-13 min: Savollar
13-15 min: "T+14 — 1-dars. Pack yo'lda. Tayyor bo'ling."

Recording → guruhga qo'yish (kelmaganlar uchun).`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'kontent',
  },

  {
    id: 'f5-course-presentation', phaseId: 5, subModuleId: '5.1', day: 9,
    title: '🎓 T+9 | Asosiy kurs presentatsiyasini tayyorlash — 6 hafta tuzilishi',
    description: `## MAQSAD
Kurs presentatsiyasi — faqat slayd emas. Bu talabani "ishonch → ilhom → harakat"ga olib boruvchi yo'l.
Har hafta boshida yangi slayd to'plami ishlatiladi + 1-dars LIVE uchun alohida to'plam.

---

## PRESENTATSIYA TURLARI (4 xil)

### 1. WELCOME / ONBOARDING PRESENTATSIYA (T+14 — 1-dars)
**Qachon:** Birinchi LIVE sessiya boshida
**Maqsad:** Talabalarni ruhlantirib, kurs tizimini tushuntirish

#### Slayd tuzilishi:
**Slayd 1 — XUSH KELIBSIZ:**
☐ "MoySklad PRO Akademiya — Guruh [N]"
☐ Sana + mentor nomi
☐ Brend rang + professional dizayn

**Slayd 2 — BU KIM BOR:**
☐ "Siz [N] ta — har biringiz aniq maqsad bilan kelgansiz"
☐ Auditoriya segmentlari vizual: Chakana / Marketplace / Ulgurji / Yangi Boshlovchi

**Slayd 3 — 6 HAFTA NIMA BO'LADI:**
☐ Haftalik kalendarь (vizual yo'l xaritasi)
|| Hafta | Mavzu | Natija |
||-------|-------|--------|
|| 1 | Poydevor — Tovar va Ombor | Real ishchi bazangiz |
|| 2 | Kassir va Savdo | Sotuv avtomatlashtirilgan |
|| 3 | Moliya va Xarajat | Foyda aniq ko'rinadi |
|| 4 | Xodim va Nazorat | Kimki nima qilgani bor |
|| 5 | Hisobotlar va Tahlil | Qaror raqam bilan |
|| 6 | Integratsiya va Kelajak | Keyingi o'sish rejasi |

**Slayd 4 — QOIDALAR (Community shartnoma):**
☐ Darslar: Seshanba + Shanba — 20:00
☐ Uy ishi: har darsdan keyin 48 soat
☐ Savol: Telegram guruh (24 soatda javob)
☐ Kechikish: recording 48 soatda yuklanadi
☐ Sertifikat: 80% uy ishi + yakuniy loyiha

**Slayd 5 — SIZNING NATIJANGIZ (VIZUALIZATSIYA):**
☐ "6 haftadan keyin sizda nima bo'ladi" — konkret ro'yxat
   → Real vaqtda inventar nazorati
   → Avtomatik hisobotlar
   → Xodim nazorat tizimi
   → Pul oqimi ko'rinadi
   → Keyingi o'sish rejasi tayyor

**Slayd 6 — MENTOR BILAN BO'LISH:**
☐ "Savol → guruhga yozing" — demo
☐ Shaxsiy mentorluk qoidasi
☐ "Biz bu safar — jamoa"

---

### 2. HAFTALIK DARS PRESENTATSIYALARI (Hafta 1-6)
**Qachon:** Har LIVE sessiya boshida (2 soat)
**Format:** Har hafta alohida fayl

#### UMUMIY TUZILISH (har hafta uchun):

**Blok A — KIRISH (10 daqiqa | 3-4 slayd):**
☐ Slayd: "Hafta [N] — [Mavzu nomi]"
☐ O'tgan haftani xulosa (1 slayd)
☐ Uy ishi natijalar ko'rgazmasi (1 slayd)
☐ "Bugun nima o'rganamiz" — 3 ta kalit fikr

**Blok B — NAZARIYA (20 daqiqa | 6-8 slayd):**
☐ Har konsept uchun alohida slayd
☐ Visual > matn (sxema, diagram, screenshot)
☐ Real biznes misoli har konseptda
☐ "Nima uchun bu muhim?" — har slaydda

**Blok C — JONLI DEMO (40 daqiqa | 4-5 slayd):**
☐ Slayd 1: "Endi LIVE — ekranimi ko'ring"
☐ Demo davomida fon slayd (qadamlar ko'rinib tursin)
☐ Har qadamda PAUSE — "Siz ham qiling"
☐ "Ko'rdingizmi? — Savol?" slayd (har 10 daqiqada)

**Blok D — AMALIYOT (25 daqiqa | 2-3 slayd):**
☐ "Endi SIZ" — topshiriq slayd
☐ Topshiriq: aniq, o'lchanadigan
☐ "5 daqiqa ichida qiling — men kuzataman"

**Blok E — YAKUN va UY ISHI (5 daqiqa | 2 slayd):**
☐ "Bugun nima o'rgandik" — 3 kalit fikr
☐ Uy ishi: aniq topshiriq + deadline
☐ "Keyingi sessiyada" — preview

---

### 3. YAKUNIY LOYIHA PRESENTATSIYASI (Hafta 6 oxiri)
**Qachon:** Oxirgi sessiya — talabalar o'z natijalarini ko'rsatadi
**Format:** Har talaba 5-7 daqiqa

#### Talabaga beriladigan shablon:
**Slayd 1:** Biznes nomi + sohasi
**Slayd 2:** MoySkladdan OLDIN — muammo + raqam
**Slayd 3:** 6 haftada nima o'zgardi — raqam
**Slayd 4:** Screenshot — real MoySklad (o'zinikiniki)
**Slayd 5:** Keyingi 3 oyda reja

---

### 4. SERTIFIKAT MAROSIMI SLAYDLARI (T+21)
**Qachon:** Yakuniy sessiya oxiri — 20 daqiqa
**Format:** Har talaba uchun alohida slayd

☐ "Tabriklaymiz, [Ism]!" slayd (barchaga alohida)
☐ Kurs davomida eng yaxshi natija raqami
☐ Jamoa foto + group hug moment
☐ "Alumni Community ga xush kelibsiz" slayd
☐ Keyingi guruh e'loni + chegirma (alumni uchun)

---

## DIZAYN TALABLARI (barcha presentatsiyalar uchun):

### Kurs stili:
☐ Asosiy: quyuq fon (Navy / Slate / qora) + och matn
☐ Accent rang: brend rangingiz (oltin, ko'k, yashil)
☐ Har modul uchun o'z rangi (vizual identifikatsiya)
   → Hafta 1: Ko'k
   → Hafta 2: Yashil
   → Hafta 3: To'q sariq
   → Hafta 4: Binafsha
   → Hafta 5: Moviy
   → Hafta 6: Oltin

### Qoidalar:
☐ 1 slayd = 1 g'oya (agar 2 bo'lsa — 2 slaydga bo'l)
☐ Shrift: sarlavha 40px+, tana 28px+
☐ Screenshot va GIF — asosiy vosita (gapirma, ko'rsat)
☐ Har 10 slaydda "breathing" slayd — yengil, minimal

## VOSITALAR:
→ Canva Pro (template kutubxona + brend kit)
→ Google Slides (real vaqtda tahrirlash + talabalar ham ko'ra oladi)
→ Loom yoki OBS (dars recording)
→ Figma (agar chiroyli screenshot kerak bo'lsa)

## TAYYORGARLIK JADVALI:
| Kun | Ish | Kim |
|-----|-----|-----|
| T+9 | Welcome + Hafta 1 slayd draft | Mentor |
| T+10 | Dizayn + brend | Assistent |
| T+11 | Mentor tekshiruvi + to'g'irlash | Mentor |
| T+12 | Hafta 2-3 draft | Mentor |
| T+13 | Hafta 2-3 dizayn | Assistent |
| T+14 | 1-DARS — Welcome presentatsiya ishlatiladi | LIVE |
| T+14-21 | Hafta 4-6 parallel tayyorlanadi | Mentor |

## MUHIM ESLATMA:
⚠️ Har dars presentatsiyasida:
→ Har slaydda mentor nomi + logo (past chap)
→ Guruh raqami va hafta raqami (past o'ng)
→ Telegram guruh linki (har slaydda izoh sifatida)
→ Offline versiya: har talabaga PDF ko'rinishida yuborilsin`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'kontent',
  },

  // ══════════════════════════════════════════════════════════
  // 5.5 PLATFORMA & LMS
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-platform', phaseId: 5, subModuleId: '5.1', day: 7,
    title: '💻 T+7 | Kurs platformasi — Telegram + Drive + tracking',
    description: `## PLATFORMA STACK ($2,000 uchun optimal):

**1. YOPIQ TELEGRAM GURUH** — aloqa, e'lonlar, LIVE
**2. GOOGLE DRIVE PAPKA** — videolar, PDF, shablonlar
**3. GOOGLE SHEETS** — progress tracking (assistent)
**4. ZOOM** (ixtiyoriy) — LIVE session recording

## DRIVE TUZILMASI:
/MoySklad PRO Akademiya [Guruh 1]/
  /Hafta 1 — Poydevor/
    Video 1.1.mp4
    PDF Qo'llanma.pdf
    Uy ishi.docx
  /Hafta 2 — Kassir/
  ...
  /Shablonlar/
  /Recordings LIVE/

## ACCESS:
→ Har talabaga shaxsiy link YOKI umumiy link (guruh ichida)
→ "Faqat ko'rish" — download off (video himoya)

## TRACKING SHEET (Assistent):
| Ism | Guruh | W1 video | W1 uy | LIVE | W2 ... |
→ Haftalik: kim orqada — Mentor ga report

## ALTERNATIVA (keyingi guruh uchun):
GetCourse, Antitrain, Teachable — $50-200/oy`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'logistika',
  },

  // ══════════════════════════════════════════════════════════
  // 5.6 COURSE PACK
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-course-pack', phaseId: 5, subModuleId: '5.1', day: 10,
    title: '📦 T+10 | Course Pack — $2,000 talaba uchun premium quti',
    description: `## COURSE PACK ≠ SEMINAR PACK (yuqoriroq daraja)

| Narsa | Seminar Pack | Course Pack |
| Qop | Qora A4 | **Premium quti** (30×25×8 sm) |
| Bej | 1 kunlik | **"Talaba"** metall bej |
| Bloknot | Diagnostika | **6 hafta planner** |
| USB | Bepul materiallar | **Barcha darslar** + shablonlar |
| Qo'shimcha | — | MoySklad 1 oy trial kod |
| Qo'shimcha | — | Mentor shaxsiy vizitka |
| Qo'shimcha | — | "PRO Alumni" stiker |

## ICHIDAGI NARSALAR (har talaba):

1. **Premium quti** — qora, magnit qopqoq, oltin "MOYSKLAD PRO ALUMNI"
2. **Metall bej** — "Talaba | [Ism] | Guruh [N]"
3. **6 Hafta Planner** — A5, har hafta checklist + uy ishi joyi
4. **Ruchka + marker** — brendli
5. **USB 32GB** — barcha video (yuklangan), PDF, Excel shablonlar
6. **Trial kod kartochka** — MoySklad 30 kun (yoki 14)
7. **Mentor vizitka** — shaxsiy Telegram
8. **Shablon to'plami** — chop etilgan: inventarizatsiya, kassir, WB
9. **Sertifikat blank** — 6 hafta oxirida to'ldiriladi
10. **Welcome xat** — qo'lda imzo (Mentor)

## QIYMAT HISOB (sotuvda aytish):
Jami: 1,200,000+ so'm — siz allaqachon $2,000 to'ladingiz

## YETKAZISH:
Variant A: 1-dars kunida zalda berish (offline)
Variant B: BTS/EMS T+12-T+14 (online talabalar)
→ Tracking raqam har kishiga

## BUYURTMA (T+10):
☐ 30 dona (25 talaba + 5 zaxira)
☐ Bej ismlar T+12 ro'yxatdan`,
    assignee: 'assistent', status: 'pending', xpReward: 60, category: 'logistika',
  },
  {
    id: 'f5-materials', phaseId: 5, subModuleId: '5.1', day: 8,
    title: '📚 T+8 | Materiallar va instrumentlar ro\'yxati',
    description: `## MATEMATIALLAR (Mentor tayyorlaydi T+8-T+14):

| # | Material | Format | Kim |
| 1 | 18 ta video dars | MP4 1080p | Mentor |
| 2 | 6 ta LIVE recording | MP4 | Assistent |
| 3 | 6 ta PDF qo'llanma | PDF A4 | Mentor |
| 4 | 10 ta Excel shablon | .xlsx | Mentor |
| 5 | Uy ishi vazifalar | Google Doc | Mentor |
| 6 | Sertifikat dizayn | Canva | Assistent |
| 7 | FAQ 50 savol | Notion/Doc | Assistent |

## INSTRUMENTLAR (talaba kerak bo'ladi):

**Majburiy:**
☐ Smartphone yoki kompyuter
☐ Internet (MoySklad demo uchun)
☐ Email

**Tavsiya etiladi:**
☐ Barcode skaner (20-50$) — 3-hafta
☐ Ikkinchi monitor — katta bizneslar

**Biz taqdim etamiz:**
☐ MoySklad trial / demo hisob
☐ Shablon konfiguratsiyalar

## TALABALARGA T+13 XABAR:
"1-dars uchun tayyorlaning:
✅ Laptop/telefon zaryad
✅ MoySklad trial ochilgan (link yuborildi)
✅ Bloknot va ruchka
✅ 60 daqiqa vaqt"`,
    assignee: 'mentor', status: 'pending', xpReward: 40, category: 'kontent',
  },

  // ══════════════════════════════════════════════════════════
  // 5.7 DARSLAR KETMA-KETLIGI
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-curriculum', phaseId: 5, subModuleId: '5.1', day: 12,
    title: '📚 T+12 | 6 hafta darslar rejasi — ketma-ketlik (to\'liq)',
    description: `## MOYSKLAD PRO AKADEMIYA — 6 HAFTA

### HAFTA 1 — POYDEVOR (T+14 boshlanish)
| # | Video | Davomiylik | Uy ishi |
| 1.1 | Akkaunt ochish, struktura | 25 min | Trial ochish |
| 1.2 | Mahsulotlar, kategoriyalar | 30 min | 10 ta tovar kiritish |
| 1.3 | Birinchi sotuv | 20 min | 1 test sotuv |
| LIVE Juma | Q&A + demo | 60 min | — |

### HAFTA 2 — KASSIR & SOTUV
| 2.1 | Kassa sozlash | 30 min |
| 2.2 | Kassir monitoring | 25 min |
| 2.3 | Smena, hisobot | 20 min |
| WORKSHOP | Offline amaliyot | 3 soat |

### HAFTA 3 — INVENTARIZATSIYA
| 3.1 | Qoldiq nazorat | 30 min |
| 3.2 | Inventarizatsiya | 35 min |
| 3.3 | Barcode | 25 min |
| LIVE | Real inventarizatsiya demo | 60 min |

### HAFTA 4 — MARKETPLACE
| 4.1 | WB ulash | 40 min |
| 4.2 | Ozon/Uzum | 30 min |
| 4.3 | Zakaz avtomat | 25 min |
| LIVE | Marketplace Q&A | 60 min |

### HAFTA 5 — HISOBOT & BUXGALTER
| 5.1 | Moliyaviy hisobot | 30 min |
| 5.2 | Excel eksport | 20 min |
| 5.3 | Soliq tayyorgarlik | 25 min |
| WORKSHOP | Offline | 3 soat |

### HAFTA 6 — OPTIMALLASHTIRISH & YAKUN
| 6.1 | KPI dashboard | 30 min |
| 6.2 | Jamoa boshqaruv | 25 min |
| 6.3 | Keyingi qadamlar | 20 min |
| LIVE | Sertifikat, feedback | 90 min |

## JAMI: 18 video (~9 soat) + 6 LIVE (~6 soat) + 2 workshop
## Uy ishi: 18 ta (har video dan keyin)

## TAYYORLASH JADVALI (Mentor):
T+8-T+12: Hafta 1-2 videolar
T+12-T+18: Hafta 3-4
T+18-T+24: Hafta 5-6`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'kontent',
  },
  {
    id: 'f5-lesson1-prep', phaseId: 5, subModuleId: '5.2', day: 14,
    title: '🎬 T+14 | 1-dars tayyorlash — video + PDF + uy ishi',
    description: `## 1-DARS: "MoySklad Poydevor" (T+14 yoki T+15)

**Video 1.1** (25 min) — yozish skripti:
→ 0-3: Nima o'rganasiz 6 hafta
→ 3-10: Akkaunt ochish (ekran yozuv)
→ 10-20: Birinchi mahsulot, kategoriya
→ 20-25: Uy ishi tushuntirish

**PDF:** 12 sahifa — screenshot bilan
**Uy ishi:** 3 vazifa — deadline T+17
**LIVE Juma T+18:** 19:00, 60 min — Zoom link T+14 yuborish

## YUBORISH (Assistent, T+14 10:00):
Guruh post:
"🎓 1-DARSLAR BOSHLANDI
📹 Video: [LINK]
📄 PDF: [LINK]
📝 Uy ishi: [LINK]
📅 LIVE: Juma 19:00 [ZOOM]
Savol: @assistent"`,
    assignee: 'mentor', status: 'pending', xpReward: 60, category: 'kontent',
  },

  // ══════════════════════════════════════════════════════════
  // 5.8 1-DARS & ONBOARDING
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-onboarding', phaseId: 5, subModuleId: '5.2', day: 14,
    title: '🎓 T+14 | 1-dars kuni — onboarding va guruh faollashtirish',
    description: `## 1-DARS KUNI JADVALI:

**10:00** — Video + PDF yuborish (guruh)
**14:00** — Assistent: kim ko'rdi tracking
**16:00** — Mentor: 3 ta savol javob (guruhda public)
**19:00** — LIVE session (ixtiyoriy lekin tavsiya)
**21:00** — Uy ishi eslatma

## ONBOARDING CHECK (har talaba):
☐ Guruhga qo'shildi
☐ Drive link ochadi
☐ Video 1.1 50%+ ko'rdi (tracking: "Ko'rdim" reaction)
☐ Uy ishi topshirildi (yakshanba)

## LIVE SESSION SKRIPT (19:00, 60 min):
0-10: Tanishuv — 5 ta talaba o'z biznesini aytadi
10-40: Video bo'yicha Q&A
40-50: Demo — kimdir muammosini hal qilish (jonli)
50-60: Hafta 2 preview + uy ishi eslatma

## ORQADA QOLGANLAR:
→ Shaxsiy DM: "Video ko'rmadingiz — yordam kerakmi?"
→ 2 hafta javobsiz → qo'ng'iroq`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'kontent',
  },
  {
    id: 'f5-t5-1', phaseId: 5, subModuleId: '5.1', day: 5,
    title: '🤝 T+5 | Hamkorlar komissiyasi + zapusk moliyaviy yig\'indi',
    description: `## MAQSAD: Hamkorlar bilan shaffof hisob-kitob — keyingi zapusk uchun ham ishlashsin.

## HAMKORLAR HISOBOTI:
Google Sheets "Hamkorlar" tab dan:

| Hamkor | UTM lead | To'lagan | Sotuv $ | Komissiya 20% | To'lov holati
| Hamkor 1 | [___] | [___] | [___] | [___] | Kutilmoqda
| Hamkor 2 | [___] | [___] | [___] | [___] | Kutilmoqda

## HAMKORGА XABAR (individuAl WhatsApp):
"Salom [Ism]! Hamkorlik natijalari:
Sizning linkinglzdan: [X] ta lead, [Y] ta sotuv
Jami sotuv summasi: $[Z]
Sizning ulushingiz 20%: $[W] = [so'mda]
Payme/Click raqamingizni yuboring — bugun o'tkazamiz"

## TO'LOV TASDIQLASH:
→ To'lov qilingandan keyin screenshot → hamkorga yuborish
→ "Rahmat! Keyingi seminar uchun ham ishlaymizmi?"

## HAMKORDAN OTZIV SO'RASH:
"Hamkorlik qanday edi? Nima yaxshilash kerak?
Keyingi seminar uchun nima taklif qilasiz?"

## KEYINGI ZAPUSK UCHUN HAMKOR BAZASI:
Google Sheets "Hamkorlar master" tab:
→ Ishlagan hamkorlar (komissiya to'landi)
→ Kelgan leads soni va konversiya
→ Kelgusi seminar uchun oldindan bron
→ "Ular avval yozsalar — extra 5% bonus" taklifi`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'hamkor',
  },

  // ══════════════════════════════════════════════════════════
  // 5.3 KURSDAN KEYIN — T+22 dan keyingi bosqich
  // ══════════════════════════════════════════════════════════
  {
    id: 'f5-post-testimonials', phaseId: 5, subModuleId: '5.3', day: 22,
    title: '🎬 T+22 | Talabalar testimonial — video va yozma otzivlar',
    description: `## MAQSAD: Keyingi zapusk uchun 10+ kuchli otziv

## VIDEO OTZIV SAVOL STRUKTURASI (3-5 daqiqa):
1. "Siz kimchiz? Soha, shahar?"
2. "Akademiyadan OLDIN qanday muammo bor edi?"
3. "Akademiya davomida eng foydali nima bo'ldi?"
4. "Hozir qanday natija? Aniq raqam bering."
5. "Kim uchun tavsiya qilasiz?"

## FORMAT:
→ Zoom call yoki telefon (portrait, 1080p)
→ Davomiylik: 3-5 daqiqa (highlights: 60 soniya)
→ Ruxsat: imzoli — Instagram, YouTube, sayt

## YOZMA OTZIV (30 talabaga Google Form):
→ Qanday raqam tejalgan/yutilgan: [___]
→ MoySkladsiz bo'lsa nima bo'lardi?
→ Baholash: 1-10

## JADVALI:
☐ T+22: Form yuborish
☐ T+23: Eslatma (javob bermaganlarga)
☐ T+24: Video call (3-5 kishi)
☐ T+25: Barcha materiallar → Drive`,
    assignee: 'targetolog', status: 'pending', xpReward: 60, category: 'kontent',
  },
  {
    id: 'f5-post-feedback', phaseId: 5, subModuleId: '5.3', day: 22,
    title: '📊 T+22 | Talabalar feedback — kurs sifati va retention tahlili',
    description: `## FEEDBACK FORMA (Google Forms, T+22):
| # | Savol | Javob |
|---|-------|-------|
| 1 | Kursni 1-10 baholang | 1-10 |
| 2 | Eng foydali modul | Ko'p tanlov |
| 3 | Kam foydali | Ko'p tanlov |
| 4 | LIVE session sifati | 1-10 |
| 5 | Uy ishlari yetarli? | Ha/Yo'q/Kam |
| 6 | Assistent yordami | 1-10 |
| 7 | Keyingi kursga qatnashasizmi? | Ha/Yo'q/Balki |
| 8 | Narx haqqoniy? | 1-10 |
| 9 | Nima o'zgartirish kerak? | Ochiq |

## RETENTION TAHLILI (Assistent):
| Ko'rsatkich | Maqsad | Haqiqat |
|-------------|--------|---------|
| Video ko'rish | 80%+ | [___]% |
| Uy ishi topshirish | 70%+ | [___]% |
| LIVE ga kelish | 60%+ | [___]% |
| Sertifikat oldi | 80%+ | [___]% |

## ORQADA QOLGANLAR:
→ Video ko'rmagan 20% → qo'ng'iroq: "Nima bo'ldi?"
→ Uy ishi yo'q → mentor shaxsiy DM`,
    assignee: 'assistent', status: 'pending', xpReward: 40, category: 'logistika',
  },
  {
    id: 'f5-post-sertifikat', phaseId: 5, subModuleId: '5.3', day: 23,
    title: '🏆 T+23 | Sertifikat berish — "PRO Alumni" status marosimi',
    description: `## SERTIFIKAT DIZAYN (Canva, T+14 da tayyor):
- "MoySklad PRO Akademiya — Bitiruv Sertifikati"
- Talaba to'liq ismi + sana + mentor imzosi
- Seriya: PRO-[ROY]-[YIL]
- Format: A4, rangli + PDF

## BERISH USULLARI:
**Online:** PDF → Telegram DM (T+22)
**Offline (ixtiyoriy, T+23):** 15 daqiqa bitiruv:
→ Har kishi 1 ta natija aytadi
→ Sertifikat topshiriladi
→ Guruh surati

## PRO ALUMNI STATUS:
☐ @moyskladpro_alumni guruhiga qo'shish
☐ Keyingi zapusk 20% chegirma
☐ Hamkor bo'lish imkoniyati (komissiya)

## MAQSAD:
☐ 100% talaba sertifikat oldi
☐ 5+ talaba LinkedIn/Instagram post qildi
☐ 3+ talaba hamkorga tavsiya berdi`,
    assignee: 'assistent', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f5-post-community', phaseId: 5, subModuleId: '5.3', day: 25,
    title: '🤝 T+25 | Alumni community — B2B hamkorlik va referral dastur',
    description: `## ALUMNI GURUH HAFTALIK RASM:
- Payshanba: Talabalar o'z natijalarini ulashadi
- Juma: Mentor "Haftaning tavsiyasi" (5 daqiqa video)
- Shanba: "Haftaning qahramoni" — eng yaxshi natija

## OYLIK:
- 1 ta bepul LIVE Q&A (60 daqiqa) — alumni uchun
- B2B matching: "[Ali] — Toshkent, optom. [Vali] — WB seller. Bog'laymizmi?"

## REFERRAL DASTURI:
→ Keltirganga: keyingi kursga 20% chegirma
→ Yangi talabaga: $100 chegirma
→ Shartlar: Telegram guruhda e'lon

## UPSELL (T+30):
- "Advanced mentoring" → $500/oy
- "Jamoani o'qitamiz" → korporativ tarif
- "1:1 audit" → $300/seans`,
    assignee: 'mentor', status: 'pending', xpReward: 50, category: 'kontent',
  },
  {
    id: 'f5-post-next-launch', phaseId: 5, subModuleId: '5.3', day: 28,
    title: '🚀 T+28 | Keyingi zapusk poydevori — sana, jamoa, maqsad (300 lead)',
    description: `## KEYINGI ZAPUSK TAYYORGARLIK (T+28, Mentor + Assistent, 2 soat)

## NIMA O'ZGARADI (T+21 hisobot asosida):
→ Eng ko'p lead qaysi kanal → 2x bujet
→ Qaysi hikoya ishladi → kengaytirish
→ Nima ishlamadi → o'chirish

## SANA VA MAQSAD:
☐ Keyingi seminar: [TAXMINIY SANA]
☐ Lead maqsad: 300 (hozir 200)
☐ Seminar: 300 kishi, 600k
☐ Kurs: 30 ta sotuv × $1,500 = $45,000

## JAMOA:
| Rol | Hozirgi | Keyingi |
|-----|---------|---------|
| Mentor | ✓ | ✓ |
| Assistent | ✓ | ✓ |
| Sotuvchi 1 | ? | [___] |
| Targetolog | ✓ | ✓ |

## HAMKORLAR:
→ Yaxshi ishlagan: avvalgi shartnoma + bonus offer
→ Yangi: topish + brief (T-20 gacha)
→ Alumni hamkori: 30% komissiya

## CONTENT BANKI:
→ Bu seminar video/surat → keyingi kreativlar
→ Testimoniallar → Landing sahifasi
→ Jonli keys yangi mijoz → T-21 da ishlatish`,
    assignee: 'mentor', status: 'pending', xpReward: 80, category: 'logistika',
  },
  {
    id: 'f5-t7-2', phaseId: 5, subModuleId: '5.3', day: 21,
    title: '📊 T+21 | Zapusk yakuniy hisoboti — funnel, ROI, keyingi guruh',
    description: `## MAQSAD: Nima ishladi, nima ishlamadi — keyingi zapusk 2x yaxshiroq bo'lsin.

## YAKUNIY HISOBOT (Google Sheets "Zapusk Yakuniy" tab):

FUNNEL TAHLILI:
| Bosqich | Maqsad | Haqiqat | Konversiya %
| Reach (reklama) | 10,000+ | [___] | —
| Besplatnik registratsiya | 300 | [___] | [___]%
| Seminar to'lov (600k) | 200 | [___] | [___]%
| Seminar keldi | 150+ | [___] | [___]%
| Akademiya sotib oldi | 20 | [___] | [___]%
| Dojim sotuvlar | 5-7 | [___] | —
| JAMI SOTUV | 25-27 | [___] | —

MOLIYAVIY HISOBOT:
| Kiruvchi | Summa
| Seminar chiptalar (200 × 600k) | [___] so'm
| Akademiya to'lovlar (X × $1,500) | [___] $
| JAMI DAROMAD | [___]

| Chiquvchi | Summa
| Reklama (Meta Ads) | [___] $
| Zal narxi | [___] so'm
| Kontent s'yomka | [___] so'm
| Hamkor komissiyalar | [___] $
| SMS/broadcast | [___] so'm
| JAMI XARAJAT | [___]

| ROI | [DAROMAD / XARAJAT × 100]% |

KANAL SAMARADORLIGI:
| Kanal | Lead | Sotuv | CPL $ | CAC $
| Instagram Reels | [___] | [___] | [___] | [___]
| Meta Ads | [___] | [___] | [___] | [___]
| Hamkorlar | [___] | [___] | — | —
| Telegram bot | [___] | [___] | — | —
| SMS | [___] | [___] | — | —
| WhatsApp | [___] | [___] | — | —

## DARSLAR (3 ta):
1. Eng ko'p lead qaysi kanaldan keldi → keyingi zapuskda 2x ko'proq
2. Eng ko'p sotuv tanaffusdami yoki dojimda → o'sha vaqtga kuchayish
3. Nima yaxshi ishlamadi → o'zgartirish

## KEYINGI ZAPUSK SANA:
Taxminiy: [___] (3-4 oydan keyin)
Maqsad: 300 lead, 300 seminar, 30 sotuv`,
    assignee: 'jamoa', status: 'pending', xpReward: 150, category: 'dojim',
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  { id: 'mentor',     name: 'Producer',       role: 'Lead & Presenter',       avatar: '👑', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'assistent',  name: 'Ops Manager',    role: 'Producer Assistant',     avatar: '🤝', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'targetolog', name: 'Traffic Mgr',    role: 'Paid Traffic Specialist', avatar: '🎯', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'sotuvchi1',  name: 'Sales Closer 1', role: 'Sales Manager / Closer',  avatar: '💼', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'sotuvchi2',  name: 'Sales Closer 2', role: 'Sales Manager / Closer',  avatar: '💼', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'dizayner',   name: 'Creative',       role: 'Creative Designer',       avatar: '🎨', xp: 0, tasksCompleted: 0, streak: 0 },
  { id: 'videograf',  name: 'Video Creator',  role: 'Video Production',        avatar: '🎬', xp: 0, tasksCompleted: 0, streak: 0 },
];

export const INITIAL_BADGES: Badge[] = [
  { id: 'startap',       name: 'Startap',          emoji: '🚀', description: 'Faza 1 ni to\'liq bajardingiz',      earned: false, condition: 'phase1_complete' },
  { id: 'trafikchi',     name: 'Trafikchi',         emoji: '📈', description: '50 ta lead to\'pladingiz',           earned: false, condition: 'leads_50' },
  { id: 'sozlovchi',     name: 'Sozlovchi',         emoji: '⚙️', description: 'Faza 2 ni to\'liq bajardingiz',     earned: false, condition: 'phase2_complete' },
  { id: 'olov',          name: 'Olov',              emoji: '🔥', description: '3 kun ketma-ket task bajardingiz',   earned: false, condition: 'streak_3' },
  { id: 'seminar_usta',  name: 'Seminar Usta',      emoji: '🎤', description: 'Seminarda 10+ sotuv yopdingiz',      earned: false, condition: 'seminar_sales_10' },
  { id: 'sotuv_masteri', name: 'Sotuv Masteri',     emoji: '💰', description: '15 ta kurs sotdingiz',              earned: false, condition: 'course_sales_15' },
  { id: 'streak7',       name: 'Haftalik Chempion', emoji: '⚡', description: '7 kun ketma-ket ishlash streaki',    earned: false, condition: 'streak_7' },
  { id: 'champion',      name: 'Champion',          emoji: '🏆', description: 'Barcha fazalarni bajardingiz',       earned: false, condition: 'all_phases_complete' },
  { id: 'avtomat',       name: 'Avtomat',           emoji: '🤖', description: '100+ lead ManyChat orqali keldi',   earned: false, condition: 'manychat_leads_100' },
];

export const INITIAL_KPIS: KPI = {
  leads: 0, registrations: 0, attendees: 0,
  seminarSales: 0, courseSales: 0, callsMade: 0, partnerPosts: 0,
};
