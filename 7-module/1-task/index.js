import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.renderCategories = categories;
    // обрабатываем стрелки
    this.eventAction();
  }

  set renderCategories(categories) {
    const elRibbon = createElement(`
      <!--Корневой элемент RibbonMenu-->
      <div class="ribbon">
        <!--Кнопка прокрутки влево-->
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <!--Ссылки на категории-->
        <nav class="ribbon__inner">
        </nav>

        <!--Кнопка прокрутки вправо-->
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    for (let category of categories) {
      let elCategory = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);

      elRibbon.querySelector('.ribbon__inner').appendChild(elCategory);
    }

    this._elem = elRibbon;
  }

  get elem() {
    return this._elem;
  }

  eventAction() {
    this._elem.addEventListener('click', (event) => {
      // 1. кастомное событие "ribbon-select"
      let elA = event.target.closest('.ribbon__item');
      if (elA) {
        event.preventDefault();
        let ce = new CustomEvent("ribbon-select", { 
          detail: elA.dataset.id,
          bubbles: true
        });
        this._elem.dispatchEvent(ce);
      }

      // 2. Перемещение меню
      if (event.target.closest('.ribbon__arrow_left')) {
        this.scrollArrow(-350);
      }
      else if (event.target.closest('.ribbon__arrow_right')) {
        this.scrollArrow(350);
      }
    });
    
    // 3.скрываем стрелки после перемещения меню
    let ribbonInner = this._elem.querySelector('.ribbon__inner');
    ribbonInner.addEventListener('scroll', this.hideArrow);
  }
  //(------ end ---------)
  scrollArrow(xScroll) {
    let ribbonInner = this._elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(xScroll, 0);
  }

  hideArrow() {
    let ribbonInner = document.querySelector('.ribbon__inner');
    let arrowLeft = document.querySelector('.ribbon__arrow_left');
    let arrowRight = document.querySelector('.ribbon__arrow_right');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft < 1) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    }
    else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    }
    else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }

  }

}
