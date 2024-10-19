import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.newCard = product;
  }

  set newCard(product) {
    let price = product.price.toFixed(2);
    const card = createElement(`
      <div class="card">
          <div class="card__top">
            <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
            <span class="card__price">€${price}</span>
          </div>
          <div class="card__body">
            <div class="card__title">${product.name}</div>
            <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
      </div>
    `);
    //Обработка кнопки product-add
    let btn = card.querySelector(".card__button");
    btn.addEventListener('click', () => {
      let ce = new CustomEvent("product-add", { 
        detail: product.id,
        bubbles: true
      });
      btn.dispatchEvent(ce);
    });
    // Если хотим отследить нажатие кнопки 'product-add'
    //card.addEventListener('product-add', this.onClick);

    this._elem = card;
  }

  get elem() {
    return this._elem;
  }

  onClick(event) {
    console.log(event.detail);
  }

}