# 📘 Guía Oficial para Colaboradores y Equipos (Frontend, Backend, QA y Producción) — VibeEnglish

Documento técnico descargable y compartible para el equipo de desarrollo del proyecto **VibeEnglish**.

---

## 1. Información General y Enlaces Oficiales del Proyecto

- **Nombre del proyecto:** VibeEnglish
- **Descripción general:** La plataforma cuenta con una arquitectura frontend desarrollada por **Jennifer Suazo**, **Marcos Iván** y **Genesis Dessire**, quienes forman parte del equipo responsable del desarrollo del proyecto.

### 🔗 Enlaces Oficiales del Proyecto

| Tipo de Enlace | URL Oficial | Propósito |
| :--- | :--- | :--- |
| **1. Aplicación Frontend Desplegada (Iniciar de un solo)** | https://jennvallejo1-glitch.github.io/vibeenglish-live/ | Ejecuta y muestra la plataforma **VibeEnglish** en el navegador (Google Chrome en PC o móvil) sin instalar nada ni iniciar sesión. |
| **2. Repositorio Privado de Código (GitHub)** | https://github.com/jennvallejo1-glitch/VibeEnglish | Aloja el código fuente privado del proyecto y todas sus ramas (`main`, `front`, `backend`, `QA`, `produccion`). |

---

## 2. Estructura de Ramas del Repositorio (`VibeEnglish`)

El repositorio está organizado en ramas reales de Git para que cada equipo trabaje de forma colaborativa sin afectar el trabajo de los demás:

| Rama en GitHub | Responsabilidad | Descripción |
| :--- | :--- | :--- |
| **`main`** | Coordinación General | Rama principal del proyecto. Contiene la documentación general (`README.md`, `GUIA_COLABORADORES_VIBEENGLISH.md`), objetivos, tecnologías, distribución de roles y la base consolidada del proyecto. |
| **`front`** | Equipo Frontend (`Jennifer`, `Marcos`, `Desiree`) | Rama principal del Frontend existente. Conserva intacto todo el trabajo visual y funcional ya desarrollado y recibe los Pull Requests de las ramas individuales de Frontend. |
| **`front-jennifer`** | Jennifer (`@jennvallejo1-glitch`) | Sub-rama de Frontend para **Inicio, dashboard, navegación, niveles y guías de unidades**. |
| **`front-marcos`** | Marcos (`@Marcosivan002`) | Sub-rama de Frontend para **Lecciones, manual teórico, vocabulario, ejercicios, listening y evaluaciones**. |
| **`front-desiree`** | Desiree (`@genesisguzman-dev`) | Sub-rama de Frontend para **Audio, pronunciación, conversación, foro, progreso, historial y perfil**. |
| **`backend`** | Equipo Backend | Rama destinada al desarrollo del servidor, las APIs REST, la lógica de negocio, la autenticación, las suscripciones y la base de datos. |
| **`QA`** | Equipo de Control de Calidad | Rama destinada a las pruebas funcionales, validación de integración entre `front` y `backend`, y control de calidad. |
| **`produccion`** | Equipo de Producción | Rama destinada a la integración y preparación de versiones estables listas para su despliegue. |

---

## 3. Distribución Detallada del Equipo Frontend (Rama `front`)

| Área del Frontend | Responsable | Rama Asignada |
| :--- | :--- | :--- |
| Inicio y dashboard | **Jennifer** | `front-jennifer` |
| Navegación y selección de niveles | **Jennifer** | `front-jennifer` |
| Módulos y guías de unidades | **Jennifer** | `front-jennifer` |
| Diseño de las tarjetas y estructura visual compartida | **Jennifer** | `front-jennifer` |
| Manual y teoría | **Marcos** | `front-marcos` |
| Lecciones y vocabulario | **Marcos** | `front-marcos` |
| Ejercicios y actividades | **Marcos** | `front-marcos` |
| Listening y evaluaciones | **Marcos** | `front-marcos` |
| Resultados de los exámenes | **Marcos** | `front-marcos` |
| Grabación y reproducción de audio | **Desiree** | `front-desiree` |
| Speaking y pronunciación | **Desiree** | `front-desiree` |
| Conversación con IA | **Desiree** | `front-desiree` |
| Foro | **Desiree** | `front-desiree` |
| Progreso, historial y perfil | **Desiree** | `front-desiree` |

### Detalle de Módulos y Botones por Integrante de Frontend:
1. **Jennifer (`front-jennifer` — Interfaz principal y navegación):**
   - **Módulos:** Pantalla de inicio y dashboard, menú lateral o barra de navegación, navegación entre secciones, selección de niveles (principiante, intermedio y avanzado), pantallas de módulos y guías de unidades, diseño de tarjetas de cursos y lecciones, barras de progreso visuales, diseño adaptable (PC, tabletas, móviles) e integración visual de componentes compartidos.
   - **Botones y funciones:** *Inicio*, *Comenzar a aprender*, *Continuar última lección*, *Seleccionar nivel*, *Abrir módulo*, *Abrir guía de unidad*, *Siguiente lección y lección anterior*, *Volver al menú principal*.
2. **Marcos (`front-marcos` — Lecciones y actividades educativas):**
   - **Módulos:** Pantalla de contenido de cada lección, manual o material teórico de inglés, guías de estudio por unidad, vocabulario con traducciones y ejemplos, ejercicios de gramática, ejercicios de selección múltiple, actividades para completar oraciones, ejercicios de relacionar y ordenar palabras, comprensión auditiva (*Listening*), evaluaciones por lección y módulo, pantalla de resultados y revisión de errores, diccionario y palabras favoritas.
   - **Botones y funciones:** *Abrir manual*, *Ver teoría y ejemplos*, *Escuchar audio*, *Mostrar traducción*, *Comenzar ejercicio*, *Comprobar respuesta*, *Ver explicación*, *Intentar nuevamente*, *Siguiente pregunta*, *Finalizar evaluación*, *Ver calificación*, *Revisar errores*.
