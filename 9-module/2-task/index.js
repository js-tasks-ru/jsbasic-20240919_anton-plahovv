import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    
    this.carousel = new Carousel(slides);
    let carouselElem = document.querySelector('[data-carousel-holder]');

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonElem = document.querySelector('[data-ribbon-holder]');

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let sliderElem = document.querySelector('[data-slider-holder]');

    this.cartIcon = new CartIcon();
    let cartIconElem = document.querySelector('[data-cart-icon-holder]');

    this.cart = new Cart(this.cartIcon);

    this.products = null;

    await fetch('products.json')
      .then(response => {
        // действия
        return response.json();
      }).then(data => {
        this.products = data;
      });
    
    this.productGrid = new ProductGrid(this.products);
    let productGridElem = document.querySelector('[data-products-grid-holder]');
    ///delete products-grid__skeleton
    let productsSkeleton = productGridElem.querySelector('.is-loading');
    productsSkeleton.remove(productsSkeleton.firstChild);

    carouselElem.append(this.carousel.elem);
    ribbonElem.append(this.ribbonMenu.elem);
    sliderElem.append(this.stepSlider.elem);
    cartIconElem.append(this.cartIcon.elem);
    productGridElem.append(this.productGrid.elem);

    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: document.querySelector('.ribbon__item_active').dataset.id
    });

    this.addEventListeners();
  }

  addEventListeners() {
    let body = document.querySelector('body');

    body.addEventListener('product-add', (event) => {
      let productToAdd = this.products.find((product) => product.id === event.detail);
      this.cart.addProduct(productToAdd);
    });

    body.addEventListener('slider-change', (event) => {
      this.productGrid.updateFilter({
        maxSpiciness: +event.detail,
      });
    });

    body.addEventListener('ribbon-select', (event) => {
      this.productGrid.updateFilter({
        category: event.detail,
      });
    });

    document.addEventListener('change', (event) => {
      if (event.target.id === 'nuts-checkbox') {
        this.productGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
        });
      }
      else if (event.target.id === 'vegeterian-checkbox') {
        this.productGrid.updateFilter({
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        });
      }
    });
  }
}
