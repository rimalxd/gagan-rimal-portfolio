const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let width, height, columns, drops;
const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\\\$#@%&";

function resizeMatrix(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 16);
  drops = Array.from({length: columns}, () => Math.random() * -60);
}
function drawMatrix(){
  ctx.fillStyle = "rgba(1,4,2,0.12)";
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = "#19b84b";
  ctx.font = "12px JetBrains Mono, monospace";
  for(let i=0;i<columns;i++){
    const char = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(char, i*16, drops[i]*16);
    if(drops[i]*16 > height && Math.random() > .975) drops[i]=0;
    drops[i]++;
  }
}
resizeMatrix();
setInterval(drawMatrix, 55);
window.addEventListener("resize", resizeMatrix);

const menu = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");
  if(open) nav.style.display = "flex";
  else nav.style.display = "";
});
document.querySelectorAll(".nav nav a").forEach(a => a.addEventListener("click", () => {
  if(innerWidth <= 700) nav.classList.remove("mobile-open"), nav.style.display = "";
}));

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav nav a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s => observer.observe(s));
