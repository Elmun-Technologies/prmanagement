# 🚀 MoySklad PRO — Zapusk Boshqaruv Tizimi

> **128+ task · 14 submodul · 5 fazali launch tracker**  
> Seminar (200 kishi) + Asosiy Kurs ($1,500) ni to'liq boshqarish uchun

---

## 📌 Loyiha haqida

Bu loyiha **MoySklad PRO** kursi zapuskini boshidan oxirigacha boshqarish uchun yaratilgan professional vosita. T-30 dan T+21 gacha bo'lgan barcha jarayonlar, tasklar, KPI va moliyaviy ko'rsatkichlar bitta interaktiv panelda.

### Maqsad
- 🎟 **200 ta** seminar qatnashchisi jalb qilish
- 🎓 **20+ ta** asosiy kurs ($1,500) sotish
- 📊 Jamoani real vaqtda kuzatish
- 💹 Moliyaviy natijalarni prognoz qilish

---

## 🏗️ Tuzilma

```
5 ta Faza · 14 ta Submodul · 128+ Task
│
├── 🏗️  Faza 1 — Poydevor        (T-30 → T-21)  Bozor tahlili, taklif, logistika
├── ⚙️  Faza 2 — Mashina Yig'ish  (T-20 → T-11)  Landing, kontent, ads, avtomatika
├── 🔥  Faza 3 — Isitish          (T-10 → T-1)   Kunlik kontent, lead, PR, zal
├── 🎯  Faza 4 — Seminar Kuni     (T0)            Oldin · Vaqtida · Keyin
└── 🚀  Faza 5 — Asosiy Kurs      (T+1 → T+21)   Oldin · Kurs · Keyin
```

---

## 📱 Sahifalar

| Sahifa | Tavsif |
|--------|--------|
| 🚀 **Zapusk** | Umumiy yo'l xaritasi — bosqichlar va fazalar |
| 📋 **Bugungi ishlar** | Kunlik tasklar, filtr, progress |
| 📊 **KPI Tracker** | Voronka, konversiya, reklama samaradorligi |
| 💹 **Moliya Modeli** | P&L, ROI, pul oqimi, 3 stsenariy |
| 👥 **Jamoa** | Har a'zo KPI, ranking, yuklanish |
| 📈 **Statistika** | Umumiy progress, fazalar, bugungi rejim |
| 🏅 **Gamifikatsiya** | XP, badge, streak, leaderboard |

---

## 🛠️ Texnologiyalar

| Texnologiya | Maqsad |
|-------------|--------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Zustand** | State management (persist) |
| **Tailwind CSS** (CDN) | Dark theme styling |
| **esbuild** | Ultra-tez bundler |
| **React Router v6** | Client-side routing |
| **canvas-confetti** | Gamification effektlar |
| **Python** | SPA server |

---

## 🚀 Ishga tushirish

### Talab qilinadi
- Node.js 18+
- Python 3.9+

### O'rnatish

```bash
git clone https://github.com/Elmun-Technologies/prmanagement.git
cd prmanagement
npm install
```

### Build

```bash
bash build.sh
```

### Server ishga tushirish

```bash
python3 serve.py
```

Brauzerda oching: **http://localhost:3000**

---

## 📂 Loyiha Tuzilmasi

```
moysklad-launch/
├── src/
│   ├── data/
│   │   ├── phases.ts          # 128+ task, 5 faza, 14 submodul
│   │   ├── types.ts           # TypeScript interfeyslari
│   │   ├── kpiManagement.ts   # KPI maqsadlar va voronka
│   │   ├── statsManagement.ts # Statistika sahifasi ma'lumotlari
│   │   └── financeModel.ts    # Moliya modeli va hisob-kitoblar
│   ├── pages/
│   │   ├── LaunchHome.tsx     # Asosiy sahifa
│   │   ├── Dashboard.tsx      # Statistika
│   │   ├── KPITracker.tsx     # KPI kuzatish
│   │   ├── FinanceModel.tsx   # Moliya modeli
│   │   ├── Team.tsx           # Jamoa sahifasi
│   │   ├── Gamification.tsx   # XP/Badge tizimi
│   │   ├── DailyTodo.tsx      # Kunlik tasklar
│   │   ├── PhasePage.tsx      # Faza sahifasi
│   │   └── SubModulePage.tsx  # Submodul sahifasi
│   ├── components/
│   │   ├── Sidebar.tsx        # Asosiy navigatsiya
│   │   ├── TaskItem.tsx       # Task komponent
│   │   ├── ProgressBar.tsx    # Progress indikator
│   │   └── ...
│   └── store/
│       └── launchStore.ts     # Zustand state (localStorage persist)
├── dist/                      # Build natijasi (gitignore)
├── build.sh                   # Build skript
├── serve.py                   # Python SPA server
└── package.json
```

---

## 💹 Moliya Modeli (Realistik Stsenariy)

| Ko'rsatkich | Qiymat |
|-------------|--------|
| Registratsiya | 250 ta |
| Zalga kelish (65%) | ~162 kishi |
| Kurs sotuvi (zaldan) | ~16 ta |
| Dojim sotuvi | 6 ta |
| **JAMI KURS** | **~22 ta** |
| Seminar daromad | 150 mln so'm |
| Kurs daromadi | ~355 mln so'm |
| Jami xarajat | ~38 mln so'm |
| **Sof foyda** | **~467 mln so'm** |
| **ROI** | **~1,200%** |

---

## 🎮 Gamifikatsiya Tizimi

- **XP** — har task uchun 30-100 XP
- **7 ta daraja** — Yangi Boshlovchi → Moysklad Legend
- **9 ta badge** — Startap, Trafikchi, Olov, Champion va boshqalar
- **Streak** — kunlik ketma-ket ishlash zanjiri
- **Leaderboard** — jamoa reytingi

---

## 🔧 Sozlash

### Dollar kursi
`src/data/financeModel.ts` → `USD_RATE` o'zgartiring

### Yangi task qo'shish
`src/data/phases.ts` → `INITIAL_TASKS` massiviga qo'shing

### KPI maqsadlari
`src/data/kpiManagement.ts` → `KPI_TARGETS` o'zgartiring

### Zustand versiyasi
`src/store/launchStore.ts` → `version` oshiring (localStorage yangilanadi)

---

## 👨‍💻 Muallif

**Elmun Technologies**  
GitHub: [@Elmun-Technologies](https://github.com/Elmun-Technologies)

---

## 📄 Litsenziya

MIT License — erkin foydalanishingiz mumkin.
