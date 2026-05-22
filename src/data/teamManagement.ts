import type { Assignee, LaunchStage } from './types';

export interface TeamProfile {
  id: Assignee;
  name: string;
  roleUz: string;
  roleEn: string;
  reportsTo: Assignee | 'ceo';
  manages: Assignee[];
  phone: string;
  telegram: string;
  email: string;
  workHours: string;
  tools: string[];
  kpiTargets: { label: string; target: string }[];
  mainResponsibilities: string[];
  dontDo: string[];
  byStage: Record<LaunchStage, string[]>;
  weeklyRoutine: { day: string; tasks: string[] }[];
}

export const TEAM_ORG = {
  ceo: 'Siz (Loyiha egasi)',
  structure: `Siz (CEO)
  └── Mentor (Zapusk rahbari / Kontent & Sotuv strategiya)
        ├── Assistent (Operatsiya — barcha logistika)
        ├── Targetolog (Marketing & Ads)
        ├── Sotuvchi 1 (Front Sales — kirish, A-segment)
        └── Sotuvchi 2 (Floor Sales — zal, B-segment, dojim)`,
};

export const MEETING_SCHEDULE = [
  { when: 'Har dushanba 10:00', name: 'Haftalik Sprint', who: 'Hamma', duration: '60 min', agenda: 'O\'tgan hafta raqamlar → Bu hafta KPI → Muammolar → Vazifa taqsimlash' },
  { when: 'Har kun 09:30', name: 'Daily Standup', who: 'Hamma', duration: '15 min', agenda: 'Kecha nima qildim → Bugun nima qilaman → Blokirovchi muammo' },
  { when: 'T-2 kechqurun', name: 'Seminar Repetitsiya', who: 'Mentor + Assistent + Sotuvchilar', duration: '120 min', agenda: 'Texnik + mentor skript + sotuv rol o\'ynash' },
  { when: 'Seminar kuni 09:15', name: 'Sabah Brifing', who: 'Hamma', duration: '15 min', agenda: 'Rollar, signal so\'zlar, maqsad raqamlar' },
  { when: 'T+1 15:00', name: 'Dojim Kickoff', who: 'Sotuvchilar + Mentor', duration: '30 min', agenda: 'Segmentlar, skriptlar, kunlik qo\'ng\'iroq rejasi' },
  { when: 'T+7', name: 'Kurs Launch Brifing', who: 'Mentor + Assistent', duration: '45 min', agenda: 'Platforma, progrev, 1-dars tayyorlik' },
];

export const ESCALATION_RULES = [
  { issue: 'Texnik muammo (proyektor, internet)', first: 'Assistent', then: 'Mentor', sla: '15 daqiqa' },
  { issue: 'To\'lov ishlamayapti', first: 'Assistent', then: 'Sotuvchi 1', sla: '30 daqiqa' },
  { issue: 'Mijoz shikoyat (seminar/kurs)', first: 'Mentor', then: 'Siz (CEO)', sla: '2 soat' },
  { issue: 'Reklama hisobi blok', first: 'Targetolog', then: 'Mentor', sla: '4 soat' },
  { issue: 'Hamkor pul so\'rayapti', first: 'Mentor', then: 'Assistent', sla: '24 soat' },
  { issue: 'Sotuvchi konflikt (ikki sotuvchi bir mijoz)', first: 'Mentor', then: '—', sla: 'Darhol' },
];

export const DAILY_MANAGEMENT_CHECKLIST = {
  mentor: [
    '09:30 Standup — bugungi kontent/sotuv rejasi',
    'Stories/Reels rejasi ko\'rib chiqish (Targetolog bilan)',
    '2 ta mijozga javob (Telegram/WhatsApp)',
    'Kechqurun: KPI Google Sheets yangilash',
  ],
  assistent: [
    '09:00 Google Sheets yangilash (lead, to\'lov, tasdiq)',
    'Ro\'ng\'iroqlar log — kim qo\'ng\'iroq qildi',
    'Telegram guruh — barcha savollarga 2 soat ichida javob',
    'Logistika checklist (Pack, zal, kafe)',
    'Kechqurun: ertangi kun tasklar tayyor',
  ],
  targetolog: [
    '09:00 Meta Ads dashboard — CPL, spend, pause/start',
    '1 ta yangi kreativ test yoki optimizatsiya',
    'Stories 2-3 ta (rejada bo\'lsa)',
    'Pixel/UTM tekshiruv',
    'Haftalik hisobot (juma)',
  ],
  sotuvchi1: [
    '09:00 CRM ochish — kim qo\'ng\'iroq kutmoqda',
    '20+ qo\'ng\'iroq (rejada bo\'lsa)',
    'Har to\'lovdan keyin Sheets + Telegram guruh',
    'Kechqurun: ertangi A-segment ro\'yxati',
  ],
  sotuvchi2: [
    '09:00 CRM — B va C segment',
    '15+ qo\'ng\'iroq / WhatsApp',
    'Dojim broadcast yuborish (rejada)',
    'Kechqurun natija Mentor ga',
  ],
  jamoa: ['Seminar/kurs kunida — rollar bo\'yicha checklist'],
};

