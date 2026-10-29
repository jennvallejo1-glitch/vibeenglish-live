# 📘 Guía Oficial para Colaboradores y Desarrollo Backend — VibeEnglish

Documento técnico descargable y compartible para el equipo de desarrollo del proyecto **VibeEnglish (Inglés Paso a Paso)**.

---

## 1. Información General y Enlaces Oficiales del Proyecto

- **Nombre del proyecto:** VibeEnglish (`InglesPasoAPaso`)
- **Propietaria del proyecto:** Jennifer Suazo (`jennifer.suazo3@ujcv.edu.hn` / GitHub: `@jennvallejo1-glitch`)

### 🔗 Diferenciación de Enlaces Oficiales

| Tipo de Enlace | URL Oficial | Propósito |
| :--- | :--- | :--- |
| **1. Repositorio Privado de Código (GitHub)** | https://github.com/jennvallejo1-glitch/InglesPasoAPaso | Aloja el código fuente privado del proyecto. **Solo accesible para la propietaria y los colaboradores autorizados en GitHub.** |
| **2. Aplicación Frontend Desplegada (En Vivo)** | https://vibeenglish-paso-a-paso.netlify.app | Ejecuta y muestra la plataforma **VibeEnglish** en el navegador (Google Chrome en PC o móvil) tal como funciona en entorno local, sin instalar nada. |

---

## 2. Cómo Agregar Colaboradores al Repositorio Privado en GitHub

Como el repositorio **`jennvallejo1-glitch/InglesPasoAPaso`** es **privado**, únicamente las personas invitadas podrán verlo, clonarlo o subir ramas:

1. Iniciá sesión en GitHub y abrí el repositorio:
   👉 https://github.com/jennvallejo1-glitch/InglesPasoAPaso
2. En la barra superior del repositorio, hacé clic en **Settings** (Configuración).
3. En el menú lateral izquierdo, seleccioná **Collaborators** (dentro de la sección *Access*) o entrá directamente a:
   👉 https://github.com/jennvallejo1-glitch/InglesPasoAPaso/settings/access
4. Hacé clic en el botón verde **Add people**.
5. Escribí el **nombre de usuario de GitHub** o el **correo electrónico** del colaborador.
6. Seleccionalo de la lista y hacé clic en **Add to this repository**.
7. El colaborador recibirá un correo de invitación (o podrá aceptarla entrando a `https://github.com/jennvallejo1-glitch/InglesPasoAPaso/invitations`).

---

## 3. Cómo Clonar el Repositorio, Instalar Dependencias y Ejecutar en Local

### Requisitos previos
- **Git** instalado (`git --version`)
- **Node.js** (versión 18 o superior recomendada, `node --version`)
- **Google Chrome**

### Paso 1: Clonar el repositorio privado
Abrí una terminal (PowerShell, CMD o Git Bash) y ejecutá:

```bash
git clone https://github.com/jennvallejo1-glitch/InglesPasoAPaso.git
cd InglesPasoAPaso
```

### Paso 2: Configurar variables de entorno locales (para desarrollo Backend)
El archivo `.gitignore` ya está configurado para **bloquear la subida de archivos `.env`, claves API, tokens y certificados**.
Cuando desarrolles el backend localmente, creá un archivo `.env` en la raíz del proyecto (nunca se subirá a GitHub):

```env
PORT=3000
# Agregá aquí tus variables locales de base de datos, JWT y pasarela de pagos:
# DATABASE_URL=
# JWT_SECRET=
# STRIPE_SECRET_KEY=
```

### Paso 3: Instalar dependencias (si se agregan paquetes en `package.json`)
Actualmente el servidor local (`server.js`) utiliza módulos nativos de Node.js (`http`, `fs`, `path`) sin dependencias externas obligatorias. Si se agregan paquetes de backend:

```bash
npm install
```

### Paso 4: Ejecutar el frontend en entorno local
Tenés dos opciones para iniciar la plataforma en `http://localhost:3000`:

**Opción A — Desde la terminal:**
```bash
npm start
```
*(o directamente `node server.js`)*

**Opción B — En Windows con doble clic:**
Ejecutá el archivo `Iniciar VibeEnglish.bat` incluido en la raíz del proyecto. Abrirá el servidor local y lanzará automáticamente Google Chrome en:
👉 `http://localhost:3000`

---

## 4. Estructura del Proyecto

