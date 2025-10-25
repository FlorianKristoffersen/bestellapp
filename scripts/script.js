// --- State ---
const basket = new Map(); // id -> {id,name,price,qty}

document.addEventListener("DOMContentLoaded", init);

function init(){
  renderTabs(RESTAURANT.categories);
  renderMenu(RESTAURANT.categories);
  wireEvents();
  updateTotals();
}

function renderTabs(cats){
  const ul = document.getElementById("categoryTabs");
  ul.innerHTML = cats.map((c,i)=>tabBtnTpl(c, i===0)).join("");
}

function renderMenu(cats){
  const menu = document.getElementById("menu");
  menu.innerHTML = cats.map(categoryBlockTpl).join("");
}

function wireEvents(){
  document.getElementById("categoryTabs").addEventListener("click", onTabClick);
  document.getElementById("menu").addEventListener("click", onMenuClick);
  document.getElementById("basket").addEventListener("click", onBasketClick);

  // mobile dialog
  document.getElementById("basketToggle").addEventListener("click", openDialog);
  document.getElementById("closeDialog").addEventListener("click", closeDialog);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
  document.getElementById("checkoutBtnM").addEventListener("click", checkout);
}

function onTabClick(e){
  const btn = e.target.closest("button[data-cat]"); if(!btn) return;
  document.querySelectorAll('.category-tabs [role="tab"]').forEach(b=>b.setAttribute("aria-selected","false"));
  btn.setAttribute("aria-selected","true");
  document.getElementById(`cat-${btn.dataset.cat}`)?.scrollIntoView({behavior:"smooth", block:"start"});
}

function onMenuClick(e){
  const add = e.target.closest("[data-add]"); if(!add) return;
  const dish = findDish(add.dataset.add);
  addToBasket(dish);
}

function onBasketClick(e){
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if(inc) changeQty(inc.dataset.inc, +1);
  if(dec) changeQty(dec.dataset.dec, -1);
}

function findDish(id){
  for(const c of RESTAURANT.categories){
    const d = c.dishes.find(x=>x.id===id);
    if(d) return d;
  }
}

function addToBasket(d){
  const cur = basket.get(d.id) || {...d, qty:0};
  cur.qty++; basket.set(d.id, cur);
  renderBasket();
}

function changeQty(id, delta){
  const it = basket.get(id); if(!it) return;
  it.qty += delta; if(it.qty<=0) basket.delete(id); else basket.set(id,it);
  renderBasket();
}

function renderBasket(){
  // desktop
  const items = Array.from(basket.values()).map(basketItemTpl).join("");
  document.getElementById("basketItems").innerHTML = items || '<p class="muted">Dein Warenkorb ist leer.</p>';
  // mobile
  document.getElementById("basketItemsMobile").innerHTML = items || '<p class="muted">Dein Warenkorb ist leer.</p>';
  updateTotals();
}

function updateTotals(){
  const sum = Array.from(basket.values()).reduce((a,b)=>a+b.price*b.qty,0);
  const delivery = RESTAURANT.deliveryFee;
  const total = sum + delivery;

  // desktop
  document.getElementById("subTotal").textContent = price(sum);
  document.getElementById("delivery").textContent = price(delivery);
  document.getElementById("grandTotal").textContent = price(total);
  // mobile quick
  document.getElementById("miniTotal").textContent = price(total);
  // mobile dialog
  document.getElementById("subTotalM").textContent = price(sum);
  document.getElementById("deliveryM").textContent = price(delivery);
  document.getElementById("grandTotalM").textContent = price(total);
}

function checkout(){
  basket.clear();
  renderBasket();
  const msg = document.getElementById("orderMsg");
  msg.textContent = "Danke! Deine Testbestellung wurde aufgenommen.";
  setTimeout(()=> msg.textContent = "", 4000);
  closeDialog();
}

function openDialog(){
  const dlg = document.getElementById("basketDialog");
  dlg.hidden = false;
  document.getElementById("basketToggle").setAttribute("aria-expanded","true");
  document.getElementById("closeDialog").focus();
}

function closeDialog(){
  const dlg = document.getElementById("basketDialog");
  dlg.hidden = true;
  document.getElementById("basketToggle").setAttribute("aria-expanded","false");
}