#!/usr/bin/env python3
"""
MoySklad Zapusk - Static SPA Server
Barcha route'lar uchun index.html qaytaradi (React Router uchun)
"""
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3000
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def do_GET(self):
        # Static fayl bo'lsa - to'g'ridan-to'g'ri xizmat qiladi
        path = self.path.split("?")[0]
        full_path = os.path.join(DIST_DIR, path.lstrip("/"))
        if os.path.isfile(full_path):
            return super().do_GET()
        # Aks holda index.html qaytaradi (React Router uchun)
        self.path = "/index.html"
        return super().do_GET()

    def log_message(self, format, *args):
        print(f"  {args[0]} {args[1]}")

if __name__ == "__main__":
    os.chdir(DIST_DIR)
    server = HTTPServer(("", PORT), SPAHandler)
    server.allow_reuse_address = True
    print(f"\n✅  MoySklad Zapusk ishga tushdi!")
    print(f"🌐  Brauzerda oching: http://127.0.0.1:{PORT}")
    print(f"⛔  To'xtatish uchun: Ctrl+C\n")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer to'xtatildi.")
        sys.exit(0)
