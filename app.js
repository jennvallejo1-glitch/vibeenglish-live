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
 *   4. Puntos de extensión vacíos (stubs) para que otros desarrolladores
 *      integren posteriormente los contenidos, audios y funcionalidades.
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
    activeScenario: '1'
  };

  const TOTAL_UNITS = 6;
  const LESSONS_PER_UNIT = 6;

  /* ==========================================================================
     1. NOTIFICACIONES VISUALES DE INTERFAZ
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    toast.innerHTML = message;
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div class="progress-bar-wrap" style="height: 6px;">
              <div class="progress-bar-fill" style="width: 0%;"></div>
            </div>

            <!-- Espacios vacíos para futuras actividades de la lección -->
            <div class="lesson-activity-slots" aria-label="Espacios para actividades">
              <div class="activity-empty-slot">📖</div>
              <div class="activity-empty-slot">🎧</div>
              <div class="activity-empty-slot">✍️</div>
              <div class="activity-empty-slot">🎙️</div>
            </div>

            <!-- Botón para comenzar cada lección -->
            <button type="button" class="btn btn-primary btn-sm w-full mt-auto" onclick="EnglishApp.startLessonStepRunner(${lessonNum})">
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
              <div class="flex-1" style="max-width: 340px;">
                <div class="empty-slot-title mb-1"></div>
                <div class="empty-slot-line short"></div>
              </div>
            </div>
            <div style="min-width: 160px;">
              <div class="progress-bar-wrap" style="height: 8px;">
                <div class="progress-bar-fill" style="width: 0%;"></div>
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
          <button type="button" class="${btnClass}" id="snake-node-btn-${n.id}" onclick="EnglishApp.clickLessonNode(${n.id})">
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
  let enteredPlatformOnce = true;

  function openOnboardingScreen(screenName = 'login') {
    const authSec = document.getElementById('auth-section');
    const platSec = document.getElementById('course-platform-section');

    if (platSec) platSec.classList.add('hidden');
    if (authSec) authSec.classList.remove('hidden');

    const screens = {
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function enterPlatform(targetTab = 'inicio') {
    enteredPlatformOnce = true;
    const authSec = document.getElementById('auth-section');
    const platSec = document.getElementById('course-platform-section');
    if (authSec) authSec.classList.add('hidden');
    if (platSec) platSec.classList.remove('hidden');
    switchPlatformTab(targetTab);
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

  function handleLogin() {
    // Integración pendiente: Conectar con el servicio de autenticación real (API / Backend).
    enterPlatform('inicio');
  }

  function handleRegister() {
    // Integración pendiente: Conectar el envío del formulario de registro con el backend de usuarios.
    openOnboardingScreen('subscription');
  }

  function handlePasswordRecovery() {
    // Integración pendiente: Conectar con el servicio de recuperación de contraseña.
    openOnboardingScreen('login');
  }

  function selectSubscriptionPlan(planNumber) {
    [1, 2, 3].forEach(num => {
      const card = document.getElementById(`sub-plan-card-${num}`);
      if (card) card.classList.toggle('selected', num === planNumber);
    });
  }

  function subscribeToPlan() {
    // Integración pendiente: Conectar pasarela de pagos y activación de suscripción.
  }

  function manageSubscription() {
    // Integración pendiente: Conectar panel de administración de suscripción del usuario.
  }

  function changeSubscriptionPlan() {
    // Integración pendiente: Conectar actualización o cambio de plan activo.
  }

  function cancelSubscription() {
    // Integración pendiente: Conectar cancelación de suscripción con el backend.
  }

  function goBackFromSubscription() {
    if (enteredPlatformOnce) {
      enterPlatform(state.currentPlatformTab || 'inicio');
    } else {
      openOnboardingScreen('welcome');
    }
  }

  function quickDemoAccess() {
    enterPlatform('inicio');
  }

  function transitionToPlatform() {
    enterPlatform('inicio');
  }

  function logout() {
    openOnboardingScreen('login');
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.add('hidden'));
  }

  function openLevelTestModal() {
    const m = document.getElementById('modal-level-test');
    if (m) m.classList.remove('hidden');
  }

  function finishLevelTest() {
    closeModals();
  }

  function openAchievementsModal() {
    switchPlatformTab('logros');
  }

  function openCertificateModal() {
    const modal = document.getElementById('modal-certificate');
    if (modal) modal.classList.remove('hidden');
  }

  function startLevel() {
    closeLessonWorkspace();
    switchPlatformTab('manual');
  }

  /* ==========================================================================
     6. STUBS VACÍOS PREPARADOS PARA EL EQUIPO DE DESARROLLO
     ========================================================================== */
  function noop() {}

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

  function init() {
    const savedTheme = safeGetTheme();
    setThemeMode(VALID_THEMES.includes(savedTheme) ? savedTheme : 'dark');
    renderEmptyUnitsGuide();
    updateSnakePathUI();
    init3DTiltCards();

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
    enterPlatform,
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
    quickDemoAccess,
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
    checkRunnerChallenge: noop,
    playAudioDialogue: noop,
    toggleTranscript,
    filterAudios,
    selectScenario,
    toggleConversationRecording: noop,
    sendConversationAnswer: noop,
    resetConversation: noop,
    speak: noop,
    selectSpecificPhrase,
    listenExample: noop,
    playReferenceAudio: noop,
    startVoiceRecording: noop,
    stopVoiceRecording: noop,
    playMyRecording: noop,
    evaluatePronunciation: noop,
    showErrors: noop,
    listenCorrectPronunciation: noop,
    tryAgainPronunciation: noop,
    nextPronunciationActivity,
    filterForumPosts,
    upvoteForum: noop,
    replyToForum: noop,
    openNewForumModal: noop,
    viewDetailedProgress,
    viewGrades,
    viewSpeakingHistory: noop,
    checkCertificates: openCertificateModal,
    openCertificateModal,
    downloadCertificate: noop,
    transitionToPlatform
  };
})();

if (typeof window !== 'undefined') {
  window.EnglishApp = EnglishApp;
  window.toggleDarkMode = EnglishApp.toggleDarkMode;
  window.enableDarkMode = EnglishApp.enableDarkMode;
}
