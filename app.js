/**
 * ============================================================================
 * VIBEENGLISH — INTERFAZ VISUAL Y ESTRUCTURA DE NAVEGACIÓN (SIN CONTENIDO)
 * ============================================================================
 * Este archivo gestiona exclusivamente:
 *   1. Navegación entre las secciones principales:
 *      - Inicio
 *      - Manual de uso
 *      - Guía de unidades (con estructura extensa de unidades y tarjetas vacías)
 *      - Audio
 *      - Conversación
 *      - Pronunciación
 *      - Foro
 *      - Mi progreso
 *      - Mis logros
 *   2. Configuración de apariencia con los 3 temas visuales:
 *      - Claro ('light')
 *      - Oscuro ('dark')
 *      - Colorido ('colorful')
 *   3. Efectos interactivos 3D sutiles, filtros visuales y apertura de modales.
 *   4. Puntos de integración pendientes: sus acciones informan cuando todavía
 *      no hay un backend o servicio conectado y no simulan su funcionamiento.
 * ============================================================================
 */

var EnglishApp = (() => {
  function safeGetTheme() {
    try {
      return localStorage.getItem('vibe_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  const state = {
    currentPlatformTab: 'inicio',
    themeMode: safeGetTheme(),
    isDarkMode: safeGetTheme() !== 'light',
    currentLessonId: 1,
    currentLessonStep: 1,
    selectedChallengeOption: null,
    currentPhraseIndex: 0,
    activeScenario: '1',
    pilotMode: false
  };

  const TOTAL_UNITS = 6;
  const LESSONS_PER_UNIT = 6;

  function enterPilotMode() {
    state.pilotMode = true;
    const authSection = document.getElementById('auth-section');
    const platform = document.getElementById('course-platform-section');
    const notice = document.getElementById('pilot-mode-notice');
    const name = document.getElementById('header-user-name');
    if (authSection) authSection.classList.add('hidden');
    if (platform) platform.classList.remove('hidden');
    if (notice) notice.classList.remove('hidden');
    if (name) name.textContent = 'Modo piloto';
    setPilotControlsDisabled(true);
    switchPlatformTab('inicio');
    showToast('Modo piloto: podés recorrer las secciones, pero no usar las actividades ni guardar progreso.', 'info');
  }

  function setPilotControlsDisabled(disabled) {
    const main = document.querySelector('#course-platform-section .platform-main-container');
    if (!main) return;

    if (disabled) {
      main.querySelectorAll('button, input, select, textarea').forEach(control => {
        if (control.matches('button[data-action="switchPlatformTab"]') || control.disabled) return;
        control.disabled = true;
        control.dataset.pilotDisabled = 'true';
      });
      return;
    }

    main.querySelectorAll('[data-pilot-disabled="true"]').forEach(control => {
      control.disabled = false;
      delete control.dataset.pilotDisabled;
    });
  }

  /* ==========================================================================
     1. NOTIFICACIONES VISUALES DE INTERFAZ
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  /* ==========================================================================
     2. NAVEGACIÓN PRINCIPAL DE SECCIONES
     ========================================================================== */
  function switchPlatformTab(tab) {
    state.currentPlatformTab = tab;

    const allTabs = [
      'inicio',
      'manual',
      'manual-uso',
      'audios',
      'conversacion',
      'pronunciacion',
      'foros',
      'progreso',
      'logros'
    ];

    allTabs.forEach(t => {
      const btn = document.getElementById(`nav-btn-${t}`);
      const view = document.getElementById(`view-${t}`);
      if (btn) btn.classList.toggle('active', t === tab);
      if (view) view.classList.toggle('hidden', t !== tab);
    });

    const isMobile = window.innerWidth <= 768;
    window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' });
  }

  /* ==========================================================================
     3. GUÍA DE UNIDADES (GENERACIÓN DE UNIDADES Y TARJETAS DE LECCIONES VACÍAS)
     ========================================================================== */
  function renderEmptyUnitsGuide() {
    const container = document.getElementById('units-guide-grid-container');
    if (!container) return;

    let globalLessonNumber = 1;
    let unitsHtml = '';

    for (let u = 1; u <= TOTAL_UNITS; u++) {
      let lessonsHtml = '';

      for (let l = 1; l <= LESSONS_PER_UNIT; l++) {
        const lessonNum = globalLessonNumber++;
        lessonsHtml += `
          <div class="lesson-empty-card card-3d-tilt" id="unit-${u}-lesson-${l}">
            <div class="d-flex justify-between align-center">
              <span class="badge badge-primary">Lección ${lessonNum}</span>
              <span class="text-xs text-secondary">0%</span>
            </div>

            <!-- Espacios vacíos para título y descripción de la lección -->
            <div class="d-flex flex-column gap-2">
              <div class="empty-slot-title"></div>
              <div class="empty-slot-line"></div>
              <div class="empty-slot-line short"></div>
            </div>

            <!-- Indicador visual de progreso vacío -->
            <div class="progress-bar-wrap progress-6">
              <div class="progress-bar-fill"></div>
            </div>

            <!-- Espacios vacíos para futuras actividades de la lección -->
            <div class="lesson-activity-slots" aria-label="Espacios para actividades">
              <div class="activity-empty-slot">📖</div>
              <div class="activity-empty-slot">🎧</div>
              <div class="activity-empty-slot">✍️</div>
              <div class="activity-empty-slot">🎙️</div>
            </div>

            <!-- Botón para comenzar cada lección -->
            <button type="button" class="btn btn-primary btn-sm w-full mt-auto" data-action="startLessonStepRunner" data-action-args='[${lessonNum}]'>
              ▶ Comenzar lección
            </button>
          </div>
        `;
      }

      unitsHtml += `
        <div class="unit-guide-block" id="unit-block-${u}">
          <div class="unit-guide-header">
            <div class="d-flex align-center gap-3 flex-1">
              <span class="badge badge-accent">Unidad ${u}</span>
              <div class="flex-1 unit-title-width">
                <div class="empty-slot-title mb-1"></div>
                <div class="empty-slot-line short"></div>
              </div>
            </div>
            <div class="unit-progress-column">
              <div class="progress-bar-wrap progress-8">
                <div class="progress-bar-fill"></div>
              </div>
            </div>
          </div>

          <div class="unit-lessons-grid">
            ${lessonsHtml}
          </div>
        </div>
      `;
    }

    container.innerHTML = unitsHtml;
  }

  function updateSnakePathUI() {
    const container = document.getElementById('snake-path-container');
    if (!container) return;

    const nodes = [
      { id: 1, pos: 'center' },
      { id: 2, pos: 'right' },
      { id: 3, pos: 'center' },
      { id: 4, pos: 'left' },
      { id: 5, pos: 'center' }
    ];

    let html = '';
    nodes.forEach((n, idx) => {
      const isFirst = idx === 0;
      const btnClass = isFirst ? 'duo-node-btn node-active pulse-ring' : 'duo-node-btn node-available';
      html += `
        <div class="duo-node-wrapper node-pos-${n.pos}" id="snake-node-wrap-${n.id}">
          <button type="button" class="${btnClass}" id="snake-node-btn-${n.id}" data-action="clickLessonNode" data-action-args='[${n.id}]'>
            <span class="duo-node-icon">${n.id}</span>
          </button>
        </div>
      `;

      if (idx < nodes.length - 1) {
        const nextPos = nodes[idx + 1].pos;
        let connClass = 'conn-center';
        if (n.pos === 'center' && nextPos === 'right') connClass = 'conn-right';
        else if (n.pos === 'center' && nextPos === 'left') connClass = 'conn-left';
        html += `<div class="duo-connector ${connClass}"></div>`;
      }
    });

    container.innerHTML = html;
  }

  function clickLessonNode(lessonId) {
    switchPlatformTab('manual');
    const targetCard = document.getElementById(`unit-1-lesson-${lessonId}`);
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  function startLessonStepRunner(lessonId) {
    state.currentLessonId = lessonId || 1;
    state.currentLessonStep = 1;

    const guideContainer = document.getElementById('units-guide-grid-container');
    const runnerCard = document.getElementById('lesson-runner-card');
    const badge = document.getElementById('runner-lesson-badge');

    if (badge) badge.textContent = `Lección ${state.currentLessonId}`;
    if (guideContainer) guideContainer.classList.add('hidden');
    if (runnerCard) runnerCard.classList.remove('hidden');

    updateLessonRunnerStepUI();
    switchPlatformTab('manual');
  }

  function closeLessonWorkspace() {
    const guideContainer = document.getElementById('units-guide-grid-container');
    const runnerCard = document.getElementById('lesson-runner-card');
    if (runnerCard) runnerCard.classList.add('hidden');
    if (guideContainer) guideContainer.classList.remove('hidden');
  }

  function updateLessonRunnerStepUI() {
    const step = state.currentLessonStep;
    const fill = document.getElementById('lesson-runner-progress-fill');
    const pct = Math.min(100, Math.round(((step - 1) / 5) * 100));
    if (fill) fill.style.width = `${pct}%`;

    for (let s = 1; s <= 5; s++) {
      const el = document.getElementById(`runner-step-${s}`);
      if (el) el.classList.toggle('hidden', s !== step);
    }
  }

  function nextLessonStep() {
    if (state.currentLessonStep < 5) {
      state.currentLessonStep++;
      updateLessonRunnerStepUI();
    }
  }

  function prevLessonStep() {
    if (state.currentLessonStep > 1) {
      state.currentLessonStep--;
      updateLessonRunnerStepUI();
    }
  }

  function exitLessonToMap() {
    closeLessonWorkspace();
    switchPlatformTab('inicio');
  }

  /* ==========================================================================
     4. INTERACCIONES VISUALES DE FILTROS Y CONTROLES (SIN CONTENIDO)
     ========================================================================== */
  function filterAudios(cat, btnEl) {
    document.querySelectorAll('.audio-cat-filter').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
    if (btnEl) {
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('btn-primary', 'active');
    }

    document.querySelectorAll('.audio-track-card').forEach(card => {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function toggleTranscript(id) {
    const box = document.getElementById(`transcript-${id}`);
    if (box) box.classList.toggle('hidden');
  }

  function selectScenario(scenarioKey, btnEl) {
    state.activeScenario = scenarioKey;
    document.querySelectorAll('.conv-scenario-pill').forEach(btn => {
      btn.classList.remove('active', 'btn-primary');
      btn.classList.add('btn-outline');
    });
    if (btnEl) {
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('btn-primary', 'active');
    }
  }

  function selectSpecificPhrase(index, btnEl) {
    state.currentPhraseIndex = index;
    document.querySelectorAll('.duo-phrase-chip').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }

  function filterForumPosts(cat, btnEl) {
    document.querySelectorAll('.forum-cat-btn').forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline');
    });
    if (btnEl) {
      btnEl.classList.remove('btn-outline');
      btnEl.classList.add('btn-primary', 'active');
    }

    document.querySelectorAll('.forum-thread-card').forEach(card => {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function selectRunnerOption(idx, btnEl) {
    state.selectedChallengeOption = idx;
    document.querySelectorAll('.runner-option-btn').forEach((btn, i) => {
      btn.classList.toggle('selected', i === idx || btn === btnEl);
    });
  }

  /* ==========================================================================
     5. NAVEGACIÓN ENTRE PANTALLAS DE BIENVENIDA, REGISTRO, LOGIN Y SUSCRIPCIÓN
     ========================================================================== */
  function openOnboardingScreen(screenName = 'home') {
    if (state.pilotMode) {
      state.pilotMode = false;
      setPilotControlsDisabled(false);
      const notice = document.getElementById('pilot-mode-notice');
      const name = document.getElementById('header-user-name');
      if (notice) notice.classList.add('hidden');
      if (name) name.textContent = '';
    }

    const authSec = document.getElementById('auth-section');
    const platSec = document.getElementById('course-platform-section');

    if (platSec) platSec.classList.add('hidden');
    if (authSec) authSec.classList.remove('hidden');

    const screens = {
      home: document.getElementById('screen-home'),
      welcome: document.getElementById('screen-welcome'),
      register: document.getElementById('screen-register'),
      login: document.getElementById('screen-login'),
      recover: document.getElementById('screen-recover'),
      subscription: document.getElementById('screen-subscription')
    };

    Object.keys(screens).forEach(key => {
      if (screens[key]) {
        screens[key].classList.toggle('hidden', key !== screenName);
      }
    });

    const isMobile = window.innerWidth <= 768;
    window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' });
  }

  function switchAuthTab(tab) {
    if (tab === 'register') {
      openOnboardingScreen('register');
    } else if (tab === 'recover') {
      openOnboardingScreen('recover');
    } else if (tab === 'subscription') {
      openOnboardingScreen('subscription');
    } else {
      openOnboardingScreen('login');
    }
  }

  function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  function toggleRegisterPasswords() {
    togglePasswordVisibility('reg-password');
    togglePasswordVisibility('reg-password-confirm');
  }

  function getValidationMessage(control) {
    const validity = control.validity;
    if (validity.customError) return control.validationMessage;
    if (validity.valueMissing) {
      if (control.type === 'checkbox') {
        return control.id === 'reg-terms'
          ? 'Debes aceptar los términos y condiciones.'
          : 'Debes aceptar la política de privacidad.';
      }
      return 'Este campo es obligatorio.';
    }
    if (validity.typeMismatch) return 'Ingresa un correo electrónico válido.';
    if (validity.tooShort) return `Ingresa al menos ${control.minLength} caracteres.`;
    if (validity.rangeOverflow) return 'La fecha no puede ser futura.';
    return 'Revisa este campo.';
  }

  function validateAuthForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const password = form.querySelector('#reg-password');
    const passwordConfirm = form.querySelector('#reg-password-confirm');
    if (password && passwordConfirm) {
      passwordConfirm.setCustomValidity(
        passwordConfirm.value && passwordConfirm.value !== password.value
          ? 'Las contraseñas no coinciden.'
          : ''
      );
    }

    let isValid = true;
    const controls = form.querySelectorAll('input, select');
    controls.forEach(control => {
      const error = form.querySelector(`[data-error-for="${control.id}"]`);
      const message = getValidationMessage(control);
      if (!control.checkValidity()) {
        isValid = false;
        control.setAttribute('aria-invalid', 'true');
        if (error) {
          error.textContent = message;
          error.hidden = false;
        }
      } else {
        control.removeAttribute('aria-invalid');
        if (error) {
          error.textContent = '';
          error.hidden = true;
        }
      }
    });

    if (!isValid) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) firstInvalid.focus();
    }
    return isValid;
  }

  function handleLogin() {
    if (!validateAuthForm('form-login')) return;
    // TODO [BACKEND]: autenticar al usuario y crear una sesión.
    showToast('El servicio de autenticación aún no está disponible. No se inició sesión.', 'error');
  }

  function handleRegister() {
    if (!validateAuthForm('form-register')) return;
    // TODO [BACKEND]: crear la cuenta y persistir los datos validados.
    showToast('El registro aún no está disponible porque falta conectar el servicio de autenticación.', 'error');
  }

  function handlePasswordRecovery() {
    if (!validateAuthForm('form-recover')) return;
    // TODO [BACKEND]: solicitar la recuperación de contraseña.
    showToast('La recuperación de contraseña aún no está disponible.', 'error');
  }

  function selectSubscriptionPlan(planNumber) {
    [1, 2, 3].forEach(num => {
      const card = document.getElementById(`sub-plan-card-${num}`);
      if (card) card.classList.toggle('selected', num === planNumber);
    });
  }

  function subscribeToPlan() {
    // TODO [BACKEND]: conectar la pasarela de pagos y activar la suscripción.
    notifyBackendUnavailable('la suscripción y el procesamiento de pagos');
  }

  function manageSubscription() {
    // TODO [BACKEND]: cargar la suscripción del usuario y habilitar su gestión.
    notifyBackendUnavailable('la gestión de suscripciones');
  }

  function changeSubscriptionPlan() {
    // TODO [BACKEND]: actualizar el plan de suscripción activo.
    notifyBackendUnavailable('el cambio de plan');
  }

  function cancelSubscription() {
    // TODO [BACKEND]: cancelar la suscripción del usuario en el backend.
    notifyBackendUnavailable('la cancelación de suscripciones');
  }

  function goBackFromSubscription() {
    openOnboardingScreen('welcome');
  }

  function logout() {
    // TODO [BACKEND]: invalidar la sesión del usuario cuando exista autenticación real.
    notifyBackendUnavailable('el cierre de sesión; no se invalidó ninguna sesión');
    openOnboardingScreen('welcome');
  }

  let modalTrigger = null;
  let activeModal = null;

  function openModal(modal) {
    if (!modal) return;
    modalTrigger = document.activeElement;
    activeModal = modal;
    modal.classList.remove('hidden');

    const dialog = modal.querySelector('[role="dialog"]');
    if (!dialog) return;
    const firstFocusable = dialog.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    (firstFocusable || dialog).focus();
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => modal.classList.add('hidden'));
    activeModal = null;
    if (modalTrigger && modalTrigger.isConnected) modalTrigger.focus();
    modalTrigger = null;
  }

  function openLevelTestModal() {
    openModal(document.getElementById('modal-level-test'));
  }

  function finishLevelTest() {
    // TODO [BACKEND]: evaluar la prueba de nivel y guardar el resultado.
    notifyBackendUnavailable('la evaluación de la prueba de nivel');
    closeModals();
  }

  function openAchievementsModal() {
    switchPlatformTab('logros');
  }

  function openCertificateModal() {
    openModal(document.getElementById('modal-certificate'));
  }

  function startLevel() {
    closeLessonWorkspace();
    switchPlatformTab('manual');
  }

  function handleModalKeyboard(event) {
    if (!activeModal) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeModals();
      return;
    }

    if (event.key !== 'Tab') return;
    const dialog = activeModal.querySelector('[role="dialog"]');
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.hidden);

    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ==========================================================================
     6. AVISOS EXPLÍCITOS PARA INTEGRACIONES PENDIENTES
     ========================================================================== */
  function notifyBackendUnavailable(feature) {
    showToast(
      `No se puede completar ${feature}: la integración con el backend o servicio aún no está configurada.`,
      'error'
    );
  }

  // TODO [BACKEND]: conectar con la evaluación de respuestas de lección.
  function checkRunnerChallenge() {
    notifyBackendUnavailable('la evaluación del reto de lección');
  }

  // TODO [BACKEND]: conectar el catálogo de audio y el control de velocidad.
  function playAudioDialogue() {
    notifyBackendUnavailable('la reproducción de diálogos de audio');
  }

  // TODO [BACKEND]: solicitar permisos y conectar la grabación de conversación.
  function toggleConversationRecording() {
    notifyBackendUnavailable('la grabación de conversación');
  }

  // TODO [BACKEND]: enviar la respuesta al servicio de conversación.
  function sendConversationAnswer() {
    notifyBackendUnavailable('el envío de respuestas de conversación');
  }

  // TODO [BACKEND]: persistir el reinicio de la conversación.
  function resetConversation() {
    notifyBackendUnavailable('el reinicio de la conversación');
  }

  // TODO [BACKEND]: conectar el servicio de síntesis de voz.
  function speak() {
    notifyBackendUnavailable('la síntesis de voz');
  }

  // TODO [BACKEND]: conectar la reproducción del ejemplo de pronunciación.
  function listenExample() {
    notifyBackendUnavailable('la reproducción del ejemplo de pronunciación');
  }

  // TODO [BACKEND]: conectar la reproducción del audio de referencia.
  function playReferenceAudio() {
    notifyBackendUnavailable('la reproducción del audio de referencia');
  }

  // TODO [BACKEND]: solicitar permisos y grabar la voz del usuario.
  function startVoiceRecording() {
    notifyBackendUnavailable('la grabación de voz');
  }

  // TODO [BACKEND]: detener y conservar la grabación de voz.
  function stopVoiceRecording() {
    notifyBackendUnavailable('la detención y conservación de la grabación');
  }

  // TODO [BACKEND]: conectar la reproducción de la grabación del usuario.
  function playMyRecording() {
    notifyBackendUnavailable('la reproducción de la grabación propia');
  }

  // TODO [BACKEND]: evaluar la pronunciación con el servicio correspondiente.
  function evaluatePronunciation() {
    notifyBackendUnavailable('la evaluación de pronunciación');
  }

  // TODO [BACKEND]: presentar los errores detectados por la evaluación.
  function showErrors() {
    notifyBackendUnavailable('el análisis de errores de pronunciación');
  }

  // TODO [BACKEND]: conectar la reproducción de la pronunciación correcta.
  function listenCorrectPronunciation() {
    notifyBackendUnavailable('la reproducción de la pronunciación correcta');
  }

  // TODO [BACKEND]: reiniciar el intento de pronunciación.
  function tryAgainPronunciation() {
    notifyBackendUnavailable('el reinicio del intento de pronunciación');
  }

  // TODO [BACKEND]: guardar los votos del foro por usuario.
  function upvoteForum() {
    notifyBackendUnavailable('los votos del foro');
  }

  // TODO [BACKEND]: publicar respuestas de foro de forma persistente.
  function replyToForum() {
    notifyBackendUnavailable('las respuestas del foro');
  }

  // TODO [BACKEND]: abrir y validar el formulario para una nueva publicación.
  function openNewForumModal() {
    notifyBackendUnavailable('la creación de publicaciones del foro');
  }

  // TODO [BACKEND]: cargar el historial de práctica oral del usuario.
  function viewSpeakingHistory() {
    notifyBackendUnavailable('el historial de práctica oral');
  }

  // TODO [BACKEND]: generar y descargar el certificado del usuario.
  function downloadCertificate() {
    notifyBackendUnavailable('la generación y descarga de certificados');
  }

  function nextPronunciationActivity() {
    const nextIdx = (state.currentPhraseIndex + 1) % 4;
    const chips = document.querySelectorAll('.duo-phrase-chip');
    selectSpecificPhrase(nextIdx, chips[nextIdx] || null);
  }

  function viewDetailedProgress() {
    const el = document.getElementById('metric-percent-display');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function viewGrades() {
    const table = document.getElementById('grades-history-section');
    if (table) table.scrollIntoView({ behavior: 'smooth' });
  }

  /* ==========================================================================
     7. SISTEMA DE 3 TEMAS DE APARIENCIA (CLARO / OSCURO / COLORIDO) Y 3D
     ========================================================================== */
  const VALID_THEMES = ['light', 'dark', 'colorful'];
  const THEME_META = {
    light: { icon: '☀️', label: 'Claro' },
    dark: { icon: '🌙', label: 'Oscuro' },
    colorful: { icon: '🎨', label: 'Colorido' }
  };

  function setThemeMode(mode) {
    const normalizedMode = VALID_THEMES.includes(mode) ? mode : 'dark';
    state.themeMode = normalizedMode;
    state.isDarkMode = normalizedMode !== 'light';

    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', normalizedMode);
    }
    if (document.body) {
      document.body.classList.remove('light-mode', 'dark-mode', 'colorful-mode');
      document.body.classList.add(`${normalizedMode}-mode`);
    }

    try {
      localStorage.setItem('vibe_theme', normalizedMode);
    } catch (e) {}

    const meta = THEME_META[normalizedMode] || THEME_META.dark;
    const fIcon = document.getElementById('theme-floating-icon');
    const fText = document.getElementById('theme-floating-text');

    if (fIcon) fIcon.textContent = meta.icon;
    if (fText) fText.textContent = meta.label;

    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      const choice = btn.getAttribute('data-theme-choice');
      btn.classList.toggle('active', choice === normalizedMode);
      btn.setAttribute('aria-pressed', String(choice === normalizedMode));
    });
  }

  function cycleTheme() {
    const currentIndex = VALID_THEMES.indexOf(state.themeMode);
    const nextTheme = VALID_THEMES[(currentIndex + 1) % VALID_THEMES.length];
    setThemeMode(nextTheme);
  }

  function applyTheme(modeOrBool) {
    if (typeof modeOrBool === 'string' && VALID_THEMES.includes(modeOrBool)) {
      setThemeMode(modeOrBool);
    } else {
      setThemeMode(modeOrBool ? 'dark' : 'light');
    }
  }

  function toggleDarkMode() {
    cycleTheme();
  }

  function enableDarkMode() {
    setThemeMode('dark');
  }

  function setDarkMode(enabled) {
    setThemeMode(enabled ? 'dark' : 'light');
  }

  function init3DTiltCards() {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    if (window.matchMedia && !window.matchMedia('(hover: hover)').matches) return; // Optimización móvil: evita listeners de mouse en pantallas táctiles

    const tiltSelector = '.card-3d-tilt, .level-card, .metric-card, .audio-track-card, .manual-uso-card, .lesson-empty-card, .achievement-card';
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest ? e.target.closest(tiltSelector) : null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.0;
      const rotateY = ((x - centerX) / centerX) * 3.0;
      card.style.transform = `perspective(900px) translateY(-4px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest ? e.target.closest(tiltSelector) : null;
      if (card && (!e.relatedTarget || !card.contains(e.relatedTarget))) {
        card.style.transform = '';
      }
    });
  }

  function toggleHeaderDropdown(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('header-stats-dropdown-menu');
    const btn = document.getElementById('header-stats-dropdown-btn');
    if (!menu) return;
    const isHidden = menu.classList.toggle('hidden');
    if (btn) {
      btn.classList.toggle('open', !isHidden);
      btn.setAttribute('aria-expanded', String(!isHidden));
    }
  }

  function closeHeaderDropdown() {
    const menu = document.getElementById('header-stats-dropdown-menu');
    const btn = document.getElementById('header-stats-dropdown-btn');
    if (menu) menu.classList.add('hidden');
    if (btn) {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  function dispatchAction(event) {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    if (!target) return;

    const backdrop = target.closest('[data-close-modal-on-backdrop]');
    if (backdrop && target === backdrop) {
      closeModals();
      return;
    }

    const trigger = target.closest('[data-action]');
    if (!trigger) return;

    const actionName = trigger.getAttribute('data-action');
    if (
      state.pilotMode &&
      ![
        'switchPlatformTab',
        'openOnboardingScreen',
        'goBackFromSubscription',
        'setThemeMode',
        'cycleTheme',
        'toggleHeaderDropdown'
      ].includes(actionName)
    ) {
      showToast('Modo piloto: esta función requiere una cuenta con suscripción activa.', 'info');
      return;
    }

    const action = EnglishApp[actionName];
    if (typeof action !== 'function') {
      console.error(`Unknown VibeEnglish action: ${actionName}`);
      return;
    }

    const args = trigger.hasAttribute('data-action-args')
      ? JSON.parse(trigger.getAttribute('data-action-args'))
      : [];
    action(...args.map(arg => {
      if (arg === '$event') return event;
      if (arg === '$currentTarget') return trigger;
      return arg;
    }));
  }

  function init() {
    const savedTheme = safeGetTheme();
    setThemeMode(VALID_THEMES.includes(savedTheme) ? savedTheme : 'dark');
    renderEmptyUnitsGuide();
    updateSnakePathUI();
    init3DTiltCards();
    document.addEventListener('click', dispatchAction);
    document.addEventListener('submit', event => {
      event.preventDefault();
      dispatchAction(event);
    });
    document.addEventListener('keydown', handleModalKeyboard);
    document.addEventListener('keydown', event => {
      const target = event.target;
      if (
        target &&
        target.matches &&
        target.matches('[role="button"][tabindex="0"]') &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        target.click();
      }
    });

    const birthdate = document.getElementById('reg-birthdate');
    if (birthdate) {
      const today = new Date();
      birthdate.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    document.querySelectorAll('.auth-form input, .auth-form select').forEach(control => {
      control.addEventListener('input', () => {
        const form = control.closest('form');
        if (form && form.id === 'form-register') {
          const password = form.querySelector('#reg-password');
          const confirmation = form.querySelector('#reg-password-confirm');
          if (password && confirmation) {
            confirmation.setCustomValidity(
              confirmation.value && confirmation.value !== password.value
                ? 'Las contraseñas no coinciden.'
                : ''
            );
          }
        }

        const error = form && form.querySelector(`[data-error-for="${control.id}"]`);
        if (control.checkValidity()) {
          control.removeAttribute('aria-invalid');
          if (error) {
            error.textContent = '';
            error.hidden = true;
          }
        } else {
          control.setAttribute('aria-invalid', 'true');
          if (error) {
            error.textContent = getValidationMessage(control);
            error.hidden = false;
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      const wrap = document.getElementById('header-dropdown-wrap');
      if (wrap && !wrap.contains(e.target)) {
        closeHeaderDropdown();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    setThemeMode,
    cycleTheme,
    applyTheme,
    toggleDarkMode,
    enableDarkMode,
    setDarkMode,
    toggleHeaderDropdown,
    closeHeaderDropdown,
    openOnboardingScreen,
    enterPilotMode,
    switchAuthTab,
    togglePasswordVisibility,
    toggleRegisterPasswords,
    handleLogin,
    handleRegister,
    handlePasswordRecovery,
    selectSubscriptionPlan,
    subscribeToPlan,
    manageSubscription,
    changeSubscriptionPlan,
    cancelSubscription,
    goBackFromSubscription,
    closeModals,
    logout,
    switchPlatformTab,
    startLevel,
    openLevelTestModal,
    finishLevelTest,
    openAchievementsModal,
    renderEmptyUnitsGuide,
    updateSnakePathUI,
    clickLessonNode,
    startLessonStepRunner,
    closeLessonWorkspace,
    nextLessonStep,
    prevLessonStep,
    exitLessonToMap,
    selectRunnerOption,
    checkRunnerChallenge,
    playAudioDialogue,
    toggleTranscript,
    filterAudios,
    selectScenario,
    toggleConversationRecording,
    sendConversationAnswer,
    resetConversation,
    speak,
    selectSpecificPhrase,
    listenExample,
    playReferenceAudio,
    startVoiceRecording,
    stopVoiceRecording,
    playMyRecording,
    evaluatePronunciation,
    showErrors,
    listenCorrectPronunciation,
    tryAgainPronunciation,
    nextPronunciationActivity,
    filterForumPosts,
    upvoteForum,
    replyToForum,
    openNewForumModal,
    viewDetailedProgress,
    viewGrades,
    viewSpeakingHistory,
    checkCertificates: openCertificateModal,
    openCertificateModal,
    downloadCertificate
  };
})();

if (typeof window !== 'undefined') {
  window.EnglishApp = EnglishApp;
  window.toggleDarkMode = EnglishApp.toggleDarkMode;
  window.enableDarkMode = EnglishApp.enableDarkMode;
}
