#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "📦 Building bundle..."

# Read env vars (from .env.local if exists, or system env)
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs) 2>/dev/null || true
fi

SUPABASE_URL="${VITE_SUPABASE_URL:-}"
SUPABASE_KEY="${VITE_SUPABASE_ANON_KEY:-}"

NODE_OPTIONS="--max-old-space-size=4096" npx esbuild src/main.tsx \
  --bundle \
  --outfile=dist/bundle.js \
  --loader:.tsx=tsx \
  --loader:.ts=ts \
  --format=esm \
  --target=es2020 \
  --jsx=automatic \
  --minify \
  --define:import.meta.env.VITE_SUPABASE_URL="\"${SUPABASE_URL}\"" \
  --define:import.meta.env.VITE_SUPABASE_ANON_KEY="\"${SUPABASE_KEY}\"" \
  --define:import.meta.env.MODE='"production"' \
  --define:import.meta.env.DEV='false' \
  --define:import.meta.env.PROD='true'

cp dist/index.html dist/index.html.bak 2>/dev/null || true

cat > dist/index.html << 'EOF'
<!doctype html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MoySklad Zapusk</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              dark: {
                bg: '#0d0d1a',
                card: '#13132a',
                surface: '#1a1a35',
                border: '#2a2a4a',
                hover: '#22224a',
              },
              gold: {
                DEFAULT: '#c8a96e',
                light: '#d4b87a',
                dark: '#a88a50',
              },
            },
            boxShadow: {
              'gold-lg': '0 0 40px rgba(200,169,110,0.25)',
            },
          },
        },
      };
    </script>
    <link rel="stylesheet" href="/bundle.css" />
  </head>
  <body class="bg-dark-bg text-white antialiased">
    <div id="root"></div>
    <script type="module" src="/bundle.js"></script>
  </body>
</html>
EOF

# Netlify React Router uchun
echo "/*  /index.html  200" > dist/_redirects

echo "✅ Build tayyor: dist/bundle.js + dist/index.html"
