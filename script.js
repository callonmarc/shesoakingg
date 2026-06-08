const colors = ['#1a4a7a', '#334455', '#8B4513', '#222222', '#555555', '#991111'];
const products = [
  { name: 'Backroom Bootcut', price: 88, category: 'jeans', image: 'assets/real-denim.jpg', tag: 'LOW RISE' },
  { name: 'Mannequin Muse Jeans', price: 96, category: 'jeans', image: 'assets/model-1.PNG', tag: 'CAM READY' },
  { name: 'Peep Show Patch Set', price: 24, category: 'accessories', image: 'assets/popup-1.JPG', tag: 'STICK ON' },
  { name: 'XXX Rhinestone Belt', price: 42, category: 'accessories', image: 'assets/popup-2.JPG', tag: 'SPARKLE' },
  { name: 'Red Light Crop Top', price: 55, category: 'tops', image: 'assets/popup-3.JPG', tag: 'FLASHING' },
  { name: 'Yellow Tape Tube Top', price: 49, category: 'tops', image: 'assets/popup-4.JPG', tag: 'VIP' },
  { name: 'Plastic Doll Denim Kit', price: 122, category: 'jeans', image: 'assets/mannequin-group.JPG', tag: 'BUNDLE' },
  { name: 'After Midnight Wash', price: 74, category: 'jeans', image: 'assets/real-denim.jpg', tag: 'DARK' },
];
const patchOptions = [
  { label: '💋 KISS', value: '💋' },
  { label: '💦 DRIP', value: '💦' },
  { label: '🔥 HEAT', value: '🔥' },
  { label: '⛓ CHAIN', value: '⛓️' },
  { label: '💎 BLING', value: '💎' },
  { label: 'XXX STAMP', value: 'XXX' },
];
const popupAds = [
  { src: 'assets/popup-1.JPG', delay: 250, copy: 'LIMITED DENIM DROP • CLICK TO SHOP' },
  { src: 'assets/popup-2.JPG', delay: 900, copy: 'VIP BACKROOM SALE • 69% HOTTER' },
  { src: 'assets/popup-3.JPG', delay: 1500, copy: 'MANNEQUIN LIVE NOW • TAP TO ENTER' },
  { src: 'assets/popup-4.JPG', delay: 2200, copy: 'PRIVATE FITTING ROOM • OPEN' },
];

const cart = [];
let activeFilter = 'all';
let popupCounter = 0;

const swatchesContainer = document.getElementById('color-swatches');
if (swatchesContainer) {
  colors.forEach((color, i) => {
    const btn = document.createElement('button');
    btn.className = `w-16 h-16 rounded-full border-4 border-white shadow-xl transition-all hover:scale-110 ${i === 0 ? 'ring-4 ring-yellow-400' : ''}`;
    btn.style.backgroundColor = color;
    btn.type = 'button';
    btn.setAttribute('aria-label', `Choose denim color ${i + 1}`);
    btn.addEventListener('click', () => {
      [...swatchesContainer.children].forEach(child => child.classList.remove('ring-4', 'ring-yellow-400'));
      btn.classList.add('ring-4', 'ring-yellow-400');
      changeColor(color);
    });
    swatchesContainer.appendChild(btn);
  });
}

function changeColor(color) {
  const img = document.getElementById('main-mannequin');
  if (!img) return;
  let hue = 210;
  if (color === '#8B4513') hue = 25;
  if (color === '#222222') hue = 0;
  if (color === '#555555') hue = 180;
  if (color === '#991111') hue = 350;
  img.style.filter = `hue-rotate(${hue}deg) saturate(1.5) contrast(1.1)`;
  showToast('Denim wash changed live on cam.');
}

function changeImage(src) {
  const img = document.getElementById('main-mannequin');
  if (!img) return;
  img.src = src;
  showToast('Camera angle switched.');
}

function stripDenim() {
  const img = document.getElementById('main-mannequin');
  if (img) {
    img.classList.add('scale-110', 'rotate-2');
    setTimeout(() => img.classList.remove('scale-110', 'rotate-2'), 650);
  }
  showToast("💦 She's stripping the denim for you right now...");
  createRandomPopup();
}

