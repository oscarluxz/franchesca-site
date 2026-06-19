/* =================================================
   PARA FRANCHESCA — interacciones
   cada función está aislada: si una falla, las demás
   siguen funcionando igual (por eso tantos try/catch)
   ================================================= */

console.log('script.js cargado correctamente ✅');

/* ---------- 1. Corazones flotantes ---------- */

try {
  const heartsContainer = document.getElementById('heartsContainer');
  const heartEmojis = ['💗', '💕', '💖', '🩷', '✨'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function spawnHeart() {
    if (reduceMotion || !heartsContainer) return;
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    const startX = Math.random() * 100;
    const drift = (Math.random() * 80 - 40) + 'px';
    const duration = 6 + Math.random() * 5;
    const size = 1 + Math.random() * 1.3;

    heart.style.left = startX + 'vw';
    heart.style.setProperty('--drift', drift);
    heart.style.animationDuration = duration + 's';
    heart.style.fontSize = size + 'rem';

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 200);
  }

  if (heartsContainer && !reduceMotion) {
    setInterval(spawnHeart, 850);
    for (let i = 0; i < 4; i++) setTimeout(spawnHeart, i * 350);
  }
} catch (err) {
  console.error('Error en los corazones flotantes:', err);
}

/* ---------- 2. Scroll cue ---------- */

try {
  const scrollCue = document.getElementById('scrollCue');
  const galeria = document.getElementById('galeria');
  if (scrollCue && galeria) {
    scrollCue.addEventListener('click', () => {
      galeria.scrollIntoView({ behavior: 'smooth' });
    });
  } else {
    console.warn('No encontré #scrollCue o #galeria en el HTML.');
  }
} catch (err) {
  console.error('Error en el botón de scroll:', err);
}

/* ---------- 3. Placeholders de la galería ---------- */
/* si una foto real (foto1.jpg, foto2.jpg...) no existe todavía,
   mostramos un marco bonito recordando dónde colocarla */

try {
  document.querySelectorAll('.polaroid').forEach((polaroid) => {
    const img = polaroid.querySelector('img');
    if (!img) return;
    img.addEventListener('error', () => {
      polaroid.classList.add('placeholder');
      const filename = polaroid.dataset.filename || 'images/foto.jpg';
      const box = document.createElement('div');
      box.className = 'placeholder-box';
      box.innerHTML = `<span>pon tu foto en<br>${filename}</span>`;
      polaroid.insertBefore(box, img);
    });
  });
} catch (err) {
  console.error('Error en los placeholders de fotos:', err);
}

/* ---------- 4. Razones random ---------- */

try {
  const reasons = [
    'Porque cualquier plan aburrido tu presencia lo hace divertido.',
    'Porque cuando algo te emociona, me emocionas y ese es el mejor sentimiento.',
    'Porque tienes el superpoder de hacer que un día gris se sienta soleado.',
    'Porque ya perdí la cuenta de las veces que dibujé algo pensando en ti.',
    'Porque tu forma de hablar de las cosas que te gustan me hace querer conocerlas también.',
    'Porque eres ese refugio donde encuentro paz.',
  ];

  let lastReasonIndex = -1;
  const reasonText = document.getElementById('reasonText');
  const reasonBtn = document.getElementById('reasonBtn');

  if (reasonText && reasonBtn) {
    reasonText.style.transition = 'opacity 0.18s ease';
    reasonBtn.addEventListener('click', () => {
      let index;
      do {
        index = Math.floor(Math.random() * reasons.length);
      } while (index === lastReasonIndex && reasons.length > 1);
      lastReasonIndex = index;

      reasonText.style.opacity = 0;
      setTimeout(() => {
        reasonText.textContent = reasons[index];
        reasonText.style.opacity = 1;
      }, 180);
    });
  } else {
    console.warn('No encontré #reasonText o #reasonBtn en el HTML.');
  }
} catch (err) {
  console.error('Error en el botón de razones:', err);
}

/* ---------- 5. Modal de la carta ---------- */

try {
  const modalOverlay = document.getElementById('modalOverlay');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const closeLetterBtn = document.getElementById('closeLetterBtn');

  if (modalOverlay && openLetterBtn && closeLetterBtn) {
    const openLetter = () => {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeLetter = () => {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    openLetterBtn.addEventListener('click', openLetter);
    closeLetterBtn.addEventListener('click', closeLetter);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeLetter();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeLetter();
    });
  } else {
    console.warn('No encontré #modalOverlay, #openLetterBtn o #closeLetterBtn en el HTML.');
  }
} catch (err) {
  console.error('Error en el modal de la carta:', err);
}

/* ---------- 6. Música de fondo (archivo de audio local) ---------- */
// usa tu propia canción descargada: ponla en una carpeta llamada "audio"
// junto a este archivo, con el nombre exacto "cancion.mp3"
// (si es .wav, .ogg o .m4a, cambia la extensión en el <audio> del index.html)

const bgAudio = document.getElementById('bgAudio');
const musicToggle = document.getElementById('musicToggle');
const musicHint = document.getElementById('musicHint');
const musicArt = document.getElementById('musicArt');

let isPlaying = false;

function setPlayingUI(playing) {
  isPlaying = playing;
  if (musicToggle) {
    musicToggle.textContent = playing ? '⏸' : '▶';
    musicToggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  }
  if (musicHint) musicHint.textContent = playing ? 'sonando ahora' : 'toca para reproducir';
  if (musicArt) musicArt.classList.toggle('playing', playing);
}

if (bgAudio) {
  // si el archivo no existe o no carga, avisamos en vez de fallar en silencio
  bgAudio.addEventListener('error', () => {
    console.warn('No encontré el archivo de audio. Revisa que exista "audio/cancion.mp3".');
    if (musicHint) musicHint.textContent = 'falta el archivo de audio 😕';
  });
}

if (musicToggle && bgAudio) {
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgAudio.pause();
      setPlayingUI(false);
    } else {
      bgAudio.play()
        .then(() => setPlayingUI(true))
        .catch((err) => {
          console.error('No se pudo reproducir el audio:', err);
          if (musicHint) musicHint.textContent = 'no pude reproducirlo 😕';
        });
    }
  });
} else {
  console.warn('No encontré #musicToggle o #bgAudio en el HTML.');
}