export const RACI_MATRIX: { activity: string; pre: Record<Assignee, string>; seminar: Record<Assignee, string>; course: Record<Assignee, string> }[] = [
  { activity: 'Bozor intervyu', pre: { mentor: 'A', targetolog: 'I', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' }, seminar: { mentor: '—', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' }, course: { mentor: '—', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' } },
  { activity: 'Meta Ads boshqaruv', pre: { mentor: 'I', targetolog: 'A/R', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' }, seminar: { mentor: 'I', targetolog: 'A', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' }, course: { mentor: 'I', targetolog: 'A', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' } },
  { activity: 'Kunlik kontent (Reels/Stories)', pre: { mentor: 'A', targetolog: 'R', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' }, seminar: { mentor: 'I', targetolog: 'A', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' }, course: { mentor: 'A', targetolog: 'R', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' } },
  { activity: 'Lead CRM / Sheets', pre: { mentor: 'I', targetolog: 'C', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: '—' }, seminar: { mentor: 'I', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: 'C' }, course: { mentor: 'I', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: '—' } },
  { activity: 'Seminar Pack / Zal', pre: { mentor: 'I', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: 'A/R', jamoa: 'C' }, seminar: { mentor: 'I', targetolog: 'C', sotuvchi1: 'C', sotuvchi2: 'C', assistent: 'A', jamoa: 'R' }, course: { mentor: '—', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: 'A', jamoa: '—' } },
  { activity: 'Seminar sahna / Demo', pre: { mentor: 'A', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' }, seminar: { mentor: 'A', targetolog: 'C', sotuvchi1: 'I', sotuvchi2: 'I', assistent: 'R', jamoa: 'C' }, course: { mentor: 'A', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: 'C', jamoa: '—' } },
  { activity: 'Zalda sotuv', pre: { mentor: 'A', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'C', jamoa: '—' }, seminar: { mentor: 'A', targetolog: '—', sotuvchi1: 'A/R', sotuvchi2: 'A/R', assistent: 'C', jamoa: '—' }, course: { mentor: 'I', targetolog: '—', sotuvchi1: 'A/R', sotuvchi2: 'A/R', assistent: 'C', jamoa: '—' } },
  { activity: 'Dojim qo\'ng\'iroq', pre: { mentor: 'C', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' }, seminar: { mentor: 'A', targetolog: '—', sotuvchi1: 'A', sotuvchi2: 'A', assistent: 'C', jamoa: '—' }, course: { mentor: 'A', targetolog: '—', sotuvchi1: 'A', sotuvchi2: 'A', assistent: 'C', jamoa: '—' } },
  { activity: 'To\'lov & Shartnoma', pre: { mentor: 'I', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: '—' }, seminar: { mentor: 'I', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: '—' }, course: { mentor: 'I', targetolog: '—', sotuvchi1: 'R', sotuvchi2: 'R', assistent: 'A', jamoa: '—' } },
  { activity: 'Kurs platforma / Pack', pre: { mentor: '—', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' }, seminar: { mentor: '—', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: '—', jamoa: '—' }, course: { mentor: 'A', targetolog: 'C', sotuvchi1: '—', sotuvchi2: '—', assistent: 'A/R', jamoa: '—' } },
  { activity: 'Hamkorlar PR', pre: { mentor: 'A', targetolog: 'C', sotuvchi1: '—', sotuvchi2: '—', assistent: 'R', jamoa: '—' }, seminar: { mentor: 'I', targetolog: 'C', sotuvchi1: '—', sotuvchi2: '—', assistent: 'R', jamoa: '—' }, course: { mentor: 'A', targetolog: '—', sotuvchi1: '—', sotuvchi2: '—', assistent: 'R', jamoa: '—' } },
];

// A=Accountable, R=Responsible, C=Consulted, I=Informed, —=Not involved

export const TEAM_PROFILES: TeamProfile[] = [
  {
    id: 'mentor',
    name: 'Mentor',
    roleUz: 'Zapusk rahbari · Spiker · Strateg',
    roleEn: 'Lead & Presenter',
    reportsTo: 'ceo',
    manages: ['assistent', 'targetolog', 'sotuvchi1', 'sotuvchi2'],
    phone: '+998 __ ___ __ __',
    telegram: '@mentor_username',
    email: 'mentor@moysklad.uz',
    workHours: '09:00–20:00 (seminar/kurs kunlari 08:00–22:00)',
    tools: ['Zoom/Telegram Live', 'MoySklad demo', 'Loom', 'Google Slides', 'Canva'],
    kpiTargets: [
      { label: 'Seminar sotuv', target: '20 ta / kun' },
      { label: 'Dojim sotuv', target: '+5-7 ta / T+1-3' },
      { label: 'Kurs 1-dars attendance', target: '80%+ LIVE' },
      { label: 'Video darslar', target: '18 ta / 6 hafta' },
    ],
    mainResponsibilities: [
      'Barcha kontent: Reels skript, seminar taqdimot, demo, jonli mijoz keys',
      'Seminar va kurs LIVE session olib borish',
      'Sotuv strategiyasi va rad etishga javoblar (sotuvchilarni brifing)',
      'Hamkor va PR — post matni tasdiq, tripwire stories mantiq',
      'Loom shaxsiy video (dojim B-segment)',
      'Mentor = yuz brendi — har otziv va keys da ism',
    ],
    dontDo: [
      'Ro\'yxat stoli, bej tarqatish (Assistent)',
      'Meta Ads panel (Targetolog)',
      'Kundalik 50 ta qo\'ng\'iroq (Sotuvchilar)',
      'Pack yig\'ish, kafe buyurtma (Assistent)',
    ],
    byStage: {
      'pre-seminar': [
        'Faza 1: Intervyu o\'tkazish (5-10 ta), og\'riq ro\'yxati tasdiq',
        'Faza 2: 18 Reels skript yozish, s\'yomkada gapirish',
        'Faza 3: Kunlik kontent rejasi tasdiq, vebinar o\'tkazish',
        'Hamkor brief va post matn tasdiq',
      ],
      seminar: [
        'T+0: Salomlashish, 3 hikoya, demo, JIVOY mijoz keys, taklif, Q&A',
        'Signal: "3 joy qoldi" — sotuvchilar harakat',
        'A-segment bilan qisqa gap (max 2 daq)',
      ],
      'main-course': [
        'Dojim: Loom + qo\'ng\'iroq B-segment (kechqurun)',
        '6 hafta video darslar yozish',
        'Haftalik LIVE Juma 19:00',
        'Progrev: welcome video, mini-LIVE T+11',
        '1-dars launch post',
      ],
    },
    weeklyRoutine: [
      { day: 'Dushanba', tasks: ['Sprint yig\'ilish 10:00', 'Hafta kontent rejasi', 'Sheets KPI ko\'rish'] },
      { day: 'Sesh-Chor', tasks: ['Reels/s\'yomka', '2 ta hamkor qo\'ng\'iroq', 'Demo tayyorlash'] },
      { day: 'Juma', tasks: ['LIVE (kurs guruhida)', 'Hafta natija — jamoa'] },
      { day: 'Shan-Yak', tasks: ['Video montaj tekshiruv', 'Keyingi hafta skript'] },
    ],
  },
  {
    id: 'assistent',
    name: 'Assistent',
    roleUz: 'Operatsiya menejeri · Logistika · CRM',
    roleEn: 'Operations',
    reportsTo: 'mentor',
    manages: [],
    phone: '+998 __ ___ __ __',
    telegram: '@assistent_username',
    email: 'ops@moysklad.uz',
    workHours: '08:30–19:00 (seminar kuni 08:00–20:00)',
    tools: ['Google Sheets', 'Telegram', 'Click/Payme', 'Canva', 'BTS/EMS tracking'],
    kpiTargets: [
      { label: 'Lead javob vaqti', target: '< 2 soat' },
      { label: 'Ro\'yxat xatosiz', target: '100% tasdiq' },
      { label: 'Pack tayyor', target: 'T-1 100%' },
      { label: 'Telegram savol', target: '< 24 soat' },
    ],
    mainResponsibilities: [
      'Google Sheets — Lead CRM, Talabalar, Hamkorlar, KPI (real vaqt)',
      'Seminar/kurs kirish: ro\'yxat, Pack, bej',
      'Logistika: zal, kafe, Pack yig\'ish, Course Pack yetkazish',
      'To\'lov tracking, shartnoma arxiv, invoice',
      'Telegram kanal/guruh postlari (mentor tasdiqlagan matn)',
      'Texnik birinchi yordam: proyektor, internet',
    ],
    dontDo: [
      'Seminar sahna gapirish (Mentor)',
      'Sotuv taklifi va narx muzokarasi (Sotuvchilar)',
      'Meta Ads sozlash (Targetolog)',
    ],
    byStage: {
      'pre-seminar': [
        'Lead CRM sozlash, har lead kuzatuv',
        'Landing forma → Telegram avtomatik',
        'PDF besplatnik, banner chop etish',
        'Seminar Pack buyurtma va yig\'ish',
      ],
      seminar: [
        '09:30 kirish, Pack berish',
        '10:15 ro\'yxat yopish, soni mentor ga',
        '12:15 ovqat, kafe',
        '13:40 shartnoma + Telegram guruh',
      ],
      'main-course': [
        'To\'lov va shartnoma arxiv',
        'Platforma Drive papka, tracking sheet',
        'Course Pack buyurtma/yetkazish',
        'Progrev kunlik post (mentor video yuboradi)',
      ],
    },
    weeklyRoutine: [
      { day: 'Har kun', tasks: ['Sheets yangilash 09:00', 'Telegram 2x tekshiruv', 'Ertangi logistika'] },
      { day: 'Juma', tasks: ['Haftalik lead hisobot', 'Hamkor UTM tekshiruv'] },
    ],
  },
  {
    id: 'targetolog',
    name: 'Targetolog',
    roleUz: 'Marketing · Meta Ads · SMM',
    roleEn: 'Ads & Analytics',
    reportsTo: 'mentor',
    manages: [],
    phone: '+998 __ ___ __ __',
    telegram: '@targetolog_username',
    email: 'ads@moysklad.uz',
    workHours: '10:00–19:00',
    tools: ['Meta Business Manager', 'Pixel', 'Canva', 'Instagram', 'Google Analytics'],
    kpiTargets: [
      { label: 'Lead (ads)', target: '80+ / zapusk' },
      { label: 'CPL', target: '< $7.5' },
      { label: 'Jami ads spend', target: '< $600' },
      { label: 'Stories', target: 'Har faol kun 2-3 ta' },
    ],
    mainResponsibilities: [
      'Meta Ads: 3 kampaniya, kreativ, auditoriya, optimizatsiya',
      'Pixel, UTM, konversiya kuzatuv',
      'Instagram/Telegram Stories (seminar/kurs urgency)',
      'Hamkor post boost ($30/24h)',
      'Retarget: landing, dojim, oxirgi 24h',
      'Highlight Reels montaj yordam',
    ],
    dontDo: [
      'Qo\'ng\'iroq sotuv (Sotuvchilar)',
      'Shartnoma imzo (Assistent)',
      'Seminar sahna (Mentor)',
    ],
    byStage: {
      'pre-seminar': [
        'T-15 dan ads yoqish, 3 kreativ test',
        'T-10 dan scaling eng yaxshi CPL',
        'Kunlik Stories (T-10 → T-1)',
        'Hamkor post boost',
      ],
      seminar: [
        'Jonli Stories: kelish, zal, countdown',
        'Seminar highlight Reels T+2',
      ],
      'main-course': [
        'Dojim retarget $50',
        'T+3 urgency Stories',
        'Guruh yopildi kontent',
      ],
    },
    weeklyRoutine: [
      { day: 'Har kun', tasks: ['Ads dashboard', 'CPL tekshiruv', '1 kreativ/yangilanish'] },
      { day: 'Dushanba', tasks: ['Haftalik spend reja'] },
      { day: 'Juma', tasks: ['Kanal hisobot Mentor ga'] },
    ],
  },
  {
    id: 'sotuvchi1',
    name: 'Sotuvchi 1',
    roleUz: 'Front Sales · Kirish · A-segment',
    roleEn: 'Sales Manager (Front)',
    reportsTo: 'mentor',
    manages: [],
    phone: '+998 __ ___ __ __',
    telegram: '@sales1_username',
    email: 'sales1@moysklad.uz',
    workHours: '09:00–19:00 (seminar/dojim 09:00–21:00)',
    tools: ['Google Sheets CRM', 'Click/Payme', 'iPad', 'WhatsApp Business', 'Telegram'],
    kpiTargets: [
      { label: 'Qo\'ng\'iroq', target: '40-50 / kun (faol)' },
      { label: 'Seminar sotuv', target: '10 ta' },
      { label: 'Dojim sotuv', target: '3-4 ta' },
      { label: 'Konversiya qo\'ng\'iroq', target: '> 15%' },
    ],
    mainResponsibilities: [
      'Kirish eshik: ro\'yxatda yo\'q → 600k to\'lov',
      'A-segment: oldindan "ha" deganlar — prioritet',
      'Sotuv stoli (chap): iPad to\'lov, shartnoma',
      'Seminar tanaffus + sotuv sessiyasi',
      'Dojim T+1-T+3: B-segment qo\'ng\'iroq',
      'Har sotuvdan keyin: Sheets + jamoa guruhiga "+1"',
    ],
    dontDo: [
      'Kontent yaratish',
      'Ads panel',
      'Pack logistika',
    ],
    byStage: {
      'pre-seminar': [
        'Lead qo\'ng\'iroq: tasdiqlash, 600k to\'lov',
        'SMS/WhatsApp eslatma',
      ],
      seminar: [
        'Eshik + ro\'yxat yo\'q to\'lov',
        'Tanaffus: A-segment yopish',
        '12:50-13:10 asosiy sotuv',
      ],
      'main-course': [
        'Dojim B-segment 40 ta qo\'ng\'iroq',
        'To\'lov qildirish, bo\'lib to\'lash kelishuv',
      ],
    },
    weeklyRoutine: [
      { day: 'Faol kun', tasks: ['CRM 09:00', '20+ qo\'ng\'iroq', 'Natija 18:00'] },
    ],
  },
  {
    id: 'sotuvchi2',
    name: 'Sotuvchi 2',
    roleUz: 'Floor Sales · Zal · B-segment · Dojim',
    roleEn: 'Sales Manager (Floor)',
    reportsTo: 'mentor',
    manages: [],
    phone: '+998 __ ___ __ __',
    telegram: '@sales2_username',
    email: 'sales2@moysklad.uz',
    workHours: '09:00–19:00 (seminar/dojim 09:00–21:00)',
    tools: ['Google Sheets', 'WhatsApp', 'iPad', 'Telegram'],
    kpiTargets: [
      { label: 'Qo\'ng\'iroq', target: '30-40 / kun' },
      { label: 'Seminar sotuv', target: '10 ta' },
      { label: 'Dojim sotuv', target: '2-3 ta' },
      { label: 'WhatsApp broadcast', target: 'Rejada' },
    ],
    mainResponsibilities: [
      'Zal ichida: joylashtirish, networking yordam',
      'QR kod oldida turish — savol, yopish',
      'B-segment: shubhali, tanaffusda ish',
      'Sotuv stoli (o\'ng)',
      'Dojim: D-segment, WhatsApp broadcast',
      'Q&A vaqtida yonida turish — "2 joy qoldi"',
    ],
    dontDo: [
      'Kirish eshik asosiy (Sotuvchi 1 bilan kelishilgan)',
      'Mentor o\'rniga taklif',
    ],
    byStage: {
      'pre-seminar': [
        'Lead qo\'ng\'iroq C/D segment',
        'Telegram bot follow-up',
      ],
      seminar: [
        'Zal networking',
        'B-segment sotuv',
        'Q&A sotuv',
      ],
      'main-course': [
        'Dojim raund 2',
        'T+3 broadcast',
        'Dojim ro\'yxati yangilash',
      ],
    },
    weeklyRoutine: [
      { day: 'Faol kun', tasks: ['CRM', '15+ qo\'ng\'iroq', 'Mentor ga hisobot'] },
    ],
  },
  {
    id: 'jamoa',
    name: 'Jamoa (umumiy)',
    roleUz: 'Seminar/Kurs kuni — hammaga rollar',
    roleEn: 'All hands',
    reportsTo: 'mentor',
    manages: [],
    phone: '—',
    telegram: 'Jamoa guruhi',
    email: '—',
    workHours: 'Seminar/kurs kunlari',
    tools: ['Checklist', 'Signal so\'zlar'],
    kpiTargets: [{ label: 'Seminar kelganlar', target: '180-200' }],
    mainResponsibilities: [
      'Seminar kuni 09:00 hamma keladi',
      'Repetitsiya T-1',
      'Signal so\'zlarga rioya',
    ],
    dontDo: [],
    byStage: {
      'pre-seminar': [],
      seminar: ['Har kishi o\'z rolida — Master Jadval task'],
      'main-course': ['1-dars launch — rollar bo\'yicha'],
    },
    weeklyRoutine: [],
  },
];

export const RACI_LEGEND = 'A = Mas\'ul (Accountable) · R = Bajaruvchi · C = Maslahatchi · I = Xabardor · — = Ishtirok emas';
