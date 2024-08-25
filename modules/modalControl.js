import {modalOpen, modal, totalPriceModal, modalIdValue, discountInput, modalForm} from './variables.js';

// Генерируем случайный ID длиной количеством символов length
const generateId = length => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

// Очищаем форму, поле со скидкой, закрываем форму
export const closeReset = () => {
  modalForm.reset();
  discountInput.setAttribute('disabled', '');
  modal.classList.remove('modal_display_flex');
};

// Открываем  модалку, устанавливаем общую стоимость на 0, генерим новый id при открытии модалки
const openModal = () => {
  modalOpen.addEventListener('click', () => {
    modal.classList.add('modal_display_flex');
    totalPriceModal.textContent = '0';
    modalIdValue.textContent = generateId(9);
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
      discountInput.setAttribute('disabled', '');
      modal.classList.remove('modal_display_flex');
    }
  });
};

export default {
  openModal,
  closeModal,
  closeReset,
};

