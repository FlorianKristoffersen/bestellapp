/* Tabs */
function tabBtnTpl(cat, isActive) {
  return `
    <li role="presentation">
      <button
        role="tab"
        aria-selected="${isActive}"
        aria-controls="cat-${cat.id}"
        data-cat="${cat.id}">
        ${cat.title}
      </button>
    </li>
  `;
}

/* Category Block */
function categoryBlockTpl(cat) {
  const dishes = cat.dishes.map(dishTpl).join("");
  return `
    <section id="cat-${cat.id}" class="category-block" aria-labelledby="h-${cat.id}">
      <div class="category-head" id="h-${cat.id}">${cat.title}</div>
      <div>${dishes}</div>
    </section>
  `;
}

/* Dish */
function dishTpl(dish) {
  return `
    <article class="dish" data-add="${dish.id}" tabindex="0"
      role="button" aria-label="${dish.name} in den Warenkorb">
      <div class="dish-info">
        <div class="dish-name">${dish.name}</div>
        <div class="dish-desc">${dish.desc}</div>
        <div class="dish-price">${formatPrice(dish.price)}</div>
      </div>
      <div class="dish-actions">
        <button class="plus-btn"
          aria-label="${dish.name} in den Warenkorb hinzufügen"
          data-add="${dish.id}">+</button>
      </div>
    </article>
  `;
}

/* Basket Item */
function basketItemTpl(item) {
  const total = item.qty * item.price;
  return `
    <div class="basket-item" data-id="${item.id}">
      <div class="basket-item-info">${item.name}</div>
      <div class="qty-ctrl" aria-label="Menge ändern">
        <button class="qty-btn" data-dec="${item.id}" aria-label="Menge verringern">–</button>
        <span aria-live="polite">${item.qty}</span>
        <button class="qty-btn" data-inc="${item.id}" aria-label="Menge erhöhen">+</button>
      </div>
      <div class="basket-item-total"><strong>${formatPrice(total)}</strong></div>
      <button class="trash-btn" data-del="${item.id}" aria-label="${item.name} aus Warenkorb entfernen">🗑️</button>
    </div>
  `;
}

/* Helper */
function formatPrice(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}
