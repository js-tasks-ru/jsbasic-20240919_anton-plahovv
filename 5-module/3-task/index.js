function initCarousel() {
  // 0. создаем переменную, в которой храним текущий слайд
  let numSlides = 0;
  hideArrow(numSlides);
  // 1. Запускаем один обработчик для <div class="carousel">
  let carousel = document.querySelector('.carousel');
  carousel.addEventListener('click', function(event) {
    // 2. Проверка на стрелку
    if (event.target.classList.contains('carousel__arrow_left')) {
      numSlides -= 1;
      clickArrow(numSlides);
    }
    else if (event.target.classList.contains('carousel__arrow_right')) {
      numSlides += 1;
      clickArrow(numSlides);
    }
    else {return;}
  });
}

function clickArrow(numSlides) {
  let carouselInner = document.querySelector('.carousel__inner');
  let offsetW = carouselInner.offsetWidth;

  carouselInner.style.transform = `translateX(-${offsetW * numSlides}px)`;
  hideArrow(numSlides);
}
function hideArrow(numSlides) {
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let slides = document.querySelectorAll('.carousel__slide');

  arrowLeft.style.display = (numSlides <= 0) ? 'none' : '';
  arrowRight.style.display = (numSlides >= (slides.length - 1)) ? 'none' : '';
}

/*
function initCarousel() {
  // План
  // 0. создаем переменную, в которой храним текущий слайд
  let carousel = document.querySelector('.carousel');
  let numSlides = 0;
  if (carousel.dataset.numSlides === undefined) {
    carousel.dataset.numSlides = 0;
    carousel.querySelector('.carousel__arrow_left').style.display = 'none';
  }

  // 3. Запускаем один обработчик для <div class="carousel">
  carousel.addEventListener('click', function(event) {
    // Проверка на стрелку
    if (event.target.classList.contains('carousel__arrow_left')) {
      carousel.dataset.numSlides = Number(carousel.dataset.numSlides) - 1;
      clickArrow(carousel.dataset.numSlides);
    }
    else if (event.target.classList.contains('carousel__arrow_right')) {
      carousel.dataset.numSlides = Number(carousel.dataset.numSlides) + 1;
      clickArrow(carousel.dataset.numSlides);
    }
    else {return;}
  });
}

function clickArrow(numSlides) {
  let carouselInner = document.querySelector('.carousel__inner');
  let offsetW = carouselInner.offsetWidth;
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let slides = carouselInner.querySelectorAll('.carousel__slide');
  // 
  carouselInner.style.transform = `translateX(-${offsetW * numSlides}px)`;
  //show / hide arrows
  arrowLeft.style.display = (Number(numSlides) <= 0) ? 'none' : '';
  arrowRight.style.display = (Number(numSlides) >= (slides.length - 1)) ? 'none' : '';
}
  */