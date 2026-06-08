// Color swatches
const colors = ['#1a4a7a', '#334455', '#8B4513', '#222222', '#555555'];
const swatchesContainer = document.getElementById('color-swatches');
let currentColor = '#1a4a7a';

colors.forEach(color => {
  const btn = document.createElement('button');
  btn.className = `w-14 h-14 rounded-full border-[5px] border-white shadow-lg transition-all active:scale-95`;
  btn.style.backgroundColor = color;
  btn.onclick = () => {
    currentColor = color;
    updateMannequin();
  };
  swatchesContainer.appendChild(btn);
});

function updateMannequin() {
  const img = document.getElementById('mannequin-img');
  const wash = document.getElementById('wash-select').value;
  
  let hue = 200;
  if (currentColor === '#334455') hue = 220;
  if (currentColor === '#8B4513') hue = 30;
  if (currentColor === '#222222') hue = 0;
  if (currentColor === '#555555') hue = 180;

  img.style.filter = `hue-rotate(${hue}deg) saturate(1.4)`;
}

function selectItem(isJacket) {
  const btnJacket = document.getElementById('btn-jacket');
  const btnJeans = document.getElementById('btn-jeans');
  
  if (isJacket) {
    btnJacket.classList.add('bg-yellow-400', 'border-yellow-400', 'text-black');
    btnJacket.classList.remove('border-white', 'hover:bg-zinc-900');
    btnJeans.classList.remove('bg-yellow-400', 'border-yellow-400', 'text-black');
    btnJeans.classList.add('border-white', 'hover:bg-zinc-900');
  } else {
    btnJeans.classList.add('bg-yellow-400', 'border-yellow-400', 'text-black');
    btnJeans.classList.remove('border-white', 'hover:bg-zinc-900');
    btnJacket.classList.remove('bg-yellow-400', 'border-yellow-400', 'text-black');
    btnJacket.classList.add('border-white', 'hover:bg-zinc-900');
  }
}

function stripDenim() {
  const overlay = document.getElementById('strip-overlay');
  overlay.classList.toggle('hidden');
  
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 2500);
}

function addToCart() {
  alert("Added to cart 💦\nYour custom denim is ready for the mannequin.");
}

// Default selection
selectItem(true);
