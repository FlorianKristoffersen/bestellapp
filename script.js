// --- State ---
const basket = new Map(); // id -> {id,name,price,qty}

document.addEventListener("DOMContentLoaded", init);

function restoreBasket() {
  const saved = localStorage.getItem("basket");
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    basket.clear();
    for (const [id, item] of data) {
      basket.set(id, item);
    }
    renderBasket();
  } catch (err) {
    console.error("Fehler beim Laden des gespeicherten Warenkorbs:", err);
  }
}

function init() {
  renderTabs(RESTAURANT.categories);
  renderMenu(RESTAURANT.categories);
  wireEvents();
  restoreBasket();
  updateTotals();
}

function renderTabs(cats) {
  const ul = document.getElementById("categoryTabs");
  ul.innerHTML = cats.map((c, i) => tabBtnTpl(c, i === 0)).join("");
}

function renderMenu(cats) {
  const menu = document.getElementById("menu");
  menu.innerHTML = cats.map(categoryBlockTpl).join("");
}

function wireEvents() {
  document.getElementById("categoryTabs").addEventListener("click", onTabClick);
  document.getElementById("menu").addEventListener("click", onMenuClick);
  document.getElementById("basket").addEventListener("click", onBasketClick);
  
  const basketMobile = document.getElementById("basketItemsMobile");
  if (basketMobile) {
    basketMobile.addEventListener("click", onBasketClick);
  }
  document.getElementById("basketToggle").addEventListener("click", openDialog);
  document.getElementById("closeDialog").addEventListener("click", closeDialog);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
  document.getElementById("checkoutBtnM").addEventListener("click", checkout);
}

function onTabClick(e) {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  document.querySelectorAll('.category-tabs [role="tab"]').forEach(b =>
    b.setAttribute("aria-selected", "false")
  );
  btn.setAttribute("aria-selected", "true");
  document
    .getElementById(`cat-${btn.dataset.cat}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function onMenuClick(e) {
  const add = e.target.closest("[data-add]");
  if (!add) return;
  const dish = findDish(add.dataset.add);
  addToBasket(dish);
}

function onBasketClick(e) {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const del = e.target.closest("[data-del]");

  if (inc) changeQty(inc.dataset.inc, +1);
  if (dec) changeQty(dec.dataset.dec, -1);
  if (del) removeItem(del.dataset.del);
}

function findDish(id) {
  for (const c of RESTAURANT.categories) {
    const d = c.dishes.find(x => x.id === id);
    if (d) return d;
  }
}

function addToBasket(d) {
  const cur = basket.get(d.id) || { ...d, qty: 0 };
  cur.qty++;
  basket.set(d.id, cur);
  renderBasket();
   saveBasket();
}

function changeQty(id, delta) {
  const it = basket.get(id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) basket.delete(id);
  else basket.set(id, it);
  renderBasket();
  saveBasket();
}

function removeItem(id) {
  basket.delete(id);
  renderBasket();
  saveBasket();
}

function renderBasket() {

  const items = Array.from(basket.values()).map(basketItemTpl).join("");
  document.getElementById("basketItems").innerHTML =
    items || '<p class="muted">Dein Warenkorb ist leer.</p>';

  const mobileBasket = document.getElementById("basketItemsMobile");
  if (mobileBasket)
    mobileBasket.innerHTML =
      items || '<p class="muted">Dein Warenkorb ist leer.</p>';


  updateTotals();
}

function updateTotals() {
  const { subtotal, delivery, total } = calculateTotals();
  updateDesktopTotals(subtotal, delivery, total);
  updateMobileTotals(subtotal, delivery, total);
}

function calculateTotals() {
  const subtotal = Array.from(basket.values()).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const delivery = RESTAURANT.deliveryFee || 3.5;
  const total = subtotal + delivery;
  return { subtotal, delivery, total };
}

function updateDesktopTotals(subtotal, delivery, total) {
  const subTotalEl = document.getElementById("subTotal");
  const deliveryEl = document.getElementById("delivery");
  const grandTotalEl = document.getElementById("grandTotal");
  const miniTotalEl = document.getElementById("miniTotal");

  if (subTotalEl) subTotalEl.textContent = price(subtotal);
  if (deliveryEl) deliveryEl.textContent = price(delivery);
  if (grandTotalEl) grandTotalEl.textContent = price(total);
  if (miniTotalEl) miniTotalEl.textContent = price(total);
}

function updateMobileTotals(subtotal, delivery, total) {
  const subTotalM = document.getElementById("subTotalM");
  const deliveryM = document.getElementById("deliveryM");
  const grandTotalM = document.getElementById("grandTotalM");

  if (subTotalM) subTotalM.textContent = price(subtotal);
  if (deliveryM) deliveryM.textContent = price(delivery);
  if (grandTotalM) grandTotalM.textContent = price(total);
}

function checkout() {
  basket.clear();
  renderBasket();
  const msg = document.getElementById("orderMsg");
  msg.textContent = "Danke! Deine Testbestellung wurde aufgenommen.";
  setTimeout(() => (msg.textContent = ""), 4000);
  closeDialog();
  
}

function openDialog() {
  const dlg = document.getElementById("basketDialog");
  dlg.hidden = false;
  document
    .getElementById("basketToggle")
    .setAttribute("aria-expanded", "true");
  document.getElementById("closeDialog").focus();
}

function closeDialog() {
  const dlg = document.getElementById("basketDialog");
  dlg.hidden = true;
  document
    .getElementById("basketToggle")
    .setAttribute("aria-expanded", "false");
}
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
    navMenu.setAttribute("aria-hidden", String(expanded));
  });
}

function price(n){
  return n.toFixed(2).replace(".", ",") + "\u00A0€"; 
}
function closeDialog() {
  const dlg = document.getElementById("basketDialog");
  dlg.classList.add("closing");

  setTimeout(() => {
    dlg.hidden = true;
    dlg.classList.remove("closing");
    document.getElementById("basketToggle").setAttribute("aria-expanded", "false");
  }, 280); 
}

document.getElementById("basketDialog").addEventListener("click", function (event) {

  if (event.target === this) {
    closeDialog();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeDialog();
  }
});
function saveBasket() {
  const data = JSON.stringify([...basket.entries()]);
  localStorage.setItem("basket", data);
}