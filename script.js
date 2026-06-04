const backsound = document.getElementById('backsound');
const musicBtn  = document.getElementById('musicBtn');
let   isPlaying = false;

function startMusic() {
  backsound.volume = 0;
  backsound.play().then(() => {
    isPlaying = true;
    musicBtn.classList.add('playing');
    let vol = 0;
    const fi = setInterval(() => {
      vol = Math.min(vol + 0.02, 0.45);
      backsound.volume = vol;
      if (vol >= 0.45) clearInterval(fi);
    }, 80);
  }).catch(() => {});
}

function toggleMusic() {
  if (isPlaying) {
    let vol = backsound.volume;
    const fo = setInterval(() => {
      vol = Math.max(vol - 0.04, 0);
      backsound.volume = vol;
      if (vol <= 0) { clearInterval(fo); backsound.pause(); isPlaying = false; musicBtn.classList.remove('playing'); }
    }, 40);
  } else {
    backsound.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      let vol = 0;
      const fi = setInterval(() => {
        vol = Math.min(vol + 0.04, 0.45);
        backsound.volume = vol;
        if (vol >= 0.45) clearInterval(fi);
      }, 40);
    });
  }
}

const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});
document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.7)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
const hoverEls = document.querySelectorAll('button, a, .card, .info-card, .gift-card');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.4)'; cursor.style.background = '#111'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--gold)'; });
});


function openInvitation() {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  intro.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  intro.style.opacity = '0';
  intro.style.transform = 'scale(0.95)';
  setTimeout(() => {
    intro.style.display = 'none';
    main.style.display = 'block';
    setTimeout(() => { main.style.opacity = '1'; main.style.transition = 'opacity 0.5s ease'; }, 10);
    initReveal();
    initCountdown();
    startMusic();
    document.getElementById('musicBtn').classList.add('visible');
  }, 600);
}


function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}


function initCountdown() {
  const target = new Date('2026-06-11T08:00:00');
  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<div style="font-weight:700;font-size:1.1rem;color:var(--gold)">Alhamdulillah, acara telah berlangsung!</div>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').innerHTML = `<div class="countdown-num">${String(d).padStart(2,'0')}</div><div class="countdown-lbl">Hari</div>`;
    document.getElementById('cd-hours').innerHTML = `<div class="countdown-num">${String(h).padStart(2,'0')}</div><div class="countdown-lbl">Jam</div>`;
    document.getElementById('cd-mins').innerHTML = `<div class="countdown-num">${String(m).padStart(2,'0')}</div><div class="countdown-lbl">Menit</div>`;
    document.getElementById('cd-secs').innerHTML = `<div class="countdown-num">${String(s).padStart(2,'0')}</div><div class="countdown-lbl">Detik</div>`;
  }
  update();
  setInterval(update, 1000);
}


function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Tersalin!';
    btn.classList.add('copied');
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
  });
}

function copyLocation() {
  const url = 'https://maps.google.com/?q=Sayuran+No.17+Mekarmukti+Cihampelas+Bandung+Barat';
  navigator.clipboard.writeText(url).then(() => {
    alert('✅ Link lokasi berhasil disalin!');
  });
}


const localWishes = [];
function submitWish() {
  const name = document.getElementById('wishName').value.trim();
  const text = document.getElementById('wishText').value.trim();
  if (!name || !text) { alert('Mohon isi nama dan ucapan Anda 🙏'); return; }
  localWishes.unshift({ name, text });
  renderWish({ name, text });
  document.getElementById('wishName').value = '';
  document.getElementById('wishText').value = '';
}

function renderWish(w) {
  const feed = document.getElementById('wishesFeed');
  const el = document.createElement('div');
  el.className = 'wish-bubble';
  el.innerHTML = `<div class="wish-name"><span class="dot"></span>${escHtml(w.name)}</div><div class="wish-text">${escHtml(w.text)}</div>`;
  el.style.animation = 'fadeSlideUp 0.5s ease both';
  feed.prepend(el);
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}


if ('ontouchstart' in window) {
  document.getElementById('cursor').style.display = 'none';
  document.getElementById('cursorRing').style.display = 'none';
  document.body.style.cursor = 'auto';
}