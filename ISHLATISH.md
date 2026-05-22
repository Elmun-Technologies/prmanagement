# MoySklad Zapusk — Ishga tushirish

## ✅ ENG OSON USUL (ishlaydigan usul)

Loyiha papkasida Terminal oching va quyidagini bajaring:

```bash
python3 serve.py
```

Keyin brauzerda oching: **http://127.0.0.1:3000**

---

## Nima qiladi serve.py?

- `dist/` papkasidagi tayyor fayllarni xizmat qiladi
- React Router uchun barcha yo'llarni to'g'ri boshqaradi
- Vite, Node, npm — hech biri kerak emas, faqat Python (Mac da har doim bor)

---

## Muammo chiqsa

### "Address already in use" xatosi
```bash
pkill -f "serve.py"
python3 serve.py
```

### Sahifa bo'sh ko'rinsa
Brauzerda `F12` → Console bo'limini tekshiring

### Barcha ma'lumotlarni qayta boshlash
Brauzerda: `F12` → Application → Local Storage → O'chirish → Sahifani yangilash

---

## Ilovani yangilash (agar kod o'zgarsa)

```bash
node_modules/.bin/esbuild src/main.tsx --bundle --outfile=dist/assets/app.js --format=esm --jsx=automatic --loader:.tsx=tsx --loader:.ts=ts '--define:process.env.NODE_ENV="production"' --minify
```

Keyin `python3 serve.py` ni qayta ishga tushiring.
