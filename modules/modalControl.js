// Очищаем форму, поле со скидкой, закрываем форму
export const closeReset = () => {
  const modalForm = document.querySelector('.modal__form');
  const modal = document.querySelector('.modal');
  const discountInput = document.querySelector('#discount');
  if (modal) {
    discountInput.setAttribute('disabled', '');
    modalForm.reset();
    modal.remove();
  }
};

// Закрываем  модалку, очищаем форму
const closeModal = () => {
  const handleClose = (e) => {
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
  };

  document.removeEventListener('click', handleClose);
  document.addEventListener('click', handleClose);
};

// Закрываем  окно с ошибкой
const closeErrorModal = () => {
  const handleCloseError = (e) => {
    const modalError = document.querySelector('.modal__error-wrapper');
    const target = e.target;
    if (target.closest('.modal__error-btn')) {
      modalError.classList.remove('modal__error_display_flex');
    };
    if (target === modalError) {
      modalError.classList.remove('modal__error_display_flex');
    }
  };

  document.removeEventListener('click', handleCloseError);
  document.addEventListener('click', handleCloseError);
};

export default {
  closeModal,
  closeReset,
  closeErrorModal,
};

