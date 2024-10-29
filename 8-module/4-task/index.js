import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = null;
    //1. Проверка на пустоту product
    if (product === null || product === undefined) { return; }

    //2. Проверка есть ли товар в корзине cartItems
    let cartIndex = this.cartItems.findIndex(item =>
      item.product.id === product.id
    );

    if (cartIndex != -1) {
      this.cartItems[cartIndex].count++;
      cartItem = this.cartItems[cartIndex];
    }
    else {
      this.cartItems.push({ 'product': product, 'count': 1 });
      cartItem = ({ 'product': product, 'count': 1 });
    }
    //3. 
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = null;
    //1.Обновить количество единиц товара в массиве cartItems.
    let cartIndex = this.cartItems.findIndex(item =>
      item.product.id === productId
    );
    this.cartItems[cartIndex].count += amount;
    cartItem = this.cartItems[cartIndex];
    //2.Если количество стало 0, то этот товар нужно удалить из корзины.
    if (this.cartItems[cartIndex].count === 0) {
      this.cartItems.splice(cartIndex, 1);
    }
    //3. 
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let result = this.cartItems.length === 0;
    return result;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let summ = this.cartItems.reduce((sum, current) => sum + current.count, 0);
    return summ;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let summ = this.cartItems.reduce((sum, current) => sum + current.product.price * current.count, 0);
    return summ;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderSuccessOrderForm() {
    return createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    let bodyModal = createElement('<div></div>');

    this.cartItems.forEach((item) => {
      bodyModal.appendChild(this.renderProduct(item.product, item.count));
    });

    bodyModal.appendChild(this.renderOrderForm());

    this.modal.setTitle('Your order');
    this.modal.setBody(bodyModal);
    this.modal.open();

    //Добавляем обработчик
    bodyModal.addEventListener('click', (event) => {
      let productId = null;
      if (event.target.closest('.cart-counter__button_plus')) {
        productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }
      else if (event.target.closest('.cart-counter__button_minus')) {
        productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      }
    });

    document.querySelector('.cart-form').addEventListener('submit', (event) => {
      
      this.onSubmit = this.onSubmit.bind(this);
      this.onSubmit(event);
    });
    /*
    bodyModal.addEventListener('submit', (event) => {
      event.preventDefault();
      if (event.target.closest('.cart-form')) {
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit(event);

      }
    });*/
  }

  onProductUpdate(cartItem) {
    // ...ваш код

    this.cartIcon.update(this);
    // Если корзина закрыта - не обрабатываем
    let body = document.querySelector('body');
    if (!body.classList.contains('is-modal-open')) { return; }


    let cartItems = body.querySelector(`.cart-product[data-product-id="${cartItem.product.id}"]`);
    let productCount = cartItems.querySelector('.cart-counter__count');
    let productPrice = cartItems.querySelector('.cart-product__price');
    let infoPrice = document.querySelector(`.cart-buttons__info-price`);
    // Закрываем пустую корзину
    if (this.cartItems.length == 0) {
      this.modal.close();
      return;
    }
    //1.Удаляем товар при count === 0
    else if (cartItem.count === 0) {
      cartItems.remove(cartItems);
    }
    else {
      //2.изменям число товара на актуальное 
      productCount.textContent = cartItem.count;
      productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    }

    infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();
    let buttonSubmit = event.target.querySelector('.cart-buttons__button');
    buttonSubmit.classList.add('is-loading');

    let formData = new FormData(document.querySelector('.cart-form'));

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setTitle('Success!');
        this.modal.setBody(this.renderSuccessOrderForm());
        console.log('Ответ от сервера:', data);
      }).catch(error => {
        console.error('Ошибка:', error.message);
      });
    /*// для прохождения тестов 
    this.cartItems = [];
    this.cartIcon.update(this);
    this.modal.setTitle('Success!');
    this.modal.setBody(this.renderSuccessOrderForm());*/
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

