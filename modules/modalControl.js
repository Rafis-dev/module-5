// Очищаем форму, поле со скидкой, закрываем форму
export const closeReset = () => {
  const modalForm = document.querySelector('.modal__form');
  const modal = document.querySelector('.modal');
  const discountInput = document.querySelector('#discount');
  discountInput.setAttribute('disabled', '');
  modalForm.reset();
  modal.remove();
};

// Закрываем  модалку, очищаем форму
const closeModal = () => {
  document.addEventListener('click', e => {
    const modal = document.querySelector('.modal');
    const target = e.target;
    if (target.closest('.modal__btn')) {
      closeReset();
      return;
    };

    if (target === modal) {
      closeReset();
      return;
    }
  });
};

// Закрываем  окно с ошибкой
const closeErrorModal = () => {
  document.addEventListener('click', e => {
    const modalError = document.querySelector('.modal__error-wrapper');
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
  closeModal,
  closeReset,
  closeErrorModal,
};