function addToCart(name = 'Custom XXX Denim', price = 69) {
  cart.push({ name, price });
  updateCart();
  showToast(`✅ ${name} added to your hot cart.`);
}

function updateCart() {
  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const cartItems = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cartCount) cartCount.textContent = count;
  if (cartTotal) cartTotal.textContent = total;
  if (checkoutBtn) checkoutBtn.disabled = count === 0;
  if (cartItems) {
    cartItems.innerHTML = count
      ? cart.map((item, index) => `
          <div class="flex items-center justify-between bg-black border-2 border-yellow-300 p-3">
            <span><span class="text-red-500 font-black">${index + 1}.</span> ${item.name}</span>
            <span class="text-yellow-300 font-black">$${item.price}</span>
          </div>
        `).join('')
      : 'Cart is empty. Tease it.';
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.toggle('active-page', section.id === pageId);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('text-yellow-300', link.dataset.page === pageId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const shown = products.filter(product => activeFilter === 'all' || product.category === activeFilter);
  grid.innerHTML = shown.map(product => `
    <article class="product-card" data-category="${product.category}">
      <img class="product-img" src="${product.image}" alt="${product.name}">
      <div class="mt-4 text-xs text-yellow-300 font-black tracking-widest">${product.tag}</div>
      <h3 class="text-2xl font-black text-pink-400 leading-tight">${product.name}</h3>
      <div class="flex items-center justify-between mt-4">
        <span class="text-3xl text-white font-black">$${product.price}</span>
        <button class="bg-red-600 hover:bg-red-700 border-2 border-yellow-300 px-4 py-2 font-black" data-add-product="${product.name}">ADD</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-add-product]').forEach(button => {
    button.addEventListener('click', () => {
      const product = products.find(item => item.name === button.dataset.addProduct);
      if (product) addToCart(product.name, product.price);
    });
  });
}

function renderPatchControls() {
  const controls = document.getElementById('patch-controls');
  if (!controls) return;
  controls.innerHTML = patchOptions.map(option => `
    <button class="patch-btn" data-patch="${option.value}" type="button">${option.label}</button>
  `).join('');
  controls.querySelectorAll('[data-patch]').forEach(button => {
    button.addEventListener('click', () => addPatch(button.dataset.patch));
  });
}

function addPatch(value) {
  const layer = document.getElementById('patch-layer');
  const log = document.getElementById('custom-log');
  if (!layer) return;
  const patch = document.createElement('div');
  patch.className = 'floating-patch';
  patch.textContent = value;
  patch.style.left = `${randomBetween(12, 76)}%`;
  patch.style.top = `${randomBetween(12, 72)}%`;
  patch.style.color = value === 'XXX' ? '#ef4444' : '#facc15';
  layer.appendChild(patch);
  if (log) log.innerHTML += `<br>&gt; PATCH APPLIED: ${value}`;
}

function randomizeLook() {
  const layer = document.getElementById('patch-layer');
  const preview = document.getElementById('custom-preview');
  if (layer) layer.innerHTML = '';
  if (preview) {
    preview.style.filter = `hue-rotate(${randomBetween(0, 360)}deg) saturate(${randomBetween(120, 190) / 100}) contrast(1.15)`;
    preview.style.transform = `rotate(${randomBetween(-4, 4)}deg) scale(${randomBetween(96, 108) / 100})`;
  }
  for (let i = 0; i < 3; i += 1) {
    addPatch(patchOptions[randomBetween(0, patchOptions.length - 1)].value);
  }
  showToast('Random fantasy generated.');
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPopupPosition() {
  const width = Math.min(window.innerWidth * 0.82, 360);
  const height = Math.min(window.innerHeight * 0.72, 460);
  return {
    left: randomBetween(8, Math.max(8, window.innerWidth - width - 8)),
    top: randomBetween(82, Math.max(82, window.innerHeight - height - 8)),
  };
}

function createPopup(ad, index) {
  const popupContainer = document.getElementById('popup-container');
  if (!popupContainer) return;

  const position = randomPopupPosition();
  const popup = document.createElement('div');
  const rotate = randomBetween(-5, 5);
  popup.className = 'popup fixed bg-black border-4 border-red-500 shadow-2xl w-[min(82vw,360px)] max-h-[82vh] overflow-hidden';
  popup.style.left = `${position.left}px`;
  popup.style.top = `${position.top}px`;
  popup.style.zIndex = 1000 + index;
  popup.style.setProperty('--popup-rotate', `${rotate}deg`);
  popup.style.transform = `rotate(${rotate}deg)`;
  popup.innerHTML = `
    <div class="popup-drag bg-yellow-300 text-red-700 text-center text-sm font-black tracking-widest px-8 py-1 border-b-4 border-red-500 flash">
      ${ad.copy}
    </div>
    <div class="relative">
      <img src="${ad.src}" class="popup-ad-image" alt="Limited denim popup ad ${index + 1}">
      <button type="button" aria-label="Close popup ad"
              class="absolute top-2 right-2 bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-2xl font-black hover:bg-red-700 border-2 border-yellow-300">
        ×
      </button>
      <button type="button" class="absolute bottom-2 left-2 bg-yellow-300 text-red-700 px-3 py-2 font-black border-2 border-red-600 hover:bg-white" data-page="shop">
        SHOP
      </button>
    </div>
  `;
  popup.querySelector('[aria-label="Close popup ad"]').addEventListener('click', () => popup.remove());
  popup.querySelector('[data-page="shop"]').addEventListener('click', () => showPage('shop'));
  makeDraggable(popup, popup.querySelector('.popup-drag'));
  popupContainer.appendChild(popup);
}

function createRandomPopup() {
  const ad = popupAds[randomBetween(0, popupAds.length - 1)];
  createPopup(ad, popupCounter);
  popupCounter += 1;
}

function makeDraggable(element, handle) {
  let startX = 0;
  let startY = 0;
  let originX = 0;
  let originY = 0;
  let dragging = false;

  handle.addEventListener('pointerdown', event => {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    originX = parseFloat(element.style.left) || 0;
    originY = parseFloat(element.style.top) || 0;
    handle.setPointerCapture(event.pointerId);
  });

  handle.addEventListener('pointermove', event => {
    if (!dragging) return;
    element.style.left = `${originX + event.clientX - startX}px`;
    element.style.top = `${originY + event.clientY - startY}px`;
  });

  handle.addEventListener('pointerup', event => {
    dragging = false;
    handle.releasePointerCapture(event.pointerId);
  });
}

function launchEntryPopups() {
  popupAds.forEach((ad, index) => {
    setTimeout(() => createPopup(ad, index), ad.delay);
  });
  setInterval(createRandomPopup, 11000);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function updateViewerCount() {
  const viewerCount = document.getElementById('viewer-count');
  if (!viewerCount) return;
  viewerCount.textContent = `${randomBetween(8888, 12999).toLocaleString()} WATCHING`;
}

function bindEvents() {
  document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', () => showPage(button.dataset.page));
  });
  document.querySelectorAll('[data-action="spawn-popup"]').forEach(button => {
    button.addEventListener('click', createRandomPopup);
  });
  document.querySelectorAll('[data-action="surprise"]').forEach(button => {
    button.addEventListener('click', () => {
      showPage('shop');
      createRandomPopup();
      showToast('VIP door opened. Shop the drop.');
    });
  });
  document.querySelectorAll('[data-action="randomize-look"]').forEach(button => {
    button.addEventListener('click', randomizeLook);
  });
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active-filter'));
      button.classList.add('active-filter');
      renderProducts();
    });
  });
  const heatMeter = document.getElementById('heat-meter');
  const heatLabel = document.getElementById('heat-label');
  if (heatMeter && heatLabel) {
    heatMeter.addEventListener('input', () => {
      heatLabel.textContent = `${heatMeter.value}% DRIPPING`;
      const img = document.getElementById('main-mannequin');
      if (img) img.style.transform = `scale(${1 + Number(heatMeter.value) / 800})`;
    });
  }
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => showToast('Checkout fantasy complete. Confirmation sent to the backroom.'));
  }
}

function init() {
  renderProducts();
  renderPatchControls();
  bindEvents();
  updateCart();
  updateViewerCount();
  setInterval(updateViewerCount, 2500);
  launchEntryPopups();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
