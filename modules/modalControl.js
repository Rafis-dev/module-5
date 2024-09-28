import {
  modalOpen, modal, totalPriceModal, modalIdValue,
  discountInput, modalForm, modalError,
  modalFormBtn,
} from './variables.js';

// Очищаем форму, поле со скидкой, закрываем форму
export const closeReset = () => {
  modalForm.reset();
  discountInput.setAttribute('disabled', '');
  modal.classList.remove('modal_display_flex');
  modal.classList.remove('modal-edit_display_flex');
};

// Открываем  модалку, устанавливаем общую стоимость на 0
const openModal = () => {
  modalOpen.addEventListener('click', () => {
    modal.classList.add('modal_display_flex');
    totalPriceModal.textContent = '0';
    modalIdValue.textContent = '';
    modalFormBtn.textContent = 'Добавить товар';
  });
};
// Закрываем  модалку, очищаем форму. При клике не на крестик, форму не очищаем
const closeModal = () => {
  modal.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal__btn')) {
      closeReset();
    };

    if (target === modal) {
      if (modal.classList.contains('modal-edit_display_flex')) {
        closeReset();
      }
    }

    if (target === modal) {
      discountInput.setAttribute('disabled', '');
      modal.classList.remove('modal_display_flex');
    }
  });
};

// Закрываем  окно с ошибкой
const closeErrorModal = () => {
  modalError.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.modal__error-btn')) {
      modalError.classList.remove('modal__error_display_flex');
    };
    if (target === modalError) {
      modalError.classList.remove('modal__error_display_flex');
    }
  });
};

export default {
  openModal,
  closeModal,
  closeReset,
  closeErrorModal,
};

