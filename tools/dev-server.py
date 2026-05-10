#!/usr/bin/env python3
"""Servidor HTTP simples para desenvolvimento — força no-cache em tudo.

Por padrão, http.server respeita If-Modified-Since e o navegador acaba usando
cache antigo durante o desenvolvimento, mesmo com Ctrl+F5. Este wrapper desliga
cache para que cada request retorne a versão mais recente do disco.

Uso:  python tools/dev-server.py [porta]
"""
import http.server
import sys
import os

PORTA = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    # Suprime If-Modified-Since e If-None-Match pra nunca retornar 304.
    def send_head(self):
        if "If-Modified-Since" in self.headers:
            del self.headers["If-Modified-Since"]
        if "If-None-Match" in self.headers:
            del self.headers["If-None-Match"]
        return super().send_head()


class QuietHandler(NoCacheHandler):
    # Silencia o log padrão pra evitar bloqueio de stdout em pipes longos.
    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    httpd = http.server.ThreadingHTTPServer(("0.0.0.0", PORTA), QuietHandler)
    print(f"Servidor de desenvolvimento em http://localhost:{PORTA}/ (no-cache, multi-thread)", flush=True)
    print(f"Raiz: {RAIZ}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrando.", flush=True)
        httpd.shutdown()
