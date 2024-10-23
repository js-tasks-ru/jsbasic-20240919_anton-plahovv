import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.checkValue(value);
    this.render();
    this.eventListeners();
  }

  scaleAttr = {
    in: 0,
    inMin: 0,
    inMax: 1,
    outMin: 0,
    outMax: 1,
  };

  //проверка на диапазон [0..steps-1]
  checkValue(value) {
    let valueTrunc = Math.trunc(value);
    this.value = Math.max(Math.min(valueTrunc, this.steps - 1), 0);
  }

  render() {
    let elSlider = createElement(`
        <!--Корневой элемент слайдера-->
        <div class="slider">

          <!--Ползунок слайдера с активным значением-->
          <div class="slider__thumb">
            <span class="slider__value">${this.value}</span>
          </div>

          <!--Заполненная часть слайдера-->
          <div class="slider__progress"></div>

          <!--Шаги слайдера-->
          <div class="slider__steps">
          </div>
        </div>
      `);

    for (let i = 0; i < this.steps; i++) {
      let elSpan = createElement(`
          <span></span>
        `);
      let sliderSteps = elSlider.querySelector('.slider__steps');
      sliderSteps.appendChild(elSpan);
    }
    //<span class="slider__step-active"></span>
    this.elem = elSlider;
    this.update();
  }

  sub(className) {
    return this.elem.querySelector(`.slider_${className}`);
  }

  eventListeners() {
    this.clickAction = this.clickAction.bind(this);
    this.elem.addEventListener('click', this.clickAction);
    // проверка всплытия slider-changet
    //document.addEventListener('slider-change', (event) => {console.log('value', event.detail);});
  }

  clickAction(event) {
    let slider = document.querySelector('.slider');
    //1. получаем координаты куда кликнули
    let pageX = event.pageX;
    let sliderLeft = slider.getBoundingClientRect().left;
    let sliderWidth = slider.scrollWidth;
    let scaleValue = this.scaleAttr;

    if (event.target.closest('.slider')) {
      //2. масштариуем координаты в соотвествии с колвом steps
      scaleValue.in = pageX - sliderLeft + 1;
      scaleValue.inMin = 0;
      scaleValue.inMax = sliderWidth;
      scaleValue.outMin = 0;
      scaleValue.outMax = this.steps - 1;
      this.value = this.scale(scaleValue);
      //3. обновляем слайдер
      this.update();
      //4. формируем кастомное событие slider-change
      event.preventDefault();
      let ce = new CustomEvent("slider-change", { 
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(ce);
    }
  }
  //масштабируем вход под нужный диапазон
  scale(scaleAttr) {
    let rez = scaleAttr.in * (scaleAttr.outMax - scaleAttr.outMin) / (scaleAttr.inMax - scaleAttr.inMin);
    rez = Math.round(rez);
    return rez;
  }

  update() {
    this.sub('_thumb').textContent = this.value;
    //Вычисляем процент заполнения в зависимости от value
    let valuePercent = null;
    let scalePercent = this.scaleAttr;
    scalePercent.in = this.value;
    scalePercent.inMin = 0;
    scalePercent.inMax = this.steps - 1;
    scalePercent.outMin = 0;
    scalePercent.outMax = 100;
    valuePercent = this.scale(scalePercent);

    this.sub('_thumb').style.left = `${valuePercent}%`;
    this.sub('_progress').style.width = `${valuePercent}%`;

    let spanList = this.sub('_steps').querySelectorAll('span');
    spanList.forEach((num, index) => {
      num.className = (index == this.value) ? "slider__step-active" : "";
    });

  }
}
