"""
Lanzador Principal de Aegis Finance - Cerebro Financiero 24/7.
Ejecuta el servidor backend accesible desde tu PC y desde tu móvil (en la misma red Wi-Fi).
"""
import sys
import os
import socket
import webbrowser
import threading
import time

# Asegurar que 'backend' esté en el path de Python
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    import uvicorn
except ImportError:
    print("[ERROR] uvicorn no esta instalado. Ejecuta: pip install uvicorn fastapi yfinance pandas")
    sys.exit(1)

def get_local_ip():
    """Obtiene la IP local de la máquina en la red Wi-Fi/LAN"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def open_browser():
    time.sleep(1.5)
    print("\n[+] Abriendo panel de control en tu navegador: http://localhost:8000")
    webbrowser.open("http://localhost:8000")

def main():
    local_ip = get_local_ip()
    port = 8000

    print("=" * 72)
    print("   AEGIS FINANCE | CEREBRO Y ASISTENTE FINANCIERO 24/7")
    print("   Perfil Activo: Rubén (20 años) | 10.000 € Inicial | 1.430 €/mes")
    print("   Estrategia: Core-Satellite Indexado + Radar Proactivo + Art. 94 IRPF")
    print("=" * 72)
    print("\n[*] SERVIDOR ACTIVO Y ACCESIBLE:")
    print(f"    💻 En tu ordenador (PC):       http://localhost:{port}")
    if local_ip != "127.0.0.1":
        print(f"    📱 En tu móvil (misma Wi-Fi):  http://{local_ip}:{port}")
    print("\n[*] Para usarlo en el móvil, conéctate a la misma Wi-Fi y abre ese enlace.")
    print("[*] Presiona CTRL+C para detener el asistente.\n")

    # Abrir navegador automáticamente en el PC
    threading.Thread(target=open_browser, daemon=True).start()

    from app.main import app
    # Escuchar en 0.0.0.0 para permitir conexiones desde el móvil en la misma red local
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")

if __name__ == "__main__":
    main()