3. **Desiree (`front-desiree` — Audio, pronunciación y comunicación):**
   - **Módulos:** Pantalla de práctica de pronunciación, interfaz de grabación y reproducción de voz, módulo de conversación en inglés, interfaz de conversación con IA, actividades de expresión oral (*Speaking*), foro de estudiantes, pantalla de progreso individual, historial de actividades y calificaciones, perfil del estudiante y configuración, pantallas de logros e insignias, estados de carga, errores y permisos del micrófono.
   - **Botones y funciones:** *Grabar audio*, *Detener grabación*, *Reproducir mi voz*, *Escuchar pronunciación correcta*, *Evaluar pronunciación*, *Intentar nuevamente*, *Iniciar conversación*, *Enviar mensaje*, *Finalizar conversación*, *Publicar en el foro*, *Ver mi progreso*, *Consultar historial*, *Editar perfil*.

---

## 4. Cómo Clonar el Repositorio, Cambiar de Rama y Ejecutar en Local

### Paso 1: Clonar el repositorio privado y descargar todas las ramas
```bash
git clone https://github.com/jennvallejo1-glitch/VibeEnglish.git
cd VibeEnglish
git fetch --all
```

### Paso 2: Cambiar a tu rama correspondiente
```bash
# Equipo Frontend:
git checkout front
git checkout front-jennifer   # Rama de Jennifer
git checkout front-marcos     # Rama de Marcos
git checkout front-desiree    # Rama de Desiree

# Equipo Backend:
git checkout backend

# Equipo QA:
git checkout QA

# Equipo Producción:
git checkout produccion

# Coordinación General:
git checkout main
```

### Paso 3: Instalar dependencias y ejecutar en local (`http://localhost:3000`)
```bash
npm install
npm start
```
*(En Windows también podés hacer doble clic sobre `Iniciar VibeEnglish.bat`).*

---

## 5. Flujo de Trabajo Colaborativo (Commits, Pull Requests e Integración)

1. **Actualizar tu rama antes de empezar:**
   ```bash
   git pull origin <tu-rama>
   ```
2. **Realizar cambios y guardar commits (sin incluir `.env` ni secretos):**
   ```bash
   git status
   git add .
   git commit -m "feat: descripción clara del avance"
   git push origin <tu-rama>
   ```
3. **Flujo de Pull Requests (PR) en GitHub:**
   - **Frontend:** `front-jennifer` / `front-marcos` / `front-desiree` ➔ abren PR hacia **`front`**.
   - **Pase a Pruebas:** `front` y `backend` ➔ abren PR hacia **`QA`**.
   - **Pase a Producción:** una vez validado en `QA` ➔ se abre PR hacia **`produccion`**.
   - **Consolidación General:** desde `produccion` ➔ se abre PR hacia **`main`**.

---

## 6. Módulos que el Equipo de Backend Debe Implementar (Rama `backend`)

En `app.js` están señalizados con comentarios `// TODO [DEV]:` todos los puntos exactos donde el equipo de Backend debe conectar las APIs y servicios:

| Módulo Backend a Desarrollar | Métodos en `app.js` / IDs en `index.html` | Descripción Técnica de Integración |
| :--- | :--- | :--- |
| **1. Autenticación y Sesiones (JWT / OAuth)** | `submitLogin()`, `submitRegister()`, `submitRecoverPassword()`, `logoutSession()` | Conectar endpoints `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/recover` y `POST /api/auth/logout`. |
| **2. Pasarela de Pagos y Suscripciones** | `selectSubscriptionPlan(planType)`, `manageSubscription(action)`, `#session-plan-status` | Integrar Stripe / PayPal para los planes `mensual`, `trimestral` y `anual`, poblar precios/beneficios y actualizar `#session-plan-status`. |
| **3. API de Contenidos, Unidades y Lecciones** | `openUnitLesson(unitNumber, lessonNumber)`, `selectLevel(levelKey)`, `startLevelTest()` | Crear base de datos y endpoints (`GET /api/units`, `GET /api/lessons/:unit/:lesson`, `GET /api/levels/:level`, `GET /api/placement-test`). |
| **4. Servicio de Audio y Text-to-Speech (TTS)** | `playAudio()`, `pauseAudio()`, `repeatAudio()`, `changeAudioSpeed()`, `playPronunciationReference()` | Conectar archivos de audio reales o servicio TTS en `#audio` y `#pronunciation`. |
| **5. Reconocimiento de Voz y Evaluación** | `recordUserVoice()`, `listenUserRecording()`, `recordPronunciation()`, `evaluatePronunciation()` | Integrar captura de micrófono y evaluación fonética para mostrar resultados en `#pronunciation-evaluation-box`. |
| **6. Motor de Conversación Interactiva** | `selectConversationScenario()`, `startConversation()`, `recordConversationVoice()`, `sendConversationResponse()`, `restartConversation()` | Conectar motor de diálogo o IA conversacional en `#conversation`. |
| **7. Persistencia del Foro de Estudiantes** | `publishForumPost()` (`#forum-input`, `#forum-posts-list`) | Crear endpoints `GET /api/forum/posts` y `POST /api/forum/posts` en base de datos. |
| **8. Progreso Académico, Logros y Certificados** | `#progress`, `#achievements`, `previewCertificate(level)`, `downloadCertificate(level)` | Guardar avance por usuario en base de datos, desbloquear logros y generar certificados PDF descargables por nivel. |