```text
InglesPasoAPaso/
├── index.html                  # Estructura HTML completa (Pantallas de Acceso, Suscripción y App Principal)
├── styles.css                  # Sistema de diseño visual, animaciones y 3 temas (Claro, Oscuro, Colorido)
├── app.js                      # Controlador de navegación UI, cambio de pantallas y hooks para Backend
├── public/                     # Directorio espejo servido por server.js y publicado en Netlify
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── assets/images/          # Ilustraciones y logotipo oficial de VibeEnglish
├── assets/images/              # Recursos gráficos originales (logo.jpg, beginner.jpg, intermediate.jpg, advanced.jpg)
├── server.js                   # Servidor HTTP Node.js en el puerto 3000
├── netlify.toml                # Configuración de despliegue continuo para Netlify (publish = "public")
├── package.json                # Configuración de scripts npm ("start": "node server.js")
├── .gitignore                  # Protección de archivos sensibles (.env, secretos, node_modules, .netlify)
└── Iniciar VibeEnglish.bat     # Lanzador rápido para entorno local en Windows
```

> **Nota importante de sincronización:** Si modificás `index.html`, `styles.css` o `app.js` en la raíz, asegurate de mantener sincronizada la carpeta `public/` (o servir directamente desde `public/`), ya que tanto `server.js` como Netlify sirven los archivos desde `public/`.

---

## 5. Flujo de Trabajo con Ramas (Git Workflow) para Colaboradores

Para proteger la rama principal (`main`) y evitar conflictos entre desarrolladores, seguí siempre este flujo de trabajo:

### 1. Actualizar tu rama `main` local antes de empezar
```bash
git checkout main
git pull origin main
```

### 2. Crear una rama nueva para tu tarea o módulo
Usá nombres descriptivos como `feature/auth-backend`, `feature/base-datos-lecciones` o `fix/validacion-login`:
```bash
git checkout -b feature/nombre-de-tu-tarea
```

### 3. Guardar y confirmar tus cambios (`commit`)
Verificá siempre con `git status` que no estés incluyendo archivos sensibles:
```bash
git status
git add .
git commit -m "feat: descripción clara de la funcionalidad implementada"
```

### 4. Subir tu rama al repositorio privado en GitHub
```bash
git push -u origin feature/nombre-de-tu-tarea
```

### 5. Crear un Pull Request (PR) en GitHub
1. Entrá a https://github.com/jennvallejo1-glitch/InglesPasoAPaso.
2. Hacé clic en **Compare & pull request** sobre tu rama recién subida.
3. Describí los cambios realizados y solicitá revisión antes de fusionar (`Merge`) hacia `main`.

---

## 6. Estado Actual del Proyecto: Qué Está Listo y Qué Debe Desarrollar el Backend

### ✅ Lo que YA está 100% listo en el Frontend (NO modificar estética ni diseño)
Toda la interfaz visual, maquetación, estilos, temas (`Claro`, `Oscuro`, `Colorido`), botones, contenedores vacíos y navegación entre pantallas están terminados en `index.html`, `styles.css` y `app.js`:

1. **Flujo de Acceso y Suscripción (`#auth-section`)**:
   - **Pantalla de Bienvenida (`#screen-welcome`)**: Logotipo, espacio de título/subtítulo y botones *«Iniciar sesión»*, *«Registrarse»* y *«Ver planes de suscripción»*.
   - **Pantalla de Registro (`#screen-register`)**: Formulario con 10 campos limpios (`reg-fullname`, `reg-username`, `reg-email`, `reg-password`, `reg-password-confirm` con botón mostrar/ocultar, `reg-country`, `reg-level`, `reg-goal`, `reg-terms` y `reg-notifications`).
   - **Pantalla de Inicio de Sesión (`#screen-login`)**: Campos de usuario/correo (`login-identifier`), contraseña (`login-password` con mostrar/ocultar), casilla `login-remember`, enlace a recuperación (`#screen-recover`) y acceso a registro.
   - **Pantalla de Recuperación de Contraseña (`#screen-recover`)**: Campo de correo (`recover-email`) y botón de envío.
   - **Pantalla de Planes de Suscripción (`#screen-subscription`)**: 3 tarjetas de planes vacías (Mensual, Trimestral, Anual) listas para inyectar precios/beneficios y 4 botones de gestión (*«Actualizar plan»*, *«Cambiar método de pago»*, *«Cancelar suscripción»*, *«Ver historial de pagos»*).
   - **Barra de Sesión Superior (`#user-session-bar`)**: Indicador de estado de suscripción (`#session-plan-status`) y botón *«Cerrar sesión»*.

