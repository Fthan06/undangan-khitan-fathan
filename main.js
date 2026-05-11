const CFG = {
  eventDate : new Date('2026-06-11T08:00:00+07:00'),
  heroLines : ['Moch.', 'Fathan', 'Rafif Hafizhan'],
  quote     : "Dalam setiap langkah menuju kedewasaan,\nada doa yang menyertai.",
  address   : 'Kp. Cicalengka, Rt.01 Rw,03<br>Kec. Cihampelas, Kab. Bandung Barat',
  waNumber  : '6285642347343',
};

const DEFAULT_WISHES = [
  
];


const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

/* ══════════════════════════════════════════
   TCHHH,SCRIOT KIDDO
══════════════════════════════════════════ */
const bgCanvas = document.getElementById('bg');
const bgCtx    = bgCanvas.getContext('2d');
let BW, BH;

function resizeBg() {
  BW = bgCanvas.width  = Math.round(window.innerWidth  * dpr);
  BH = bgCanvas.height = Math.round(window.innerHeight * dpr);
  bgCanvas.style.width  = window.innerWidth  + 'px';
  bgCanvas.style.height = window.innerHeight + 'px';
}
resizeBg();
window.addEventListener('resize', resizeBg, { passive: true });

// Stars
const STAR_COUNT = isMobile ? 90 : 160;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random(), y: Math.random(),
  r: (Math.random() * 1.1 + .25) * dpr,
  o: Math.random() * .5 + .08,
  dir: 1,
  spd: Math.random() * .007 + .003,
}));

// Gold floaters
const FLOAT_COUNT = isMobile ? 12 : 22;
const floaters = Array.from({ length: FLOAT_COUNT }, () => ({
  x: Math.random(), y: Math.random() + .5,
  r: (Math.random() * 2 + .6) * dpr,
  o: Math.random() * .14 + .03,
  vx: (Math.random() - .5) * .00025,
  vy: -(Math.random() * .00035 + .00008),
}));

// Fog
const FOG_COUNT = isMobile ? 3 : 5;
const fogs = Array.from({ length: FOG_COUNT }, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random() * .28 + .12,
  o: Math.random() * .018 + .006,
  vx: (Math.random() - .5) * .00006,
  vy: (Math.random() - .5) * .00004,
}));

