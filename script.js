// 1. Particle system - 200 estrellas + 100 partículas
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth; canvas.height = innerHeight;

const stars = Array.from({length:200}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*1.6+0.2,
  tw: Math.random()*Math.PI*2
}));

const parts = Array.from({length:100}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  vx: (Math.random()-0.5)*0.3,
  vy: (Math.random()-0.5)*0.3
}));

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s => {
    s.tw += 0.02;
    ctx.globalAlpha = 0.5+Math.sin(s.tw)*0.5;
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  });
  parts.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

// 2. Parallax con mouse
window.addEventListener('mousemove', e => {
  const x = (e.clientX/innerWidth-0.5)*20;
  const y = (e.clientY/innerHeight-0.5)*20;
  document.querySelector('h1').style.transform =
    `translate3d(${x}px,${y}px,0)`;
});

// 3. IntersectionObserver para animar al scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('in-view');
  });
}, {threshold:0.2});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 4. Geoda que se abre con scroll
window.addEventListener('scroll', () => {
  const rect = document.querySelector('#origen').getBoundingClientRect();
  const progress = 1 - rect.top/innerHeight;
  document.querySelector('.geoda').style.setProperty('--open', progress);
});