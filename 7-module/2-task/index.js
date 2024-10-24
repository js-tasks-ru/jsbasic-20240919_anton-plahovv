import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.eventListeners();
  }

  render() { // пустое body
    let elModal = createElement(`
        <!--Корневой элемент Modal-->
        <div class="modal">
          <!--Прозрачная подложка перекрывающая интерфейс-->
          <div class="modal__overlay"></div>
      
          <div class="modal__inner">
            <div class="modal__header">
              <!--Кнопка закрытия модального окна-->
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
      
              <h3 class="modal__title">
              </h3>
            </div>
            <div class="modal__body">
            </div>
          </div>
        </div>
    `);

    this.modal = elModal;
  }

  open() {
    let body = document.querySelector('body');
    body.classList.add('is-modal-open');
    body.appendChild(this.modal);
  }

  setTitle(modalTitle) {
    let elModalTitle = this.modal.querySelector('.modal__title');
    elModalTitle.textContent = modalTitle;
  }

  setBody(modalBody) {
    let elModalBody = this.modal.querySelector('.modal__body');
    elModalBody.appendChild(modalBody);
  }

  close() {
    let body = document.querySelector('body');
    let modal = body.querySelector('.modal');
    body.classList.remove('is-modal-open');
    //body.removeChild(modal);
    //modal.remove();
    this.modal.remove(modal);// только так работает 
    //modal.innerHTML = '';
    document.removeEventListener('keydown', this.keyAction);
  }

  eventListeners() {
    this.clickAction = this.clickAction.bind(this);
    this.modal.addEventListener('click', this.clickAction);
    
    this.keyAction = this.keyAction.bind(this);
    document.addEventListener('keydown', this.keyAction);
  }

  // 1. клик по кнопке [X]
  clickAction(event) {
    let elA = event.target.closest('.modal__close');
    if (elA) {
      this.close();
    }
  }

  // 2. клик по кнопке Esc
  keyAction(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
