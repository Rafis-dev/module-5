const modalOpen = document.querySelector('.cms__header-modal');
import {sendModalData} from './modalForm.js';
import modalFormData from './modalForm.js';
import modalControl from './modalControl.js';
import {loadModalStyles} from './loadModalStyles.js';
const {closeModal, closeErrorModal} = modalControl;
const {modalTotalPrice, modalCheckbox, showPreview} = modalFormData;

// Генерим модальное окно
export const createModal = () => {
  const overlay = document.createElement('div');
  overlay.className = 'modal';
  overlay.innerHTML = `
    <div class="modal__body">

      <div class="modal__title-wrapper">
        <h2 class="modal__title">Добавить ТОВАР</h2>
        <p class="modal__id">id: <span class="modal__id-value"></span></p>
      </div>
      <button class="modal__btn" type="button">
        <span class="modal__btn-close modal__btn-close_line_first"></span>
        <span class="modal__btn-close modal__btn-close_line_second"></span>
      </button>

      <form class="modal__form form" 
      name="add-product" action="#" method="post">

        <fieldset class="form__fieldset form__grid">

          <div class="form__grid-name form__grid-item">
            <label class="form__label name-label" for="name">
            Наименование
            </label>
            <input class="form__input form-name" type="text" 
            name="title" id="name" required>
          </div>

          <div class="form__grid-category form__grid-item">
            <label class="form__label" for="category">Категория</label>
            <input class="form__input" type="text" 
            name="category" id="category" required>
          </div>

          <div class="form__grid-unit form__grid-item">
            <label class="form__label" for="unit">Единицы измерения</label>
            <input class="form__input" type="text" 
            name="units" id="unit" required>
          </div>

          <div class="form__grid-discount form__grid-item">
            <label class="form__label" for="discount">Дисконт</label>
            <div class="discount-box">
              <input class="form__checkbox" type="checkbox">
              <input disabled class="form__input" 
              type="number" min="0" max="100" 
              name="discount" id="discount">
            </div>
          </div>

          <div class="form__grid-descr form__grid-item">
            <label class="form__label" for="descr">Описание</label>
            <textarea class="form__input form__input_textarea_descr" 
            name="description" id="descr" required></textarea>
          </div>

          <div class="form__grid-quantity form__grid-item">
            <label class="form__label" for="quantity">Количество</label>
            <input class="form__input" type="number" min="0" 
            name="count" id="quantity" required>
          </div>

          <div class="form__grid-price form__grid-item">
            <label class="form__label" for="price">Цена</label>
            <input class="form__input" type="number" min="0" 
            name="price" id="price" required>
          </div>

          <div class="form__grid-file form__grid-item">
            <label class="form__label form__label_type_file" for="file">
            Добавить изображение
            </label>
            <input class="form__input visually-hidden" type="file" 
            name="image" id="file" accept="image/*">
          </div>
        </fieldset>

        <div class="form__footer">
          <p class="amount">Итоговая стоимость: 
          <span class="amount__number-dollar">$</span><span
              class="amount__number-modal">
              0</span></p>
          <button class="form__button" type="submit">Добавить товар</button>
        </div>
      </form>

    </div>
    <div class="modal__error-wrapper">
      <div class="modal__error-body">
        <button type="buttton" class="modal__error-btn">
          <span class="modal__error-btn-close 
          modal__error-btn-close_line_first"></span>
          <span class="modal__error-btn-close 
          modal__error-btn-close_line_second"></span>
        </button>
        <img class="modal__error-img" 
        src="assets/images/icons/err.svg" alt="красный крестик">
        <p class="modal__error-description">Что-то пошло не так</p>
        <p class="modal__error-message"></p>
      </div>
    </div>
    `;
  document.body.append(overlay);
};

// Вызываем модальное окно по клику на кнопку
export const showModal = (url, cb) => {
  modalOpen.addEventListener('click', async () => {
    await loadModalStyles('./css/modal.css');
    createModal();
    modalCheckbox();
    showPreview();
    modalTotalPrice();
    sendModalData(url, cb);
    closeErrorModal();
    closeModal();
  });
};
