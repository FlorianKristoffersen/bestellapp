/* Tabs */
function tabBtnTpl(cat, isActive){
  return `<li role="presentation">
    <button role="tab" aria-selected="${isActive}" aria-controls="cat-${cat.id}" data-cat="${cat.id}">
      ${cat.title}
    </button>
  </li>`;
}

/* Kategorie-Block */
function categoryBlockTpl(cat){
  return `<section id="cat-${cat.id}" class="category-block" aria-labelledby="h-${cat.id}">
    <div class="category-head" id="h-${cat.id}">${cat.title}</div>
    <div>${cat.dishes.map(dishTpl).join("")}</div>
  </section>`;
}

/* Gericht */
function dishTpl(d){
  return `<article class="dish" data-id="${d.id}">
    <div class="dish-info">
      <div class="dish-name">${d.name}</div>
      <div class="dish-desc">${d.desc}</div>
      <div class="dish-price">${price(d.price)}</div>
    </div>
    <div class="dish-actions">
      <button class="plus-btn" aria-label="${d.name} in den Warenkorb" data-add="${d.id}">+</button>
    </div>
  </article>`;
}

/* Warenkorb-Item */
function basketItemTpl(item){
  return `<div class="basket-item" data-id="${item.id}">
    <div>${item.name}</div>
    <div class="qty-ctrl" aria-label="Menge ändern">
      <button class="qty-btn" data-dec="${item.id}" aria-label="Menge verringern">–</button>
      <span aria-live="polite">${item.qty}</span>
      <button class="qty-btn" data-inc="${item.id}" aria-label="Menge erhöhen">+</button>
    </div>
    <div><strong>${price(item.qty * item.price)}</strong></div>
  </div>`;
}

/* Helpers */
function price(n){ return n.toFixed(2).replace(".", ",") + " €"; }