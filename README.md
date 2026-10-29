# 🇬🇧 VibeEnglish · Plataforma Profesional & Interactiva de Aprendizaje de Inglés

**VibeEnglish** es una plataforma web interactiva de enseñanza de inglés diseñada con una estética **Neo-Editorial ("Oxford Nocturne & Botanical Club")**, que combina gamificación progresiva (ruta de lecciones secuenciales paso a paso), síntesis de voz nativa en inglés (`Web Speech API`), grabación real de micrófono (`MediaRecorder API`), reconocimiento fonético en tiempo real (`SpeechRecognition API`), efectos de sonido generados por sintetizador (`Web Audio API`), simulador de conversación interactiva, biblioteca de audios bilingües, foros comunitarios, sistema de temas adaptativos (**Modo Oscuro** y **Modo Claro**) y emisión de certificados oficiales descargables.

---

## 📋 Tabla de Contenidos

1. [Formas de Ejecutar el Proyecto](#-formas-de-ejecutar-el-proyecto)
2. [Arquitectura y Estructura de Archivos](#-arquitectura-y-estructura-de-archivos)
3. [Diseño Visual, Estética "Oxford Nocturne" y Modo Oscuro / Claro](#-diseño-visual-estética-oxford-nocturne-y-modo-oscuro--claro)
4. [Desglose Completo de Secciones y Módulos](#-desglose-completo-de-secciones-y-módulos)
   - [Parte 1: Portal de Acceso, Manual de Uso y Suscripción VIP](#1-parte-1-portal-de-acceso-manual-de-uso-y-suscripción-vip)
   - [Barra Superior Flotante ("Island Dock") y Menú Desplegable de Estado](#2-barra-superior-flotante-island-dock-y-menú-desplegable-de-estado)
   - [Sección 1: Inicio (Mapa de Ruta Serpiente, Acciones y Niveles MCER)](#3-sección-1-inicio-mapa-de-ruta-serpiente-acciones-y-niveles-mcer)
   - [Sección 2: El Manual (Lesson Runner Secuencial "Parte por Parte")](#4-sección-2-el-manual-lesson-runner-secuencial-parte-por-parte)
   - [Sección 3: Biblioteca de Audios & Listening Bilingüe](#5-sección-3-biblioteca-de-audios--listening-bilingüe)
   - [Sección 4: Conversación Interactiva & Grabación de Voz en Tiempo Real](#6-sección-4-conversación-interactiva--grabación-de-voz-en-tiempo-real)
   - [Sección 5: Laboratorio de Pronunciación & Los 10 Botones Oficiales](#7-sección-5-laboratorio-de-pronunciación--los-10-botones-oficiales)
   - [Sección 6: Foros de la Comunidad](#8-sección-6-foros-de-la-comunidad)
   - [Sección 7: El Progreso, Calificaciones, Insignias y Certificado Oficial](#9-sección-7-el-progreso-calificaciones-insignias-y-certificado-oficial)
5. [Tecnologías y APIs Nativas del Navegador](#-tecnologías-y-apis-nativas-del-navegador)
6. [Persistencia de Datos (`localStorage`)](#-persistencia-de-datos-localstorage)
7. [Referencia de la API Pública (`window.EnglishApp`)](#-referencia-de-la-api-pública-windowenglishapp)
8. [Requisitos del Sistema](#-requisitos-del-sistema)

---

## 🚀 Formas de Ejecutar el Proyecto

La aplicación no requiere dependencias externas ni instalación de paquetes (`npm install` no es necesario), ya que tanto el frontend como el servidor local utilizan tecnologías 100% estándar y nativas.

### Opción 1: Ejecución Automática en Windows (`Iniciar VibeEnglish.bat`)
1. Haz doble clic en el archivo **`Iniciar VibeEnglish.bat`** ubicado en la raíz del proyecto.
2. El script iniciará el servidor o abrirá la plataforma automáticamente en tu navegador predeterminado.

### Opción 2: Servidor HTTP Local con Node.js (`server.js`)
1. Abre una terminal (PowerShell, CMD o Bash) en la carpeta raíz del proyecto:
   ```bash
   node server.js
   ```
   o mediante npm:
   ```bash
   npm start
   ```
2. El servidor escuchará por defecto en el puerto `3000` (y si está ocupado, buscará automáticamente el siguiente puerto disponible `3001`, `3002`, etc.):
   ```text
   http://localhost:3000
   ```

### Opción 3: Apertura Directa en el Navegador (Sin Servidor)
1. Abre directamente el archivo **`index.html`** de la raíz o **`public/index.html`** haciendo doble clic sobre él desde el explorador de archivos.
2. Todas las funciones visuales, lecciones, sintetizador de voz, modo oscuro y almacenamiento local funcionan inmediatamente.

---

## 📁 Arquitectura y Estructura de Archivos

El proyecto mantiene sincronizados los archivos tanto en la raíz como en el directorio `public/` (utilizado por `server.js`), garantizando que funcione de forma idéntica sin importar cómo se abra:

```text
curso-ingles/
│
├── README.md                   # Documentación técnica y funcional completa del proyecto
├── package.json                # Configuración del proyecto y scripts ("start", "dev")
├── server.js                   # Servidor HTTP nativo en Node.js con soporte MIME y fallback SPA
├── Iniciar VibeEnglish.bat     # Lanzador rápido para sistemas Windows
│
├── index.html                  # Documento principal HTML5 (sincronizado con public/index.html)
├── styles.css                  # Sistema de diseño CSS "Oxford Nocturne" (sincronizado con public/styles.css)
├── app.js                      # Motor lógico completo en JavaScript (sincronizado con public/app.js)
├── assets/
│   └── images/                 # Recursos gráficos para niveles y marca
│       ├── logo.jpg            # Logotipo e insignia oficial de VibeEnglish
│       ├── beginner.jpg        # Portada del Nivel Principiante (A1–A2)
│       ├── intermediate.jpg    # Portada del Nivel Intermedio (B1–B2)
│       └── advanced.jpg        # Portada del Nivel Avanzado (C1–C2)
│
└── public/                     # Directorio servido por server.js
    ├── index.html              # Estructura semántica completa de la plataforma
    ├── styles.css              # Hoja de estilos con variables adaptativas Oscuro/Claro
    ├── app.js                  # Lógica de la aplicación (módulo IIFE EnglishApp)
    └── assets/
        └── images/
            ├── logo.jpg
            ├── beginner.jpg
            ├── intermediate.jpg
            └── advanced.jpg
```

---

## 🎨 Diseño Visual, Estética "Oxford Nocturne" y Modo Oscuro / Claro

La interfaz está construida bajo una estética de autor denominada **"Oxford Nocturne & Botanical Club" (Neo-Editorial Táctil)**:

### 1. Sistema Dual de Temas (Modo Oscuro y Modo Claro)
- **🌙 Modo Oscuro (*Nocturnal Botanical & Warm Brass* — Activo por defecto)**:
  - **Fondos**: Obsidiana-Bosque profundo (`#0B0F0D`), superficies en musgo mate (`#141C18` / `#1B2620`) e iluminación radial ambiental en verde jade y bronce cálido.
  - **Textos**: Crema Alabastro (`#F5F0E6`) de alto contraste y gris salvia (`#B5C0B7`).
  - **Acentos**: Esmeralda Jade (`#10B981`), Bronce Solar (`#F59E0B`) y Terracota Coral (`#F43F5E`).
- **☀️ Modo Claro (*Warm Artisanal Parchment & Forest Ink*)**:
  - **Fondos**: Papel pergamino artesanal (`#F4EFE4`) y tarjetas en marfil cálido (`#FFFDF8`).
  - **Bordes y Sombras**: Tinta bosque profunda (`#18221D`) con sombras sólidas desplazadas (`3px 3px 0px #18221D`).
- **Controles de Cambio de Tema**:
  1. **Botón Flotante Inferior Derecho (`#theme-toggle-floating-btn`)**: Siempre accesible tanto en la portada de acceso como dentro de la plataforma.
  2. **Botón en el Menú Desplegable Superior (`#theme-toggle-header-btn`)**: Ubicado dentro del desplegable `🇬🇧 ⚡ Panel & Tema ▾` de la cabecera.

### 2. Tipografía Editorial y Técnica
- **`Fraunces` (Serif Editorial)**: Títulos principales, encabezados de sección, frases objetivo en inglés y métricas numéricas.
- **`Space Grotesk` (Geométrica Técnica)**: Botones táctiles, insignias tipo sello de pasaporte, encabezados de tablas y etiquetas de estado.
- **`Plus Jakarta Sans`**: Cuerpo de lectura, explicaciones gramaticales, transcripciones y foros.
- **`Fira Code` (Monoespaciada)**: Transcripciones del Alfabeto Fonético Internacional (`IPA`, ej. `/həˈloʊ haʊ ɑːr juː/`) y cronómetro de grabación en vivo.

### 3. Relieve Táctil ("Mechanical Key / Editorial Stamp")
- Todos los botones (`.btn`) cuentan con altura estandarizada (`min-height: 44px`), bordes definidos y sombra desplazada sólida que reacciona físicamente al pasar el cursor (`translate(-2px, -2px)`) y al presionar (`translate(2px, 2px)`).

---

## 🧩 Desglose Completo de Secciones y Módulos

### 1. Parte 1: Portal de Acceso, Manual de Uso y Suscripción VIP (`#auth-section`)
- **Panel Izquierdo (Guía y Manual de Uso Paso a Paso)**:
  - Explica en 5 pasos numerados cómo utilizar la plataforma (*Ingreso Rápido, Ruta de Lecciones, Conversaciones Reales, Evaluación Oral con IA, Audios/Foros/Certificado*).
  - **Accesos Directos**:
    - `💎 Planes de Suscripción`: Abre el modal de membresías VIP.
    - `⚡ Probar Modo Demo (1 Clic) →`: Ingresa directamente a la plataforma sin necesidad de llenar formularios.
    - Cuadrícula rápida de acceso directo a `🎧 Audios`, `💬 Conversación`, `🎙️ Pronunciación` y `👥 Foros`.
    - `➕ Agregar Información / Notas`: Permite crear tarjetas personalizadas de notas o apuntes que se guardan en `localStorage`.
- **Panel Derecho (Autenticación)**:
  - **Iniciar Sesión (`#form-login`)**: Acceso con correo electrónico, contraseña (con botón `👁️` para mostrar/ocultar clave) y validación.
  - **Crear Cuenta (`#form-register`)**: Registro de nombre, correo, contraseña y selector de nivel inicial (`Principiante A1–A2`, `Intermedio B1–B2`, `Avanzado C1–C2`).
  - **Recuperar Contraseña (`#form-recover`)**: Envío simulado de enlace de recuperación al correo registrado.
- **Modal de Suscripción VIP (`#modal-subscription`)**:
  - Selección interactiva entre 3 planes: **Mensual (`$14.99/mes`)**, **Anual Pro (`$89.99/año` - Destacado)** y **Vitalicio (`$199 pago único`)** con activación inmediata.

---

### 2. Barra Superior Flotante ("Island Dock") y Menú Desplegable de Estado (`.platform-header`)
- **Marca**: Logotipo de VibeEnglish + insignia del plan activo (`VibeEnglish Pro`).
- **Navegación Principal (`.course-main-nav`)**: 7 pestañas interactivas:
  1. `🏠 Inicio`
  2. `📖 El Manual`
  3. `🎧 Audios`
  4. `💬 Conversación`
  5. `🎙️ Pronunciación`
  6. `👥 Foros`
  7. `📊 El Progreso`
- **Botón Desplegable `🇬🇧 ⚡ Panel & Tema ▾` (`#header-stats-dropdown-btn`)**:
  Al hacer clic, despliega un panel flotante (`#header-stats-dropdown-menu`) que agrupa limpiamente:
  - `🇬🇧 Inglés` (Idioma del curso)
  - `🔥 7` (Racha de días consecutivos de estudio)
  - `💎 1,450` (Gemas / Puntos de experiencia XP acumulados en tiempo real)
  - `❤️ 5` (Vidas disponibles para los retos)
  - `💎 VIP Pro` (Acceso directo al modal de suscripción)
  - `🌙 Modo Oscuro` / `☀️ Modo Claro` (Interruptor de tema sincronizado)
- **Botón `Salir`**: Cierra la sesión actual y regresa al portal de bienvenida.

---

### 3. Sección 1: Inicio (`#view-inicio`)
- **Camino de Aprendizaje Secuencial (`#snake-path-container`)**:
  - Mapa vertical de 5 lecciones conectadas con desbloqueo progresivo:
    1. **Lección 1**: *Saludos y Presentaciones (Greetings & Introductions)* ⭐
    2. **Lección 2**: *Práctica Fonética Oral (Oral Phonetics & Rhythm)* 🎙️
    3. **Lección 3**: *En la Cafetería y Restaurante (Ordering Food & Drinks)* ☕
    4. **Lección 4**: *Gramática & El Verbo To Be (Subject Pronouns & Verb To Be)* 📖
    5. **Lección 5**: *Desafío Final & Cofre de Trofeo (Unit Mastery Challenge)* 🏆
  - Las lecciones completadas muestran una corona `👑`; la lección activa muestra el indicador animado `¡EMPEZAR! +15 XP`; las lecciones posteriores permanecen bloqueadas con candado `🔒` hasta aprobar la anterior.
- **Cuadrícula Simétrica de 8 Botones de Acción (`.chatgpt-dashboard-buttons-grid`)**:
  Alineados en 2 filas exactas de 4 columnas:
  1. `▶ Comenzar a aprender`
  2. `🔄 Continuar última lección`
  3. `💬 Grabar audio y conversar`
  4. `🎙️ Practicar pronunciación`
  5. `📝 Realizar prueba de nivel` (abre el modal diagnóstico `#modal-level-test`)
  6. `📊 Ver mi progreso`
  7. `🏆 Ver mis logros` (abre el modal de insignias `#modal-achievements`)
  8. `➕ Agregar información`
- **Tarjetas de Niveles MCER (`.levels-grid`)**:
  - **Principiante (`A1–A2`)**, **Intermedio (`B1–B2`)** y **Avanzado (`C1–C2`)**, cada una con imagen de portada, botón de inicio de nivel y botón para agregar notas específicas a esa categoría.

---

### 4. Sección 2: El Manual — Lesson Runner Secuencial "Parte por Parte" (`#view-manual`)
Cada una de las 5 lecciones de la ruta se ejecuta paso a paso a través de 5 etapas interactivas con barra de progreso superior (`20%` por etapa), contador de vidas (`❤️ 5`) e indicador de experiencia (`+15 XP`):

1. **Paso 1 de 5 · Frase Clave y Teoría (`#runner-step-1`)**:
   - Presenta la explicación teórica de la lección, la frase clave en inglés y español con botón `🔊 Escuchar audio nativo`, y dos bloques detallados: **Reglas/Saludos Formales** y **Expresiones Informales/Cotidianas**.
2. **Paso 2 de 5 · Vocabulario Interactivo (`#runner-step-2`)**:
   - Cuadrícula de tarjetas interactivas con término en inglés, transcripción fonética IPA (`/ɡʊd ˈmɔːrnɪŋ/`) y traducción al español. Al tocar cualquier tarjeta, el sintetizador pronuncia la palabra en inglés.
3. **Paso 3 de 5 · Listening & Comprensión Auditiva (`#runner-step-3`)**:
   - Reproductor del diálogo completo de la lección con dos velocidades: **Normal (`1.0x`)** y **Modo Lento (`0.8x`)**, acompañado del guión escrito línea por línea.
4. **Paso 4 de 5 · Reto Interactivo con Comprobación (`#runner-step-4`)**:
   - Pregunta de opción múltiple (`A`, `B`, `C`). Al pulsar `COMPROBAR RESPUESTA`, despliega la bandeja inferior (`#runner-feedback-sheet`) con sonido de acierto o error, explicación gramatical detallada, suma de `+15 XP` (o descuento de 1 corazón si es incorrecta).
5. **Paso 5 de 5 · Práctica Fonética Oral con IA (`#runner-step-5`)**:
   - Muestra la frase objetivo de la lección con su transcripción IPA, botón de referencia nativa, micrófono interactivo con visualizador de ondas, reproducción de la voz grabada y diagnóstico instantáneo de **Claridad fonética**, **Fluidez** y **Entonación** (`+25 XP`).
6. **Pantalla de Celebración y Desbloqueo (`#runner-step-complete`)**:
   - Otorga `+100 XP`, desbloquea automáticamente la siguiente lección en el mapa serpiente y guarda el avance en `localStorage`.

---

### 5. Sección 3: Biblioteca de Audios & Listening Bilingüe (`#view-audios`)
- **Filtro por Categorías**: `Todos`, `✈️ Viajes & Aeropuertos`, `☕ Cafetería & Ciudad`, `💼 Trabajo & Entrevistas`.
- **4 Pistas de Diálogos Situacionales**:
  1. *At the International Airport* (`1:15 min`)
  2. *Ordering at a Coffee Shop* (`0:50 min`)
  3. *Job Interview: Professional Background* (`1:35 min`)
  4. *Asking for Directions in London* (`1:05 min`)
- Cada tarjeta incluye 3 controles alineados en cuadrícula (`▶ Reproducir (1.0x)`, `🐢 Lento (0.8x)`, `📜 Ver Transcripción`) y transcripción bilingüe inglés/español desplegable.

---

### 6. Sección 4: Conversación Interactiva & Grabación de Voz en Tiempo Real (`#view-conversacion`)
- **5 Escenarios Conversacionales**:
  1. `☕ En la Cafetería` (*Sarah - Barista*)
  2. `✈️ Check-in de Aeropuerto` (*David - Flight Agent*)
  3. `💼 Entrevista de Trabajo` (*Emma - Hiring Manager*)
  4. `👋 Charla con un Amigo` (*Alex - Amigo*)
  5. `🤖 Modo Conversación Libre (AI)` (*VibeEnglish AI Coach*)
- **Mecánica en Tiempo Real**:
  - El interlocutor pronuncia su intervención en inglés y aparece en el historial de chat con botones `🔊 Escuchar Voz`, `🐢 Lento` y opción para mostrar/ocultar traducciones.
  - El estudiante dispone de **Frases Sugeridas** clicables (`💡`), grabación de micrófono en vivo con cronómetro (`00:00`), reconocimiento de voz en tiempo real (`SpeechRecognition` en `en-US`) y reproducción de su propia grabación (`▶ Mi voz grabada`), ganando `+20 XP` por cada turno y `+50 XP` al completar el escenario.

---

### 7. Sección 5: Laboratorio de Pronunciación & Los 10 Botones Oficiales (`#view-pronunciacion`)
- Selector rápido de 4 frases objetivo con transcripción IPA:
  1. *"Hello, how are you?"* (`/həˈloʊ haʊ ɑːr juː/`)
  2. *"Nice to meet you"* (`/naɪs tuː miːt juː/`)
  3. *"Could you please speak slower?"* (`/kʊd juː pliːz spiːk ˈsloʊ.ər/`)
  4. *"I would like to practice English"* (`/aɪ wʊd laɪk tuː ˈpræktɪs ˈɪŋɡlɪʃ/`)
- **Cuadrícula Simétrica de los 10 Botones Oficiales de Práctica Oral (5 filas × 2 columnas)**:
  1. `1. Escuchar ejemplo` (velocidad `0.9x`)
  2. `2. Reproducir audio` (velocidad natural `1.0x`)
  3. `3. Grabar mi voz` (activa micrófono real y ondas de audio)
  4. `4. Detener grabación`
  5. `5. Escuchar mi grabación` (reproduce el audio capturado por el micrófono)
  6. `6. Evaluar pronunciación` (calcula puntaje global, claridad, fluidez, entonación y otorga `+25 XP`)
  7. `7. Ver errores` (muestra recomendaciones fonéticas específicas para la frase)
  8. `8. Escuchar pronunciación correcta` (articulación pausada a `0.75x`)
  9. `9. Intentar nuevamente` (reinicia el estado de grabación)
  10. `10. Siguiente actividad` (avanza a la siguiente frase del banco)

---

### 8. Sección 6: Foros de la Comunidad (`#view-foros`)
- Filtros dinámicos por temática: `Todos los Debates`, `🎙️ Pronunciación & Fonética`, `📖 Dudas Gramaticales`, `🎧 Audios & Listening`, `💡 Consejos de Estudio`.
- Hilos con respuestas destacadas de profesores nativos, botón de votos positivos (`👍` que suma `+5 XP`), botón para responder debates y botón `➕ Crear Nuevo Debate` (`+15 XP`).

---

### 9. Sección 7: El Progreso, Calificaciones, Insignias y Certificado Oficial (`#view-progreso`)
- **6 Botones de Acción de Progreso** (alineados en 2 filas × 3 columnas):
  - `Ver mi progreso`, `Consultar calificaciones`, `Ver historial`, `Ver mis insignias`, `Consultar certificados`, `🎓 Descargar certificado`.
- **Panel de 6 Tarjetas de Métricas**:
  - Porcentaje de curso completado (`78%`), Calificaciones promedio (`92%`), Prácticas orales (`42`), Palabras aprendidas (`320`), Racha de estudio (`7 Días`) y Siguiente objetivo (`Intermedio B1`).
- **Tabla Oficial de Calificaciones (`.modern-table`)**:
  - Desglose por módulo, lección, tipo de evaluación, calificación porcentual y estado (`Aprobado` / `En proceso`).
- **Certificado Oficial Descargable (`#modal-certificate`)**:
  - Diploma personalizado automáticamente con el nombre del estudiante registrado, sello dorado verificado, firmas académicas y botón `📥 Descargar / Imprimir Certificado` (compatible con exportación directa a PDF mediante `window.print()`).

---

## 🛠️ Tecnologías y APIs Nativas del Navegador

| Tecnología / API | Uso en VibeEnglish |
| :--- | :--- |
| **HTML5 Semántico** | Estructura modular de vistas, modales accesibles y controles interactivos. |
| **CSS3 Custom Properties** | Sistema de tokens adaptativos para Modo Oscuro (`:root`, `.dark-mode`) y Modo Claro (`.light-mode`), CSS Grid y Flexbox. |
| **Web Speech API (`speechSynthesis`)** | Síntesis de voz nativa en inglés (`en-US`) con control dinámico de velocidad (`1.0x`, `0.9x`, `0.8x`, `0.75x`). |
| **Web Speech API (`SpeechRecognition`)** | Transcripción en vivo de la voz del estudiante durante las conversaciones interactivas. |
| **MediaStream & MediaRecorder API** | Grabación real del micrófono del usuario en formato `audio/webm` y reproducción mediante `URL.createObjectURL`. |
| **Web Audio API (`AudioContext`)** | Generación en tiempo real de efectos sonoros de acierto (*chime* armónico), error y clic táctil sin depender de archivos MP3 externos. |
| **Node.js `http` & `fs`** | Servidor local ligero (`server.js`) sin dependencias externas. |

---

## 💾 Persistencia de Datos (`localStorage`)

La plataforma conserva automáticamente el estado del estudiante en el navegador mediante las siguientes claves de `localStorage`:

- `vibe_theme`: Tema visual activo (`'dark'` o `'light'`).
- `el_student_name`: Nombre completo del estudiante (mostrado en el perfil y en el Certificado Oficial).
- `el_student_email`: Correo electrónico del estudiante.
- `el_subscription`: Plan de suscripción seleccionado (`'monthly'`, `'annual'`, `'lifetime'`).
- `el_level`: Nivel MCER activo (`'beginner'`, `'intermediate'`, `'advanced'`).
- `vibe_unlocked_lesson`: Número de la última lección desbloqueada en el mapa serpiente (`1` a `5`).
- `vibe_completed_lessons`: Arreglo JSON con los IDs de las lecciones ya completadas (ej. `[1, 2]`).
- `vibe_custom_info`: Arreglo JSON con todas las tarjetas de notas/información personalizada creadas por el usuario.

---

## ⚙️ Referencia de la API Pública (`window.EnglishApp`)

Todas las funciones están encapsuladas en el módulo `EnglishApp` y expuestas globalmente en `window.EnglishApp`:

- **Tema y Cabecera**:
  - `EnglishApp.toggleDarkMode()` — Alterna entre Modo Oscuro y Modo Claro.
  - `EnglishApp.enableDarkMode()` / `EnglishApp.setDarkMode(boolean)` — Activa o define explícitamente el Modo Oscuro.
  - `EnglishApp.applyTheme(isDark, showNotification)` — Aplica el tema y sincroniza los botones.
  - `EnglishApp.toggleHeaderDropdown(event)` / `EnglishApp.closeHeaderDropdown()` — Abre o cierra el menú desplegable de indicadores y tema en la barra superior.
- **Autenticación y Suscripción**:
  - `EnglishApp.switchAuthTab(tab)` (`'login' | 'register' | 'recover'`)
  - `EnglishApp.handleLogin()`, `EnglishApp.handleRegister()`, `EnglishApp.handlePasswordRecovery()`
  - `EnglishApp.quickDemoAccess()`, `EnglishApp.logout()`
  - `EnglishApp.openSubscriptionModal()`, `EnglishApp.selectPlan(planId)`, `EnglishApp.processSubscriptionPayment()`
- **Navegación y Ruta de Lecciones (Lesson Runner)**:
  - `EnglishApp.switchPlatformTab(tab)` (`'inicio' | 'manual' | 'audios' | 'conversacion' | 'pronunciacion' | 'foros' | 'progreso'`)
  - `EnglishApp.clickLessonNode(lessonId)`, `EnglishApp.startLessonStepRunner(lessonId)`
  - `EnglishApp.nextLessonStep()`, `EnglishApp.prevLessonStep()`, `EnglishApp.finishLessonStepRunner()`
  - `EnglishApp.selectRunnerOption(idx)`, `EnglishApp.checkRunnerChallenge()`, `EnglishApp.dismissFeedbackAndContinue()`
- **Voz, Grabación, Conversación y Laboratorio Oral**:
  - `EnglishApp.speak(text, rate)`
  - `EnglishApp.startVoiceRecording()`, `EnglishApp.stopVoiceRecording()`, `EnglishApp.playMyRecording()`
  - `EnglishApp.evaluatePronunciation()`, `EnglishApp.showErrors()`, `EnglishApp.listenCorrectPronunciation()`
  - `EnglishApp.selectScenario(scenarioKey)`, `EnglishApp.toggleConversationRecording()`, `EnglishApp.sendConversationAnswer()`
- **Progreso, Certificados y Notas Personalizadas**:
  - `EnglishApp.openCertificateModal()`, `EnglishApp.downloadCertificate()`
  - `EnglishApp.openAddInfoModal(defaultCat)`, `EnglishApp.saveCustomInfo()`, `EnglishApp.deleteCustomInfo(index)`

---

## 💻 Requisitos del Sistema

- **Navegador Web**: Google Chrome, Microsoft Edge, Brave, Firefox o Safari actualizados (se recomienda **Google Chrome** o **Microsoft Edge** para soporte completo de síntesis de voz `en-US` y reconocimiento de voz `webkitSpeechRecognition`).
- **Micrófono** *(Opcional)*: Para grabar tu propia voz en el Laboratorio de Pronunciación y en la sección de Conversación (si no se dispone de micrófono, el sistema permite practicar mediante simulación interactiva y entrada de texto).
- **Node.js** *(Opcional)*: Versión 14 o superior únicamente si deseas ejecutar el servidor local mediante `node server.js`.
