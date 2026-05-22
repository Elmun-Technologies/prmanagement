# CLAUDE.md — AI Yo'riqnomasi

> Bu fayl Claude (yoki boshqa AI) uchun loyiha haqida to'liq kontekst beradi.
> Har yangi suhbatda bu faylni o'qib loyihani tushunib oling.

---

## Loyiha nomi
**MoySklad PRO Zapusk Boshqaruv Tizimi**  
GitHub: https://github.com/Elmun-Technologies/prmanagement

---

## Asosiy maqsad
MoySklad inventar tizimi bo'yicha **onlayn kurs** zapuskini boshqarish:
- **Seminar** (T0): 200 ta qatnashchi, 600,000 so'm kirish, zalda 20 ta $1,500 kurs sotuvi
- **Asosiy Kurs** (T+14): 6 haftalik intensiv, $2,000, 25-27 talaba

---

## Tech Stack

```
Frontend:    React 18 + TypeScript
Styling:     Tailwind CSS (CDN, index.html da config)
State:       Zustand + persist (localStorage)
Build:       esbuild (build.sh skripti)
Server:      Python 3 (serve.py, port 3000)
Router:      React Router v6
```

> ⚠️ Tailwind CDN ishlatiladi — `tailwind.config` `dist/index.html` ichida joylashgan.
> `tailwind.config.js` faylda emas, chunki CDN versiyasi.

---

## Muhim fayllar

### Data fayllar
| Fayl | Tavsif |
|------|--------|
| `src/data/phases.ts` | **5,600+ qator** — 5 faza, 14 submodul, 128+ task batafsil SOP bilan |
| `src/data/types.ts` | TypeScript interfeyslari (Phase, SubModule, Task, TeamMember, Badge, KPI) |
| `src/data/kpiManagement.ts` | KPI maqsadlar, voronka, ogohlantirishlar |
| `src/data/statsManagement.ts` | Dashboard/Statistika sahifasi konfiguratsiyasi |
| `src/data/financeModel.ts` | Moliya modeli — 3 stsenariy, P&L, cashflow hisob-kitob funksiyalari |

### Store
| Fayl | Tavsif |
|------|--------|
| `src/store/launchStore.ts` | Zustand store, `version: 5` (localStorage), migrate funksiyasi |

> ⚠️ `phases.ts` o'zgartirilganda `launchStore.ts` da `version` ni oshiring.
> Aks holda eski localStorage bilan konflikt bo'ladi va ilova ishlamaydi.

### Sahifalar
| Fayl | Route | Tavsif |
|------|-------|--------|
| `LaunchHome.tsx` | `/` | Asosiy — 3 ta LAUNCH_STAGE kartalari |
| `StagePage.tsx` | `/stage/:id` | Bosqich — fazalar ro'yxati |
| `PhasePage.tsx` | `/phase/:id` | Faza — submodullar grid |
| `SubModulePage.tsx` | `/phase/:id/sub/:subId` | Submodul — tasklar ro'yxati |
| `DailyTodo.tsx` | `/daily` | Kunlik tasklar, filtr (assignee, status) |
| `KPITracker.tsx` | `/kpi` | KPI voronka, konversiya, reklama tab-lari |
| `FinanceModel.tsx` | `/finance` | Moliya modeli — 5 tab, interaktiv slayderlar |
| `Team.tsx` | `/team` | Jamoa KPI, ranking |
| `Dashboard.tsx` | `/dashboard` | Umumiy statistika |
| `Gamification.tsx` | `/gamification` | XP, badge, streak, leaderboard |

---

## Ranglar (Dark Theme)

```
--dark-bg:      #0d0d1a   (asosiy fon)
--dark-card:    #13132a   (karta fon)
--dark-surface: #1a1a35   (input/secondary fon)
--dark-border:  #2a2a4a   (chegaralar)
--dark-hover:   #22224a   (hover/track rangi)
--gold:         #c8a96e   (asosiy accent rang)
--gold-light:   #d4b87a
--gold-dark:    #a88a50
```

> ⚠️ **Muhim:** Barcha komponnetlarda DARK THEME ranglari ishlatilishi shart.
> `bg-white`, `bg-gray-50`, `text-gray-800`, `text-gray-900` kabi OCHIQ ranglar ISHLATILMAYDI.
> O'rniga: `bg-dark-card`, `bg-dark-surface`, `text-white`, `text-gray-300` ishlatilsin.

### To'g'ri rang misollari
```tsx
// ❌ Noto'g'ri (ochiq fon, qorong'u temada ko'rinmaydi)
<div className="bg-white text-gray-800 border border-gray-200">
<span className="bg-blue-100 text-blue-700">

// ✅ To'g'ri (dark theme)
<div className="bg-dark-card text-white border border-dark-border">
<span className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
```

---

## Build jarayoni

```bash
# Build
bash build.sh

# Server
python3 serve.py    # http://localhost:3000
```

> `build.sh` ichida: `NODE_OPTIONS="--max-old-space-size=4096"` qo'yilgan.
> Sabab: `phases.ts` 5600+ qator — esbuild ko'p xotira talab qiladi.

---

## Task tuzilmasi (phases.ts)

