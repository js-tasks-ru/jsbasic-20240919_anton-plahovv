import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();

  }

  leftCart = null

  defultStyle = {
    position: 'absolute',
    top: '',
    zIndex: '',
    right: '',
    left: ''
  }
  scrollStyle = {
    position: 'fixed',
    top: '50px',
    zIndex: 1e3,
    right: '10px',
    left: ''
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    let container = document.querySelector('.container');
    let docWidth = document.documentElement.clientWidth; // ширина окна пользователя
    let offsetLeft = this.elem.offsetLeft; // положение корзины слева
    let offsetWidth = this.elem.offsetWidth; // ширина корзины

    //1. проверка на скрытие корзины
    if (!this.isVisibleCart()) {
      Object.assign(this.elem.style, this.defultStyle);
      return;
    }
    //2. если окно <767px то перемещать не нужно
    if (!this.isDesktopStyleCart()) {
      Object.assign(this.elem.style, this.defultStyle);
      return;
    }
    //3.не перемещать пока полоса прокрутки не дошла до корзины
    if (!this.isNeedToScrollCart()) {
      Object.assign(this.elem.style, this.defultStyle);
      return;
    }
    //4. 20 px справа от container
    this.leftCart = container.getBoundingClientRect().right + 20;

    //5. минимум 10 px от правого края окна
    if (this.leftCart >= docWidth - offsetWidth - 10) {
      this.leftCart = docWidth - offsetWidth - 10;
    }
    this.scrollStyle.left = this.leftCart + 'px';

    Object.assign(this.elem.style, this.scrollStyle);
  }

  isVisibleCart() {
    let visible = false;
    if (this.elem.offsetWidth != 0 && this.elem.offsetHeight != 0) {// корзина отображается
      visible = true;
    }
    return visible;
  }

  isDesktopStyleCart() {
    let desktopStyle = false;
    let docWidth = document.documentElement.clientWidth;
    if (docWidth > 767) {
      desktopStyle = true;
    }
    return desktopStyle;
  }

  isNeedToScrollCart() {
    let needToScroll = false;
    let docScrollTop = document.documentElement.scrollTop; // текущая прокрутка окна
    let offsetTop = this.elem.offsetTop;

    if (docScrollTop >= offsetTop) { //если прокрутили до корзины
      needToScroll = true;
    }
    return needToScroll;
  }
}
