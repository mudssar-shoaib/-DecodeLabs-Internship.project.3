// ============ THEME TOGGLE ============
const themeBtn = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark'); themeBtn.textContent = '☀️'; }
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ============ COUNTER ============
let count = 0;
const countValue = document.getElementById('countValue');
document.getElementById('incBtn').addEventListener('click', () => { count++; updateCount(); });
document.getElementById('decBtn').addEventListener('click', () => { count--; updateCount(); });
document.getElementById('resetBtn').addEventListener('click', () => { count = 0; updateCount(); });
function updateCount() {
  countValue.textContent = count;
  countValue.style.color = count > 0 ? '#10b981' : count < 0 ? '#ef4444' : '#6366f1';
}

// ============ TO-DO ============
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    if (t.done) li.classList.add('done');
    li.innerHTML = `<span>${t.text}</span><button class="del">✕</button>`;
    li.querySelector('span').addEventListener('click', () => { todos[i].done = !todos[i].done; save(); });
    li.querySelector('.del').addEventListener('click', () => { todos.splice(i,1); save(); });
    todoList.appendChild(li);
  });
}
function save() { localStorage.setItem('todos', JSON.stringify(todos)); renderTodos(); }
document.getElementById('addTodo').addEventListener('click', addTodo);
todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
function addTodo() {
  const val = todoInput.value.trim();
  if (!val) return;
  todos.push({ text: val, done: false });
  todoInput.value = '';
  save();
}
renderTodos();

// ============ GALLERY ============
const images = [
  { url: 'https://picsum.photos/id/10/400/300', cat: 'nature' },
  { url: 'https://picsum.photos/id/1015/400/300', cat: 'nature' },
  { url: 'https://picsum.photos/id/1018/400/300', cat: 'nature' },
  { url: 'https://picsum.photos/id/1039/400/300', cat: 'nature' },
  { url: 'https://picsum.photos/id/164/400/300', cat: 'city' },
  { url: 'https://picsum.photos/id/193/400/300', cat: 'city' },
  { url: 'https://picsum.photos/id/225/400/300', cat: 'city' },
  { url: 'https://picsum.photos/id/244/400/300', cat: 'city' },
  { url: 'https://picsum.photos/id/2/400/300', cat: 'tech' },
  { url: 'https://picsum.photos/id/48/400/300', cat: 'tech' },
  { url: 'https://picsum.photos/id/60/400/300', cat: 'tech' },
  { url: 'https://picsum.photos/id/119/400/300', cat: 'tech' },
];
const galleryGrid = document.getElementById('galleryGrid');
function renderGallery(filter = 'all') {
  galleryGrid.innerHTML = '';
  images.filter(img => filter === 'all' || img.cat === filter).forEach(img => {
    const el = document.createElement('img');
    el.src = img.url; el.alt = img.cat;
    el.addEventListener('click', () => openLightbox(img.url));
    galleryGrid.appendChild(el);
  });
}
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderGallery(chip.dataset.filter);
  });
});
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
function openLightbox(src) { lbImg.src = src; lightbox.classList.add('active'); }
document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });
renderGallery();

// ============ QUOTES ============
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "In order to be irreplaceable one must always be different.", author: "Coco Chanel" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
];
document.getElementById('newQuote').addEventListener('click', () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteText').textContent = `"${q.text}"`;
  document.getElementById('quoteAuthor').textContent = `— ${q.author}`;
});

// ============ CALCULATOR ============
const disp = document.getElementById('calcDisplay');
let expr = '';
document.querySelectorAll('.ck').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.textContent;
    if (v === 'C') { expr = ''; disp.value = '0'; return; }
    if (v === '=') {
      try {
        const r = Function('"use strict";return (' + expr + ')')();
        disp.value = r; expr = String(r);
      } catch { disp.value = 'Error'; expr = ''; }
      return;
    }
    expr += v;
    disp.value = expr;
  });
});

console.log('%c⚡ Interactive Hub loaded!', 'color:#6366f1;font-size:16px;font-weight:bold');
