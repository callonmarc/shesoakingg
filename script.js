// Color swatches
const colors = ['#1a4a7a', '#334455', '#8B4513', '#222222', '#555555', '#991111'];
const swatchesContainer = document.getElementById('color-swatches');

colors.forEach((color, i) => {
  const btn = document.createElement('button');
  btn.className = `w-16 h-16 rounded-full border-4 border-white shadow-xl transition-all hover:scale-110 ${i === 0 ? 'ring-4 ring-yellow-400' : ''}`;
  btn.style.backgroundColor = color;
  btn.onclick = () => changeColor(color);
  swatchesContainer.appendChild(btn);
});

function changeColor(color) {
  const img = document.getElementById('main-mannequin');
  let hue = 210;
  if (color === '#8B4513') hue = 25;
  if (color === '#222222') hue = 0;
  if (color === '#555555') hue = 180;
  if (color === '#991111') hue = 350;
  
  img.style.filter = `hue-rotate(${hue}deg) saturate(1.5) contrast(1.1)`;
}

function changeImage(src) {
  document.getElementById('main-mannequin').src = src;
}

function stripDenim() {
  alert("💦 SHE'S STRIPPING THE DENIM FOR YOU RIGHT NOW...");
}

function addToCart() {
  alert("✅ Added to cart 💦\nYour custom denim is ready for the mannequin orgy.");
}

// Auto Popups when page loads
function createPopup(src, delay) {
  setTimeout(() => {
    const popup = document.createElement('div');
    popup.className = `popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black border-4 border-red-500 z-50 shadow-2xl max-w-[380px]`;
    popup.innerHTML = `
      <div class="relative">
        <img src="${src}" class="w-full block">
        <button onclick="this.parentElement.parentElement.remove()" 
                class="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold hover:bg-red-700">
          ×
        </button>
      </div>
    `;
    document.getElementById('popup-container').appendChild(popup);
  }, delay);
}

// Trigger popups
window.onload = () => {
  createPopup('assets/popup-1.jpg', 800);
  createPopup('assets/popup-2.jpg', 2200);
  createPopup('assets/popup-3.jpg', 4200);
  createPopup('assets/popup-4.jpg', 6500);
};