2. **Plataforma Principal (`#app-main-wrapper`)**:
   - **Navegación Principal**: *Inicio*, *Manual de uso*, *Audio*, *Conversación*, *Pronunciación*, *Foro*, *Mi progreso*, *Mis logros* y *Configuración de apariencia*.
   - **Inicio (`#home`)**: Botones *«Comenzar a aprender»*, *«Realizar prueba de nivel»*, *«Ver mi progreso»*, *«Ver mis logros»*, **Guía de unidades** (6 Unidades × 6 Lecciones = 36 tarjetas estructuradas vacías) y acceso a los 3 niveles (*Nivel principiante*, *Nivel intermedio*, *Nivel avanzado*).
   - **Secciones Interactivas y Académicas**: Estructura visual lista en *Manual de uso* (11 tarjetas), *Audio* (6 controles de reproducción/grabación), *Conversación* (selector de escenario, área de diálogo y controles), *Pronunciación* (reproducción de referencia, grabación y evaluación), *Foro* (formulario y listado de mensajes), *Mi progreso* y *Mis logros* (3 certificados por nivel con previsualización y descarga).

---

### 🛠️ Lo que el Equipo de Backend Debe Implementar

En `app.js` están señalizados con comentarios `// TODO [DEV]:` todos los puntos exactos donde el equipo de backend debe conectar las APIs y servicios:

| Módulo Backend a Desarrollar | Métodos en `app.js` / IDs en `index.html` | Descripción Técnica de Integración |
| :--- | :--- | :--- |
| **1. Autenticación y Sesiones (JWT / OAuth)** | `submitLogin()`, `submitRegister()`, `submitRecoverPassword()`, `logoutSession()` | Conectar endpoints `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/recover` y `POST /api/auth/logout`. Validar credenciales reales, encriptar contraseñas (`bcrypt`) y emitir sesión/JWT. |
| **2. Pasarela de Pagos y Suscripciones** | `selectSubscriptionPlan(planType)`, `manageSubscription(action)`, `#session-plan-status` | Integrar Stripe / PayPal para los planes `mensual`, `trimestral` y `anual`. Cargar precios y beneficios reales desde el backend en las 3 tarjetas de `#screen-subscription` y actualizar el estado en `#session-plan-status`. |
| **3. API de Contenidos, Unidades y Lecciones** | `openUnitLesson(unitNumber, lessonNumber)`, `selectLevel(levelKey)`, `startLevelTest()` | Crear base de datos y endpoints (`GET /api/units`, `GET /api/lessons/:unit/:lesson`, `GET /api/levels/:level`, `GET /api/placement-test`) para poblar las 36 lecciones de la Guía de Unidades, los 3 niveles y la prueba de nivel. |
| **4. Servicio de Audio y Text-to-Speech (TTS)** | `playAudio()`, `pauseAudio()`, `repeatAudio()`, `changeAudioSpeed()`, `playPronunciationReference()` | Conectar archivos de audio reales alojados en almacenamiento cloud o servicio TTS en las secciones `#audio` y `#pronunciation`. |
| **5. Reconocimiento de Voz y Evaluación de Pronunciación** | `recordUserVoice()`, `listenUserRecording()`, `recordPronunciation()`, `evaluatePronunciation()` | Integrar captura de micrófono (`MediaRecorder` / Web Speech API / API de evaluación fonética) para calificar la pronunciación del estudiante y mostrar retroalimentación en `#pronunciation-evaluation-box`. |
| **6. Motor de Conversación Interactiva** | `selectConversationScenario()`, `startConversation()`, `recordConversationVoice()`, `sendConversationResponse()`, `restartConversation()` | Conectar motor de diálogo o IA conversacional en `#conversation` para responder en tiempo real según el escenario elegido. |
| **7. Persistencia del Foro de Estudiantes** | `publishForumPost()` (`#forum-Input`, `#forum-posts-list`) | Crear endpoints `GET /api/forum/posts` y `POST /api/forum/posts` para guardar y listar las publicaciones reales de la comunidad en base de datos. |
| **8. Progreso Académico, Logros y Certificados PDF** | `#progress`, `#achievements`, `previewCertificate(level)`, `downloadCertificate(level)` | Guardar el avance de lecciones por usuario en base de datos, desbloquear logros dinámicamente y generar los certificados descargables en PDF para los niveles Principiante, Intermedio y Avanzado. |