function bgDraw() {
  bgCtx.clearRect(0, 0, BW, BH);

  // fog
  fogs.forEach(f => {
    f.x += f.vx; f.y += f.vy;
    if (f.x < -.4) f.x = 1.4; if (f.x > 1.4) f.x = -.4;
    if (f.y < -.4) f.y = 1.4; if (f.y > 1.4) f.y = -.4;
    const cx = f.x * BW, cy = f.y * BH, r = f.r * BW;
    const grd = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, `rgba(13,59,54,${f.o})`);
    grd.addColorStop(1, 'rgba(13,59,54,0)');
    bgCtx.beginPath(); bgCtx.arc(cx, cy, r, 0, Math.PI * 2);
    bgCtx.fillStyle = grd; bgCtx.fill();
  });

  // stars
  stars.forEach(s => {
    s.o += s.spd * s.dir;
    if (s.o > .62 || s.o < .05) s.dir *= -1;
    bgCtx.beginPath();
    bgCtx.arc(s.x * BW, s.y * BH, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(240,237,232,${s.o})`;
    bgCtx.fill();
  });

  floaters.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.o -= .00005;
    if (p.y < -.06 || p.o <= 0) {
      p.x = Math.random(); p.y = 1.06;
      p.o = Math.random() * .12 + .04;
    }
    const cx = p.x * BW, cy = p.y * BH, r = p.r * 4;
    const grd = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0, `rgba(200,169,107,${p.o})`);
    grd.addColorStop(1, 'rgba(200,169,107,0)');
    bgCtx.beginPath(); bgCtx.arc(cx, cy, r, 0, Math.PI * 2);
    bgCtx.fillStyle = grd; bgCtx.fill();
  });

  requestAnimationFrame(bgDraw);
}
bgDraw();

function initGuest() {
  const p    = new URLSearchParams(location.search);
  const name = p.get('to') || p.get('nama') || '';
  if (!name) return;
  const el = document.getElementById('opGuest');
  const nm = document.getElementById('opGuestName');
  el.style.display = 'block';
  nm.textContent   = name;
}

function startLoading() {
  initGuest();
  const fill = document.getElementById('ldfill');
  const t0   = performance.now();
  const DUR  = 2600;

  function tick(now) {
    const p = Math.min((now - t0) / DUR, 1);
    fill.style.right = (100 - p * 100) + '%';
    if (p < 1) requestAnimationFrame(tick);
    else setTimeout(endLoading, 350);
  }
  requestAnimationFrame(tick);
}

function endLoading() {
  const ld = document.getElementById('loading');
  ld.classList.add('out');
  setTimeout(() => {
    ld.style.display = 'none';
    showOpening();
  }, 1200);
}

/* ══════════════════════════════════════════
   YUK NGODING YUK
  ══════════════════════════════════
     CREDIT EVILVOID TEAM
     IG : riixs4k
     buy licens? DM me on IG
  ══════════════════════════════════
══════════════════════════════════════════ */
function showOpening() {
  document.getElementById('opening').classList.add('show');
  revealQuote();
  initAudio();
}

function revealQuote() {
  const el  = document.getElementById('opQuote');
  let   html = '';
  CFG.quote.split('\n').forEach((line, li) => {
    line.split(' ').forEach((word, wi) => {
      html += `<span class="w">${word}</span>`;
      if (wi < line.split(' ').length - 1) html += ' ';
    });
    if (li === 0) html += '<br>';
  });
  el.innerHTML = html;
  el.querySelectorAll('.w').forEach((sp, i) => {
    setTimeout(() => sp.classList.add('go'), 550 + i * 110);
  });
}

document.getElementById('opBtn').addEventListener('click', openInvitation);

function openInvitation() {
  document.getElementById('opening').classList.add('exit');
  setTimeout(() => {
    document.getElementById('opening').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(initMain));
  }, 1400);
  playAudio();
}

let audio      = null;
let audioMuted = false;

function initAudio() {
  try {
    audio = new Audio('assets/music.opus');
    audio.loop   = true;
    audio.volume = 0;

    // Fade in
    const fadeIn = () => {
      let vol = 0;
      const step = () => {
        vol = Math.min(vol + 0.005, 0.35);
        audio.volume = vol;
        if (vol < 0.35) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    audio.addEventListener('canplaythrough', () => {}, { once: true });
    audio.load();
  } catch (e) { /* audio not supported */ }
}

function playAudio() {
  if (!audio) return;
  const promise = audio.play();
  if (promise !== undefined) {
    promise.then(() => {
      // Fade in
      let vol = 0;
      const step = () => {
        vol = Math.min(vol + 0.005, 0.35);
        audio.volume = vol;
        if (vol < 0.35) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }).catch(() => { /* autoplay diblokir, tunggu interaksi */ });
  }
}

document.getElementById('audBtn').addEventListener('click', () => {
  if (!audio) return;

  if (audio.paused) {
    
    audio.play().catch(() => {});
  }

  audioMuted = !audioMuted;

  // Fade out / fade in volume
  const target = audioMuted ? 0 : 0.35;
  const step   = audioMuted ? -0.02 : 0.02;
  const fade   = () => {
    audio.volume = Math.max(0, Math.min(0.35, audio.volume + step));
    if (audioMuted ? audio.volume > 0 : audio.volume < 0.35) {
      requestAnimationFrame(fade);
    }
  };
  requestAnimationFrame(fade);

  document.getElementById('audBtn').classList.toggle('mute', audioMuted);
});

function initMain() {
  heroLetters();
  initReveal();
  initNavDots();
  initCountdown();
  initWishes();
  initCursor();
  initPhotoObserver();
  initTlObserver();
  initLocCard();
}

function heroLetters() {
  [
    { id: 'hl1', text: CFG.heroLines[0], delay: 600  },
    { id: 'hl2', text: CFG.heroLines[1], delay: 1200 },
    { id: 'hl3', text: CFG.heroLines[2], delay: 1750 },
  ].forEach(({ id, text, delay }) => {
    const el = document.getElementById(id);
    el.innerHTML = [...text].map(ch =>
      ch === ' ' ? '&nbsp;' : `<span class="c">${ch}</span>`
    ).join('');
    el.querySelectorAll('.c').forEach((c, i) => {
      setTimeout(() => c.classList.add('go'), delay + i * 65);
    });
  });
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('go'); obs.unobserve(e.target); }
    });
  }, { threshold: isMobile ? 0.08 : 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.rv, .rl, .tl-item').forEach(el => obs.observe(el));
}

function initNavDots() {
  const dots = document.querySelectorAll('.ndot');

  dots.forEach(d => {
    d.addEventListener('click', () => {
      document.getElementById(d.dataset.s)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        dots.forEach(d => d.classList.toggle('on', d.dataset.s === id));
      }
    });
  }, { threshold: 0.4 });

  ['hero', 'profile', 'countdown', 'timeline', 'payment', 'location', 'wishes', 'ending']
    .forEach(id => { const el = document.getElementById(id); if (el) secObs.observe(el); });
}

const pad2 = n => String(n).padStart(2, '0');

function flipEl(id, val) {
  const el = document.getElementById(id);
  if (!el || el.textContent === val) return;
  el.classList.remove('flip');
  void el.offsetWidth; // reflow trigger
  el.textContent = val;
  el.classList.add('flip');
}

function initCountdown() {
  function tick() {
    const d = CFG.eventDate - Date.now();
    if (d <= 0) {
      document.getElementById('cdCards').style.display = 'none';
      document.getElementById('cdDone').classList.add('show');
      launchConfetti();
      return;
    }
    flipEl('cdD', pad2(Math.floor(d / 86400000)));
    flipEl('cdH', pad2(Math.floor((d % 86400000) / 3600000)));
    flipEl('cdM', pad2(Math.floor((d % 3600000) / 60000)));
    flipEl('cdS', pad2(Math.floor((d % 60000) / 1000)));
  }
  tick();
  setInterval(tick, 1000);
}

function launchConfetti() {
  const cols = ['#c8a96b', '#e8c98a', '#d6d6d6', '#f0ede8', '#0d3b36'];
  for (let i = 0; i < 55; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cf';
      el.style.cssText = `left:${Math.random() * 100}%;top:-12px;background:${cols[i % cols.length]};transform:rotate(${Math.random() * 360}deg);animation-duration:${2 + Math.random() * 2.2}s;animation-delay:${Math.random() * 1.5}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5200);
    }, i * 70);
  }
}

function initPhotoObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          document.getElementById('photoImg')?.classList.add('colored');
        }, 300);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const el = document.getElementById('profile');
  if (el) obs.observe(el);
}

function initTlObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.getElementById('tlGlow').classList.add('go');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  const el = document.getElementById('timeline');
  if (el) obs.observe(el);
}

let mapOpen = false;

function initLocCard() {
  document.getElementById('locCard').addEventListener('click', () => {
    mapOpen = !mapOpen;
    document.getElementById('locMap').classList.toggle('open', mapOpen);
    document.getElementById('locHintTxt').textContent = mapOpen ? 'Klik untuk tutup' : 'Klik untuk lihat peta';
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    const btn = document.getElementById('copyTxt');
    navigator.clipboard.writeText(CFG.address)
      .then(() => { btn.textContent = '✓ Tersalin!'; setTimeout(() => btn.textContent = 'Salin Alamat', 2200); })
      .catch(() => { btn.textContent = 'Gagal'; setTimeout(() => btn.textContent = 'Salin Alamat', 2000); });
  });
}

const LS_KEY = 'mlc_wishes';

function loadWishes() { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function saveWishes(w) { try { localStorage.setItem(LS_KEY, JSON.stringify(w)); } catch {} }

function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1)  return 'Baru saja';
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderWishes() {
  const all = [...loadWishes(), ...DEFAULT_WISHES];
  document.getElementById('wList').innerHTML = all.map(w => `
    <div class="w-card">
      <div class="w-head">
        <div class="w-av">${(w.name || '?')[0].toUpperCase()}</div>
        <span class="w-name">${esc(w.name || 'Tamu')}</span>
        <span class="w-time">${w.time || (w.ts ? timeAgo(w.ts) : '')}</span>
      </div>
      <p class="w-msg">${esc(w.msg || '')}</p>
    </div>`).join('');
}

function initWishes() {
  renderWishes();
  document.getElementById('wSend').addEventListener('click', () => {
    const n = document.getElementById('wName');
    const m = document.getElementById('wMsg');
    const name = n.value.trim(), msg = m.value.trim();
    n.style.borderColor = !name ? 'rgba(200,100,100,.5)' : '';
    m.style.borderColor = !msg  ? 'rgba(200,100,100,.5)' : '';
    if (!name || !msg) return;
    n.style.borderColor = m.style.borderColor = '';
    const w = loadWishes();
    w.unshift({ name, msg, ts: Date.now() });
    saveWishes(w);
    n.value = m.value = '';
    renderWishes();
    document.getElementById('wList').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function copyPay(id, raw, btn) {
  navigator.clipboard.writeText(raw).then(() => {
    const sp = btn.querySelector('span');
    sp.textContent = '✓ Tersalin!';
    setTimeout(() => sp.textContent = 'Salin Nomor', 2200);
  }).catch(() => {
    const sp = btn.querySelector('span');
    sp.textContent = 'Gagal';
    setTimeout(() => sp.textContent = 'Salin Nomor', 2000);
  });
}

function initCursor() {
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.transform = `translate(${rx - 14}px,${ry - 14}px)`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.borderColor = 'rgba(200,169,107,.55)');
    el.addEventListener('mouseleave', () => ring.style.borderColor = 'rgba(200,169,107,.35)');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startLoading);
} else {
  startLoading();
}