```typescript
interface Task {
  id: string;           // 'f1-t30-1' formatida
  phaseId: number;      // 1-5
  subModuleId: string;  // '1.1', '4.2', '5.3' kabi
  day: number;          // -30 dan +21 gacha (T0 = seminar kuni)
  title: string;        // Qisqa sarlavha
  description: string;  // Batafsil SOP (markdown formatida)
  assignee: Assignee;   // 'mentor'|'targetolog'|'sotuvchi1'|'sotuvchi2'|'assistent'|'jamoa'
  status: 'pending'|'inprogress'|'done';
  xpReward: number;     // 30-100 XP
  category: Category;   // 'bozor'|'kontent'|'trafik'|'logistika'|'sotuv'|'dojim'|'hamkor'
}
```

### Task description formati (markdown)
```
## Sarlavha        → text-gold, uppercase
### Kichik sarlavha → text-white, semibold
☐ Bajariladigan ish  → text-gold belgisi
✅ Bajarilgan         → yashil
→ Eslatma/yo'riqnoma  → text-gold strelka
1. Raqamli ro'yxat   → gold raqam
| Jadval |            → mono font
```

---

## Faza va Submodullar

```
Faza 1 (T-30→T-21): 1.1 Bozor Tahlili, 1.2 Mijoz Portreti, 1.3 Taklif, 1.4 Logistika, 1.5 Hamkorlar
Faza 2 (T-20→T-11): 2.1 Landing, 2.2 Kontent, 2.3 Avtomatika, 2.4 Target Reklama, 2.5 Hamkor Kontent
Faza 3 (T-10→T-1):  3.1 Kunlik Kontent, 3.2 Lead Boshqaruv, 3.3 PR Kollaboratsiya, 3.4 Zal & Seminar Pack
Faza 4 (T0):        4.1 Seminardan oldin, 4.2 Seminar vaqtida, 4.3 Seminardan keyin
Faza 5 (T+1→T+21):  5.1 Kursdan oldin, 5.2 Kurs vaqtida, 5.3 Kursdan keyin
```

---

## Zustand Store — Muhim qoidalar

1. `version` har `phases.ts` o'zgarganda oshirilsin (hozir `5`)
2. `migrate` funksiyasi tasks va badges-ni qayta o'rnatadi, lekin XP va KPI-ni saqlab qoladi
3. `INITIAL_TASKS` dan `tasks` store ga ko'chiriladi (persist orqali)
4. `getTasksByDay(day)` — berilgan kun uchun barcha tasklar
5. `isSubModuleUnlocked(subId)` — oldingi submodul 100% bo'lsa ochiladi

---

## Moliya Modeli

`src/data/financeModel.ts` da:
- `USD_RATE = 12_700` — dollar kursi (o'zgartirilishi mumkin)
- `SCENARIOS` — 3 ta stsenariy parametrlari
- `calcFinance(params)` → `FinanceResult` — barcha ko'rsatkichlar
- `buildCashFlow(params)` → `CashFlowItem[]` — kunlar bo'yicha pul oqimi
- `getCostCategories(params)` → xarajat kategoriyalari

---

## Sidebar navigatsiya

```
🚀 Zapusk        → /
📋 Bugungi ishlar → /daily
📊 KPI           → /kpi
💹 Moliya Modeli  → /finance
👥 Jamoa         → /team
📈 Statistika    → /dashboard
```

Pastda: LAUNCH_STAGES accordion (fazalar ketma-ket)

---

## Keng tarqalgan xatolar va yechimlar

### "React is not defined"
**Sabab:** esbuild JSX transform noto'g'ri  
**Yechim:** `build.sh` da `--jsx=automatic` bayrog'i bo'lishi shart

### Ilova ochilmaydi / eski versiya chiqadi
**Sabab:** `dist/index.html` eski Vite build-dan qolgan (`app.js`)  
**Yechim:** `bash build.sh` → bu `index.html` ni ham yangilaydi

### LocalStorage konflikti (ilova crash)
**Sabab:** `phases.ts` o'zgardi, lekin localStorage eski data saqlagan  
**Yechim:** `launchStore.ts` da `version` oshirilsin — `migrate` funksiyasi ishga tushadi

### Build killed (exit code 137)
**Sabab:** `phases.ts` katta — esbuild xotiradan chiqadi  
**Yechim:** `build.sh` da `NODE_OPTIONS="--max-old-space-size=4096"` qo'yilgan

### `so'm` apostrophe xatosi
**Sabab:** `'..so'm...'` — ichki apostrof stringni yopib qo'yadi  
**Yechim:** `so\u02bcm` yoki template literal ishlatilsin

---

## Til haqida

- **Kod va izohlar:** O'zbek tilida (UI matnlari)
- **TypeScript interfeyslari:** Inglizcha
- **Commit xabarlari:** O'zbek yoki inglizcha
- **Foydalanuvchi bilan muloqot:** O'zbek tilida

---

## Keyingi qo'shilishi kerak bo'lgan xususiyatlar

1. **Progrev psixologik ark** — Faza 3 ni `Muammo → Yechim → Ishonch → Harakat` bo'yicha qayta qurish
2. **Sotuvchi floor script** — Seminar sotuv sessiyasi uchun batafsil skript (Faza 4.2)
3. **Show-up call script** — T-3 → T-1 tasdiqlash qo'ng'iroqlari protokoli (Faza 3.2)
4. **Byudjet rejasi task** — Reklama va logistika xarajatlarini Faza 1 da moliyaviy rejalashtirish
5. **Backup plan** — Agar T-5 da 100 ta registratsiya bo'lsa nima qilish kerak
