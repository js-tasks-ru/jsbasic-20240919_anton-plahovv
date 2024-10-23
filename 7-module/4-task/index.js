import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = this.checkValue(value, 0, this.steps - 1);
    this.render();
    this.sub('_thumb').ondragstart = () => false;
    this.eventListeners();
  }

  //проверка на диапазон [0..steps-1]
  checkValue(value, min, max) {
    let valueTrunc = Math.round(value);
    return Math.max(Math.min(valueTrunc, max), min);
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
          <div class="slider__progress" style="width: 0%;"></div>

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

    this.elem = elSlider;
    this.update();
  }

  sub(className) {
    return this.elem.querySelector(`.slider_${className}`);
  }

  eventListeners() {
    this.clickAction = this.clickAction.bind(this);
    this.elem.addEventListener('click', this.clickAction);
    //pointerdown
    this.pointerdownAction = this.pointerdownAction.bind(this);
    this.elem.addEventListener('pointerdown', this.pointerdownAction);
    //document.addEventListener('slider-change', (event) => {console.log(event, 'value', event.detail);});
  }

  pointerdownAction(event) {
    let thumb = this.elem.querySelector('.slider__thumb');

    if (event.target.closest('.slider__thumb')) {
      thumb.style.position = 'absolute';
      //thumb.style.zIndex = 9999;
      this.elem.classList.add('slider_dragging');
      //pointermove
      this.pointermoveAction = this.pointermoveAction.bind(this);
      document.addEventListener('pointermove', this.pointermoveAction);
      //pointerup
      this.pointerupAction = this.pointerupAction.bind(this);
      document.addEventListener('pointerup', this.pointerupAction);
    }
  }

  pointermoveAction(event) {
    //1. получаем значение по координатам
    this.calcPos(event);
    //2. обновляем слайдер с заполнением промежуточных значений
    this.update(true);
  }

  pointerupAction(event) {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.pointermoveAction);
    document.removeEventListener('pointerup', this.pointerupAction);

    event.preventDefault();
    let ce = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(ce);
  }

  clickAction(event) {
    if (event.target.closest('.slider')) {
      //1. получаем значение по координатам
      this.calcPos(event);
      //2. обновляем слайдер
      this.update();
      //3. формируем кастомное событие slider-change
      event.preventDefault();
      let ce = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(ce);
    }
  }

  calcPos(event) {
    //1. получаем координаты куда кликнули
    let slider = document.querySelector('.slider');
    let pageX = event.pageX;
    let sliderLeft = slider.getBoundingClientRect().left;
    let sliderWidth = slider.scrollWidth;

    //2. масштабируем координаты в соотвествии с колвом steps
    this.posMouse = pageX - sliderLeft + 1;
    let outMax = this.steps - 1;
    this.value = this.scale(this.posMouse, 0, sliderWidth, 0, outMax);

    this.valuePercent = this.scale(this.posMouse, 0, sliderWidth, 0, 100);
  }

  //масштабируем вход под нужный диапазон
  scale(inp = 0, inMin = 0, inMax = 1, outMin = 0, outMax = 1) {
    let rez = inp * (outMax - outMin) / (inMax - inMin);
    rez = this.checkValue(rez, outMin, outMax);
    return rez;
  }

  update(updPercent = false) {
    this.sub('_thumb').textContent = this.value;
    //Вычисляем процент заполнения в зависимости от value
    let valuePercent = this.scale(this.value, 0, this.steps - 1, 0, 100);
    //Для промежуточного значения слайдера
    if (updPercent) {
      valuePercent = this.valuePercent;
    }
    this.sub('_thumb').style.left = `${valuePercent}%`;
    this.sub('_progress').style.width = `${valuePercent}%`;

    let spanList = this.sub('_steps').querySelectorAll('span');
    spanList.forEach((num, index) => {
      num.className = (index == Math.round(this.value)) ? "slider__step-active" : "";
    });

  }
}
