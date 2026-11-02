# 🛡️ Aegis Finance | Cerebro y Asistente Financiero 24/7

> **Herramienta definitiva de inteligencia financiera, análisis cuantitativo en tiempo real y asesoramiento proactivo basado en evidencia científica y optimización fiscal española.**

Diseñado a medida para **Rubén** (20 años, 10.000 € de capital inicial en banco, 500 € de ahorro mensual, cobro el día 28).

---

## ⚡ Inicio Rápido (En 1 Clic)

Simplemente ejecuta en tu terminal:

```bash
python start_server.py
```

O haz doble clic en el archivo **`iniciar.bat`**.

El servidor se iniciará en modo dual (PC y Móvil):
- 💻 **En tu ordenador (PC):** `http://localhost:8000`
- 📱 **En tu teléfono móvil:** `http://192.168.1.34:8000` *(o la IP local que muestre la consola)*

---

## 📱 Cómo visualizarlo cómodamente en el móvil

1. **Conéctate a la misma red Wi-Fi** de tu casa con tu móvil.
2. Abre **Safari** (iPhone) o **Chrome** (Android) e ingresa:
   👉 **`http://192.168.1.34:8000`**
3. **Instalar como App Nativa (Recomendado):**
   - En **iPhone (Safari):** Pulsa el botón de Compartir (icono de cuadrado con flecha hacia arriba) y selecciona **"Añadir a pantalla de inicio"**.
   - En **Android (Chrome):** Pulsa los 3 puntos arriba a la derecha y selecciona **"Añadir a pantalla principal"** o **"Instalar aplicación"**.
   - ¡Listo! Se abrirá a pantalla completa como una aplicación bancaria nativa, sin barras de navegación del explorador.

### 🌟 Experiencia Móvil Optimizada:
- **Barra de navegación inferior fija**: Acceso instantáneo con el pulgar a *Hoy*, *Mi Panel*, *Plan 10k*, *Mercado* y *Asesor*.
- **Pestañas superiores deslizables**: Carrusel táctil sin barras de scroll invasivas.
- **Gráficos táctiles adaptables**: Proyecciones y modelos con soporte táctil que no se salen de la pantalla.
- **Tablas con scroll horizontal suave**: Comparativas de la Ley IRPF y modelos Monte Carlo optimizados para pantallas pequeñas.

---

## 🎯 Tu Plan Financiero Real a los 20 Años

### 1. Tus 10.000 € en el Banco (Tu Escudo Protector)
- **100% Intactos y Seguros**: No tienes ninguna prisa en invertirlos. Son los ahorros de tu primer año de trabajo y te garantizan paz mental absoluta.
- **Entrada inicial opcional**: Si en algún momento quieres romper el hielo, puedes empezar probando con una pequeña fracción (ej. 1.000 €) o dejarlo 100% íntegro en tu banco.

### 2. Tus 500 € de Ahorro Mensual (De tu nómina de 1.430 €)
- **Día 28**: Ingreso de tu nómina de 1.430 €.
- **Día 29**: Apartas tus **500 €** a tu cuenta de ahorro.
  - **~250 € (50%)** siguen engordando tu cuenta de ahorro sin riesgo.
  - **~250 € (50%)** se invierten automáticamente en fondos indexados globales (*Vanguard Global Stock*).
- **930 €/mes limpios para vivir**: Gastos, ocio, transporte, comidas y caprichos sin sensación de privación.

---

## 🧠 Arquitectura del Sistema

1. **Frontend**: Vite + React 19 + TailwindCSS + Recharts + Lucide Icons.
   - Diseño limpio, amigable y full-window (borde a borde).
   - Ergonomía móvil completa con barra inferior y menús táctiles.
2. **Backend**: Python 3.12 + FastAPI + Uvicorn + Pydantic.
   - Endpoint `/api/system/network` con detección dinámica de IP local para conexión móvil instantánea.
   - Ingesta en tiempo real con hilos en segundo plano y fallback inmediato (<15ms).
   - Simulaciones Monte Carlo (2.000 iteraciones estocásticas) y cálculo de interés compuesto.
3. **Corpus de Conocimiento Erudito**:
   - Filosofía Bogleheads, John Bogle, Benjamin Graham, Ray Dalio y Howard Marks.
   - Régimen fiscal de fondos en España (**Artículo 94 Ley 35/2006 IRPF**).
