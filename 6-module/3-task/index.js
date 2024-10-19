import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  numSlides = 0;

  constructor(slides) {
    this.numSlides = 0;
    // Создаем карусель
    this.renderSlides = slides;
    // обрабатываем стрелки
    this.eventArrow();
  }

  set renderSlides(slides) {
    const elCarousel = createElement(`
      <div class="carousel">
        <!--Кнопки переключения-->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </div>
      </div>
    `);
    
    for (let slide of slides) {
      let price = slide.price.toFixed(2);
      let elSlide = createElement(`       
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${price}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      //Обработка кнопки product-add
      let btn = elSlide.querySelector(".carousel__button");
      btn.addEventListener('click', () => {
        let ce = new CustomEvent("product-add", { 
          detail: slide.id,
          bubbles: true
        });
        btn.dispatchEvent(ce);
      });

      elCarousel.querySelector('.carousel__inner').appendChild(elSlide);
    }
    
    // Если хотим отследить нажатие кнопки 'product-add'
    //elCarousel.addEventListener('product-add', this.onClick);

    this._elem = elCarousel;
  }

  get elem() {
    return this._elem;
  }

  onClick(event) {
    console.log(event.detail);
  }

  eventArrow() {
    //(------код из модуля 5.3 ---------)
    this.hideArrow();
    // 1. Запускаем один обработчик для <div class="carousel">
    this._elem.addEventListener('click', (event) => {
      // 2. Проверка на стрелку
      if (event.target.closest('div').classList.contains('carousel__arrow_left')) {
        this.numSlides -= 1;
        this.clickArrow();
      }
      else if (event.target.closest('div').classList.contains('carousel__arrow_right')) {
        this.numSlides += 1;
        this.clickArrow();
      }
      else {return;}
    });
  }
  //(------ end ---------)
  clickArrow() {
    let carouselInner = this._elem.querySelector('.carousel__inner');
    let offsetW = carouselInner.offsetWidth;
  
    carouselInner.style.transform = `translateX(-${offsetW * this.numSlides}px)`;
    this.hideArrow();
  }

  hideArrow() {
    let arrowLeft = this._elem.querySelector('.carousel__arrow_left');
    let arrowRight = this._elem.querySelector('.carousel__arrow_right');
    let slides = this._elem.querySelectorAll('.carousel__slide');
    
    arrowLeft.style.display = (this.numSlides <= 0) ? 'none' : '';
    arrowRight.style.display = (this.numSlides >= (slides.length - 1)) ? 'none' : '';
  }
}
