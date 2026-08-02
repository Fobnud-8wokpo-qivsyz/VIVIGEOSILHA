// ===== VIVIGEOSILHA — Galactic Edition =====

// 1. Particle system — estrellas + partículas
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.2,
  tw: Math.random() * Math.PI * 2,
  speed: 0.015 + Math.random() * 0.025
}));

const parts = Array.from({ length: 90 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  r: Math.random() * 1.8 + 0.6,
  a: Math.random() * 0.5 + 0.2
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Estrellas
  stars.forEach(s => {
    s.tw += s.speed;
    const alpha = 0.35 + Math.sin(s.tw) * 0.55;
    ctx.globalAlpha = Math.max(0.1, alpha);
    ctx.fillStyle = '#EDE4FF';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Partículas flotantes
  parts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.globalAlpha = p.a;
    ctx.fillStyle = Math.random() > 0.7 ? '#FFD700' : '#D8B4FE';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
draw();

// 2. Parallax suave con el mouse (solo en el título)
window.addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - 0.5) * 18;
  const y = (e.clientY / innerHeight - 0.5) * 14;
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
});

// 3. IntersectionObserver — animar al entrar en viewport
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 4. Geoda que se abre con el scroll
window.addEventListener('scroll', () => {
  const origen = document.querySelector('#origen');
  const geoda = document.querySelector('.geoda');
  if (!origen || !geoda) return;

  const rect = origen.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, 1 - rect.top / (innerHeight * 0.7)));
  geoda.style.setProperty('--open', progress);
}, { passive: true });

// Inicializar geoda al cargar (por si ya está visible)
window.dispatchEvent(new Event('scroll'));
