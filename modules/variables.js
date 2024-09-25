const modalTitle = document.querySelector('.modal__title');
const modalId = document.querySelector('.modal__id');
const modalButton = document.querySelector('.modal__btn');
export const modalForm = document.querySelector('.modal__form');
export const discountCheckbox = document.querySelector('.form__checkbox');
export const discountInput = document.querySelector('#discount');
export const totalPrice = document.querySelector('.amount__number');
export const modalOpen = document.querySelector('.cms__header-modal');
export const modal = document.querySelector('.modal');
export const modalError = document.querySelector('.modal__error-wrapper');
export const tbody = document.querySelector('.table__body');
const formInput = modalForm.querySelector('.form__input');
export const priceInput = modalForm.querySelector('#price');
export const totalQuantityModal = modalForm.querySelector('#quantity');
export const totalPriceModal = modalForm.querySelector('.amount__number');
export const modalIdValue = document.querySelector('.modal__id-value');
export const errorMessageElement = document.querySelector('.modal__error-message');
let discountPrice;


export default {
  modalTitle,
  modalId,
  modalButton,
  modalForm,
  discountCheckbox,
  discountInput,
  totalPrice,
  modalOpen,
  modal,
  tbody,
  formInput,
  priceInput,
  totalQuantityModal,
  totalPriceModal,
  modalIdValue,
};

export const promo = {
  discountPrice,
};
