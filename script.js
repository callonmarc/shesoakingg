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
const popupAds = [
  { src: 'assets/popup-1.JPG', delay: 250, position: 'top-[8%] left-[6%]' },
  { src: 'assets/popup-2.JPG', delay: 900, position: 'top-[15%] right-[7%]' },
  { src: 'assets/popup-3.JPG', delay: 1500, position: 'bottom-[10%] left-[10%]' },
  { src: 'assets/popup-4.JPG', delay: 2200, position: 'bottom-[8%] right-[8%]' },
];

function createPopup(src, delay, position, index) {
  setTimeout(() => {
    const popupContainer = document.getElementById('popup-container');
    if (!popupContainer) return;

    const popup = document.createElement('div');
    popup.className = `popup fixed ${position} bg-black border-4 border-red-500 z-50 shadow-2xl w-[min(82vw,360px)] max-h-[82vh] overflow-hidden`;
    popup.style.zIndex = 1000 + index;
    popup.innerHTML = `
      <div class="bg-yellow-300 text-red-700 text-center text-sm font-black tracking-widest px-8 py-1 border-b-4 border-red-500 flash">
        LIMITED DENIM DROP • CLICK TO SHOP
      </div>
      <div class="relative">
        <img src="${src}" class="w-full block" alt="Limited denim popup ad ${index + 1}">
        <button type="button" aria-label="Close popup ad"
                class="absolute top-2 right-2 bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-2xl font-black hover:bg-red-700 border-2 border-yellow-300">
          ×
        </button>
      </div>
    `;
    popup.querySelector('button').addEventListener('click', () => popup.remove());
    popupContainer.appendChild(popup);
  }, delay);
}

function launchEntryPopups() {
  popupAds.forEach((ad, index) => createPopup(ad.src, ad.delay, ad.position, index));
}

// Trigger popups as soon as the page is ready, without waiting on every image/ad asset.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchEntryPopups);
} else {
  launchEntryPopups();
}
